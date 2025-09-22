package com.sweetshop.controller;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/actuator")
public class HealthController {
    private final MongoTemplate mongoTemplate;

    public HealthController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> checkHealth() {
        Map<String, String> status = new HashMap<>();
        try {
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));
            status.put("status", "UP");
            status.put("database", "MongoDB Connected");
        } catch (Exception e) {
            status.put("status", "DOWN");
            status.put("error", e.getMessage());
        }
        return ResponseEntity.ok(status);
    }
}
