package com.mostrador.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mostrador.IRepository.IDescripcionVentasRepository;
import com.mostrador.IRepository.IVentasRepository;
import com.mostrador.IService.IDescripcionVentasService;
import com.mostrador.entity.DescripcionVentas;
import com.mostrador.entity.Ventas;
import com.mostrador.utils.GlobalConstants;

@Service
public class DescripcionVentasService implements IDescripcionVentasService{

	@Autowired
	private IDescripcionVentasRepository repository;

	@Autowired
	private IVentasRepository ventasRepository;

	@Override
	public List<DescripcionVentas> all() throws Exception {
		return repository.findAll();
	}

	@Override
	public DescripcionVentas save(DescripcionVentas descripcionVentas) throws Exception {
		calcularSubTotal(descripcionVentas);
		DescripcionVentas guardado = repository.save(descripcionVentas);
		recalcularTotalVenta(guardado.getVenta().getId());
		return guardado;
	}

	@Override
	public Optional<DescripcionVentas> findById(Long id) throws Exception {
		return repository.findById(id);
	}

	@Override
	public void delete(Long id) throws Exception {
		Optional<DescripcionVentas> item = repository.findById(id);
		repository.deleteById(id);
		if (item.isPresent()) {
			recalcularTotalVenta(item.get().getVenta().getId());
		}
	}

	@Override
	public void update(Long id, DescripcionVentas descripcionVentas) throws Exception {

		Optional<DescripcionVentas> optionalDescripcionVentas = this.repository.findById(id);

        if (optionalDescripcionVentas.isEmpty()) {
            throw new Exception("No se encontró registro");
        }

        DescripcionVentas paraActualizar = optionalDescripcionVentas.get();
        BeanUtils.copyProperties(descripcionVentas, paraActualizar, GlobalConstants.EXCLUDED_FIELDS.toArray(new String[0]));

        calcularSubTotal(paraActualizar);
        this.repository.save(paraActualizar);
        recalcularTotalVenta(paraActualizar.getVenta().getId());
	}

	private void calcularSubTotal(DescripcionVentas item) {
		float precio = item.getPrecio() == null ? 0f : item.getPrecio();
		float descuento = item.getDescuento() == null ? 0f : item.getDescuento();
		int cantidad = item.getCantidad() == null ? 0 : item.getCantidad();

		float precioConDescuento = Math.max(precio - descuento, 0f);
		item.setSubTotal(precioConDescuento * cantidad);
	}

	private void recalcularTotalVenta(Long ventaId) throws Exception {
		Ventas venta = ventasRepository.findById(ventaId)
				.orElseThrow(() -> new Exception("No se encontró la venta " + ventaId));

		double total = repository.findByVenta_Id(ventaId).stream()
				.mapToDouble(linea -> linea.getSubTotal() == null ? 0d : linea.getSubTotal())
				.sum();

		venta.setTotal(total);
		ventasRepository.save(venta);
	}

}
