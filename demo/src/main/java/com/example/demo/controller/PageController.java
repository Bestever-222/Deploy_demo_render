package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    // Map root URL ("/") to the landing page
    @GetMapping("/landing")
    public String landingPage() {
        return "landing.html"; // Serves the landing page
    }

    // Map /login URL to the login page
    @GetMapping("/login")
    public String loginPage() {
        return "login.html"; // Serves the login page
    }
}