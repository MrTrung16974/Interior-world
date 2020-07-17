package com.example.clientside.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ControllerMapping {
    @RequestMapping("/login")
    public String login(){
        return "login";
    }
    @RequestMapping("/register")
    public String register() {
        return "register";
    }
    @RequestMapping("/account-info")
    public String accountInfo() {
        return "account-info";
    }
    @RequestMapping({"/","/home"})
    public String home(){
        return "index";
    }
    @RequestMapping("/cart")
    public String cart(){
        return "cart";
    }
    @RequestMapping("/favourite")
    public String favourite(){
        return "favourite";
    }
    @RequestMapping("/checkout")
    public String checkout(){
        return "checkout";
    }
    @RequestMapping("/confirmation")
    public String confirmation(){
        return "confirmation";
    }
    @RequestMapping("/contact")
    public String contact(){
        return "contact";
    }
    @RequestMapping("/product-details")
    public String productDetails(@RequestParam("id") String id){
        return "single-product";
    }
    @RequestMapping("/shop")
    public String shop(){
        return "category";
    }
    @RequestMapping("/403")
    public String notPo(){
        return "403";
    }
    @RequestMapping("/tracking-order")
    public String trakingOrder(){
        return "tracking-order";
    }

}
