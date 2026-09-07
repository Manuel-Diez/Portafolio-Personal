package com.posada.service.interfaces;

import com.posada.model.Sale;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ISaleService {

  Optional<Sale> findById(UUID id);
  List<Sale> findAll();
  Sale save(Sale sale);

}
