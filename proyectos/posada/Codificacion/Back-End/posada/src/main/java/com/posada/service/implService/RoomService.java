package com.posada.service.implService;

import com.posada.model.Enum.RoomType;
import com.posada.model.Room;
import com.posada.repository.RoomRepository;
import com.posada.service.interfaces.IRoomService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoomService implements IRoomService {

  private final RoomRepository roomRepository;

  public RoomService(RoomRepository roomRepository) {
    this.roomRepository = roomRepository;
  }

  @Override
  public Optional<Room> findRoomById(UUID id) {
    return roomRepository.findById(id);
  }

  @Override
  public List<Room> findAllRooms() {
    return roomRepository.findAll();
  }

  @Override
  public Room saveRoom(Room room) {

    validateRoomTypeAndAccommodation(room);

    return roomRepository.save(room);
  }

  private void validateRoomTypeAndAccommodation(Room room) {
    switch (room.getType()) {
      case ESTANDAR:

        if (room.getAccommodation() != RoomType.SENCILLA &&
            room.getAccommodation() != RoomType.DOBLE) {
          throw new IllegalArgumentException(
              "Las habitaciones Estándar solo pueden tener acomodación Sencilla o Doble."
          );
        }
        break;

      case JUNIOR:

        if (room.getAccommodation() != RoomType.TRIPLE &&
            room.getAccommodation() != RoomType.CUADRUPLE) {
          throw new IllegalArgumentException(
              "Las habitaciones Junior solo pueden tener acomodación Triple o Cuádruple."
          );
        }
        break;

      case SUITE:

        if (room.getAccommodation() != RoomType.SENCILLA &&
            room.getAccommodation() != RoomType.DOBLE &&
            room.getAccommodation() != RoomType.TRIPLE) {
          throw new IllegalArgumentException(
              "Las habitaciones Suite solo pueden tener acomodación Sencilla, Doble o Triple."
          );
        }
        break;

      default:
        throw new IllegalArgumentException("Tipo de habitación no reconocido.");
    }
  }
}
