package com.example.springsecurity.repository;

import com.example.springsecurity.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
