package com.Biblioteca.Andorid.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Biblioteca.Andorid.DTO.ILoginDto;
import com.Biblioteca.Andorid.Entity.User;
import com.Biblioteca.Andorid.IRepository.IUserRespository;
import com.Biblioteca.Andorid.IService.IUserService;

@Service
public class UserService extends ObjectTServices<User> implements IUserService{

	@Autowired
	private IUserRespository repository;
	
	@Override
	public Optional<ILoginDto> loginDto(Long id) {
		return repository.loginDto(id);
	}

	
	
}
