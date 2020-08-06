package com.example.mongodb.repository;

import com.example.mongodb.model.Category;
import com.example.mongodb.model.Material;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category,String> {
}
