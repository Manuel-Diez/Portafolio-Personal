package com.talonario.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.talonario.Entity.User;
import com.talonario.IRepository.IUserRepository;

@Service
public class UserService extends ObjectTService<User> {

	@Autowired
	private IUserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User save(User entidad) throws Exception {
		entidad.setPassword(passwordEncoder.encode(entidad.getPassword()));
		return super.save(entidad);
	}

	@Override
	public User update(User entidad, Long id) throws Exception {
		Optional<User> existing = userRepository.findById(id);
		if (existing.isEmpty()) {
			throw new Exception("No se encontró registro");
		}

		if (entidad.getPassword() == null || entidad.getPassword().isBlank()) {
			entidad.setPassword(existing.get().getPassword());
		} else {
			entidad.setPassword(passwordEncoder.encode(entidad.getPassword()));
		}

		return super.update(entidad, id);
	}
}
