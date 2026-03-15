package com.m.c.v.clinica.IRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.m.c.v.clinica.Entity.Ingreso;

public interface IngresoIRepository extends JpaRepository<Ingreso, Long> {

}
