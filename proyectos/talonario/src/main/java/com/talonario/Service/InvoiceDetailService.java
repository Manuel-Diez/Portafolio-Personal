package com.talonario.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.talonario.Entity.Bill;
import com.talonario.Entity.InvoiceDetail;
import com.talonario.Entity.Product;
import com.talonario.IRepository.IBillRepository;
import com.talonario.IRepository.IInvoiceDetailRepository;
import com.talonario.IRepository.IProductRepository;
import com.talonario.Utils.GlobalConstants;

@Service
public class InvoiceDetailService extends ObjectTService<InvoiceDetail> {

	@Autowired
	private IInvoiceDetailRepository invoiceDetailRepository;

	@Autowired
	private IProductRepository productRepository;

	@Autowired
	private IBillRepository billRepository;

	@Override
	public InvoiceDetail save(InvoiceDetail entidad) throws Exception {
		Product product = productRepository.findById(entidad.getProduct().getId())
				.orElseThrow(() -> new Exception("El producto indicado no existe."));

		aplicarStock(product, entidad.getAmount());
		calcularMontos(entidad, product);

		InvoiceDetail saved = super.save(entidad);
		recalcularTotalFactura(saved.getBill().getId());
		return saved;
	}

	@Override
	public InvoiceDetail update(InvoiceDetail entidad, Long id) throws Exception {
		InvoiceDetail existing = invoiceDetailRepository.findById(id)
				.orElseThrow(() -> new Exception("No se encontró registro"));

		Product product = productRepository.findById(entidad.getProduct().getId())
				.orElseThrow(() -> new Exception("El producto indicado no existe."));

		restaurarStock(existing.getProduct(), existing.getAmount());
		aplicarStock(product, entidad.getAmount());
		calcularMontos(entidad, product);

		InvoiceDetail updated = super.update(entidad, id);
		recalcularTotalFactura(updated.getBill().getId());
		return updated;
	}

	@Override
	public void delete(Long id) throws Exception {
		InvoiceDetail existing = invoiceDetailRepository.findById(id)
				.orElseThrow(() -> new Exception("No se encontró registro"));
		Long billId = existing.getBill().getId();

		restaurarStock(existing.getProduct(), existing.getAmount());
		super.delete(id);
		recalcularTotalFactura(billId);
	}

	private void aplicarStock(Product product, Integer amount) throws Exception {
		if (amount == null || amount <= 0) {
			throw new Exception("La cantidad debe ser mayor a cero.");
		}
		if (product.getStock() < amount) {
			throw new Exception("No hay stock suficiente de \"" + product.getName() + "\" (disponible: "
					+ product.getStock() + ").");
		}
		product.setStock(product.getStock() - amount);
		productRepository.save(product);
	}

	private void restaurarStock(Product product, Integer amount) {
		Optional<Product> current = productRepository.findById(product.getId());
		current.ifPresent(p -> {
			p.setStock(p.getStock() + amount);
			productRepository.save(p);
		});
	}

	private void calcularMontos(InvoiceDetail entidad, Product product) {
		double unitPrice = product.getPrice();
		double subtotal = unitPrice * entidad.getAmount();
		double iva = subtotal * GlobalConstants.IVA_RATE;

		entidad.setUnitPrice(unitPrice);
		entidad.setSubtotal(subtotal);
		entidad.setIva(iva);
		entidad.setTotal(subtotal + iva);
		if (entidad.getStatus() == null) {
			entidad.setStatus(true);
		}
	}

	private void recalcularTotalFactura(Long billId) throws Exception {
		List<InvoiceDetail> details = invoiceDetailRepository.findByBillId(billId);
		double total = details.stream().mapToDouble(InvoiceDetail::getTotal).sum();

		Bill bill = billRepository.findById(billId)
				.orElseThrow(() -> new Exception("No se encontró la factura."));
		bill.setTotal(total);
		billRepository.save(bill);
	}
}
