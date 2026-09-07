package com.talonario.IRepository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import com.talonario.Entity.User;

@Repository
public interface IUserRepository  extends IObjectTRepository<User>{

	Optional<User> findByUsername(String username);
}
