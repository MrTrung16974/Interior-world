package com.example.mongodb;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class MongodbApplication {
//        implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(MongodbApplication.class, args);
    }

//    @Autowired
//    ProductRepository productRepository;
//    @Autowired
//    TokenAuthenticationService tokenAuthenticationService;
//
//    @Override
//    public void  run(String...args) throws Exception {
//        for (int i =60; i <70; i++) {
//            Product p = new Product();
//            p.setName("Name " + i);
//            p.setPrice((double)i*100);
//            p.setType(6);
//            p.setColor(2);
//            p.setMaterial(2);
//            p.setPromotion(new Promotion("1/4", 20));
//            p.setStar(4);
//            p.setImage(new Image("http://localhost:8099/link/1590817275-1.jpg",
//                    "http://localhost:8099/link/1590817280-3.jpg",
//                    "http://localhost:8099/link/1591186178-7.jpg",
//                    "http://localhost:8099/link/1591186190-8.jpg"));
//            p.setId(""+i);
//            p.setDescription("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?");
//            p.setCreateAt(tokenAuthenticationService.simpleDateFormat(new Date()));
//            productRepository.save(p);
//        }
//        System.out.println("End");
//    }
}
