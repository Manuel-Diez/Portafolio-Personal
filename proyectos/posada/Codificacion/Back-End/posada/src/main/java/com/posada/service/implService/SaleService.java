package com.posada.service.implService;

import com.posada.model.HotelRoom;
import com.posada.model.Sale;
import com.posada.repository.HotelRoomRepository;
import com.posada.repository.SaleRepository;
import com.posada.service.interfaces.ISaleService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SaleService implements ISaleService {

  private final SaleRepository saleRepository;
  private final HotelRoomRepository hotelRoomRepository;

  public SaleService(SaleRepository saleRepository, HotelRoomRepository hotelRoomRepository) {
    this.saleRepository = saleRepository;
    this.hotelRoomRepository = hotelRoomRepository;
  }

  @Override
  public Optional<Sale> findById(UUID id) {
    return saleRepository.findById(id);
  }

  @Override
  public List<Sale> findAll() {
    return saleRepository.findAll();
  }

  @Transactional
  @Override
  public Sale save(Sale sale) {
    if (sale.getStartDate() == null || sale.getEndDate() == null
        || !sale.getStartDate().isBefore(sale.getEndDate())) {
      throw new IllegalArgumentException("La fecha de salida debe ser posterior a la fecha de entrada.");
    }

    if (sale.getHotelRoom() == null || sale.getHotelRoom().getId() == null) {
      throw new IllegalArgumentException("Debe indicar la habitación de hotel a reservar.");
    }

    HotelRoom hotelRoom = hotelRoomRepository.findById(sale.getHotelRoom().getId())
        .orElseThrow(() -> new IllegalArgumentException("No se encontró la habitación en el hotel especificado"));

    List<Sale> overlapping = saleRepository.findOverlapping(hotelRoom, sale.getStartDate(), sale.getEndDate());
    if (overlapping.size() >= hotelRoom.getQuantity()) {
      throw new IllegalStateException("No hay disponibilidad para esa habitación en las fechas seleccionadas.");
    }

    long noches = ChronoUnit.DAYS.between(sale.getStartDate(), sale.getEndDate());
    BigDecimal precioTotal = hotelRoom.getRoom().getPrice().multiply(BigDecimal.valueOf(noches));

    sale.setHotelRoom(hotelRoom);
    sale.setTotalPrice(precioTotal);

    return saleRepository.save(sale);
  }

}
