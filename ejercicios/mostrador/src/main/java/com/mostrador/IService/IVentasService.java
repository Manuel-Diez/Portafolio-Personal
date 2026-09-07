package com.mostrador.IService;

import java.util.List;
import java.util.Optional;

import com.mostrador.entity.Ventas;

public interface IVentasService {

	List<Ventas> all() throws Exception;

	Ventas save(Ventas ventas) throws Exception;

	Optional<Ventas> findById(Long id) throws Exception;

	void delete(Long id) throws Exception;

	void update(Long id, Ventas venta) throws Exception;

}
