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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.prueba.prueba.Service.ClienteService;
import com.prueba.prueba.entity.Clientes;
import com.prueba.prueba.utils.ApiResponseDto;


@RequestMapping ("prueba/clientes")
@RestController
@CrossOrigin
public class ClienteController {
	
	@Autowired
	private ClienteService service;
	
	@PostMapping("/")
	public Clientes save(@RequestBody Clientes cliente) throws Exception{
		return service.save(cliente);
	}
	
	@GetMapping("/{id}")
	public Optional<Clientes> findById(@PathVariable Long id) throws Exception{
		return service.findById(id);
	}
	
	@GetMapping("/")
	public List<Clientes> all() throws Exception{
		return service.all();
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) throws Exception{
		service.delete(id);
	}
	
	@PutMapping("/{id}")
	ResponseEntity<ApiResponseDto<Clientes>> update(@PathVariable Long id, @RequestBody Clientes cliente) throws Exception{
		try {
            service.update(id, cliente);
            return ResponseEntity.ok(new ApiResponseDto<Clientes>("Datos actualizados", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<Clientes>(e.getMessage(), null, false));
        }
	}
	
	@GetMapping("filtros")
	public List<Clientes> filtros(@RequestParam(required = false) String nombre, 
	                               @RequestParam(required = false) String ciudad, 
	                               @RequestParam(required = false) Boolean estado) {
	    return service.filtros(nombre, ciudad, estado);
	}

	@GetMapping("contar_usuarios")
	public Long contarUsuarios() {
		return service.contarUsuarios();
	}
	
}
