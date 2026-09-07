package com.posada.model;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User implements UserDetails {

  @Id
  @GeneratedValue
  private UUID id;

  @Column(name = "full_name", nullable = false)
  private String fullName;

  @Column(name = "document_number", nullable = false, unique = true)
  private String documentNumber;

  @Column(name = "document_type", nullable = false)
  private String documentType;

  @Column(name = "password", nullable = false)
  private String password;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "phone", nullable = false)
  private String phone;

  public User() {
  }

  public User(UUID id, String fullName, String documentNumber, String documentType,
      String password, String email, String phone) {
    this.id = id;
    this.fullName = fullName;
    this.documentNumber = documentNumber;
    this.documentType = documentType;
    this.password = password;
    this.email = email;
    this.phone = phone;
  }

  public static Builder builder() {
    return new Builder();
  }

  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getFullName() {
    return fullName;
  }

  public void setFullName(String fullName) {
    this.fullName = fullName;
  }

  public String getDocumentNumber() {
    return documentNumber;
  }

  public void setDocumentNumber(String documentNumber) {
    this.documentNumber = documentNumber;
  }

  public String getDocumentType() {
    return documentType;
  }

  public void setDocumentType(String documentType) {
    this.documentType = documentType;
  }

  @Override
  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.emptyList();
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public String toString() {
    return "User{id=" + id + ", fullName='" + fullName + "', email='" + email + "'}";
  }

  public static class Builder {
    private UUID id;
    private String fullName;
    private String documentNumber;
    private String documentType;
    private String password;
    private String email;
    private String phone;

    public Builder id(UUID id) {
      this.id = id;
      return this;
    }

    public Builder fullName(String fullName) {
      this.fullName = fullName;
      return this;
    }

    public Builder documentNumber(String documentNumber) {
      this.documentNumber = documentNumber;
      return this;
    }

    public Builder documentType(String documentType) {
      this.documentType = documentType;
      return this;
    }

    public Builder password(String password) {
      this.password = password;
      return this;
    }

    public Builder email(String email) {
      this.email = email;
      return this;
    }

    public Builder phone(String phone) {
      this.phone = phone;
      return this;
    }

    public User build() {
      return new User(id, fullName, documentNumber, documentType, password, email, phone);
    }
  }
}
