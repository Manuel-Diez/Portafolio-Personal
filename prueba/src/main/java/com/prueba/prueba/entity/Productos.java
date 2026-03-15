package com.prueba.prueba.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "productos")
public class Productos {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "nombre_producto", nullable = false, unique = true, length = 45)
	private String nombreProducto;

	@Column(name = "descripcion", nullable = false, unique = true, length = 45)
	private String descripcion;

	@Column(name = "cantidad", nullable = false, unique = true, length = 45)
	private int cantidad;

	@Column(name = "precio", nullable = false, unique = true, length = 9)
	private float precio;

	@Column(name = "porcentaje_iva", nullable = false, unique = true, length = 9)
	private Integer porcentajeIva;

	@Column(name = "porcentaje_descuento", nullable = false, unique = true, length = 9)
	private Integer porcentajeDescuento;

	@Column(name = "estado", nullable = false)
	private Boolean estado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombreProducto() {
		return nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public void setPorcentajeIva(Integer porcentajeIva) {
		this.porcentajeIva = porcentajeIva;
	}

	public void setPorcentajeDescuento(Integer porcentajeDescuento) {
		this.porcentajeDescuento = porcentajeDescuento;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public int getCantidad() {
		return cantidad;
	}

	public void setCantidad(int cantidad) {
		this.cantidad = cantidad;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}

	public int getPorcentajeIva() {
		return porcentajeIva;
	}

	public void setPorcentajeIva(int porcentajeIva) {
		this.porcentajeIva = porcentajeIva;
	}

	public int getPorcentajeDescuento() {
		return porcentajeDescuento;
	}

	public void setPorcentajeDescuento(int porcentajeDescuento) {
		this.porcentajeDescuento = porcentajeDescuento;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}
	
	
}
