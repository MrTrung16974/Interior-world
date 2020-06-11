package com.example.springsecurity.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@Controller
public class HomeController {
    @RequestMapping("/login")
    public String login(){
        return "login";
    }
    @RequestMapping("/home")
    public String home(){
        return "home";
    }
    @RequestMapping("/cart")
    public String cart(){
        return "cart";
    }
    @RequestMapping("/checkout")
    public String checkOut(){
        return "checkout";
    }
    @RequestMapping("/product-details")
    public String productDetails(@RequestParam("id") String id){
        return "product-details";
    }
    @RequestMapping("/shop")
    public String shop(){
        return "shop";
    }
    @RequestMapping("/403")
    public String notPo(){
        return "403";
    }

    @RequestMapping("/register")
    public String register() {
        return "register";
    }
}
