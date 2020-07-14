//package com.example.mongodb.config;
//
//import com.example.mongodb.services.CustomUserDetailServices;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Configuration
//@EnableWebSecurity(debug = true)
//public class    APISecurityConfig extends WebSecurityConfigurerAdapter {
//    @Autowired
//    CustomUserDetailServices userDetailsService;
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
//    }
//
////    @Override
////    public void configure(AuthenticationManagerBuilder builder) throws Exception {
////        builder.userDetailsService(userDetailsService);
////    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
////        http
////                //HTTP Basic authentication
////                .httpBasic()
////                .and()
////                .authorizeRequests()
////                .antMatchers(HttpMethod.GET, "/**").hasRole("ADMIN")
////                .antMatchers(HttpMethod.GET, "/index/**").hasRole("ADMIN")
////                .antMatchers(HttpMethod.POST, "/product").hasRole("ADMIN")
////                .antMatchers(HttpMethod.PUT, "/product/**").hasRole("ADMIN")
////                .antMatchers(HttpMethod.PATCH, "/product/**").hasRole("ADMIN")
////                .antMatchers(HttpMethod.DELETE, "/product/**").hasRole("ADMIN")
////                .and()
////                .csrf().disable()
////                .formLogin().disable();
//        http
//                .csrf().disable()
//                .formLogin().disable()
//                .authorizeRequests()
////                .antMatchers("/**").access("hasAnyAuthority('USER')")
//                .antMatchers("/**").permitAll()
//                .anyRequest().authenticated()
//                .and().httpBasic();
////                .and()
////                .sessionManagement().disable()
//    }
//
//}
