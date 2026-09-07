package com.posada.controller;

import com.posada.model.HotelRoom;
import com.posada.model.request.HotelRoomRequestDTO;
import com.posada.service.interfaces.IHotelRoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/hotel-rooms")
public class HotelRoomController {

  private final IHotelRoomService hotelRoomService;

  public HotelRoomController(IHotelRoomService hotelRoomService) {
    this.hotelRoomService = hotelRoomService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<HotelRoom> getHotelRoomById(@PathVariable UUID id) {
    Optional<HotelRoom> hotelRoom = hotelRoomService.findHotelRoomById(id);
    return hotelRoom.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping
  public ResponseEntity<List<HotelRoom>> getAllHotelRooms() {
    return ResponseEntity.ok(hotelRoomService.findAllHotelRooms());
  }

  @PostMapping("/asignar")
  public ResponseEntity<?> asignarHabitaciones(@RequestBody HotelRoomRequestDTO requestDTO) {
    try {
      hotelRoomService.saveMultipleHotelRooms(requestDTO);
      return ResponseEntity.ok("Habitaciones asignadas correctamente.");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
