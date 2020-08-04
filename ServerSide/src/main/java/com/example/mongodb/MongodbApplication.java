package com.example.mongodb;

import com.example.mongodb.dto.product.Price;
import com.example.mongodb.repository.*;
import com.example.mongodb.services.TokenAuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class MongodbApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(MongodbApplication.class, args);
    }

    @Autowired
    SlideRepository bannerRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    FunctionRepository functionRepository;
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    TokenAuthenticationService tokenAuthenticationService;

    @Override
    public void  run(String...args) throws Exception {
//        bannerRepository.save(new Banner("/login","Login / Register ","http://localhost:8099/link/1593668066-login-banner.jpg"));
//        bannerRepository.save(new Banner("/account-info","Account Info ","http://localhost:8099/link/1593669489-account-banner.jpg"));
//        bannerRepository.save(new Banner("/cart","Shopping Cart","http://localhost:8099/link/1593668032-cart-banner.jpg"));
//        bannerRepository.save(new Banner("/shop","Shop Category ","http://localhost:8099/link/1593669308-shop-banner.jpg"));
//        bannerRepository.save(new Banner("/checkout","Product Checkout","http://localhost:8099/link/1593668045-checkout-banner.jpg"));
//        bannerRepository.save(new Banner("/confirmation","Order Confirmation","http://localhost:8099/link/1593669249-order-banner.jpg"));
//        bannerRepository.save(new Banner("/contact","Contact Us","http://localhost:8099/link/1593668051-contact-banner.jpg"));
//        bannerRepository.save(new Banner("/favourite","Shopping Favourite","http://localhost:8099/link/1593668058-favourite-banner.jpg"));
//        bannerRepository.save(new Banner("/register","Register ","http://localhost:8099/link/1593668079-register-banner"));
//        bannerRepository.save(new Banner("/product-details","Single Product","http://localhost:8099/link/1593668072-product-banner.jpg"));
//        bannerRepository.save(new Banner("/traking-order","Tracking Order ","http://localhost:8099/link/1593669204-traking-banner.jpg"));


//        List<String> lstImage = new ArrayList<>();
            List<Price> lstPrice = new ArrayList<>();
//            lstImage.add("http://localhost:8099/link/1590817275-1.jpg");
//            lstImage.add("http://localhost:8099/link/1590817280-3.jpg");
//            lstImage.add("http://localhost:8099/link/1591186178-7.jpg");
//            lstImage.add("http://localhost:8099/link/1591186190-8.jpg");
//            lstPrice.add(new Price(1, "Black", 200.0));
//            lstPrice.add(new Price(2, "White", 300.0));
//            lstPrice.add(new Price(3, "Yellow", 400.0));
//            lstPrice.add(new Price(4,"Blue", 500.0));
//            lstPrice.add(new Price(4,"Blue", 500.0));
//            for (int i =90; i <100; i++) {
//                Product p = new Product();
//                p.setName("Name " + i);
//                p.setPriceForColor(lstPrice);
//                p.setPrice(i*100.0);
//                p.setType(new Type(4,2, 1121, 2000, 45, 50, "Yes" ));
//                p.setPromotion(new Promotion("1/4", 20));
//                p.setStar(5);
//                p.setImage(lstImage);
//                p.setId(""+i);
//                p.setDescription("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?");
//                p.setLongDescription("Error ornare autem maiores pariatur donec! Consectetuer pharetra, distinctio ridiculus mollitia! Labore excepteur blanditiis fugit, diam porta placeat? Fermentum numquam suscipit, aliquet orci tempor. Fringilla, voluptas, sint tincidunt, vestibulum ac tempus? Maecenas ad lectus quam mauris consequuntur hac magna magnis impedit libero, ullamco mi soluta, doloribus purus nonummy inceptos officiis suspendisse ac rhoncus mollit, felis ducimus sodales do est aliquid! Lacus alias rerum potenti qui minus primis rutrum, dolorem sollicitudin officiis voluptates, ante reprehenderit fames excepteur reprehenderit. Mollit, quos nemo? Fringilla fuga porttitor nostrud? Ex enim accusamus hendrerit fuga atque! Perspiciatis cubilia. Venenatis nunc mollit purus pellentesque sodales. Earum pellentesque occaecat, error, ipsam sapien penatibus etiam dictumst veritatis, metus praesentium alias porttitor in reiciendis felis voluptatem maecenas voluptates irure aliqua, fugit? Fugiat dolorem felis varius! Lacinia sociosqu labore, facilis tempore quidem animi, nostrum laborum ridiculus vehicula quos penatibus. Aliquid nam? Mauris, egestas, senectus, esse. Voluptatum dui rerum facilisis, ullam ratione anim voluptates illum ullamco integer hac cupiditate, cupiditate pulvinar explicabo interdum. Aliquam. Quaerat augue. Venenatis, voluptates cupidatat ex! Voluptate diam perferendis illum aenean quisque iste, accusantium. Nesciunt ut eum lorem, venenatis, beatae aliquip? Animi, diam, soluta! Lorem duis veniam netus tempor morbi, deserunt illum potenti? Sociis, unde fusce perferendis asperiores? Numquam dictum autem veniam. Posuere aliqua quas donec ipsam diam? Magna pede cupiditate varius consectetuer fames risus dignissimos facere dolorem, dictumst? Et accumsan wisi, expedita! Dignissim porro nec, faucibus vehicula deleniti minim sodales unde, curabitur tenetur excepturi, congue adipisicing metus? Aliquid laudantium tristique facere, nostra ipsum iaculis, hendrerit, primis explicabo minim ridiculus eveniet, quis, ridiculus ut quisquam curabitur aliquip viverra. Nulla posuere fames quisquam! Incididunt inventore tellus facilisis aptent tristique, iste aliquam, dignissim numquam euismod. Amet, laoreet quas autem, gravida adipisci class habitasse doloribus et, varius diam fames, lacinia, massa voluptatum dolores porttitor adipisicing, platea excepteur nunc anim inceptos sem. Provident, sapien distinctio quas phasellus nobis nisi per nullam class lacinia minim illo mi vivamus. Vehicula nostrud nulla ducimus asperiores. Nisl euismod quos justo. Quas ullamcorper nonummy eros elementum condimentum? Iaculis rem! Anim, orci, cupiditate deserunt, mi maxime error curae laoreet molestiae blandit, id. Unde corporis molestie voluptas blandit ultrices.");
//                p.setCreateAt(new Date());
//                productRepository.save(p);
//       }
//        priceRepository.save(new Price(1, "Black", 200.0));
//        priceRepository.save(new Price(2, "White", 300.0));
//        priceRepository.save(new Price(3, "Yellow", 400.0));
//        priceRepository.save(new Price(4,"Blue", 500.0));
//        priceRepository.save(new Price(5,"Other", 600.0));
//        System.out.println("End");

//        User user = new User();
//        user.setUserId("1");
//        user.setUsername("trung123");
//        user.setPassword(passwordEncoder.encode("123456"));
//        user.setEmail("admin@gmail.com");
//        user.setRoleID("USER");
//        user.setStatus(1);
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

//        bannerRepository.save(new Banner("/account-info","Account Info","https://aromaserver16974.herokuapp.com/aroma/link/1593669489-account-banner.jpg"));
//        bannerRepository.save(new Banner("/cart","Shopping Cart","https://aromaserver16974.herokuapp.com/aroma/link/1593668032-cart-banner.jpg"));
//        bannerRepository.save(new Banner("/checkout","Product Checkout","https://aromaserver16974.herokuapp.com/aroma/link/1593668045-checkout-banner.jpg"));
//        bannerRepository.save(new Banner("/confirmation","Order Confirmation","https://aromaserver16974.herokuapp.com/aroma/link/1593669249-order-banner.jpg"));
//        bannerRepository.save(new Banner("/contact","Contact Us","https://aromaserver16974.herokuapp.com/aroma/link/1593668051-contact-banner.jpg"));
//        bannerRepository.save(new Banner("/favourite","Shopping Favourite","https://aromaserver16974.herokuapp.com/aroma/link/1593668058-favourite-banner.jpg"));
//        bannerRepository.save(new Banner("/login","Login / Register ","https://aromaserver16974.herokuapp.com/aroma/link/1593668066-login-banner.jpg"));
//        bannerRepository.save(new Banner("/product-details","Single Product","https://aromaserver16974.herokuapp.com/aroma/link/1593668051-contact-banner.jpg"));
//        bannerRepository.save(new Banner("/register","Register","https://aromaserver16974.herokuapp.com/aroma/link/1593670358-register-banner.jpg"));
//        bannerRepository.save(new Banner("/shop","Shop Category","https://aromaserver16974.herokuapp.com/aroma/link/1594035238-shop-banner.jpg"));
//        bannerRepository.save(new Banner("/traking-order","Tracking Order ","https://aromaserver16974.herokuapp.com/aroma/link/1593669204-traking-banner.jpg"));
//        System.out.println("End");
    }
}



