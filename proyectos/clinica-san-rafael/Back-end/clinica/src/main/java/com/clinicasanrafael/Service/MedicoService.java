package com.clinicasanrafael.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinicasanrafael.Entity.Medico;
import com.clinicasanrafael.IRepository.MedicoIRepository;
import com.clinicasanrafael.IService.MedicoIService;

@Service
public class MedicoService implements MedicoIService{

	@Autowired
    private MedicoIRepository medicoIRepository;

    public List<Medico> getAllMedicos() {
        return medicoIRepository.findAll();
    }

    public Optional<Medico> getMedicoById(Long id) {
        return medicoIRepository.findById(id);
    }

    public Medico saveMedico(Medico medico) {
        return medicoIRepository.save(medico);
    }

    public void deleteMedico(Long id) {
        medicoIRepository.deleteById(id);
    }

    @Override
    public Medico updateMedico(Long id, Medico medicoDetails) {
        Optional<Medico> optionalMedico = medicoIRepository.findById(id);
        if (optionalMedico.isPresent()) {
            Medico existingMedico = optionalMedico.get();
            existingMedico.setDocumentType(medicoDetails.getDocumentType());
            existingMedico.setDocument(medicoDetails.getDocument());
            existingMedico.setFirstName(medicoDetails.getFirstName());
            existingMedico.setSecondName(medicoDetails.getSecondName());
            existingMedico.setFirstLastName(medicoDetails.getFirstLastName());
            existingMedico.setSecondLastName(medicoDetails.getSecondLastName());
            existingMedico.setPhoneNumber(medicoDetails.getPhoneNumber());
            existingMedico.setMail(medicoDetails.getMail());
            existingMedico.setStatus(medicoDetails.getStatus());
            return medicoIRepository.save(existingMedico);
        } else {
            return null;
        }
    }

    public List<Medico> filterDoctors(String filter) {
		return medicoIRepository.filterDoctors(filter);
	}

}
