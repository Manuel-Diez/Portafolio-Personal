package com.m.c.v.clinica.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.m.c.v.clinica.Entity.Paciente;
import com.m.c.v.clinica.IRepository.PacienteIRepository;
import com.m.c.v.clinica.IService.PacientesIService;

@Service
public class PacienteService implements PacientesIService{

	@Autowired
    private PacienteIRepository pacienteIRepository;

    public List<Paciente> getAllPacientes() {
        return pacienteIRepository.findAll();
    }

    public Optional<Paciente> getPacienteById(Long id) {
        return pacienteIRepository.findById(id);
    }

    public Paciente savePaciente(Paciente paciente) {
        return pacienteIRepository.save(paciente);
    }

    public void deletePaciente(Long id) {
        pacienteIRepository.deleteById(id);
    }

    @Override
    public Paciente updatedPaciente(Long id, Paciente pacienteDetails) {
        Optional<Paciente> optionalPaciente = pacienteIRepository.findById(id);
        if (optionalPaciente.isPresent()) {
            Paciente existingPaciente = optionalPaciente.get();
            existingPaciente.setDocumentType(pacienteDetails.getDocumentType());
            existingPaciente.setDocument(pacienteDetails.getDocument());
            existingPaciente.setFirstName(pacienteDetails.getFirstName());
            existingPaciente.setSecondName(pacienteDetails.getSecondName());
            existingPaciente.setFirstLastName(pacienteDetails.getFirstLastName());
            existingPaciente.setSecondLastName(pacienteDetails.getSecondLastName());
            existingPaciente.setPhoneNumber(pacienteDetails.getPhoneNumber());
            existingPaciente.setMail(pacienteDetails.getMail());
            existingPaciente.setStatus(pacienteDetails.getStatus());
            return pacienteIRepository.save(existingPaciente);
        } else {
            return null; // O puedes lanzar una excepción indicando que el médico no fue encontrado
        }
    }

	@Override
	public List<Paciente> filterPatient(String filter) {
		return pacienteIRepository.filterPatient(filter);
	}
}
