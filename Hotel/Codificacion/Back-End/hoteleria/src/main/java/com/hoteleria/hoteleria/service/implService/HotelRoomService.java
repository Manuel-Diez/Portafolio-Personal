package com.hoteleria.hoteleria.service.implService;

import com.hoteleria.hoteleria.model.Enum.RoomCategory;
import com.hoteleria.hoteleria.model.Enum.RoomType;
import com.hoteleria.hoteleria.model.Hotel;
import com.hoteleria.hoteleria.model.HotelRoom;
import com.hoteleria.hoteleria.model.Room;
import com.hoteleria.hoteleria.model.request.HotelRoomRequestDTO;
import com.hoteleria.hoteleria.model.request.RoomQuantityDTO;
import com.hoteleria.hoteleria.repository.HotelRepository;
import com.hoteleria.hoteleria.repository.HotelRoomRepository;
import com.hoteleria.hoteleria.repository.RoomRepository;
import com.hoteleria.hoteleria.service.interfaces.IHotelRoomService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class HotelRoomService implements IHotelRoomService {

  private final HotelRoomRepository hotelRoomRepository;
  private final HotelRepository hotelRepository;
  private final RoomRepository roomRepository;

  @Override
  public Optional<HotelRoom> findHotelRoomById(UUID id) {
    return hotelRoomRepository.findById(id);
  }

  @Override
  public List<HotelRoom> findAllHotelRooms() {
    return hotelRoomRepository.findAll();
  }

  @Override
  public List<HotelRoom> saveMultipleHotelRooms(HotelRoomRequestDTO requestDTO) {
    Hotel hotel = hotelRepository.findById(requestDTO.getHotelId())
        .orElseThrow(() -> new IllegalArgumentException("Hotel no encontrado"));

    int totalNuevas = 0;
    List<HotelRoom> savedRooms = new ArrayList<>();

    for (RoomQuantityDTO dto : requestDTO.getRooms()) {
      Room room = roomRepository.findById(dto.getId())
          .orElseThrow(() -> new IllegalArgumentException("Tipo de habitación no encontrado"));

      if (!validarAcomodacion(room.getType(), room.getAccommodation())) {
        throw new IllegalArgumentException("Combinación inválida para tipo " + room.getType());
      }

      Optional<HotelRoom> existente = hotelRoomRepository.findByHotelAndRoom(hotel, room);
      if (existente.isPresent()) {
        throw new IllegalArgumentException("Ya existe la combinación hotel + habitación: " + room.getId());
      }

      totalNuevas += dto.getQuantity();

      HotelRoom hotelRoom = new HotelRoom();
      hotelRoom.setHotel(hotel);
      hotelRoom.setRoom(room);
      hotelRoom.setQuantity(dto.getQuantity());

      HotelRoom saved = hotelRoomRepository.save(hotelRoom);
      savedRooms.add(saved);
    }

    // Validar total máximo permitido
    int totalExistente = sumRoomsByHotel(hotel);
    if ((totalExistente + totalNuevas) > hotel.getMaxRooms()) {
      throw new IllegalArgumentException("La suma total de habitaciones excede el límite del hotel.");
    }

    return savedRooms;
  }
  private int sumRoomsByHotel(Hotel hotel) {
    return hotelRoomRepository.sumCantidadByHotel(hotel);
  }

  private boolean validarAcomodacion(RoomCategory category, RoomType type) {
    return switch (category) {
      case ESTANDAR -> type == RoomType.SENCILLA || type == RoomType.DOBLE;
      case JUNIOR -> type == RoomType.TRIPLE || type == RoomType.CUADRUPLE;
      case SUITE -> type == RoomType.SENCILLA || type == RoomType.DOBLE || type == RoomType.TRIPLE;
    };
  }
}
