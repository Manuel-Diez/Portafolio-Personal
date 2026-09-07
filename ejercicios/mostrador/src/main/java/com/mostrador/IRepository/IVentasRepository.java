package com.mostrador.IRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mostrador.entity.Ventas;

public interface IVentasRepository extends JpaRepository<Ventas, Long>{

}
