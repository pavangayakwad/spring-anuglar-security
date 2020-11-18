package com.example.jwt;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @GetMapping("/test")
    public String test() {
        return "working fine!";
    }

    @GetMapping("/signup")
    public String signup(){
        return "new user!!!";
    }
}