package com.hsleiden.Webapi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

// TODO fix the errors + add UserController and UserService and JWT authentication
@Entity
@Data
@Builder
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    private String id;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    public static class UserBuilder {
        private String email;
        private String password;
        private Role role;
    }

    public User() {
        this.id = generateUUID();
    }

    public User(String email, String password, Role role) {
        this.id = generateUUID();
        this.email = email;
        this.password = password;
        this.role = role;
    }

    private String generateUUID() {
        return UUID.randomUUID().toString();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
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
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


//    public boolean isAdmin() {
//        return isAdmin;
//    }
//
//    public void setAdmin(boolean isAdmin) {
//        this.isAdmin = isAdmin;
//    }

    // Add getters and setters for other user-related fields
}
