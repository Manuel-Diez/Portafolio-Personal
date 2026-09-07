import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import axios from 'axios';
import authService from "../../services/authService";

const API_URL = 'http://localhost:9000/api';
const ENDPOINTS = {
  USERS: `${API_URL}/users`,
  HOTELS: `${API_URL}/hotels`,
  HOTEL_ROOMS: `${API_URL}/hotel-rooms`,
  SALES: `${API_URL}/sales`
};

const getAuthConfig = () => {
  const token = authService.getToken();
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const RentasRegister = () => {

  const [formData, setFormData] = useState({
    userId: "",
    hotelId: "",
    hotelRoomId: "",
    startDate: "",
    endDate: "",
    totalPrice: ""
  });

  const [message, setMessage] = useState({ text: "", type: "" });

  const [sales, setSales] = useState([]);
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [allHotelRooms, setAllHotelRooms] = useState([]);
  const [filteredHotelRooms, setFilteredHotelRooms] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSales();
    fetchUsers();
    fetchHotels();
    fetchAllHotelRooms();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.startDate, formData.endDate, formData.hotelRoomId]);

  const fetchSales = async () => {
    try {
      const response = await axios.get(ENDPOINTS.SALES, getAuthConfig());
      setSales(response.data);
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      setMessage({
        text: "Error al cargar la lista de ventas",
        type: "error"
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(ENDPOINTS.USERS, getAuthConfig());
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setMessage({
        text: "Error al cargar la lista de usuarios",
        type: "error"
      });
    }
  };

  const fetchHotels = async () => {
    try {
      const response = await axios.get(ENDPOINTS.HOTELS);
      setHotels(response.data);
    } catch (error) {
      console.error("Error al obtener hoteles:", error);
      setMessage({
        text: "Error al cargar la lista de hoteles",
        type: "error"
      });
    }
  };

  const fetchAllHotelRooms = async () => {
    try {
      const response = await axios.get(ENDPOINTS.HOTEL_ROOMS);
      setAllHotelRooms(response.data);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
      setMessage({
        text: "Error al cargar la lista de habitaciones",
        type: "error"
      });
    }
  };

  const filterRoomsByHotel = (hotelId) => {
    if (!hotelId) {
      setFilteredHotelRooms([]);
      return;
    }

    const filtered = allHotelRooms.filter(room => room.hotel.id === hotelId);
    setFilteredHotelRooms(filtered);

    setFormData(prev => ({
      ...prev,
      hotelRoomId: "",
      totalPrice: ""
    }));
  };

  const calculateTotalPrice = () => {
    const { startDate, endDate, hotelRoomId } = formData;

    if (!startDate || !endDate || !hotelRoomId) {
      return;
    }

    const selectedRoom = filteredHotelRooms.find(room => room.id === hotelRoomId);

    if (!selectedRoom) {
      return;
    }

    const pricePerNight = selectedRoom.room.price;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalPrice = pricePerNight * diffDays;

    setFormData(prev => ({
      ...prev,
      totalPrice: totalPrice.toString()
    }));
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value
    });

    if (id === "hotelId") {
      filterRoomsByHotel(value);
    }

    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userId) {
      newErrors.userId = "Debe seleccionar un usuario";
    }

    if (!formData.hotelId) {
      newErrors.hotelId = "Debe seleccionar un hotel";
    }

    if (!formData.hotelRoomId) {
      newErrors.hotelRoomId = "Debe seleccionar una habitación";
    }

    if (!formData.startDate) {
      newErrors.startDate = "La fecha de inicio es requerida";
    }

    if (!formData.endDate) {
      newErrors.endDate = "La fecha de fin es requerida";
    } else if (new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = "La fecha de fin debe ser posterior a la fecha de inicio";
    }

    if (!formData.totalPrice || formData.totalPrice === "0") {
      newErrors.totalPrice = "No se ha podido calcular el precio total";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {

      const saleData = {
        user: { id: formData.userId },
        hotelRoom: { id: formData.hotelRoomId },
        startDate: formData.startDate,
        endDate: formData.endDate
      };

      const response = await axios.post(ENDPOINTS.SALES, saleData, getAuthConfig());

      setMessage({
        text: `Venta registrada exitosamente. Total: ${formatCurrency(response.data.totalPrice)}`,
        type: "success"
      });

      resetForm();

      fetchSales();
    } catch (error) {
      console.error("Error al registrar venta:", error);

      let errorMessage = "Error al registrar la venta";

      if (error.response && error.response.data) {
        const data = error.response.data;
        errorMessage = typeof data === "string" ? data : (data.message || errorMessage);
      }

      setMessage({
        text: errorMessage,
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      hotelId: "",
      hotelRoomId: "",
      startDate: "",
      endDate: "",
      totalPrice: ""
    });
    setFilteredHotelRooms([]);
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    setMessage({ text: "", type: "" });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString("es-ES", options);
  };

  const formatCurrency = (amount) => {
    if (!amount) return "$0";
    return `$${parseInt(amount).toLocaleString('es-CO')}`;
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.fullName : "Usuario desconocido";
  };

  const getRoomDetails = (roomId) => {
    const room = allHotelRooms.find(r => r.id === roomId);
    if (!room) return { hotelName: "Desconocido", roomType: "Desconocida" };

    return {
      hotelName: room.hotel.name,
      roomType: `${room.room.type} - ${room.room.accommodation}`
    };
  };

  return (
      <div className="content-section">
        <h2 className="section-title">Registro de Ventas</h2>
        <p className="section-description">
          Complete el formulario para registrar nuevas ventas de habitaciones.
        </p>

        {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
        )}

        <div className="form-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="userId">Usuario</label>
                <select
                    id="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    className={errors.userId ? "input-error" : ""}
                    disabled={isSubmitting}
                >
                  <option value="">Seleccionar usuario</option>
                  {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.fullName} - {user.documentNumber}
                      </option>
                  ))}
                </select>
                {errors.userId && <span className="error-message">{errors.userId}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="hotelId">Hotel</label>
                <select
                    id="hotelId"
                    value={formData.hotelId}
                    onChange={handleChange}
                    className={errors.hotelId ? "input-error" : ""}
                    disabled={isSubmitting}
                >
                  <option value="">Seleccionar hotel</option>
                  {hotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name} - {hotel.city}
                      </option>
                  ))}
                </select>
                {errors.hotelId && <span className="error-message">{errors.hotelId}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hotelRoomId">Habitación</label>
                <select
                    id="hotelRoomId"
                    value={formData.hotelRoomId}
                    onChange={handleChange}
                    className={errors.hotelRoomId ? "input-error" : ""}
                    disabled={isSubmitting || !formData.hotelId}
                >
                  <option value="">Seleccionar habitación</option>
                  {filteredHotelRooms.map((hotelRoom) => (
                      <option key={hotelRoom.id} value={hotelRoom.id}>
                        {hotelRoom.room.type} - {hotelRoom.room.accommodation} - {formatCurrency(hotelRoom.room.price)} / noche
                      </option>
                  ))}
                </select>
                {errors.hotelRoomId && <span className="error-message">{errors.hotelRoomId}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="totalPrice">Precio Total</label>
                <input
                    type="text"
                    id="totalPrice"
                    value={formData.totalPrice ? formatCurrency(formData.totalPrice) : ""}
                    readOnly
                    className={errors.totalPrice ? "input-error" : ""}
                />
                {errors.totalPrice && <span className="error-message">{errors.totalPrice}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="startDate">Fecha de inicio</label>
                <input
                    type="date"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={errors.startDate ? "input-error" : ""}
                    disabled={isSubmitting}
                    min={new Date().toISOString().split('T')[0]}
                />
                {errors.startDate && <span className="error-message">{errors.startDate}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="endDate">Fecha de fin</label>
                <input
                    type="date"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={errors.endDate ? "input-error" : ""}
                    disabled={isSubmitting}
                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
                {errors.endDate && <span className="error-message">{errors.endDate}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Registrar Venta"}
              </button>
              <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCancel}
                  disabled={isSubmitting}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        <div className="users-table-container">
          <h3 className="table-title">Ventas Registradas</h3>
          <table className="users-table">
            <thead>
            <tr>
              <th>Usuario</th>
              <th>Hotel</th>
              <th>Habitación</th>
              <th>Fecha inicio</th>
              <th>Fecha fin</th>
              <th>Precio</th>
            </tr>
            </thead>
            <tbody>
            {sales.length > 0 ? (
                sales.map((sale) => {
                  const roomDetails = getRoomDetails(sale.hotelRoom?.id);

                  return (
                      <tr key={sale.id}>
                        <td>{getUserName(sale.user?.id)}</td>
                        <td>{roomDetails.hotelName}</td>
                        <td>{roomDetails.roomType}</td>
                        <td>{formatDate(sale.startDate)}</td>
                        <td>{formatDate(sale.endDate)}</td>
                        <td>{formatCurrency(sale.totalPrice)}</td>
                      </tr>
                  );
                })
            ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No hay ventas registradas
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default RentasRegister;