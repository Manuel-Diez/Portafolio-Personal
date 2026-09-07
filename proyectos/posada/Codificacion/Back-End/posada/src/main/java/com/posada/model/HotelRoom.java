package com.posada.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "hotels_rooms")
public class HotelRoom {

  @Id
  @GeneratedValue
  private UUID id;

  @ManyToOne
  @JoinColumn(name = "hotel_id", nullable = false)
  private Hotel hotel;

  @ManyToOne
  @JoinColumn(name = "room_id", nullable = false)
  private Room room;

  @Column(name = "quantity", nullable = false)
  private int quantity;

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public Hotel getHotel() {
    return hotel;
  }

  public void setHotel(Hotel hotel) {
    this.hotel = hotel;
  }

  public Room getRoom() {
    return room;
  }

  public void setRoom(Room room) {
    this.room = room;
  }

  public int getQuantity() {
    return quantity;
  }

  public void setQuantity(int quantity) {
    this.quantity = quantity;
  }
}
