package com.example.springboot322java17gradlegroovy.user;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public UserEntity login(
            @RequestParam("userId") String userId,
            @RequestParam("password") String password
    ) {
        UserEntity userEntity = new UserEntity();
        userEntity = userService.loginUsers(userId, password);
        return userEntity;
    }
}
