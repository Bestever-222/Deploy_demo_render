package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DemoRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findByUsername(String username);
}