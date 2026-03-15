package com.Biblioteca.Andorid.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "book")
public class Book {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "qualification", nullable  = false, length = 30)
	private String qualification;
	
	@Column(name = "author", nullable = false, length = 50)
	private String author;
	
	@Column(name = "gender", nullable = false, length = 15)
	private String gender;
	
	@Column(name = "stock", nullable = false, length = 5)
	private String stock;
	
	@Column(name = "borrowed_books", nullable = false, length = 5)
	private String borrowedBooks;
	
	@Column(name = "status", nullable = false)
	private Boolean status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getStock() {
		return stock;
	}

	public void setStock(String stock) {
		this.stock = stock;
	}

	public String getBorrowedBooks() {
		return borrowedBooks;
	}

	public void setBorrowedBooks(String borrowedBooks) {
		this.borrowedBooks = borrowedBooks;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	} 
	
	

}
