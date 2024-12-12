package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/demo")
public class DemoController {

    @Autowired
    private DemoService demoService;
      
    // Endpoint for Signup
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        return demoService.signup(user);
    }

    // Endpoint for Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        return demoService.login(user);
    }  
}