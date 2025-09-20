package com.sweetshop.service;

import com.sweetshop.dto.AuthResponse;
import com.sweetshop.dto.LoginRequest;
import com.sweetshop.dto.RegisterRequest;
import com.sweetshop.model.User;
import com.sweetshop.repository.UserRepository;
import com.sweetshop.security.JwtUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private JwtUtils jwtUtils;
    
    @InjectMocks
    private CustomAuthService authService;
    
    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private User user;
    
    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest("testuser", "test@example.com", "password123");
        loginRequest = new LoginRequest("testuser", "password123");
        user = new User("testuser", "test@example.com", "encodedPassword");
        user.setId("1");
    }
    
    @Test
    void register_ShouldReturnAuthResponse_WhenValidRequest() {
        // Given
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtUtils.generateToken(anyString(), anyString())).thenReturn("jwtToken");
        
        // When
        AuthResponse response = authService.register(registerRequest);
        
        // Then
        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        assertEquals("testuser", response.getUsername());
        assertEquals("USER", response.getRole());
        
        verify(userRepository).existsByUsername("testuser");
        verify(userRepository).existsByEmail("test@example.com");
        verify(userRepository).save(any(User.class));
        verify(jwtUtils).generateToken("testuser", "USER");
    }
    
    @Test
    void register_ShouldThrowException_WhenUsernameExists() {
        // Given
        when(userRepository.existsByUsername(anyString())).thenReturn(true);
        
        // When & Then
        assertThrows(RuntimeException.class, () -> authService.register(registerRequest));
        verify(userRepository).existsByUsername("testuser");
        verify(userRepository, never()).save(any(User.class));
    }
    
    @Test
    void register_ShouldThrowException_WhenEmailExists() {
        // Given
        when(userRepository.existsByUsername(anyString())).thenReturn(false);
        when(userRepository.existsByEmail(anyString())).thenReturn(true);
        
        // When & Then
        assertThrows(RuntimeException.class, () -> authService.register(registerRequest));
        verify(userRepository).existsByUsername("testuser");
        verify(userRepository).existsByEmail("test@example.com");
        verify(userRepository, never()).save(any(User.class));
    }
    
    @Test
    void login_ShouldReturnAuthResponse_WhenValidCredentials() {
        // Given
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.of(user));
        when(jwtUtils.generateToken(anyString(), anyString())).thenReturn("jwtToken");
        
        // When
        AuthResponse response = authService.login(loginRequest);
        
        // Then
        assertNotNull(response);
        assertEquals("jwtToken", response.getToken());
        assertEquals("testuser", response.getUsername());
        assertEquals("USER", response.getRole());
        
        verify(userRepository).findByUsername("testuser");
        verify(jwtUtils).generateToken("testuser", "USER");
    }
    
    @Test
    void login_ShouldThrowException_WhenUserNotFound() {
        // Given
        when(userRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        
        // When & Then
        assertThrows(RuntimeException.class, () -> authService.login(loginRequest));
        verify(userRepository).findByUsername("testuser");
    }
}