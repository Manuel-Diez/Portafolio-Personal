package com.posada.model;

import com.posada.model.Enum.RoomCategory;
import com.posada.model.Enum.RoomType;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "rooms")
public class Room {

  @Id
  @GeneratedValue
  private UUID id;

  @Enumerated(EnumType.STRING)
  @Column(name = "type", nullable = false)
  private RoomCategory type;

  @Enumerated(EnumType.STRING)
  @Column(name = "accommodation", nullable = false)
  private RoomType accommodation;

  @Column(name = "price", nullable = false)
  private BigDecimal price;

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public RoomCategory getType() {
    return type;
  }

  public void setType(RoomCategory type) {
    this.type = type;
  }

  public RoomType getAccommodation() {
    return accommodation;
  }

  public void setAccommodation(RoomType accommodation) {
    this.accommodation = accommodation;
  }

  public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }
}
