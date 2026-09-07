package com.posada.controller;

import com.posada.model.Hotel;
import com.posada.service.interfaces.IHotelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/hotels")
public class HotelController {

  private final IHotelService hotelService;

  public HotelController(IHotelService hotelService) {
    this.hotelService = hotelService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<Hotel> getHotelById(@PathVariable UUID id) {
    Optional<Hotel> hotel = hotelService.findHotelById(id);
    return hotel.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping
  public ResponseEntity<List<Hotel>> getAllHotels() {
    return ResponseEntity.ok(hotelService.findAllHotels());
  }

  @PostMapping
  public ResponseEntity<?> createHotel(@RequestBody Hotel hotel) {
    try {
      Hotel savedHotel = hotelService.save(hotel);
      return ResponseEntity.ok(savedHotel);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
