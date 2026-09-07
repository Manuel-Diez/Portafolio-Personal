	package com.clinicasanrafael.Service;

	import java.util.List;
	import java.util.Optional;

	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.stereotype.Service;

	import com.clinicasanrafael.Entity.Ingreso;
	import com.clinicasanrafael.IRepository.IngresoIRepository;
import com.clinicasanrafael.IService.IngresoIService;

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

	    @Override
	    public Ingreso updateIngreso(Long id, Ingreso ingresoDetails) {
	        Optional<Ingreso> optionalIngreso = ingresoIRepository.findById(id);
	        if (optionalIngreso.isPresent()) {
	            Ingreso existingIngreso = optionalIngreso.get();
	            existingIngreso.setRoom(ingresoDetails.getRoom());
	            existingIngreso.setBed(ingresoDetails.getBed());
	            existingIngreso.setAdmissionDate(ingresoDetails.getAdmissionDate());
	            existingIngreso.setDischargeDate(ingresoDetails.getDischargeDate());
	            existingIngreso.setStatus(ingresoDetails.getStatus());
	            existingIngreso.setMedico(ingresoDetails.getMedico());
	            existingIngreso.setPaciente(ingresoDetails.getPaciente());
	            return ingresoIRepository.save(existingIngreso);
	        } else {
	            return null;
	        }
	    }
	}
