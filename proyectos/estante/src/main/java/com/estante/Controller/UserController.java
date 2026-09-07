package com.estante.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.estante.DTO.ILoginDto;
import com.estante.DTO.LoginRequest;
import com.estante.Entity.User;
import com.estante.Service.UserService;

@RestController
@RequestMapping("/User")
public class UserController extends ObjectTController<User> {

	@Autowired
	private UserService service;

	@GetMapping("/summary/{id}")
	public Optional<ILoginDto> getUserSummary(@PathVariable Long id) {
		return service.loginDto(id);
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
		Optional<User> user = service.login(request.getEmail(), request.getPassword());
		if (user.isEmpty()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Correo y/o contraseña incorrectos.");
		}
		User loggedUser = user.get();
		loggedUser.setPassword(null);
		return ResponseEntity.ok(loggedUser);
	}
}
