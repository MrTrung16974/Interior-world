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
//        List<String> lstImage = new ArrayList<>();
//        List<Price> lstPrice = new ArrayList<>();
//        lstImage.add("http://localhost:8099/link/1590817275-1.jpg");
//        lstImage.add("http://localhost:8099/link/1590817280-3.jpg");
//        lstImage.add("http://localhost:8099/link/1591186178-7.jpg");
//        lstImage.add("http://localhost:8099/link/1591186190-8.jpg");
//        lstPrice.add(new Price(1, "Black", 200.0));
//        lstPrice.add(new Price(2, "White", 300.0));
//        lstPrice.add(new Price(3, "Yellow", 400.0));
//        lstPrice.add(new Price(4,"Blue", 500.0));
//        for (int i =60; i <70; i++) {
//            Product p = new Product();
//            p.setName("Name " + i);
//            p.setPriceForColor(lstPrice);
//            p.setPrice(i*100.0);
//            p.setType(new Type(3,0));
//            p.setPromotion(new Promotion("1/4", 20));
//            p.setStar(4);
//            p.setImage(lstImage);
//            p.setId(""+i);
//            p.setDescription("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?");
//            p.setCreateAt(tokenAuthenticationService.simpleDateFormat(new Date()));
//            productRepository.save(p);
//            lstPrice.clear();
//        }
//        System.out.println("End");
//    }
}
