package com.example.mongodb.repository;

import com.example.mongodb.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product,String> {
    Optional<List<Product>> findTop6ByOrderByCreateAtAsc();
    Optional<List<Product>> findTop12ByStarOrderByCreateAtAsc(Integer star);
    Optional<List<Product>> findTop12ByType(Integer type);

//    @Query(value = "SELECT * FROM PRODUCT WHERE LOWER(NAME) LIKE %?1%",
//            countQuery = "SELECT count(*) FROM PRODUCT WHERE LOWER(NAME) = %?1%",
//            nativeQuery = true)
//    Page<Product> findByName(String name, Pageable pageable);
}
