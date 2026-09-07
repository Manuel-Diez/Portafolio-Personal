package com.talonario.IRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.talonario.Entity.Bill;

@Repository
public interface IBillRepository extends IObjectTRepository<Bill>{

	@Query("SELECT MAX(b.invoiceNumber) FROM Bill b")
	Long findMaxInvoiceNumber();
}
