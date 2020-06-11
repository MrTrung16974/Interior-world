package com.example.mongodb.repository;

import com.example.mongodb.model.Product;
import com.example.mongodb.model.ProductModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product,String> {
    Page<Product> findByNameContaining(String name, Pageable pageable);

}
