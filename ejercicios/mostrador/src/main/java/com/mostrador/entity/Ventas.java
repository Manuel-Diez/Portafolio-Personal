package com.mostrador.entity;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

	@Column(name = "total", nullable = false)
	private Double total = 0.0;

	@Column(name = "estado", nullable = false)
	private Boolean estado;

	@Column(name = "fecha_venta", nullable = false)
	private Date fechaVenta;

	@OneToMany(mappedBy = "venta")
	private List<DescripcionVentas> descripcionVentas;

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

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
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

	public List<DescripcionVentas> getDescripcionVentas() {
		return descripcionVentas;
	}

	public void setDescripcionVentas(List<DescripcionVentas> descripcionVentas) {
		this.descripcionVentas = descripcionVentas;
	}

}
