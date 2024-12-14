package com.example.demo.service;

import com.example.demo.model.Follower;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FollowerService {
    ResponseEntity<?> followUser(Follower follower);
    List<Follower> getFollowers(String userId);
    List<Follower> getFollowing(String userId);
}
