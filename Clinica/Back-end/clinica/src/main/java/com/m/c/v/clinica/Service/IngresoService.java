	package com.m.c.v.clinica.Service;
	
	import java.util.List;
	import java.util.Optional;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;
	
	import com.m.c.v.clinica.Entity.Ingreso;
	import com.m.c.v.clinica.IRepository.IngresoIRepository;
import com.m.c.v.clinica.IService.IngresoIService;
	
	@Service
	public class IngresoService implements IngresoIService{
	
		@Autowired
	    private IngresoIRepository ingresoIRepository;
	
	    public List<Ingreso> getAllIngresos() {
	        return ingresoIRepository.findAll();
	    }
	
	    public Optional<Ingreso> getIngresoById(Long id) {
	        return ingresoIRepository.findById(id);
	    }
	
	    public Ingreso saveIngreso(Ingreso ingreso) {
	        return ingresoIRepository.save(ingreso);
	    }
	
	    public void deleteIngreso(Long id) {
	        ingresoIRepository.deleteById(id);
	    }
	}
