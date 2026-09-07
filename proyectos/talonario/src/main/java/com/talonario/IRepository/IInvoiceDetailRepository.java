package com.talonario.IRepository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.talonario.Entity.InvoiceDetail;

@Repository
public interface IInvoiceDetailRepository extends IObjectTRepository<InvoiceDetail>{

	List<InvoiceDetail> findByBillId(Long billId);
}
