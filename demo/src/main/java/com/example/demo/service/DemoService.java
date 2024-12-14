package com.example.demo.service;

import com.example.demo.model.User;
import org.springframework.http.ResponseEntity;

public interface DemoService {
    ResponseEntity<?> signup(User user);
    ResponseEntity<?> login(User user);
}

