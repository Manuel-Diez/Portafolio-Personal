package com.NakaSimns.Electronic_voice.IRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface IObjectTRepository<T> extends JpaRepository<T, Long>{

}
