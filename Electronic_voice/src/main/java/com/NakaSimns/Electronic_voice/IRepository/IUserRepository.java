package com.NakaSimns.Electronic_voice.IRepository;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.NakaSimns.Electronic_voice.Entity.User;

@Repository
public interface IUserRepository  extends IObjectTRepository<User>{

	/*@Query(value = "select type_user, id, address, name from user whre id = :id;", nativeQuery = true)
	
	Optional<IElectronicVoiceDto> electronicVoiceDto(Long id);*/
}
