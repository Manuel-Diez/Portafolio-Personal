package com.m.c.v.clinica.IService;

import java.util.List;
import java.util.Optional;
import com.m.c.v.clinica.Entity.Paciente;

public interface PacientesIService {

	Paciente savePaciente(Paciente paciente);
    List<Paciente> getAllPacientes();
    Optional<Paciente> getPacienteById(Long id);
    void deletePaciente(Long id);
	Paciente updatedPaciente(Long id, Paciente pacienteDetails);
	List<Paciente> filterPatient(String filter);
}
