package com.example.springboot322java17gradlegroovy.router.login;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LoginRouter {

    @GetMapping("/login")
    public String login(Model model){
        model.addAttribute("pageTitle", "Login Page");
        return "login/login";//templates/login/login.mustache
    }

    @GetMapping("/join")
    public String join(Model model) {
        model.addAttribute("pageTitle", "Join Page");
        return "login/join";//templates/login/join.mustache
    }
}
