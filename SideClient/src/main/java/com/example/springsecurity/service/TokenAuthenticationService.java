package com.example.springsecurity.service;

import com.example.springsecurity.model.User;
import com.example.springsecurity.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class TokenAuthenticationService {
    static final long EXPIRATIONTIME = 864_000_000;
    static final String SECRET = "trungth";

    public String generateJWT(String username) {
        String JWT = Jwts.builder()
                .setSubject(username)
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
    @Autowired
    TokenAuthenticationService tokenAuthenticationService;
    @Autowired
    UserRepository userRepository;

    public boolean validateToKen(String token) {
        try {
            String userId = tokenAuthenticationService.readJWT(token);
            Optional<User> optionalUser = userRepository.findById(userId);
            if(!optionalUser.isPresent()) {
                return false;
            }
            return true;
        }catch (Exception e) {
            return false;
        }
    }
}
