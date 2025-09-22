package com.sweetshop.service;

import com.sweetshop.dto.AuthResponse;
import com.sweetshop.dto.LoginRequest;
import com.sweetshop.dto.RegisterRequest;
import com.sweetshop.model.User;
import com.sweetshop.repository.UserRepository;
import com.sweetshop.security.JwtUtils;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class CustomAuthService {
    
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;
    
    // Admin credentials
    private static final String ADMIN_EMAIL = "admin@sweetshop.com";
    private static final String ADMIN_PASSWORD = "admin123";
    private static final String ADMIN_USERNAME = "admin";
    
    public CustomAuthService(UserRepository userRepository, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
        try {
            initializeAdmin();
            System.out.println("Admin initialization successful");
        } catch (Exception e) {
            System.err.println("Error initializing admin: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private void initializeAdmin() {
        if (!userRepository.existsByEmail(ADMIN_EMAIL)) {
            User adminUser = new User();
            adminUser.setUsername(ADMIN_USERNAME);
            adminUser.setEmail(ADMIN_EMAIL);
            adminUser.setPassword(hashPassword(ADMIN_PASSWORD));
            adminUser.setRole(User.Role.ADMIN);
            userRepository.save(adminUser);
        }
    }
    
    public AuthResponse register(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username is already taken!");
        }
        
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already in use!");
        }
        
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(hashPassword(registerRequest.getPassword()));
        user.setRole(User.Role.USER); // Set default role as USER
        
        User savedUser = userRepository.save(user);
        
        String token = jwtUtils.generateToken(savedUser.getUsername(), savedUser.getRole().name());
        
        return new AuthResponse(token, savedUser.getUsername(), savedUser.getRole().name(), false);
    }
    
    public AuthResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    
        if (!verifyPassword(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
    
        String token = jwtUtils.generateToken(user.getUsername(), user.getRole().name());
    
        return new AuthResponse(token, user.getUsername(), user.getRole().name(), user.getRole() == User.Role.ADMIN);
    }
    
    
    public User getUserFromToken(String token) {
        if (token == null || !token.startsWith("Bearer ")) {
            return null;
        }
        
        String jwtToken = token.substring(7);
        if (!jwtUtils.validateToken(jwtToken)) {
            return null;
        }
        
        String username = jwtUtils.extractUsername(jwtToken);
        return userRepository.findByUsername(username).orElse(null);
    }
    
    public boolean isAdmin(User user) {
        return user != null && user.getRole() == User.Role.ADMIN;
    }
    
    public static String hashPassword(String password) {
        try {
            // Generate a random salt
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[16];
            random.nextBytes(salt);
            
            // Hash the password with the salt
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] hashedPassword = md.digest(password.getBytes());
            
            // Combine salt and hashed password
            byte[] combined = new byte[salt.length + hashedPassword.length];
            System.arraycopy(salt, 0, combined, 0, salt.length);
            System.arraycopy(hashedPassword, 0, combined, salt.length, hashedPassword.length);
            
            return Base64.getEncoder().encodeToString(combined);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error hashing password", e);
        }
    }
    
    private boolean verifyPassword(String password, String hashedPassword) {
        try {
            byte[] combined = Base64.getDecoder().decode(hashedPassword);
            
            // Extract salt
            byte[] salt = new byte[16];
            System.arraycopy(combined, 0, salt, 0, 16);
            
            // Hash the provided password with the extracted salt
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] hashedProvidedPassword = md.digest(password.getBytes());
            
            // Extract the stored hash
            byte[] storedHash = new byte[combined.length - 16];
            System.arraycopy(combined, 16, storedHash, 0, storedHash.length);
            
            // Compare hashes
            return MessageDigest.isEqual(hashedProvidedPassword, storedHash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Error verifying password", e);
        }
    }
}


