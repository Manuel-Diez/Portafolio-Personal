package com.Biblioteca.Andorid.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Biblioteca.Andorid.DTO.ILoginDto;
import com.Biblioteca.Andorid.Entity.User;
import com.Biblioteca.Andorid.Service.UserService;

@RestController
@RequestMapping("/User")
public class UserController extends ObjectTController<User>{

	@Autowired
	private UserService service;
	
	@GetMapping("/UserDto/{id}")
	Optional<ILoginDto> loginDto(@RequestParam Long id){
		return service.loginDto(id);
	};
}
