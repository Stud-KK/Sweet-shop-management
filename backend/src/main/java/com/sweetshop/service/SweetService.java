package com.sweetshop.service;

import com.sweetshop.dto.SweetRequest;
import com.sweetshop.model.Sweet;
import com.sweetshop.repository.SweetRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SweetService {
    
    private final SweetRepository sweetRepository;
    
    public SweetService(SweetRepository sweetRepository) {
        this.sweetRepository = sweetRepository;
    }
    
    public List<Sweet> getAllSweets() {
        return sweetRepository.findAll();
    }
    
    public Optional<Sweet> getSweetById(String id) {
        return sweetRepository.findById(id);
    }
    
    public Sweet createSweet(SweetRequest sweetRequest) {
        Sweet sweet = new Sweet();
        sweet.setName(sweetRequest.getName());
        sweet.setCategory(sweetRequest.getCategory());
        sweet.setPrice(sweetRequest.getPrice());
        sweet.setQuantity(sweetRequest.getQuantity());
        sweet.setDescription(sweetRequest.getDescription());
        
        return sweetRepository.save(sweet);
    }
    
    public Sweet updateSweet(String id, SweetRequest sweetRequest) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
        
        sweet.setName(sweetRequest.getName());
        sweet.setCategory(sweetRequest.getCategory());
        sweet.setPrice(sweetRequest.getPrice());
        sweet.setQuantity(sweetRequest.getQuantity());
        sweet.setDescription(sweetRequest.getDescription());
        sweet.setUpdatedAt(LocalDateTime.now());
        
        return sweetRepository.save(sweet);
    }
    
    public void deleteSweet(String id) {
        if (!sweetRepository.existsById(id)) {
            throw new RuntimeException("Sweet not found with id: " + id);
        }
        sweetRepository.deleteById(id);
    }
    
    public Sweet purchaseSweet(String id, Integer quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
        
        if (sweet.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient quantity available");
        }
        
        sweet.setQuantity(sweet.getQuantity() - quantity);
        sweet.setUpdatedAt(LocalDateTime.now());
        
        return sweetRepository.save(sweet);
    }
    
    public Sweet restockSweet(String id, Integer quantity) {
        Sweet sweet = sweetRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sweet not found with id: " + id));
        
        sweet.setQuantity(sweet.getQuantity() + quantity);
        sweet.setUpdatedAt(LocalDateTime.now());
        
        return sweetRepository.save(sweet);
    }
    
    public List<Sweet> searchSweets(String name, String category, BigDecimal minPrice, BigDecimal maxPrice) {
        if (name != null && category != null && minPrice != null && maxPrice != null) {
            return sweetRepository.findByNameContainingAndCategoryContainingAndPriceBetween(
                name, category, minPrice, maxPrice);
        } else if (name != null) {
            return sweetRepository.findByNameContainingIgnoreCase(name);
        } else if (category != null) {
            return sweetRepository.findByCategoryIgnoreCase(category);
        } else if (minPrice != null && maxPrice != null) {
            return sweetRepository.findByPriceBetween(minPrice, maxPrice);
        } else {
            return sweetRepository.findAll();
        }
    }
}
