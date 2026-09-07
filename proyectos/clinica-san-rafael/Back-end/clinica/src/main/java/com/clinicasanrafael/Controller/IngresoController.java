package com.clinicasanrafael.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.clinicasanrafael.Entity.Ingreso;
import com.clinicasanrafael.IService.IngresoIService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/ingresos")
public class IngresoController {

    @Autowired
    private IngresoIService ingresoService;

    @GetMapping
    public ResponseEntity<List<Ingreso>> getAllIngresos() {
        List<Ingreso> ingresos = ingresoService.getAllIngresos();
        return new ResponseEntity<>(ingresos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Ingreso> saveIngreso(@RequestBody Ingreso ingreso) {
        Ingreso newIngreso = ingresoService.saveIngreso(ingreso);
        return new ResponseEntity<>(newIngreso, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateIngreso(@PathVariable Long id, @RequestBody Ingreso ingresoDetails) {
        if (ingresoDetails.getStatus() == null || ingresoDetails.getStatus().isEmpty()) {
            return ResponseEntity.badRequest().body("El campo 'Estado', no puede quedar vacío.");
        }

        Ingreso updatedIngreso = ingresoService.updateIngreso(id, ingresoDetails);
        if (updatedIngreso == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedIngreso);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngreso(@PathVariable Long id) {
        ingresoService.deleteIngreso(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
