package com.example.mongodb.services;

import com.example.mongodb.model.User;
import com.example.mongodb.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomUserDetailServices  implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findById(username).get();
        if(user == null) {
            throw new UsernameNotFoundException("User not Found");
        }
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().stream().map(item -> {
            authorities.add(new SimpleGrantedAuthority(item));
            return item;
        }).collect(Collectors.joining());

        return new org.springframework.security.core.userdetails.User(user.getId(), user.getPassword(), authorities);
    }
}
