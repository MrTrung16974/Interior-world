package com.example.mongodb.repository;

import com.example.mongodb.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepository extends MongoRepository<ChatMessage,String> {

}
