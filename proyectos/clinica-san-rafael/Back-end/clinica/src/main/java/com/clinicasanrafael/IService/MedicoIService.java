package com.clinicasanrafael.IService;

import java.util.List;
import java.util.Optional;

import com.clinicasanrafael.Entity.Medico;

public interface MedicoIService {

	Medico saveMedico(Medico medico);
	List<Medico> getAllMedicos();
	Optional<Medico> getMedicoById(Long id);
	void deleteMedico(Long id);
	Medico updateMedico(Long id, Medico medicoDetails);
	List<Medico> filterDoctors(String filter);

}
