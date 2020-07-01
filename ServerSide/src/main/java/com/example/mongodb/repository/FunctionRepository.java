package com.example.mongodb.repository;

import com.example.mongodb.model.Function;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FunctionRepository extends MongoRepository<Function,String> {
}
