package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.DemoRepository;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DemoServiceImpl implements DemoService {

    @Autowired
    private DemoRepository demoRepository;

    @Override
    public ResponseEntity<?> signup(User user) {
        // Check if email is already registered
        if (demoRepository.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already in use!");
        }

        // Save the new user
        demoRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully!");
    }

    @Override
    public ResponseEntity<?> login(User user) {
        // Find the user by email
        User existingUser = demoRepository.findByUsername(user.getUsername());

        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username!");
        }
    
        // Check if password matches
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password!");
        }
    
        // Login successful
        // return ResponseEntity.ok(existingUser.getUsername());

        Map<String, String> response = new HashMap<>();
    response.put("username", existingUser.getUsername());
    response.put("content", existingUser.getContent());
    return ResponseEntity.ok(response);
    }

}