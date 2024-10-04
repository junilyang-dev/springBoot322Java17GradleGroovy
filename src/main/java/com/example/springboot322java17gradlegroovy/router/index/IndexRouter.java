package com.example.springboot322java17gradlegroovy.router.index;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class IndexRouter {
    @GetMapping(value = {"/","/index"})
    public String index(Model model){
        model.addAttribute("pageTitle", "Index Page");
        return "index/index";//templates/index/index.mustache
    }

    @GetMapping("/mypage")
    public String mypage(Model model) {
        model.addAttribute("pageTitle", "My Page");
        //db select
        return "index/mypage";//templates/index/mypage.mustache
    }
}
