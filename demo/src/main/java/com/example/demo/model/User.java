package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    public void setId(String id) {
        this.id = id;
    }

    @Id
    private String id;
    private String username;
    private String password;
    private String confirmpassword;
    private String email;
    private String gender;
    private String content;

    // Constructors
    public User() {}

    public User(String confirmpassword, String password, String email, String gender, String content) {
        this.confirmpassword = confirmpassword;
        this.password = password;
        this.email = email;
        this.gender = gender;
        this.content = content;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getConfirmpassword() {
        return confirmpassword;
    }

    public void setConfirmpassword(String confirmpassword) {
        this.confirmpassword = confirmpassword;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
