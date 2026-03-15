package com.prueba.prueba.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.prueba.prueba.entity.Clientes;

public interface IClientesRepository extends JpaRepository<Clientes, Long>{

	@Query(value = "SELECT c FROM clientes c WHERE (:nombresCliente IS NULL OR c.nombresCliente LIKE %:nombresCliente%) " +
            "AND (:ciudad IS NULL OR c.ciudad LIKE %:ciudad%) " +
            "AND (:estado IS NULL OR c.estado = :estado)", nativeQuery = true)
    List<Clientes> filtros(String nombresCliente, String ciudad, Boolean estado);
	
	@Query(value = "SELECT COUNT(*) FROM clientes", nativeQuery = true)
	Long contarUsuarios();

}
