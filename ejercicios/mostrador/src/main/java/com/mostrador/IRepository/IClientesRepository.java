package com.mostrador.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.mostrador.entity.Clientes;

public interface IClientesRepository extends JpaRepository<Clientes, Long>{

	@Query(value = "SELECT * FROM clientes WHERE (:nombresCliente IS NULL OR nombres_cliente LIKE %:nombresCliente%) " +
            "AND (:ciudad IS NULL OR ciudad LIKE %:ciudad%) " +
            "AND (:estado IS NULL OR estado = :estado)", nativeQuery = true)
    List<Clientes> filtros(String nombresCliente, String ciudad, Boolean estado);

	@Query(value = "SELECT COUNT(*) FROM clientes", nativeQuery = true)
	Long contarUsuarios();

}
