package com.example.mongodb.api;

import com.example.mongodb.dto.BaseResponse;
import com.example.mongodb.dto.user.UserDto;
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

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/v1/api")
public class UserApiController {
    private static final String PATTERN_PASSWORD = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}";

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
                if(exitUser.getEmail() != null) {
                    userDto.setEmail(exitUser.getEmail());
                }
                if(exitUser.getSex() != null) {
                    userDto.setSex(exitUser.getSex());
                }
                if(exitUser.getBirthday() != null) {
                    userDto.setBirthday(exitUser.getBirthday());
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
                Optional<User> optUser = userRepository.findByUsername(username.toLowerCase());
                if (!optUser.isPresent()) {
                    throw new Exception("Username or password invalid");
                }
                User user = optUser.get();
                if(!passwordEncoder.matches(password, user.getPassword())) {
                    throw new Exception("Username or Password invalid");
                }
                if(user.getStatus() == 2) {
                    throw new Exception("Your account has been locked! Please contact the admin to unlock!");
                }
                user.setLastLogin(new Date());
                userRepository.save(user);
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

    @PostMapping(value = "/logout")
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

    @PostMapping(value = "/register")
    public BaseResponse AddUser(@RequestParam("username") String username,
                          @RequestParam("password") String password,
                          @RequestParam("name") String name,
                          @RequestParam("email") String email) {
        BaseResponse response = new BaseResponse();
        try {
            if (!username.isEmpty() && !password.isEmpty() && !name.isEmpty()) {
                Optional<User> optUser = userRepository.findByUsername(username);
                if(!password.matches(PATTERN_PASSWORD)) {
                    throw new Exception("Password invalid");
                }
                if(optUser.isPresent()) {
                    response.setCode("300");
                    response.setMessage("User exit!");
                    response.setData(null);
                }else {
                    User user = new User();
                    user.setUsername(username.toLowerCase());
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

    @PutMapping(value = "/change-password")
    public BaseResponse changePassUser(@RequestParam("username") String username,
                                       @RequestParam("current-password") String currentPassword,
                                       @RequestParam("new-password") String newPassword,
                                       @RequestParam("confirm-password") String confirmPassword) {
        BaseResponse response = new BaseResponse();
        String pattern = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}";
        try {
            if (!username.isEmpty() && !currentPassword.isEmpty()
                    && !newPassword.isEmpty() && !confirmPassword.isEmpty()) {
                Optional<User> optUser = userRepository.findByUsername(username);
                if (!optUser.isPresent()) {
                    throw new Exception("username or password invalid");
                }
                User user = optUser.get();
                if(!currentPassword.matches(pattern) &&
                        newPassword.matches(pattern) && confirmPassword.matches(pattern)) {
                    throw new Exception("Password invalid");
                }
                if(!passwordEncoder.matches(currentPassword, user.getPassword())) {
                    throw new Exception("Password invalid");
                }
                if(!newPassword.equals(confirmPassword)) {
                    throw new Exception("Password invalid");
                }
                user.setPassword(passwordEncoder.encode(newPassword));
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

    @PutMapping("/user/{id}")
    public BaseResponse updateUser(@PathVariable("id") String id,
                                    @RequestBody UserDto userDto){
        BaseResponse response = new BaseResponse();
        Optional<User> optUser = userRepository.findByUsername(id);
        try {
            if(!optUser.isPresent()) {
                response.setCode("99");
                response.setMessage("Found not data");
                response.setData(null);
                return response;
            }
            User oldUser = optUser.get();
            if(userDto.getFullName() != null) {
                oldUser.setFullName(userDto.getFullName());
            }
            if(userDto.getEmail()!= null) {
                oldUser.setEmail(userDto.getEmail());
            }
            if(userDto.getPhone() != null) {
                oldUser.setPhone(userDto.getPhone());
            }
            if(userDto.getImage() != null) {
                oldUser.setImage(userDto.getImage());
            }
            if(userDto.getSex() != null) {
                oldUser.setSex(userDto.getSex());
            }
            if(userDto.getAddress() != null) {
                oldUser.setAddress(userDto.getAddress());
            }
            if(userDto.getBirthday() != null) {
                oldUser.setBirthday(userDto.getBirthday());
            }
            User exitUser = userRepository.save(oldUser);
            UserDto exitUserDto = new UserDto();
            if(exitUser.getUsername() != null) {
                exitUserDto.setUsername(exitUser.getUsername());
            }
            if(exitUser.getFullName() != null) {
                exitUserDto.setFullName(exitUser.getFullName());
            }
            if(exitUser.getAddress() != null) {
                exitUserDto.setAddress(exitUser.getAddress());
            }
            if(exitUser.getPhone() != null) {
                exitUserDto.setPhone(exitUser.getPhone());
            }
            if(exitUser.getEmail() != null) {
                exitUserDto.setEmail(exitUser.getEmail());
            }
            if(exitUser.getSex() != null) {
                exitUserDto.setSex(exitUser.getSex());
            }
            if(exitUser.getBirthday() != null) {
                exitUserDto.setBirthday(exitUser.getBirthday());
            }
            if(exitUser.getImage() != null) {
                exitUserDto.setImage(exitUser.getImage());
            }
            if(exitUser.getLstFavourite() != null) {
                exitUserDto.setLstFavourite(exitUser.getLstFavourite());
            }
            response.setCode("00");
            response.setMessage("Edit Success");
            response.setData(exitUserDto);

        }catch (Exception e) {
            response.setCode("99");
            response.setMessage("Error");
            response.setData(e.getMessage());
        }
        return response;
    }

    @PostMapping(value = "/forgot-password")
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

    @PostMapping("/user/contact-us")
    public BaseResponse contactUs(@RequestParam("userName") String userName,
                                  @RequestParam("name") String name,
                                  @RequestParam("email") String email,
                                  @RequestParam("subject") String subject,
                                  @RequestParam("message") String message){
        BaseResponse response = new BaseResponse();
        Optional<User> optUser = userRepository.findByUsername(userName);
        User exitUser = optUser.get();

        if(!optUser.isPresent()) {
            response.setCode("99");
            response.setMessage("Found not user");
            response.setData(null);
            return response;
        }else {
            response.setMessage("Send message success!");
            response.setCode("00");
            response.setData(name);
        }
        return response;
    }
}