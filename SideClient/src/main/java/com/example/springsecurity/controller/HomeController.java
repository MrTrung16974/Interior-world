package com.example.springsecurity.controller;

import com.example.springsecurity.dto.BaseResponse;
import com.example.springsecurity.model.User;
import com.example.springsecurity.repository.UserRepository;
import com.example.springsecurity.service.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Optional;

@Controller
public class HomeController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    TokenAuthenticationService tokenAuthenticationService;

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

//    @PostMapping("/login")
//    public String login(Model model,
//                        @RequestParam(value = "username" )String username,
//                        @RequestParam(value = "password" )String password) {
//        BaseResponse response = new BaseResponse();
//        try {
//            if (!username.isEmpty() && !password.isEmpty()) {
//                Optional<User> optUser = userRepository.findById(username);
//                if (!optUser.isPresent()) {
//                    throw new Exception("username or password invalid");
//                }
//                User user = optUser.get();
//                if(!passwordEncoder.matches(password, user.getPassword())) {
//                    throw new Exception("Password invalid");
//                }
//                response.setData("00");
//                response.setMessage("Login Success");
//                response.setData(tokenAuthenticationService.generateJWT(user.getId()));
//            } else {
//                response.setData("00");
//                response.setMessage("Error");
//                response.setData(null);
//            }
//        }catch (Exception e) {
//            response.setData("99");
//            response.setMessage("Error");
//            response.setData(e.getMessage());
//        }
//        model.addAttribute("response", response);
//        return "redirect:/home";
//    }

}
