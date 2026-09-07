package com.posada.model.request;

import java.util.List;
import java.util.UUID;

public class HotelRoomRequestDTO {

  private UUID hotelId;
  private List<RoomQuantityDTO> rooms;

  public UUID getHotelId() {
    return hotelId;
  }

  public void setHotelId(UUID hotelId) {
    this.hotelId = hotelId;
  }

  public List<RoomQuantityDTO> getRooms() {
    return rooms;
  }

  public void setRooms(List<RoomQuantityDTO> rooms) {
    this.rooms = rooms;
  }
}
