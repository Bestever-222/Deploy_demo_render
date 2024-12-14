package com.example.demo.controller;

import com.example.demo.model.Follower;
import com.example.demo.model.User;
import com.example.demo.service.DemoService;
import com.example.demo.service.FollowerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/demo")
public class DemoController {

    @Autowired
    private DemoService demoService;

    @Autowired
    private FollowerService followerService;
      
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

     // Endpoint to follow a user
    @PostMapping("/follow")
    public ResponseEntity<?> followUser(@RequestBody Follower follower) {
        return followerService.followUser(follower);
    }

    // Endpoint to get followers of a user
    @GetMapping("/followers/{userId}")
    public ResponseEntity<List<Follower>> getFollowers(@PathVariable String userId) {
        return ResponseEntity.ok(followerService.getFollowers(userId));
    }

    // Endpoint to get users followed by a user
    @GetMapping("/following/{userId}")
    public ResponseEntity<List<Follower>> getFollowing(@PathVariable String userId) {
        return ResponseEntity.ok(followerService.getFollowing(userId));
    }
}