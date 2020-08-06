package com.example.mongodb.repository;

import com.example.mongodb.model.Function;
import com.example.mongodb.model.Material;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MaterialRepository extends MongoRepository<Material,String>{
}
