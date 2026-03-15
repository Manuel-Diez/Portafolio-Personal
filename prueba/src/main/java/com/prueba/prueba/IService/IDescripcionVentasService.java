package com.prueba.prueba.IService;

import java.util.List;
import java.util.Optional;

import com.prueba.prueba.entity.DescripcionVentas;



public interface IDescripcionVentasService {

	List<DescripcionVentas> all() throws Exception;
	
	DescripcionVentas save(DescripcionVentas descripcionVentas) throws Exception;
	
	Optional<DescripcionVentas> findById(Long id) throws Exception;
	
	void delete(Long id) throws Exception;
	
	void update(Long id, DescripcionVentas descripcionVentas) throws Exception;
	
}
