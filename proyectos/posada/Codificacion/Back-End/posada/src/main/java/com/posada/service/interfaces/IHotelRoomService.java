package com.posada.service.interfaces;

import com.posada.model.HotelRoom;
import com.posada.model.request.HotelRoomRequestDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IHotelRoomService {

  Optional<HotelRoom> findHotelRoomById(UUID id);
  List<HotelRoom> findAllHotelRooms();
  List<HotelRoom> saveMultipleHotelRooms(HotelRoomRequestDTO hotelRoom);

}
