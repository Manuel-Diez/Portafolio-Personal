package com.prueba.prueba.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prueba.prueba.IRepository.IDescripcionVentasRepository;
import com.prueba.prueba.IService.IDescripcionVentasService;
import com.prueba.prueba.entity.DescripcionVentas;
import com.prueba.prueba.utils.GlobalConstants;

@Service
public class DescripcionVentasService implements IDescripcionVentasService{
	
	@Autowired
	private IDescripcionVentasRepository repository;
	
	@Override
	public List<DescripcionVentas> all() throws Exception {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public DescripcionVentas save(DescripcionVentas cliente) throws Exception {
		// TODO Auto-generated method stub
		return repository.save(cliente);
	}

	@Override
	public Optional<DescripcionVentas> findById(Long id) throws Exception {
		// TODO Auto-generated method stub
		return repository.findById(id);
	}

	@Override
	public void delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		repository.deleteById(id);
		
	}

	@Override
	public void update(Long id, DescripcionVentas cliente) throws Exception {
		
		Optional<DescripcionVentas> optionalCliente = this.repository.findById(id);

        if (optionalCliente.isEmpty()) {
            throw new Exception("No se encontró registro");
        }

        DescripcionVentas clienteToUpdate = optionalCliente.get();
        BeanUtils.copyProperties(cliente, clienteToUpdate, GlobalConstants.EXCLUDED_FIELDS.toArray(new String[0]));

        this.repository.save(clienteToUpdate);
	}

}
