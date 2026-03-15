package com.NakaSimns.Electronic_voice.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NakaSimns.Electronic_voice.IRepository.IObjectTRepository;
import com.NakaSimns.Electronic_voice.IService.IObjectTService;
import com.NakaSimns.Electronic_voice.Utils.GlobalConstants;

@Service
public abstract class ObjectTService<T> implements IObjectTService<T>{

	@Autowired
	private IObjectTRepository<T> repository;
	
	
	@Override
	public List<T> all() throws Exception {
		return repository.findAll();	}

	@Override
	public Optional<T> findById(Long id) throws Exception {
		return repository.findById(id);
	}

	@Override
	public T save(T entidad) throws Exception {
		return repository.save(entidad);
	}

	@Override
	public T update(T entidad, Long id) throws Exception {
		Optional<T> optionalT = this.repository.findById(id);

		if (optionalT.isEmpty()) {
			throw new Exception("No se encontró registro");
		}
		T TobjetoToUpdate = optionalT.get();
		BeanUtils.copyProperties(entidad, TobjetoToUpdate,
				GlobalConstants.EXCLUDED_FIELDS.toArray(new String[0]));

		return this.repository.save(TobjetoToUpdate);
		
	}

	@Override
	public void delete(Long id) throws Exception {
		repository.deleteById(id);
		
	}

}
