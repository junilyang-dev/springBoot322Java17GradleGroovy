package com.example.springboot322java17gradlegroovy.router.index;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexRouter {
    @GetMapping(value = {"/","/index"})
    public String index(){
        return "index/index";//templates/index/index.mustache
    }
}
