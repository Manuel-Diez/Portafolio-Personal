package com.prueba.prueba.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prueba.prueba.IRepository.IClientesRepository;
import com.prueba.prueba.IService.IClientesService;
import com.prueba.prueba.entity.Clientes;
import com.prueba.prueba.utils.GlobalConstants;

@Service
public class ClienteService implements IClientesService{

	@Autowired
	private IClientesRepository repository;

	@Override
	public List<Clientes> all() throws Exception {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	@Override
	public Clientes save(Clientes cliente) throws Exception {
		// TODO Auto-generated method stub
		return repository.save(cliente);
	}

	@Override
	public Optional<Clientes> findById(Long id) throws Exception {
		// TODO Auto-generated method stub
		return repository.findById(id);
	}

	@Override
	public void delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		repository.deleteById(id);
		
	}

	@Override
	public void update(Long id, Clientes cliente) throws Exception {
		
		Optional<Clientes> optionalCliente = this.repository.findById(id);

        if (optionalCliente.isEmpty()) {
            throw new Exception("No se encontró registro");
        }

        Clientes clienteToUpdate = optionalCliente.get();
        BeanUtils.copyProperties(cliente, clienteToUpdate, GlobalConstants.EXCLUDED_FIELDS.toArray(new String[0]));

        this.repository.save(clienteToUpdate);
	}

	@Override
	public List<Clientes> filtros(String nombresCliente, String ciudad, Boolean estado) {
		// TODO Auto-generated method stub
		return repository.filtros(nombresCliente, ciudad, estado);
	}

	@Override
	public Long contarUsuarios() {
		// TODO Auto-generated method stub
		return repository.contarUsuarios();
	}
	
	
	
}
