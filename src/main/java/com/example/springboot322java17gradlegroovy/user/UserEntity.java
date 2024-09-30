package com.example.springboot322java17gradlegroovy.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
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

    @Column(name = "tel", length = 20)
    private String tel;
}
