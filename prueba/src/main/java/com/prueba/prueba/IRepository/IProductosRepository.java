package com.prueba.prueba.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.prueba.prueba.entity.Productos;

public interface IProductosRepository extends JpaRepository<Productos, Long>{


	@Query(value = "SELECT * FROM productos WHERE (:nombreProducto IS NULL OR nombre_producto LIKE %:nombreProducto%) " +
		       "AND (:estado IS NULL OR estado = :estado)", nativeQuery = true)
	List<Productos> filtros(String nombreProducto, Boolean estado);

	@Query(value = "SELECT COUNT(*) FROM productos", nativeQuery = true)
	Long contarProductos();
	
	@Query(value = "SELECT *  "
			+ "FROM productos  "
			+ "ORDER BY cantidad ASC  "
			+ "LIMIT 5; ", nativeQuery = true)
	List<Productos> productosMenorStock();
}
