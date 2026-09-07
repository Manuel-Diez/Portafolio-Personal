package com.posada.repository;

import com.posada.model.HotelRoom;
import com.posada.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface SaleRepository extends JpaRepository<Sale, UUID> {

  @Query("SELECT s FROM Sale s WHERE s.hotelRoom = :hotelRoom "
      + "AND s.startDate < :endDate AND s.endDate > :startDate")
  List<Sale> findOverlapping(HotelRoom hotelRoom, LocalDate startDate, LocalDate endDate);

}
