package com.clinicasanrafael.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.clinicasanrafael.Entity.Paciente;
import com.clinicasanrafael.IRepository.PacienteIRepository;
import com.clinicasanrafael.IService.PacientesIService;

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
            return null;
        }
    }

	@Override
	public List<Paciente> filterPatient(String filter) {
		return pacienteIRepository.filterPatient(filter);
	}
}
