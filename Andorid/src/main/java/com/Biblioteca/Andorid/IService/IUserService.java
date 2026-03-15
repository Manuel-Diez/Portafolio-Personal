package com.Biblioteca.Andorid.IService;

import java.util.Optional;

import com.Biblioteca.Andorid.DTO.ILoginDto;
import com.Biblioteca.Andorid.Entity.User;

public interface IUserService extends IObjectTService<User>{

	
	Optional<ILoginDto> loginDto(Long id);
}
