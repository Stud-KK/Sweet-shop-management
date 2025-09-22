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
@RequestMapping("/sweets")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class SweetController {
    private final SweetService sweetService;

    public SweetController(SweetService sweetService) {
        this.sweetService = sweetService;
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Sweet service is running");
    }

    @GetMapping
    public ResponseEntity<List<Sweet>> getAllSweets() {
        return ResponseEntity.ok(sweetService.getAllSweets());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sweet> getSweetById(@PathVariable String id) {
        return ResponseEntity.ok(sweetService.getSweetById(id).orElseThrow(() -> 
            new RuntimeException("Sweet not found with id: " + id)));
    }

    @PostMapping
    public ResponseEntity<Sweet> createSweet(@RequestBody SweetRequest sweet) {
        return ResponseEntity.ok(sweetService.createSweet(sweet));
    }

    @PostMapping("/{id}/restock")
    public ResponseEntity<Sweet> restockSweet(@PathVariable String id, @RequestBody int quantity) {
        return ResponseEntity.ok(sweetService.restockSweet(id, quantity));
    }

    @PostMapping("/{id}/purchase")
    public ResponseEntity<Sweet> purchaseSweet(@PathVariable String id, @RequestBody int quantity) {
        return ResponseEntity.ok(sweetService.purchaseSweet(id, quantity));
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSweet(@PathVariable String id) {
        sweetService.deleteSweet(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sweet> updateSweet(@PathVariable String id, @RequestBody SweetRequest sweet) {
        return ResponseEntity.ok(sweetService.updateSweet(id, sweet));
    }
}