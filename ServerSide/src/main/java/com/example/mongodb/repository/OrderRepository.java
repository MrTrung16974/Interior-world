package com.example.mongodb.repository;

import com.example.mongodb.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order,String> {
    Optional<Order> findByBuyerAndStatus(String id, Integer status);
    Optional<Order> findByBuyer(String id);
    Optional<List<Order>> findAllByStatus(Integer status);
    Optional<List<Order>> findAllByStatusGreaterThan(Integer status);
}
