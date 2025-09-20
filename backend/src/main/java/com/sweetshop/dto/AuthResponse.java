package com.sweetshop.dto;

public class AuthResponse {
    private String token;
    private String type = "Bearer";
    private String username;
    private String role;
    private boolean isAdmin;
    
    public AuthResponse() {}
    
    public AuthResponse(String token, String username, String role, boolean isAdmin) {
        this.token = token;
        this.username = username;
        this.role = role;
        this.isAdmin = isAdmin;
    }
    
    // Getters and Setters
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getRole() {
        return role;
    }
    
    public void setRole(String role) {
        this.role = role;
    }
    
    public boolean isAdmin() {
        return isAdmin;
    }
    
    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }
}

