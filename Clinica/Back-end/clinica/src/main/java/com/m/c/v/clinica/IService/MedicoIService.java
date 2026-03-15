package com.m.c.v.clinica.IService;

import java.util.List;
import java.util.Optional;

import com.m.c.v.clinica.Entity.Medico;


public interface MedicoIService {
	
	Medico saveMedico(Medico medico);
	List<Medico> getAllMedicos();
	Optional<Medico> getMedicoById(Long id);
	void deleteMedico(Long id);
	Medico updateMedico(Long id, Medico medicoDetails);
	List<Medico> filterDoctors(String filter);
	

}
