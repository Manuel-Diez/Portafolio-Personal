package com.estante.IService;

import java.util.Optional;

import com.estante.DTO.ILoginDto;
import com.estante.Entity.User;

public interface IUserService extends IObjectTService<User>{

	Optional<ILoginDto> loginDto(Long id);

	Optional<User> login(String email, String password);
}
