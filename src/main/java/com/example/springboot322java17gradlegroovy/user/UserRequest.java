package com.example.springboot322java17gradlegroovy.user;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
    private String userId;

    private String password;

    private String email;


    public UserRequest(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }
}
