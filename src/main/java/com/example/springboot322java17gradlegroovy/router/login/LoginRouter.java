package com.example.springboot322java17gradlegroovy.router.login;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginRouter {

    @GetMapping("/login")
    public String login(){
        return "login/login";//templates/login/login.mustache
    }
}
