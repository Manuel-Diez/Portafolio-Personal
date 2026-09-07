import React, { useState, useEffect } from "react";
import "../Dashboard/Dashboard.css";
import axios from 'axios';
import authService from "../../services/authService";

const API_URL = 'http://localhost:9000/api';
const ENDPOINTS = {
  HOTELS: `${API_URL}/hotels`,
  HOTEL_ROOMS: `${API_URL}/hotel-rooms`,
  ROOMS: `${API_URL}/rooms`,
  HOTEL_ROOMS_ASIGNAR: `${API_URL}/hotel-rooms/asignar`
};

const getAuthConfig = () => {
  const token = authService.getToken();
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const HotelRegisterWithRooms = () => {

  const [hotelData, setHotelData] = useState({
    name: "",
    city: "",
    address: "",
    nit: "",
    maxRooms: ""
  });

  const [createdHotelId, setCreatedHotelId] = useState(null);
  const [createdHotel, setCreatedHotel] = useState(null);

  const [roomAssignment, setRoomAssignment] = useState({
    roomType: "",
    accommodation: "",
    quantity: ""
  });

  const [hotels, setHotels] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [hotelRooms, setHotelRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);

  const [loading, setLoading] = useState(false);
  const [hotelStep, setHotelStep] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errors, setErrors] = useState({});

  const roomTypes = [
    { value: "ESTANDAR", label: "Habitación estándar" },
    { value: "JUNIOR", label: "Habitación Junior" },
    { value: "SUITE", label: "Habitación Suite" }
  ];

  const accommodationTypes = [
    { value: "SENCILLA", label: "Acomodación sencilla" },
    { value: "DOBLE", label: "Acomodación doble" },
    { value: "TRIPLE", label: "Acomodación triple" },
    { value: "CUADRUPLE", label: "Acomodación cuádruple" }
  ];

  useEffect(() => {
    fetchHotels();
    fetchRooms();
    fetchHotelRooms();
  }, []);

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

  const fetchRooms = async () => {
    try {
      const response = await axios.get(ENDPOINTS.ROOMS, getAuthConfig());
      setAvailableRooms(response.data);
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
      setMessage({
        text: "Error al cargar tipos de habitaciones",
        type: "error"
      });
    }
  };

  const fetchHotelRooms = async () => {
    try {
      const response = await axios.get(ENDPOINTS.HOTEL_ROOMS);
      setHotelRooms(response.data);
    } catch (error) {
      console.error("Error al obtener asignaciones:", error);
    }
  };

  const handleHotelChange = (e) => {
    const { id, value } = e.target;

    if (id === "maxRooms") {
      const numericValue = value === "" ? "" : Number(value);
      setHotelData({
        ...hotelData,
        [id]: numericValue
      });
    } else {
      setHotelData({
        ...hotelData,
        [id]: value
      });
    }

    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: null
      });
    }
  };

  const handleRoomAssignmentChange = (e) => {
    const { id, value } = e.target;

    const updatedAssignment = { ...roomAssignment };

    if (id === "quantity") {
      updatedAssignment[id] = value === "" ? "" : Number(value);
    } else {
      updatedAssignment[id] = value;
    }

    if (id === "roomType") {
      updatedAssignment.accommodation = "";
    }

    setRoomAssignment(updatedAssignment);

    if (errors[id]) {
      setErrors({
        ...errors,
        [id]: null
      });
    }
  };

  const filterCompatibleAccommodations = (roomType) => {
    if (!roomType) return;
    setRoomAssignment({
      ...roomAssignment,
      accommodation: ""
    });
  };

  const validateHotelForm = () => {
    const newErrors = {};

    if (!hotelData.name.trim()) {
      newErrors.name = "El nombre del hotel es requerido";
    }

    if (!hotelData.city.trim()) {
      newErrors.city = "La ciudad es requerida";
    }

    if (!hotelData.address.trim()) {
      newErrors.address = "La dirección es requerida";
    }

    if (!hotelData.nit.trim()) {
      newErrors.nit = "El NIT es requerido";
    } else if (!/^\d+$/.test(hotelData.nit)) {
      newErrors.nit = "El NIT debe contener solo números";
    }

    if (hotelData.maxRooms === "") {
      newErrors.maxRooms = "El número máximo de habitaciones es requerido";
    } else if (isNaN(hotelData.maxRooms) || hotelData.maxRooms <= 0) {
      newErrors.maxRooms = "Debe ser un número mayor que 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRoomAssignmentForm = () => {
    const newErrors = {};

    if (!roomAssignment.roomType) {
      newErrors.roomType = "Seleccione un tipo de habitación";
    }

    if (!roomAssignment.accommodation) {
      newErrors.accommodation = "Seleccione un tipo de acomodación";
    }

    if (roomAssignment.quantity === "") {
      newErrors.quantity = "La cantidad es requerida";
    } else if (isNaN(roomAssignment.quantity) || roomAssignment.quantity <= 0) {
      newErrors.quantity = "Debe ser un número mayor que 0";
    }

    if (roomAssignment.roomType && roomAssignment.accommodation) {
      if (!isValidRoomTypeAccommodation(roomAssignment.roomType, roomAssignment.accommodation)) {
        newErrors.combination = "La combinación de tipo y acomodación no es válida";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidRoomTypeAccommodation = (type, accommodation) => {
    switch (type) {
      case "ESTANDAR":
        return ["SENCILLA", "DOBLE"].includes(accommodation);
      case "JUNIOR":
        return ["TRIPLE", "CUADRUPLE"].includes(accommodation);
      case "SUITE":
        return ["SENCILLA", "DOBLE", "TRIPLE"].includes(accommodation);
      default:
        return false;
    }
  };

  const findOrCreateRoom = async (type, accommodation) => {

    const existingRoom = availableRooms.find(
        room => room.type === type && room.accommodation === accommodation
    );

    if (existingRoom) {
      return existingRoom.id;
    }

    try {
      const response = await axios.post(ENDPOINTS.ROOMS, {
        type: type,
        accommodation: accommodation
      }, getAuthConfig());

      setAvailableRooms([...availableRooms, response.data]);

      return response.data.id;
    } catch (error) {
      console.error("Error al crear habitación:", error);
      throw new Error("No se pudo crear la habitación");
    }
  };

  const handleHotelSubmit = async (e) => {
    e.preventDefault();

    if (!validateHotelForm()) {
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {

      const data = {
        name: hotelData.name,
        city: hotelData.city,
        address: hotelData.address,
        nit: hotelData.nit,
        maxRooms: Number(hotelData.maxRooms)
      };

      const response = await axios.post(ENDPOINTS.HOTELS, data);

      setCreatedHotelId(response.data.id);
      setCreatedHotel(response.data);

      setMessage({
        text: "Hotel registrado exitosamente. Ahora asigne habitaciones.",
        type: "success"
      });

      fetchHotels();

      setHotelStep(false);
    } catch (error) {
      console.error("Error al registrar hotel:", error);

      let errorMessage = "Error al registrar el hotel";

      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }

      setMessage({
        text: errorMessage,
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoom = async () => {

    if (!validateRoomAssignmentForm()) {
      return;
    }

    try {

      let roomId;

      const existingRoom = availableRooms.find(
          room => room.type === roomAssignment.roomType && room.accommodation === roomAssignment.accommodation
      );

      if (existingRoom) {
        roomId = existingRoom.id;
      } else {

        const response = await axios.post(ENDPOINTS.ROOMS, {
          type: roomAssignment.roomType,
          accommodation: roomAssignment.accommodation
        }, getAuthConfig());

        roomId = response.data.id;

        fetchRooms();
      }

      const existingSelection = selectedRooms.findIndex(
          item => item.roomType === roomAssignment.roomType &&
              item.accommodation === roomAssignment.accommodation
      );

      if (existingSelection >= 0) {

        const updatedRooms = [...selectedRooms];
        updatedRooms[existingSelection].quantity += Number(roomAssignment.quantity);
        setSelectedRooms(updatedRooms);
      } else {

        setSelectedRooms([...selectedRooms, {
          id: roomId,
          roomType: roomAssignment.roomType,
          accommodation: roomAssignment.accommodation,
          quantity: Number(roomAssignment.quantity)
        }]);
      }

      setRoomAssignment({
        roomType: "",
        accommodation: "",
        quantity: ""
      });

      setMessage({
        text: "Habitación añadida a la lista",
        type: "success"
      });
    } catch (error) {
      console.error("Error al añadir habitación:", error);
      setMessage({
        text: "Error al añadir habitación",
        type: "error"
      });
    }
  };

  const handleFinishAssignment = async () => {
    if (selectedRooms.length === 0) {
      setMessage({
        text: "Debe añadir al menos una habitación",
        type: "error"
      });
      return;
    }

    setLoading(true);

    try {

      const requestData = {
        hotelId: createdHotelId,
        rooms: selectedRooms.map(room => ({
          id: room.id,
          quantity: room.quantity
        }))
      };

      await axios.post(ENDPOINTS.HOTEL_ROOMS_ASIGNAR, requestData, getAuthConfig());

      setMessage({
        text: "Habitaciones asignadas correctamente al hotel",
        type: "success"
      });

      fetchHotelRooms();

      resetForms();
      setHotelStep(true);
    } catch (error) {
      console.error("Error al asignar habitaciones:", error);
      setMessage({
        text: "Error al asignar habitaciones al hotel",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForms();
    setHotelStep(true);
    setMessage({ text: "", type: "" });
  };

  const resetForms = () => {
    setHotelData({
      name: "",
      city: "",
      address: "",
      nit: "",
      maxRooms: ""
    });

    setRoomAssignment({
      roomType: "",
      accommodation: "",
      quantity: ""
    });

    setSelectedRooms([]);
    setCreatedHotelId(null);
    setCreatedHotel(null);
    setErrors({});
  };

  const handleRemoveRoom = (index) => {
    const updatedRooms = [...selectedRooms];
    updatedRooms.splice(index, 1);
    setSelectedRooms(updatedRooms);
  };

  const getRoomTypeName = (typeCode) => {
    const roomType = roomTypes.find(type => type.value === typeCode);
    return roomType ? roomType.label : typeCode;
  };

  const getAccommodationName = (accommodationCode) => {
    const accommodation = accommodationTypes.find(acc => acc.value === accommodationCode);
    return accommodation ? accommodation.label : accommodationCode;
  };

  const getCurrentHotelRooms = () => {
    if (!createdHotelId) return [];

    return hotelRooms.filter(hr => hr.hotel.id === createdHotelId);
  };

  const getCompatibleAccommodations = (roomType) => {
    if (!roomType) return accommodationTypes;

    switch(roomType) {
      case "ESTANDAR":
        return accommodationTypes.filter(acc =>
            ["SENCILLA", "DOBLE"].includes(acc.value)
        );
      case "JUNIOR":
        return accommodationTypes.filter(acc =>
            ["TRIPLE", "CUADRUPLE"].includes(acc.value)
        );
      case "SUITE":
        return accommodationTypes.filter(acc =>
            ["SENCILLA", "DOBLE", "TRIPLE"].includes(acc.value)
        );
      default:
        return accommodationTypes;
    }
  };

  return (
      <div className="content-section">

        {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
        )}

        {hotelStep ? (

            <>
              <h2 className="section-title">Registro de Hotel</h2>
              <p className="section-description">
                Ingrese los datos para registrar un nuevo hotel en la cadena.
              </p>

              <div className="form-container">
                <form className="register-form" onSubmit={handleHotelSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nombre del Hotel</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Ingrese nombre del hotel"
                        value={hotelData.name}
                        onChange={handleHotelChange}
                        className={errors.name ? "input-error" : ""}
                        disabled={loading}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="city">Ciudad</label>
                      <input
                          type="text"
                          id="city"
                          placeholder="Neiva, New York"
                          value={hotelData.city}
                          onChange={handleHotelChange}
                          className={errors.city ? "input-error" : ""}
                          disabled={loading}
                      />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="address">Dirección</label>
                      <input
                          type="text"
                          id="address"
                          placeholder="Calle, carrera"
                          value={hotelData.address}
                          onChange={handleHotelChange}
                          className={errors.address ? "input-error" : ""}
                          disabled={loading}
                      />
                      {errors.address && <span className="error-message">{errors.address}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nit">NIT</label>
                      <input
                          type="text"
                          id="nit"
                          placeholder="12345678910"
                          value={hotelData.nit}
                          onChange={handleHotelChange}
                          className={errors.nit ? "input-error" : ""}
                          disabled={loading}
                      />
                      {errors.nit && <span className="error-message">{errors.nit}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="maxRooms">Máximo de habitaciones</label>
                      <input
                          type="number"
                          id="maxRooms"
                          placeholder="Número de habitaciones"
                          value={hotelData.maxRooms}
                          onChange={handleHotelChange}
                          className={errors.maxRooms ? "input-error" : ""}
                          disabled={loading}
                          min="1"
                      />
                      {errors.maxRooms && <span className="error-message">{errors.maxRooms}</span>}
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                      {loading ? "Guardando..." : "Guardar Hotel y Continuar"}
                    </button>
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={handleCancel}
                        disabled={loading}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </>
        ) : (

            <>
              <h2 className="section-title">Asignación de Habitaciones</h2>
              <p className="section-description">
                Asigne habitaciones al hotel: <strong>{createdHotel?.name}</strong>
              </p>

              <div className="form-container">
                <form className="register-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="roomType">Tipo de habitación</label>
                      <select
                          id="roomType"
                          value={roomAssignment.roomType}
                          onChange={handleRoomAssignmentChange}
                          className={errors.roomType || errors.combination ? "input-error" : ""}
                          disabled={loading}
                      >
                        <option value="">Seleccionar tipo de habitación</option>
                        {roomTypes.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                        ))}
                      </select>
                      {errors.roomType && <span className="error-message">{errors.roomType}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="accommodation">Tipo de acomodación</label>
                      <select
                          id="accommodation"
                          value={roomAssignment.accommodation}
                          onChange={handleRoomAssignmentChange}
                          className={errors.accommodation || errors.combination ? "input-error" : ""}
                          disabled={loading}
                      >
                        <option value="">Seleccionar tipo de acomodación</option>
                        {getCompatibleAccommodations(roomAssignment.roomType).map(acc => (
                            <option key={acc.value} value={acc.value}>
                              {acc.label}
                            </option>
                        ))}
                      </select>
                      {errors.accommodation && <span className="error-message">{errors.accommodation}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="quantity">Cantidad</label>
                      <input
                          type="number"
                          id="quantity"
                          placeholder="Cantidad de habitaciones"
                          value={roomAssignment.quantity}
                          onChange={handleRoomAssignmentChange}
                          className={errors.quantity ? "input-error" : ""}
                          disabled={loading}
                          min="1"
                      />
                      {errors.quantity && <span className="error-message">{errors.quantity}</span>}
                    </div>
                  </div>

                  {errors.combination && (
                      <div className="form-group">
                        <span className="error-message validation-error">{errors.combination}</span>
                      </div>
                  )}

                  <div className="form-info">
                    <strong>Nota:</strong> Recuerde las restricciones:
                    <ul>
                      <li>Habitación Estándar: Solo permite acomodación Sencilla o Doble</li>
                      <li>Habitación Junior: Solo permite acomodación Triple o Cuádruple</li>
                      <li>Habitación Suite: Solo permite acomodación Sencilla, Doble o Triple</li>
                    </ul>
                  </div>

                  <div className="form-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={handleAddRoom}
                        disabled={loading}
                    >
                      Añadir Habitación
                    </button>
                  </div>
                </form>
              </div>

              <div className="selected-rooms-container">
                <h3>Habitaciones seleccionadas</h3>
                {selectedRooms.length > 0 ? (
                    <table className="users-table">
                      <thead>
                      <tr>
                        <th>Tipo de habitación</th>
                        <th>Tipo de acomodación</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                      </tr>
                      </thead>
                      <tbody>
                      {selectedRooms.map((room, index) => (
                          <tr key={index}>
                            <td>{getRoomTypeName(room.roomType)}</td>
                            <td>{getAccommodationName(room.accommodation)}</td>
                            <td>{room.quantity}</td>
                            <td>
                              <button
                                  type="button"
                                  className="action-btn delete"
                                  onClick={() => handleRemoveRoom(index)}
                                  disabled={loading}
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                ) : (
                    <p>No hay habitaciones seleccionadas</p>
                )}
              </div>

              <div className="form-actions">
                <button
                    type="button"
                    className="btn-primary"
                    onClick={handleFinishAssignment}
                    disabled={loading || selectedRooms.length === 0}
                >
                  {loading ? "Guardando..." : "Finalizar Asignación"}
                </button>
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleCancel}
                    disabled={loading}
                >
                  Cancelar
                </button>
              </div>
            </>
        )}

        <div className="users-table-container">
          <h3 className="table-title">Habitaciones registradas</h3>
          <table className="users-table">
            <thead>
            <tr>
              <th>Nombre de hotel</th>
              <th>Tipo de habitación</th>
              <th>Acomodación</th>
              <th>Cantidad</th>
            </tr>
            </thead>
            <tbody>
            {hotelRooms.length > 0 ? (
                hotelRooms.map((hotelRoom) => (
                    <tr key={hotelRoom.id}>
                      <td>{hotelRoom.hotel.name}</td>
                      <td>{getRoomTypeName(hotelRoom.room.type)}</td>
                      <td>{getAccommodationName(hotelRoom.room.accommodation)}</td>
                      <td>{hotelRoom.quantity}</td>
                    </tr>
                ))
            ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No hay habitaciones asignadas
                  </td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default HotelRegisterWithRooms;