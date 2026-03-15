package com.prueba.prueba.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prueba.prueba.IRepository.IProductosRepository;
import com.prueba.prueba.IService.IProductosService;
import com.prueba.prueba.entity.Productos;
import com.prueba.prueba.utils.GlobalConstants;

@Service
public class ProductoService implements IProductosService{

	@Autowired
	private IProductosRepository repository;
	
	
	@Override
	public List<Productos> all() throws Exception {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Productos save(Productos cliente) throws Exception {
		// TODO Auto-generated method stub
		return repository.save(cliente);
	}

	@Override
	public Optional<Productos> findById(Long id) throws Exception {
		// TODO Auto-generated method stub
		return repository.findById(id);
	}

	@Override
	public void delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		repository.deleteById(id);
		
	}

	@Override
	public void update(Long id, Productos cliente) throws Exception {
		
		Optional<Productos> optionalCliente = this.repository.findById(id);

        if (optionalCliente.isEmpty()) {
            throw new Exception("No se encontró registro");
        }

        Productos clienteToUpdate = optionalCliente.get();
        BeanUtils.copyProperties(cliente, clienteToUpdate, GlobalConstants.EXCLUDED_FIELDS.toArray(new String[0]));

        this.repository.save(clienteToUpdate);
	}

	@Override
	public List<Productos> filtros(String nombreProducto, Boolean estado) {
		// TODO Auto-generated method stub
		return repository.filtros(nombreProducto, estado);
	}

	@Override
	public Long contarProductos() {
		// TODO Auto-generated method stub
		return repository.contarProductos();
	}

	@Override
	public List<Productos> productosMenorStock() {
		// TODO Auto-generated method stub
		return repository.productosMenorStock();
	}
}
