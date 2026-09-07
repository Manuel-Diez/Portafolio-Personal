package com.mostrador.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mostrador.IRepository.IVentasRepository;
import com.mostrador.IService.IVentasService;
import com.mostrador.entity.Ventas;
import com.mostrador.utils.GlobalConstants;

@Service
public class VentasService implements IVentasService{

	@Autowired
	private IVentasRepository repository;

	@Override
	public List<Ventas> all() throws Exception {
		return repository.findAll();
	}

	@Override
	public Ventas save(Ventas cliente) throws Exception {
		return repository.save(cliente);
	}

	@Override
	public Optional<Ventas> findById(Long id) throws Exception {
		return repository.findById(id);
	}

	@Override
	public void delete(Long id) throws Exception {
		repository.deleteById(id);

	}

	@Override
	public void update(Long id, Ventas cliente) throws Exception {

		Optional<Ventas> optionalCliente = this.repository.findById(id);

        if (optionalCliente.isEmpty()) {
            throw new Exception("No se encontró registro");
        }

        Ventas clienteToUpdate = optionalCliente.get();
        BeanUtils.copyProperties(cliente, clienteToUpdate, GlobalConstants.EXCLUDED_FIELDS.toArray(new String[0]));

        this.repository.save(clienteToUpdate);
	}

}
