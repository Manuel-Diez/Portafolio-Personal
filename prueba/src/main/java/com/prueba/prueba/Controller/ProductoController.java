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

import com.prueba.prueba.Service.ProductoService;
import com.prueba.prueba.entity.Productos;
import com.prueba.prueba.utils.ApiResponseDto;



@RequestMapping ("prueba/producto")
@RestController
@CrossOrigin
public class ProductoController {

	@Autowired
	private ProductoService service;
	
	@PostMapping("/")
	public Productos save(@RequestBody Productos producto) throws Exception{
		
		return service.save(producto);
	}
	
	@GetMapping("/{id}")
	public Optional<Productos> findById(@PathVariable Long id) throws Exception{
		return service.findById(id);
	}
	
	@GetMapping("/")
	public List<Productos> all() throws Exception{
		return service.all();
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) throws Exception{
		service.delete(id);
	}
	
	@PutMapping("/{id}")
	ResponseEntity<ApiResponseDto<Productos>> update(@PathVariable Long id, @RequestBody Productos producto) throws Exception{
		try {
            service.update(id, producto);
            return ResponseEntity.ok(new ApiResponseDto<Productos>("Datos actualizados", null, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponseDto<Productos>(e.getMessage(), null, false));
        }
	}
	

	@GetMapping("filtros")
	public List<Productos> filtros(@RequestParam(required = false) String nombre, 
	                               @RequestParam(required = false) Boolean estado) {
	    return service.filtros(nombre,estado);
	}
	
	@GetMapping("contar_productos")
	public Long contarUsuarios() {
		return service.contarProductos();
	}
	
	@GetMapping("/productosMenorStock")
	public List<Productos> productosMenorStock() {
		return service.productosMenorStock();
	}
	
}
