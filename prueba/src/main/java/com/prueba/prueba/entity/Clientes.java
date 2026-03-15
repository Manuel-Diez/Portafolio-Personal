package com.prueba.prueba.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "clientes")
public class Clientes {

	public enum tipoDocumento{CC, TI, CE, PP, DNI}
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tipo_documento", nullable = false, length = 5)
    private tipoDocumento tipoDocumento;
    
    @Column(name = "documento", nullable = false, unique = true, length = 10)
    private String documento;
    
    @Column(name = "nombres_cliente", nullable = false, length = 45)
    private String nombresCliente;
    
    @Column(name = "apellidos_cliente", nullable = false, length = 45)
    private String apellidosCliente; 
    
    @Column(name = "telefono", nullable = false, length = 13)
    private String telefono;
    
    @Column(name = "direccion", nullable = false, length = 45)
    private String direccion;
    
    @Column(name = "ciudad", nullable = false, length = 45)
    private String ciudad;

    @Column(name = "estado", nullable = false)
    private Boolean estado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public tipoDocumento getTipoDocumento() {
		return tipoDocumento;
	}

	public void setTipoDocumento(tipoDocumento tipoDocumento) {
		this.tipoDocumento = tipoDocumento;
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getNombresCliente() {
		return nombresCliente;
	}

	public void setNombresCliente(String nombresCliente) {
		this.nombresCliente = nombresCliente;
	}

	public String getApellidosCliente() {
		return apellidosCliente;
	}

	public void setApellidosCliente(String apellidosCliente) {
		this.apellidosCliente = apellidosCliente;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public Boolean getEstado() {
		return estado;
	}

	public void setEstado(Boolean estado) {
		this.estado = estado;
	}
    
    
	
}
