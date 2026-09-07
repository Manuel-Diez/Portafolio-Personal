package com.posada.service.interfaces;

import com.posada.model.Hotel;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IHotelService {

  Optional<Hotel> findHotelById(UUID id);
  List<Hotel> findAllHotels();
  Hotel save(Hotel hotel);

}
