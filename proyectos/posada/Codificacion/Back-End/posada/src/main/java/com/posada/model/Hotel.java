package com.posada.model;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "hotels")
public class Hotel {

  @Id
  @GeneratedValue
  private UUID id;

  @Column(name = "name", nullable = false, unique = true)
  private String name;

  @Column(name = "city", nullable = false)
  private String city;

  @Column(name = "address", nullable = false)
  private String address;

  @Column(name = "nit", nullable = false, unique = true)
  private String nit;

  @Column(name = "max_rooms", nullable = false)
  private int maxRooms;

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getNit() {
    return nit;
  }

  public void setNit(String nit) {
    this.nit = nit;
  }

  public int getMaxRooms() {
    return maxRooms;
  }

  public void setMaxRooms(int maxRooms) {
    this.maxRooms = maxRooms;
  }
}
