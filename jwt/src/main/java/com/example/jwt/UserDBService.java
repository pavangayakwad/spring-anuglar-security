package com.example.jwt;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;

@Component
public class UserDBService implements UserDetailsService {

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        if(s.equals("admin")){
            UserData ud = new UserData();
            ud.setFullName("Admin Kumar");
            ud.setPassword(new BCryptPasswordEncoder().encode("check"));
            ud.setUsername("admin");
            return  new User(ud.getUsername(),ud.getPassword(), Collections.emptyList());
        }
            throw new UsernameNotFoundException(s);
    }
}
