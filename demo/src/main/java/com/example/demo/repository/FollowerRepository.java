package com.example.demo.repository;

import com.example.demo.model.Follower;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface FollowerRepository extends MongoRepository<Follower, String> {
    List<Follower> findByFollowedId(String followedId); // Find followers of a specific user
    List<Follower> findByFollowerId(String followerId); // Find users followed by a specific user
}

