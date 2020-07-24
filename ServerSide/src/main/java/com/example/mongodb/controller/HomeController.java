package com.example.mongodb.controller;

import com.example.mongodb.repository.UserRepository;
import com.example.mongodb.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class HomeController {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @RequestMapping({"/","/home"})
    public String home(Model model){
        return "index";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/register")
    public String register() {
        return "register";
    }

    @RequestMapping("/profile-user")
    public String profileUser() {
        return "user/profile-user";
    }

    @RequestMapping("/welcome")
    @PreAuthorize("isAuthenticated()")
    public String welcome(HttpServletRequest request, HttpSession session) {
        return "welcome";
    }

    @RequestMapping("/403")
    public String noPermission() {
        return "403";
    }

    @RequestMapping("/404")
    public String notFound() {
        return "404";
    }

    @RequestMapping("/500")
    public String internalError() {
        return "500";
    }
}
