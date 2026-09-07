package com.clinicasanrafael.IRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.clinicasanrafael.Entity.Ingreso;

public interface IngresoIRepository extends JpaRepository<Ingreso, Long> {

}
