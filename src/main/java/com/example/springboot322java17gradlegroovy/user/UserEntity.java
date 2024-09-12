package com.example.springboot322java17gradlegroovy.user;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_sq")
    private Long userSq;

    @Column(name = "user_id", length = 30)
    private String userId;

    @Column(name = "password", columnDefinition = "LONGTEXT")
    private String password;

    @Column(name = "email", length = 50)
    private String email;

    public Long getUserSq() {
        return userSq;
    }

    public void setUserSq(Long userSq) {
        this.userSq = userSq;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
}
