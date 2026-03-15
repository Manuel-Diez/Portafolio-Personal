package com.prueba.prueba.IService;

import java.util.List;
import java.util.Optional;

import com.prueba.prueba.entity.Productos;



public interface IProductosService {

	public List<Productos> all() throws Exception;
	
	public Productos save(Productos producto) throws Exception;
	
	public Optional<Productos> findById(Long id) throws Exception;
	
	public void delete(Long id) throws Exception;
	
	public void update(Long id, Productos producto) throws Exception;
	
	public List<Productos> filtros(String nombreProducto, Boolean estado);
	
	public Long contarProductos();
	
	public List<Productos> productosMenorStock();
	
}
