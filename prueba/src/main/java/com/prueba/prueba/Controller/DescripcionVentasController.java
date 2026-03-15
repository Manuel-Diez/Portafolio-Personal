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

import com.prueba.prueba.Service.DescripcionVentasService;
import com.prueba.prueba.entity.DescripcionVentas;
import com.prueba.prueba.utils.ApiResponseDto;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RequestMapping ("prueba/descripcion_DescripcionVentas/")
@RestController
@CrossOrigin class DescripcionDescripcionVentasController {

	@Autowired
	private DescripcionVentasService service;
	
	@PostMapping("")
	public DescripcionVentas save(@RequestBody DescripcionVentas descripcionVentas) throws Exception{
		
		return service.save(descripcionVentas);
	}
	
	@GetMapping("{id}")
	public Optional<DescripcionVentas> findById(@PathVariable Long id) throws Exception{
		return service.findById(id);
	}
	
	@GetMapping("")
	public List<DescripcionVentas> all() throws Exception{
		return service.all();
	}
	
	@DeleteMapping("{id}")
	public void delete(@PathVariable Long id) throws Exception{
		service.delete(id);
	}
	
	@PutMapping("{id}")
	ResponseEntity<ApiResponseDto<DescripcionVentas>> update(@PathVariable Long id, @RequestBody DescripcionVentas descripcionVentas) throws Exception{
		try {
            service.update(id, descripcionVentas);
            return ResponseEntity.ok(new ApiResponseDto<DescripcionVentas>("Datos actualizados", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<DescripcionVentas>(e.getMessage(), null, false));
        }
	}
	
}
