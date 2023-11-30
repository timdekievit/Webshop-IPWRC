package com.hsleiden.Webapi.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.boot.autoconfigure.security.SecurityProperties;

import java.util.UUID;

@Entity
public class User extends SecurityProperties.User {

    @Id
    private String id;
    private String email;
    private boolean isAdmin;
    // Add other user-related fields as needed

    public User() {
        this.id = generateUUID();
    }

    public User(String email, boolean isAdmin) {
        this.id = generateUUID();
        this.email = email;
        this.isAdmin = isAdmin;
        // Initialize other user-related fields as needed
    }

    private String generateUUID() {
        return UUID.randomUUID().toString();
    }

    // Getters and setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    // Add getters and setters for other user-related fields
}
