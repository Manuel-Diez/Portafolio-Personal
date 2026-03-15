package com.prueba.prueba.IService;

import java.util.List;
import java.util.Optional;

import com.prueba.prueba.entity.Clientes;

public interface IClientesService {

	public List<Clientes> all() throws Exception;
	
	public Clientes save(Clientes cliente) throws Exception;
	
	public Optional<Clientes> findById(Long id) throws Exception;
	
	public void delete(Long id) throws Exception;
	
	public void  update(Long id, Clientes cliente) throws Exception;
	
	public List<Clientes> filtros(String nombresCliente, String ciudad, Boolean estado);
	
	public Long contarUsuarios();
}
