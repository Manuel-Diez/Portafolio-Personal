package com.posada.service.interfaces;

import com.posada.model.User;
import com.posada.model.request.AuthResponse;
import com.posada.model.request.LoginRequest;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IUserService {

  Optional<User> findUserById(UUID id);
  List<User> findAllUsers();

  AuthResponse login(LoginRequest request);
  User register(User request);

}
