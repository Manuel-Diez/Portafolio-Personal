package com.m.c.v.clinica.IService;

import java.util.List;
import java.util.Optional;

import com.m.c.v.clinica.Entity.Ingreso;

public interface IngresoIService {
	
    public Ingreso saveIngreso(Ingreso ingreso);
    public List<Ingreso> getAllIngresos();
    public Optional<Ingreso> getIngresoById(Long id);
    public void deleteIngreso(Long id);
}
