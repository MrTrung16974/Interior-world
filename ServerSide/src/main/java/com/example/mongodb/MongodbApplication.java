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
//    UserRepository userRepository;
//    @Autowired
//    RoleRepository roleRepository;
//    @Autowired
//    FunctionRepository functionRepository;
//    @Autowired
//    PasswordEncoder passwordEncoder;
//
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
//            p.setType(new Type(1,2, 111, 200, 45, 200, "Yes" ));
//            p.setPromotion(new Promotion("1/4", 20));
//            p.setStar(5);
//            p.setImage(lstImage);
//            p.setId(""+i);
//            p.setDescription("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?");
//            p.setCreateAt(new Date());
//            productRepository.save(p);
//            lstPrice.clear();
//       }
//        System.out.println("End");
//
////        User user = new User();
////        user.setUserId("1");
////        user.setUsername("trung123");
////        user.setPassword(passwordEncoder.encode("123456"));
////        user.setEmail("admin@gmail.com");
////        user.setRoleID("USER");
////        user.setStatus(1);
//
////        Role role = new Role();
////        role.setRoleID("USER");
////        role.setDescription("Khách ion();
//        function.setId("VIEW");
//        function.setName("Xem chi tiết");
//        Function function2 = new Function();
//        function2.setId("EDIT");
//        function2.setName("Sửa chi tiết");
//        Set<Function> setFunc = new HashSet<>();
//        setFunc.add(function);
//        setFunc.add(function2);
//        role.setFunctions(setFunc);
//        roleRepository.save(role);
//        userRepository.save(user);
//        functionRepository.save(function);
//        functionRepository.save(function2);
//    }
}
