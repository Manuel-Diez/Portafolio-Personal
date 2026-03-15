package com.Biblioteca.Andorid.IRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.Biblioteca.Andorid.DTO.ILoginDto;
import com.Biblioteca.Andorid.Entity.User;

@Repository
public interface IUserRespository extends IObjectTRepository<User>{

	@Query(value = "select type_user, id, address, name from user where id = :id;", nativeQuery =  true)
	
	Optional<ILoginDto> loginDto(Long id);
}
