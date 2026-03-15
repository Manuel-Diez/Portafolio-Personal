package com.prueba.prueba.IRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.prueba.prueba.entity.Ventas;

public interface IVentasRepository extends JpaRepository<Ventas, Long>{

}
