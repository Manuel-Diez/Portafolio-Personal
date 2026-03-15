package com.prueba.prueba.entity;

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
@Table(name = "ventas")
public class Ventas {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "cliente_id_cliente", nullable = false)
	private Clientes clienteIdCliente;

	@Column(name = "total", nullable = false, unique = false, length = 45)
	private String total;

	@Column(name = "estado", nullable = false)
	private Boolean estado;

	@Column(name = "fecha_venta", nullable = false)
	private Date fechaVenta;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Clientes getClienteIdCliente() {
		return clienteIdCliente;
	}

	public void setClienteIdCliente(Clientes clienteIdCliente) {
		this.clienteIdCliente = clienteIdCliente;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}

	public Date getFechaVenta() {
		return fechaVenta;
	}

	public void setFechaVenta(Date fechaVenta) {
		this.fechaVenta = fechaVenta;
	}
	
	

}
