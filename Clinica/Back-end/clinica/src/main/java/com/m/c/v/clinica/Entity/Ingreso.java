package com.m.c.v.clinica.Entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table (name = "ingresos")
public class Ingreso {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room", nullable = false)
    private String room;

    @Column(name = "bed", nullable = false)
    private String bed;

    @Column(name = "admission_date", nullable = false)
    private Date admissionDate;

    @Column(name = "discharge_date", nullable = true) //nullable =true opcional, al crear el ingreso no se debe registrar este dato
    private Date dischargeDate;

    @Column(name = "status", nullable = false)
    private String status;
    
    @ManyToOne
    @JoinColumn(name ="medico_id", nullable = false)
    private Medico medico;
    
    @ManyToOne
    @JoinColumn(name ="paciente_id", nullable = false)
    private Paciente paciente;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRoom() {
		return room;
	}

	public void setRoom(String room) {
		this.room = room;
	}

	public String getBed() {
		return bed;
	}

	public void setBed(String bed) {
		this.bed = bed;
	}

	public Date getAdmissionDate() {
		return admissionDate;
	}

	public void setAdmissionDate(Date admissionDate) {
		this.admissionDate = admissionDate;
	}

	public Date getDischargeDate() {
		return dischargeDate;
	}

	public void setDischargeDate(Date dischargeDate) {
		this.dischargeDate = dischargeDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Medico getMedico() {
		return medico;
	}

	public void setMedico(Medico medico) {
		this.medico = medico;
	}

	public Paciente getPaciente() {
		return paciente;
	}

	public void setPaciente(Paciente paciente) {
		this.paciente = paciente;
	}
    
	
    
}
