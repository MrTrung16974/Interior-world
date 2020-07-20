package com.example.mongodb.services;

import ch.qos.logback.classic.pattern.DateConverter;
import com.example.mongodb.model.User;
import com.example.mongodb.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class TokenAuthenticationService {
    @Autowired
    TokenAuthenticationService tokenAuthenticationService;
    @Autowired
    UserRepository userRepository;

    static final long EXPIRATIONTIME = 864_000_000;
    static final String SECRET = "trungth";

    public String generateJWT(String username) {
        Map<String,Object> roles = new HashMap();
        roles.put("roles","ADMIN");
        String JWT = Jwts.builder()
                .setSubject(username)
//                .setClaims(roles)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
        return JWT;
    }

    public String readJWT(String token) {
        if (token != null) {
            String user = Jwts.parser()
                    .setSigningKey(SECRET)
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            return user;
        }
        return null;
    }

    public boolean validateToKen(String token) {
        try {
            String userName = tokenAuthenticationService.readJWT(token);
            System.out.println(userName);
            Optional<User> optionalUser = userRepository.findByUsername(userName);
            if(!optionalUser.isPresent()) {
                return false;
            }
            return true;
        }catch (Exception e) {
            return false;
        }
    }
}
