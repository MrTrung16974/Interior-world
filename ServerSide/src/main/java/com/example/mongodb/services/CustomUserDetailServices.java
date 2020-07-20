package com.example.mongodb.services;

import com.example.mongodb.model.User;
import com.example.mongodb.repository.UserRepository;
import com.example.mongodb.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
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
    @Autowired
    private RoleService roleService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username).get();
        if(user == null) {
            throw new UsernameNotFoundException("User not Found");
        }
        String roleID = user.getRoleID();
        List<GrantedAuthority> grantList = new ArrayList<>();
        if (roleID != null) {
            roleService.findByID(roleID).getFunctions().stream().map((function) -> new SimpleGrantedAuthority(function.getId())).forEachOrdered((authority) -> {
                grantList.add(authority);
            });
            if(roleID.equals(Constant.ROLE_SUPER_ID)){
                grantList.add(new SimpleGrantedAuthority(roleService.findByID(roleID).getRoleCode()));
            }
        }
        UserDetails userDetails = (UserDetails) new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getStatus() == 1, user.getStatus() != 2, user.getStatus() != 2, user.getStatus() != 3, grantList);
        return userDetails;
    }
}
