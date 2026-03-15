package com.Biblioteca.Andorid.IService;

import java.util.List;
import java.util.Optional;

public interface IObjectTService<T> {

	public T save(T entidad) throws Exception;
	
	public void delete(Long id ) throws Exception;
	
	public T update(T entidad, Long id) throws Exception;
	
	public List<T> all() throws Exception;
	
	public Optional<T> findById(Long id) throws Exception;
}
