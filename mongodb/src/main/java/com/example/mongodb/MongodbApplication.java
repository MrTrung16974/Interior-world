package com.example.mongodb;


import com.example.mongodb.model.Image;
import com.example.mongodb.model.Product;
import com.example.mongodb.model.Promotion;
import com.example.mongodb.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Date;

@SpringBootApplication
public class MongodbApplication {
//        implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(MongodbApplication.class, args);
    }

//    @Autowired
//    ProductRepository productRepository;
//
//    @Override
//    public void  run(String...args) throws Exception {
//        for (int i =40; i <50; i++) {
//            Product p = new Product();
//            p.setName("Name " + i);
//            p.setPrice((double)i*100);
//            p.setType(5);
//            p.setColor(7);
//            p.setMaterial(2);
//            p.setPromotion(new Promotion("1/4", 20));
//            p.setStar(5);
//            p.setImage(new Image("http://localhost:8099/link/1590817275-1.jpg",
//                    "http://localhost:8099/link/1590817280-3.jpg",
//                    "http://localhost:8099/link/1591186178-7.jpg",
//                    "http://localhost:8099/link/1591186190-8.jpg"));
//            p.setId(""+i);
//            p.setDescription("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?");
//            p.setCreateAt(new Date());
//            productRepository.save(p);
//        }
//        System.out.println("End");
//    }
}
