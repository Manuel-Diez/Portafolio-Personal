package com.posada.controller;

import com.posada.model.Sale;
import com.posada.service.interfaces.ISaleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

  private final ISaleService saleService;

  public SaleController(ISaleService saleService) {
    this.saleService = saleService;
  }

  @GetMapping("/{id}")
  public ResponseEntity<Sale> getSaleById(@PathVariable UUID id) {
    Optional<Sale> sale = saleService.findById(id);
    return sale.map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  @GetMapping
  public ResponseEntity<List<Sale>> getAllSales() {
    return ResponseEntity.ok(saleService.findAll());
  }

  @PostMapping
  public ResponseEntity<?> createSale(@RequestBody Sale sale) {
    try {
      Sale saved = saleService.save(sale);
      return ResponseEntity.ok(saved);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (IllegalStateException e) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
  }
}
