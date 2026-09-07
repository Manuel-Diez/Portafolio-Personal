package com.talonario.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talonario.Config.JwtService;
import com.talonario.Dto.AuthResponseDto;
import com.talonario.Dto.LoginRequestDto;
import com.talonario.Entity.User;
import com.talonario.IRepository.IUserRepository;

@CrossOrigin
@RestController
@RequestMapping("/Auth")
public class AuthController {

	private final IUserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	public AuthController(IUserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDto login) {
		if (login.getUsername() == null || login.getPassword() == null) {
			return ResponseEntity.badRequest().body("Usuario y contraseña son obligatorios.");
		}

		User user = userRepository.findByUsername(login.getUsername()).orElse(null);
		if (user == null || !passwordEncoder.matches(login.getPassword(), user.getPassword())) {
			return ResponseEntity.status(401).body("Usuario o contraseña invalidos.");
		}

		String token = jwtService.generateToken(user.getUsername(), user.getRol());
		return ResponseEntity.ok(new AuthResponseDto(token, user.getUsername(), user.getRol()));
	}
}
