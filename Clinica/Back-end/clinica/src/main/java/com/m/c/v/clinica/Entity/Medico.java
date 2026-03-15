package com.m.c.v.clinica.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "medicos")
public class Medico {

	@Id
	@GeneratedValue (strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@Column (name = "document_type", nullable = false, length = 5)
	private String documentType;
	
	@Column (name = "document", nullable = false, unique = true, length = 12)
	private String document;
	
	@Column (name = "first_name", nullable = false, length = 20)
	private String firstName;
	
	@Column (name = "second_name", length = 20)
	private String secondName;
	
	@Column (name = "first_last_name", nullable = false, length = 20)
	private String firstLastName;
	
	@Column (name = "second_last_name", nullable = false, length = 20)	
	private String secondLastName;
	
	@Column (name = "phone_number", nullable = false, length = 10)
	private String phoneNumber;
	
	@Column (name = "mail", nullable = false, length = 45)
	private String mail;

	@Column (name = "status", nullable = false)
	private Boolean status;

	public Long getId() {
		return Id;
	}

	public void setId(Long id) {
		Id = id;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public String getDocument() {
		return document;
	}

	public void setDocument(String document) {
		this.document = document;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getSecondName() {
		return secondName;
	}

	public void setSecondName(String secondName) {
		this.secondName = secondName;
	}

	public String getFirstLastName() {
		return firstLastName;
	}

	public void setFirstLastName(String firstLastName) {
		this.firstLastName = firstLastName;
	}

	public String getSecondLastName() {
		return secondLastName;
	}

	public void setSecondLastName(String secondLastName) {
		this.secondLastName = secondLastName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	
	
}
