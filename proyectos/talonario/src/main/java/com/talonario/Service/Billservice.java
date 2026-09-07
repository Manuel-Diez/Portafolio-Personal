package com.talonario.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talonario.Entity.Bill;
import com.talonario.IRepository.IBillRepository;

@Service
public class Billservice extends ObjectTService<Bill> {

	@Autowired
	private IBillRepository billRepository;

	@Override
	public Bill save(Bill entidad) throws Exception {
		Long max = billRepository.findMaxInvoiceNumber();
		entidad.setInvoiceNumber(max == null ? 1L : max + 1);
		if (entidad.getTotal() == null) {
			entidad.setTotal(0.0);
		}
		if (entidad.getStatus() == null) {
			entidad.setStatus(true);
		}
		return super.save(entidad);
	}
}
