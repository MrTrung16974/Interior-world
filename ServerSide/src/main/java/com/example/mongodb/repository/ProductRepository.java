package com.example.mongodb.repository;

import com.example.mongodb.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends MongoRepository<Product,String> {
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
    List<Product> findByStarOrderByCreateAtAsc(Integer star);

//    @Query(value = "SELECT * FROM PRODUCT WHERE LOWER(NAME) LIKE %?1%",
//            countQuery = "SELECT count(*) FROM PRODUCT WHERE LOWER(NAME) = %?1%",
//            nativeQuery = true)
//    Page<Product> findByName(String name, Pageable pageable);
}
