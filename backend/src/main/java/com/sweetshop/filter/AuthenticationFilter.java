package com.sweetshop.filter;

import com.sweetshop.model.User;
import com.sweetshop.service.CustomAuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class AuthenticationFilter extends OncePerRequestFilter {
    
    private final CustomAuthService authService;
    
    public AuthenticationFilter(CustomAuthService authService) {
        this.authService = authService;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                    FilterChain filterChain) throws ServletException, IOException {
        
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            User user = authService.getUserFromToken(authHeader);
            if (user != null) {
                request.setAttribute("currentUser", user);
                request.setAttribute("isAdmin", authService.isAdmin(user));
            }
        }
        
        filterChain.doFilter(request, response);
    }
}


