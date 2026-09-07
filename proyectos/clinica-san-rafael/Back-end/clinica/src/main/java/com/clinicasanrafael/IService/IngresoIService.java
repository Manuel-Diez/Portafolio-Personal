package com.clinicasanrafael.IService;

import java.util.List;
import java.util.Optional;

import com.clinicasanrafael.Entity.Ingreso;

public interface IngresoIService {

    public Ingreso saveIngreso(Ingreso ingreso);
    public List<Ingreso> getAllIngresos();
    public Optional<Ingreso> getIngresoById(Long id);
    public void deleteIngreso(Long id);
    public Ingreso updateIngreso(Long id, Ingreso ingresoDetails);
}
