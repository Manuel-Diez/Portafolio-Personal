package com.m.c.v.clinica.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.m.c.v.clinica.Entity.Paciente;
import com.m.c.v.clinica.IService.PacientesIService;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/pacientes")
public class PacienteController {

    @Autowired
    private PacientesIService pacienteService;

    @GetMapping
    public ResponseEntity<List<Paciente>> getAllPacientes() {
        List<Paciente> pacientes = pacienteService.getAllPacientes();
        return new ResponseEntity<>(pacientes, HttpStatus.OK);
    }
    
    @GetMapping("/filter/{filtro}")
    public ResponseEntity<List<Paciente>> filterPatient(@PathVariable String filtro) { 
        List<Paciente> pacientes = pacienteService.filterPatient(filtro); 
        return new ResponseEntity<>(pacientes, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Paciente> savePaciente(@RequestBody Paciente paciente) {
        Paciente newPaciente = pacienteService.savePaciente(paciente);
        return new ResponseEntity<>(newPaciente, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePaciente(@PathVariable Long id) {
        pacienteService.deletePaciente(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updatePaciente(@PathVariable Long id, @RequestBody Paciente pacienteDetails) {
        if (pacienteDetails.getStatus() == null || pacienteDetails.getStatus().equals("")) {
            // Si el campo status es nulo o vacío, enviar una respuesta de error con el mensaje apropiado
            return ResponseEntity.badRequest().body("El campo 'Estado', no puede quedar vacío.");
        }
        
        Paciente updatedPaciente = pacienteService.updatedPaciente(id, pacienteDetails);
        if (updatedPaciente == null) {
            // Manejar el caso en el que no se pueda encontrar el médico con el ID dado
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(updatedPaciente);
    }
}
