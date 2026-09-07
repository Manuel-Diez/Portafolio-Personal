package com.posada.service.implService;

import com.posada.model.Hotel;
import com.posada.repository.HotelRepository;
import com.posada.service.interfaces.IHotelService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class HotelService implements IHotelService {

  private final HotelRepository hotelRepository;

  public HotelService(HotelRepository hotelRepository) {
    this.hotelRepository = hotelRepository;
  }

  @Override
  public Optional<Hotel> findHotelById(UUID id) {
    return hotelRepository.findById(id);
  }

  @Override
  public List<Hotel> findAllHotels() {
    return hotelRepository.findAll();
  }

  @Override
  public Hotel save(Hotel hotel) {
    if (hotelRepository.existsByNameOrNit(hotel.getName(), hotel.getNit())) {
      throw new IllegalArgumentException("Ya existe un hotel registrado con ese nombre o NIT.");
    }
    return hotelRepository.save(hotel);
  }
}
