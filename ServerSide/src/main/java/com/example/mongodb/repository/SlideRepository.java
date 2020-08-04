package com.example.mongodb.repository;


import com.example.mongodb.model.Slide;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SlideRepository extends MongoRepository<Slide,String> {

}

