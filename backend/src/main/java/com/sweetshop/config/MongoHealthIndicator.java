package com.sweetshop.config;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;
import java.util.HashMap;
import java.util.Map;

@Component
public class MongoHealthIndicator {
    private final MongoTemplate mongoTemplate;

    public MongoHealthIndicator(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public Map<String, Object> health() {
        Map<String, Object> health = new HashMap<>();
        try {
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));
            health.put("status", "UP");
            health.put("database", "MongoDB");
        } catch (Exception e) {
            health.put("status", "DOWN");
            health.put("database", "MongoDB");
            health.put("error", e.getMessage());
        }
        return health;
    }

    public boolean isHealthy() {
        try {
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
