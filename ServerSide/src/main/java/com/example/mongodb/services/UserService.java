package com.example.mongodb.services;

import com.example.mongodb.model.User;
import com.example.mongodb.repository.UserRepository;
import com.example.mongodb.utils.Utils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class UserService {

    private static final Logger LOGGER = LogManager.getLogger(com.example.mongodb.services.UserService.class);
    @Autowired
    private UserRepository userRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    public List<User> getAllUser() {
        return userRepository.findAll();
    }

    public void addUser(User user) {
        userRepository.save(user);
    }

    public User getUserById(String id) {
        User user = null;
        Optional<User> optUser = userRepository.findById(id);
        if(optUser.isPresent()){
            user = optUser.get();
        }
        return user;
    }

    public User getUserByUserName(String userName) {
        User user = null;
        Optional<User> optUser = userRepository.findByUsername(userName);
        if(optUser.isPresent()){
            user = optUser.get();
        }
        return user;
    }

    public List<User> findUser(User user) throws Exception {
        Query query = new Query();
        //check name tồn tài mới thêm điều kiện search
        if(!Utils.checkNullOrEmpty(user.getUsername())){
            query.addCriteria(Criteria.where("username").regex(Pattern.compile(Pattern.quote(user.getUsername()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if(!Utils.checkNullOrEmpty(user.getFullName())){
            query.addCriteria(Criteria.where("full_name").regex(Pattern.compile(Pattern.quote(user.getFullName()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if(!Utils.checkNullOrEmpty(user.getEmail())){
            query.addCriteria(Criteria.where("email").regex(Pattern.compile(Pattern.quote(user.getEmail()), Pattern.CASE_INSENSITIVE | Pattern.UNICODE_CASE)));
        }
        if(!Utils.checkNullOrEmpty(user.getStatus())){
            query.addCriteria(Criteria.where("status").is(user.getStatus()));
        }
        List<User> lstUser = mongoTemplate.find(query, User.class);
        return lstUser;
    }
//
}
