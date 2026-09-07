package com.estante.IRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.estante.DTO.ILoginDto;
import com.estante.Entity.User;

@Repository
public interface IUserRespository extends IObjectTRepository<User>{

	@Query(value = "select type_user, id, address, name from user where id = :id;", nativeQuery =  true)

	Optional<ILoginDto> loginDto(Long id);

	Optional<User> findByEmail(String email);
}
