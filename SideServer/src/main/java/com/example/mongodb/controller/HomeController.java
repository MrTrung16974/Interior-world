package com.example.mongodb.controller;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.model.Product;
import com.example.mongodb.model.User;
import com.example.mongodb.repository.OrderRepository;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.repository.UserRepository;
import com.example.mongodb.services.OrderServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Controller
public class HomeController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;

    @RequestMapping("/index")
    public String index(Model model){
        List<Product> lstProduct = productRepository.findAll();
        model.addAttribute("lstProduct",lstProduct);
        return "index";
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public String AddUser(@RequestParam("username") String username,
                          @RequestParam("password") String password,
                          @RequestParam("name") String name) {
        User user = new User();
        user.setId(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRoles(Arrays.asList("ADMIN", "USER", "VIP"));
        userRepository.save(user);
        return "redirect:/login?regisSuccess=true";
    }
}
