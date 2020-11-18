package com.example.jwt;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/comps")
public class CompanyController {
    @GetMapping("/one")
    public String first(){
        return "Srushti";
    }

    @GetMapping("/two")
    public String Two(){
        return "SRT";
    }
}
