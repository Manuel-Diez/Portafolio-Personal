package com.prueba.prueba.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.prueba.Service.VentasService;
import com.prueba.prueba.entity.Ventas;
import com.prueba.prueba.utils.ApiResponseDto;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RequestMapping ("prueba/ventas/")
@RestController
@CrossOrigin
public class VentasController {

	@Autowired
	private VentasService service;
	
	@PostMapping("")
	public Ventas save(@RequestBody Ventas venta) throws Exception{
		
		return service.save(venta);
	}
	
	@GetMapping("{id}")
	public Optional<Ventas> findById(@PathVariable Long id) throws Exception{
		return service.findById(id);
	}
	
	@GetMapping("")
	public List<Ventas> all() throws Exception{
		return service.all();
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable Long id) throws Exception{
		service.delete(id);
	}
	
	@PutMapping("{id}")
	ResponseEntity<ApiResponseDto<Ventas>> update(@PathVariable Long id, @RequestBody Ventas venta) throws Exception{
		try {
            service.update(id, venta);
            return ResponseEntity.ok(new ApiResponseDto<Ventas>("Datos actualizados", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<Ventas>(e.getMessage(), null, false));
        }
	}
	
}
