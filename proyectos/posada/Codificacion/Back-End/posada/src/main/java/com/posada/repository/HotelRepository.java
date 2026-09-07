package com.posada.repository;

import com.posada.model.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface HotelRepository extends JpaRepository<Hotel, UUID> {

  boolean existsByNameOrNit(String name, String nit);

}
