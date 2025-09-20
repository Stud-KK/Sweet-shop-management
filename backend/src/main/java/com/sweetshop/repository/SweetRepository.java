package com.sweetshop.repository;

import com.sweetshop.model.Sweet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface SweetRepository extends MongoRepository<Sweet, String> {
    List<Sweet> findByNameContainingIgnoreCase(String name);
    List<Sweet> findByCategoryIgnoreCase(String category);
    List<Sweet> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    @Query("{'name': {$regex: ?0, $options: 'i'}, 'category': {$regex: ?1, $options: 'i'}, 'price': {$gte: ?2, $lte: ?3}}")
    List<Sweet> findByNameContainingAndCategoryContainingAndPriceBetween(
        String name, String category, BigDecimal minPrice, BigDecimal maxPrice);
}

