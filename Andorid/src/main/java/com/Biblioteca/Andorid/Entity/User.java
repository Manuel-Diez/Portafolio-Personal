package com.Biblioteca.Andorid.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user")
public class User {

	public enum typeUser{reader, librarian, administrator}
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "name", nullable = false, length = 50)
	private String name;
	
	@Column(name = "address", nullable = false, length = 50)
	private String address;
	
	@Column(name = "email", nullable = false, length = 50)
	private String email;
	
	@Column(name = "password", nullable = false, length = 20)
	private String password;
	
	@Column(name = "type_user", nullable = false, length = 50)
	private typeUser typeUser;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public typeUser getTypeUser() {
		return typeUser;
	}

	public void setTypeUser(typeUser typeUser) {
		this.typeUser = typeUser;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
}
