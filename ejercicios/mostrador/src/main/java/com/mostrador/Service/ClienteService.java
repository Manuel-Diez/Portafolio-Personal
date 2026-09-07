package com.mostrador.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mostrador.IRepository.IClientesRepository;
import com.mostrador.IService.IClientesService;
import com.mostrador.entity.Clientes;
import com.mostrador.utils.GlobalConstants;

@Service
public class ClienteService implements IClientesService{

	@Autowired
	private IClientesRepository repository;

	@Override
	public List<Clientes> all() throws Exception {
		return repository.findAll();
	}

	@Override
	public Clientes save(Clientes cliente) throws Exception {
		return repository.save(cliente);
	}

	@Override
	public Optional<Clientes> findById(Long id) throws Exception {
		return repository.findById(id);
	}

	@Override
	public void delete(Long id) throws Exception {
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
		return repository.filtros(nombresCliente, ciudad, estado);
	}

	@Override
	public Long contarUsuarios() {
		return repository.contarUsuarios();
	}

}
