package com.clinicasanrafael.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.clinicasanrafael.Entity.Paciente;

@Repository
public interface PacienteIRepository extends JpaRepository<Paciente, Long> {

	@Query("SELECT P FROM Paciente P WHERE P.firstName LIKE %?1% OR P.secondName "
			+ "LIKE %?1% OR P.firstLastName LIKE %?1% OR P.secondLastName "
			+ "LIKE %?1% OR P.document LIKE %?1%")

	List<Paciente> filterPatient(String filter);

}
