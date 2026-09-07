package com.mostrador.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "descripcion_ventas")
public class DescripcionVentas {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "venta_id_ventas", nullable = false)
	@JsonIgnoreProperties({ "descripcionVentas" })
	private Ventas venta;

	@ManyToOne
	@JoinColumn(name = "producto_id_producto", nullable = false)
	private Productos productoIdProducto;

	@Column(name = "cantidad", nullable = false)
	private Integer cantidad;

	@Column(name = "precio", nullable = false, length = 9)
	private Float precio;

	@Column(name = "descuento", nullable = false, length = 9)
	private Float descuento;

	@Column(name = "sub_total", nullable = false, length = 9)
	private Float subTotal;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Ventas getVenta() {
		return venta;
	}

	public void setVenta(Ventas venta) {
		this.venta = venta;
	}

	public Productos getProductoIdProducto() {
		return productoIdProducto;
	}

	public void setProductoIdProducto(Productos productoIdProducto) {
		this.productoIdProducto = productoIdProducto;
	}

	public Integer getCantidad() {
		return cantidad;
	}

	public void setCantidad(Integer cantidad) {
		this.cantidad = cantidad;
	}

	public Float getPrecio() {
		return precio;
	}

	public void setPrecio(Float precio) {
		this.precio = precio;
	}

	public Float getDescuento() {
		return descuento;
	}

	public void setDescuento(Float descuento) {
		this.descuento = descuento;
	}

	public Float getSubTotal() {
		return subTotal;
	}

	public void setSubTotal(Float subTotal) {
		this.subTotal = subTotal;
	}

}
