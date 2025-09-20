package com.sweetshop.controller;

import com.sweetshop.dto.SweetRequest;
import com.sweetshop.model.Sweet;
import com.sweetshop.service.SweetService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import com.sweetshop.model.User;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sweets")
@CrossOrigin(origins = "*")
public class SweetController {
    
    private final SweetService sweetService;
    
    public SweetController(SweetService sweetService) {
        this.sweetService = sweetService;
    }
    
    @GetMapping
    public ResponseEntity<List<Sweet>> getAllSweets() {
        List<Sweet> sweets = sweetService.getAllSweets();
        return ResponseEntity.ok(sweets);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Sweet> getSweetById(@PathVariable String id) {
        return sweetService.getSweetById(id)
                .map(sweet -> ResponseEntity.ok(sweet))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Sweet> createSweet(@Valid @RequestBody SweetRequest sweetRequest, HttpServletRequest request) {
        User currentUser = (User) request.getAttribute("currentUser");
        Boolean isAdmin = (Boolean) request.getAttribute("isAdmin");
        
        if (currentUser == null || isAdmin == null || !isAdmin) {
            return ResponseEntity.status(403).build();
        }
        try {
            Sweet sweet = sweetService.createSweet(sweetRequest);
            return ResponseEntity.ok(sweet);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Sweet> updateSweet(@PathVariable String id, 
                                           @Valid @RequestBody SweetRequest sweetRequest, HttpServletRequest request) {
        User currentUser = (User) request.getAttribute("currentUser");
        Boolean isAdmin = (Boolean) request.getAttribute("isAdmin");
        
        if (currentUser == null || isAdmin == null || !isAdmin) {
            return ResponseEntity.status(403).build();
        }
        try {
            Sweet sweet = sweetService.updateSweet(id, sweetRequest);
            return ResponseEntity.ok(sweet);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSweet(@PathVariable String id, HttpServletRequest request) {
        User currentUser = (User) request.getAttribute("currentUser");
        Boolean isAdmin = (Boolean) request.getAttribute("isAdmin");
        
        if (currentUser == null || isAdmin == null || !isAdmin) {
            return ResponseEntity.status(403).build();
        }
        try {
            sweetService.deleteSweet(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/{id}/purchase")
    public ResponseEntity<Sweet> purchaseSweet(@PathVariable String id, 
                                               @RequestBody Map<String, Integer> requestBody, HttpServletRequest request) {
        User currentUser = (User) request.getAttribute("currentUser");
        
        if (currentUser == null) {
            return ResponseEntity.status(401).build();
        }
        try {
            Integer quantity = requestBody.get("quantity");
            if (quantity == null || quantity <= 0) {
                return ResponseEntity.badRequest().build();
            }
            Sweet sweet = sweetService.purchaseSweet(id, quantity);
            return ResponseEntity.ok(sweet);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{id}/restock")
    public ResponseEntity<Sweet> restockSweet(@PathVariable String id, 
                                            @RequestBody Map<String, Integer> requestBody, HttpServletRequest request) {
        User currentUser = (User) request.getAttribute("currentUser");
        Boolean isAdmin = (Boolean) request.getAttribute("isAdmin");
        
        if (currentUser == null || isAdmin == null || !isAdmin) {
            return ResponseEntity.status(403).build();
        }
        try {
            Integer quantity = requestBody.get("quantity");
            if (quantity == null || quantity <= 0) {
                return ResponseEntity.badRequest().build();
            }
            Sweet sweet = sweetService.restockSweet(id, quantity);
            return ResponseEntity.ok(sweet);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Sweet>> searchSweets(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice) {
        
        List<Sweet> sweets = sweetService.searchSweets(name, category, minPrice, maxPrice);
        return ResponseEntity.ok(sweets);
    }
}
