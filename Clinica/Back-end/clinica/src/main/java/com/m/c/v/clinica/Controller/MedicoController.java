package com.m.c.v.clinica.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.m.c.v.clinica.Entity.Medico;
import com.m.c.v.clinica.IService.MedicoIService;

@CrossOrigin
@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
    private MedicoIService medicoService;

    @GetMapping
    public ResponseEntity<List<Medico>> getAllMedicos() {
        List<Medico> medicos = medicoService.getAllMedicos();
        return new ResponseEntity<>(medicos, HttpStatus.OK);
    }

    @GetMapping("/filter/{filtro}")
    public ResponseEntity<List<Medico>> filterDoctors(@PathVariable String filtro) { 
        List<Medico> medicos = medicoService.filterDoctors(filtro); 
        return new ResponseEntity<>(medicos, HttpStatus.OK);
    }
    
    @PostMapping
    public ResponseEntity<Medico> saveMedico(@RequestBody Medico medico) {
        Medico newMedico = medicoService.saveMedico(medico);
        return new ResponseEntity<>(newMedico, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedico(@PathVariable Long id) {
        medicoService.deleteMedico(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateMedico(@PathVariable Long id, @RequestBody Medico medicoDetails) {
        if (medicoDetails.getStatus() == null || medicoDetails.getStatus().equals("")) {
            // Si el campo status es nulo o vacío, enviar una respuesta de error con el mensaje apropiado
            return ResponseEntity.badRequest().body("El campo 'Estado', no puede quedar vacío.");
        }
        
        Medico updatedMedico = medicoService.updateMedico(id, medicoDetails);
        if (updatedMedico == null) {
            // Manejar el caso en el que no se pueda encontrar el médico con el ID dado
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(updatedMedico);
    }


}
