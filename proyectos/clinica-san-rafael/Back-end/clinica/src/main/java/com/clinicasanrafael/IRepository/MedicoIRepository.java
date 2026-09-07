package com.clinicasanrafael.IRepository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.clinicasanrafael.Entity.Medico;

@Repository
public interface MedicoIRepository extends JpaRepository<Medico, Long> {

	@Query("SELECT M FROM Medico M WHERE M.firstName LIKE %?1% OR M.secondName "
			+ "LIKE %?1% OR M.firstLastName LIKE %?1% OR M.secondLastName "
			+ "LIKE %?1% OR M.document LIKE %?1%")

	List<Medico> filterDoctors(String filter);

}
