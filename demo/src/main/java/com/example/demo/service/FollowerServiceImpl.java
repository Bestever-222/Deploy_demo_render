package com.example.demo.service;

import com.example.demo.model.Follower;
import com.example.demo.repository.FollowerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FollowerServiceImpl implements FollowerService {

    @Autowired
    private FollowerRepository followerRepository;

    @Override
    public ResponseEntity<?> followUser(Follower follower) {
        if (follower.getFollowerId().equals(follower.getFollowedId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You cannot follow yourself!");
        }
        followerRepository.save(follower);
        return ResponseEntity.ok("User followed successfully!");
    }

    @Override
    public List<Follower> getFollowers(String userId) {
        return followerRepository.findByFollowedId(userId);
    }

    @Override
    public List<Follower> getFollowing(String userId) {
        return followerRepository.findByFollowerId(userId);
    }
}
