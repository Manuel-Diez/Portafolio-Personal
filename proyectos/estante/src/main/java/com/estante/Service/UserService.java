package com.estante.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.estante.DTO.ILoginDto;
import com.estante.Entity.User;
import com.estante.IRepository.IUserRespository;
import com.estante.IService.IUserService;

@Service
public class UserService extends ObjectTServices<User> implements IUserService{

	@Autowired
	private IUserRespository repository;

	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	@Override
	public Optional<ILoginDto> loginDto(Long id) {
		return repository.loginDto(id);
	}

	@Override
	public Optional<User> login(String email, String password) {
		Optional<User> user = repository.findByEmail(email);
		if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
			return user;
		}
		return Optional.empty();
	}

	@Override
	public User save(User user) throws Exception {
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return super.save(user);
	}

	@Override
	public User update(User user, Long id) throws Exception {
		if (user.getPassword() != null && !user.getPassword().isBlank()) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
		} else {

			repository.findById(id).ifPresent(existing -> user.setPassword(existing.getPassword()));
		}
		return super.update(user, id);
	}

}
