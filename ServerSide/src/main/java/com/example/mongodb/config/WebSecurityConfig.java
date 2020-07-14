package com.example.mongodb.config;

import com.example.mongodb.services.CustomUserDetailServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    final static Logger LOGGER = LoggerFactory.getLogger(WebSecurityConfig.class);

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Autowired
    private CustomUserDetailServices userDetailsService;

//    @Autowired
//    CustomAuthenticationSuccessHandler authenticationSuccessHandler;

    @Autowired
    URLAccessConfiguration urlAccessConfig;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.headers().frameOptions().disable();
        if (urlAccessConfig.getAuthorizations() != null) {
            for (URLAccessEntity ua : urlAccessConfig.getAuthorizations()) {
                LOGGER.debug("Set authorization. url: {}. permission: {}", ua.getUrl(), ua.getAccess());
                http.authorizeRequests().antMatchers(ua.getUrl().replace(" ", "").split(",")).access(ua.getAccess());
            }
        }
        http.authorizeRequests().mvcMatchers("/login/**").permitAll();
        http.authorizeRequests().mvcMatchers("/**").access("hasAnyAuthority('EDIT')");
        http.authorizeRequests().and().exceptionHandling().accessDeniedPage("/403");
        http.authorizeRequests().and().formLogin()//
                // Submit URL của trang login
                .loginProcessingUrl("/login") // Submit URL
                .loginPage("/login")//
                .failureUrl("/login?error=true")//
                .successForwardUrl("/")
                .usernameParameter("username")//
                .passwordParameter("password")
                .successHandler(new SavedRequestAwareAuthenticationSuccessHandler())
                // Cấu hình cho Logout Page.
                .and().logout().logoutUrl("/logout").logoutSuccessUrl("/login");
    }

    @Override
    public void configure(WebSecurity web) {
        web.debug(false);
    }
}
