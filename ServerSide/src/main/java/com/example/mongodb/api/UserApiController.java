package com.example.mongodb.api;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.dto.UserDto;
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


    @PostMapping("/login")
    public BaseResponse login(@RequestParam(value = "username" )String username,
                              @RequestParam(value = "password" )String password) {
        BaseResponse response = new BaseResponse();
        try {
            if (!username.isEmpty() && !password.isEmpty()) {
                Optional<User> optUser = userRepository.findById(username);
                if (!optUser.isPresent()) {
                    throw new Exception("username or password invalid");
                }
                User user = optUser.get();
                if(!passwordEncoder.matches(password, user.getPassword())) {
                    throw new Exception("Password invalid");
                }
                response.setCode("00");
                response.setMessage("Login Success");
                response.setData(tokenAuthenticationService.generateJWT(user.getId()));
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


    @GetMapping("/getInfoUser")
    public BaseResponse getInfo(@RequestHeader("Authorization") String token) {
        BaseResponse response = new BaseResponse();
        try {
            if(!tokenAuthenticationService.validateToKen(token)) {
                throw new Exception("Token invalid");
            }
            String userId = tokenAuthenticationService.readJWT(token);
            Optional<User> user = userRepository.findById(userId);
            if(user.isPresent()) {
                User exitUser = user.get();
                UserDto userDto = new UserDto();
                if(exitUser.getId() != null) {
                    userDto.setId(exitUser.getId());
                }
                if(exitUser.getName() != null) {
                    userDto.setName(exitUser.getName());
                }
                if(exitUser.getAddress() != null) {
                    userDto.setAddress(exitUser.getAddress());
                }
                if(exitUser.getPhone() != null) {
                    userDto.setPhone(exitUser.getPhone());
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

}
