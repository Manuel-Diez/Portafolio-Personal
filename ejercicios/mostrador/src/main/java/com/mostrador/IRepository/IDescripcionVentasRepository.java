package com.mostrador.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mostrador.entity.DescripcionVentas;

public interface IDescripcionVentasRepository extends JpaRepository<DescripcionVentas, Long>{

	List<DescripcionVentas> findByVenta_Id(Long ventaId);

}
