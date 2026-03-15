package com.prueba.prueba.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prueba.prueba.IRepository.IVentasRepository;
import com.prueba.prueba.IService.IVentasService;
import com.prueba.prueba.entity.Ventas;
import com.prueba.prueba.utils.GlobalConstants;

@Service
public class VentasService implements IVentasService{
	
	@Autowired
	private IVentasRepository repository;
	
	@Override
	public List<Ventas> all() throws Exception {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Ventas save(Ventas cliente) throws Exception {
		// TODO Auto-generated method stub
		return repository.save(cliente);
	}

	@Override
	public Optional<Ventas> findById(Long id) throws Exception {
		// TODO Auto-generated method stub
		return repository.findById(id);
	}

	@Override
	public void delete(Long id) throws Exception {
		// TODO Auto-generated method stub
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
