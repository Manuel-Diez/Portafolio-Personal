package com.Biblioteca.Andorid.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "penalty")
public class Penalty {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id", nullable = false)
	private User user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "loan_id", nullable = false)
	private Loan loan;
	
	@Column(name = "fine_value", nullable = false, length = 20)
	private Double finevalue;
	
	@Column(name = "fine_date", nullable = false, length = 20)
	private LocalDate fineValue;
	
	@Column(name = "status", nullable = false, length = 25)
	private Boolean status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Loan getLoan() {
		return loan;
	}

	public void setLoan(Loan loan) {
		this.loan = loan;
	}

	public Double getFinevalue() {
		return finevalue;
	}

	public void setFinevalue(Double finevalue) {
		this.finevalue = finevalue;
	}

	public LocalDate getFineValue() {
		return fineValue;
	}

	public void setFineValue(LocalDate fineValue) {
		this.fineValue = fineValue;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}
	
	

}
