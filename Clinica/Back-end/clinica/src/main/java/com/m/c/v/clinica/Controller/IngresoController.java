package com.m.c.v.clinica.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.m.c.v.clinica.Entity.Ingreso;
import com.m.c.v.clinica.IService.IngresoIService;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIngreso(@PathVariable Long id) {
        ingresoService.deleteIngreso(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
