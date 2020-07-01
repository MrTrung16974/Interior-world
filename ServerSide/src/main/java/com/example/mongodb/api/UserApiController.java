package com.example.mongodb.api;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.dto.Comment;
import com.example.mongodb.dto.UserDto;
import com.example.mongodb.model.Product;
import com.example.mongodb.model.User;
import com.example.mongodb.repository.OrderRepository;
import com.example.mongodb.repository.ProductRepository;
import com.example.mongodb.repository.UserRepository;
import com.example.mongodb.services.OrderServices;
import com.example.mongodb.services.StoreFileService;
import com.example.mongodb.services.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/v1/api")
public class UserApiController {
    @Autowired
    StoreFileService storeFileService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderServices orderServices;

    @Autowired
    TokenAuthenticationService tokenAuthenticationService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserRepository userRepository;


    @GetMapping("/getInfoUser")
    public BaseResponse getInfoUser(@RequestHeader("Authorization") String token) {
        BaseResponse response = new BaseResponse();
        try {
            if(!tokenAuthenticationService.validateToKen(token)) {
                throw new Exception("Token invalid");
            }
            String userName = tokenAuthenticationService.readJWT(token);
            Optional<User> user = userRepository.findByUsername(userName);
            if(user.isPresent()) {
                User exitUser = user.get();
                UserDto userDto = new UserDto();
                if(exitUser.getUsername() != null) {
                    userDto.setUsername(exitUser.getUsername());
                }
                if(exitUser.getFullName() != null) {
                    userDto.setFullName(exitUser.getFullName());
                }
                if(exitUser.getAddress() != null) {
                    userDto.setAddress(exitUser.getAddress());
                }
                if(exitUser.getPhone() != null) {
                    userDto.setPhone(exitUser.getPhone());
                }
                if(exitUser.getImage() != null) {
                    userDto.setImage(exitUser.getImage());
                }
                if(exitUser.getLstFavourite() != null) {
                    userDto.setLstFavourite(exitUser.getLstFavourite());
                }
                response.setCode("00");
                response.setMessage("get data thanh công");
                response.setData(userDto);
            }else {
                response.setCode("400");
                response.setMessage("Find not Data");
                response.setData(null);
            }
        }catch (Exception e) {
            response.setCode("99");
            response.setMessage("Error" );
            response.setData(e.getMessage());
        }
        return response;
    }

    @PostMapping("/login")
    public BaseResponse login(@RequestParam(value = "username" )String username,
                              @RequestParam(value = "password" )String password) {
        BaseResponse response = new BaseResponse();
        try {
            if (!username.isEmpty() && !password.isEmpty()) {
                Optional<User> optUser = userRepository.findByUsername(username);
                if (!optUser.isPresent()) {
                    throw new Exception("username or password invalid");
                }
                User user = optUser.get();
                if(!passwordEncoder.matches(password, user.getPassword())) {
                    throw new Exception("Password invalid");
                }
                response.setCode("00");
                response.setMessage("Success");
                response.setData(tokenAuthenticationService.generateJWT(user.getUsername()));
            } else {
                response.setCode("400");
                response.setMessage("Error");
                response.setData(null);
            }
        }catch (Exception e) {
            response.setCode("99");
            response.setMessage("Error");
            response.setData(e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public BaseResponse logout() {
        BaseResponse response = new BaseResponse();
        try {
            response.setCode("00");
            response.setMessage("success!");
            response.setData("User info");
        }catch (Exception e) {
            response.setCode("99");
            response.setMessage("Error" );
            response.setData(e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public BaseResponse AddUser(@RequestParam("username") String username,
                          @RequestParam("password") String password,
                          @RequestParam("name") String name,
                          @RequestParam("name") String email) {
        BaseResponse response = new BaseResponse();
        String pattern = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}";
        try {
            if (!username.isEmpty() && !password.isEmpty() && !name.isEmpty()) {
                Optional<User> optUser = userRepository.findByUsername(username);
                if(!password.matches(pattern)) {
                    throw new Exception("Password invalid");
                }
                if(optUser.isPresent()) {
                    response.setCode("300");
                    response.setMessage("User exit!");
                    response.setData(null);
                }else {
                    User user = new User();
                    user.setUsername(username);
                    user.setPassword(passwordEncoder.encode(password));
                    user.setFullName(name);
                    user.setEmail(email);
                    user.setRoleID("USER");
                    user.setStatus(1);
                    User exitUser = userRepository.save(user);
                    response.setCode("00");
                    response.setMessage("Success");
                    response.setData(tokenAuthenticationService.generateJWT(exitUser.getUsername()));
                }
            } else {
                response.setCode("400");
                response.setMessage("Find not data!");
                response.setData(null);
            }
        }catch (Exception e) {
            response.setCode("99");
            response.setMessage("Error");
            response.setData(e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/forgot-password", method = RequestMethod.POST)
    public BaseResponse resetPassUser(@RequestParam("username") String username,
                                @RequestParam("password") String password) {
        BaseResponse response = new BaseResponse();
        String pattern = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}";
        try {
            if (!username.isEmpty() && !password.isEmpty()) {
                Optional<User> optUser = userRepository.findByUsername(username);
                if(!password.matches(pattern)) {
                    throw new Exception("Password invalid");
                }
                if (!optUser.isPresent()) {
                    throw new Exception("username or password invalid");
                }
                User user = optUser.get();
                user.setPassword(passwordEncoder.encode(password));
                User exitUser = userRepository.save(user);
                response.setCode("00");
                response.setMessage("Success");
                response.setData(tokenAuthenticationService.generateJWT(exitUser.getUsername()));
            }
        }catch (Exception e) {
            response.setCode("99");
            response.setMessage("Error");
            response.setData(e.getMessage());
        }
        return response;
    }

    @PutMapping("/user/favourite")
        public BaseResponse favouriteUser(@RequestParam("userName") String userName,
                                      @RequestParam("idProduct") String idProduct){
        BaseResponse response = new BaseResponse();
        Optional<User> optUser = userRepository.findByUsername(userName);
        Optional<Product> optProduct = productRepository.findById(idProduct);
        User exitUser = optUser.get();
        Product exitProduct = optProduct.get();
        List<Product> lstProduct = new ArrayList<>();;
        Product removeProduct = null;
        boolean isHaveInList = false;

        if(!optUser.isPresent() && !optProduct.isPresent()) {
            response.setCode("99");
            response.setMessage("Found not data");
            response.setData(null);
            return response;
        }
        if (exitUser.getLstFavourite() != null) {
            lstProduct = exitUser.getLstFavourite();
            for (Product p : lstProduct) {
                if(p.getId().equals(exitProduct.getId())) {
                    isHaveInList = true;
                    removeProduct = p;
                }
            }
        }
//        check lst Product equal null add product (frist product)
        if(lstProduct.isEmpty()) {
            lstProduct.add(exitProduct);
            response.setCode("200");
            response.setMessage("add favourite user Success");
        }else {
            if(!isHaveInList) {
//              add  favourite in user
                lstProduct.add(exitProduct);
                response.setCode("200");
                response.setMessage("add favourite user Success");
            } else {
//              remove  favourite in user
                lstProduct.remove(removeProduct);
                response.setCode("00");
                response.setMessage("remove favourite user Success");
            }
        }
        exitUser.setLstFavourite(lstProduct);
        userRepository.save(exitUser);
        response.setData(lstProduct);

        return response;
    }
}