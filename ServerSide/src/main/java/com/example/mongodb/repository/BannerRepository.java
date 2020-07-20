package com.example.mongodb.repository;


import com.example.mongodb.model.Banner;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BannerRepository  extends MongoRepository<Banner,String> {

}

