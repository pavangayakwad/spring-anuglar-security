package com.example.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    private UserDBService userDb = new UserDBService();

    private static final String[] WHITELIST = {
        "/comps"
    };

//    public WebSecurityConfig(BCryptPasswordEncoder cypt){
//        this.bCryptPasswordEncoder = cypt;
//    }


    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(WHITELIST).permitAll()
                .antMatchers(HttpMethod.GET, "/api/users/signup").permitAll()
                .anyRequest().authenticated()
                .and().addFilter(new JWTAuthFilter(this.authenticationManager()))
                .addFilter(new AuthorizationFilter(this.authenticationManager()))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ;

    }

    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDb).passwordEncoder(this.bCryptPasswordEncoder);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.applyPermitDefaultValues();
        corsConfig.setExposedHeaders(Arrays.asList("Access-Control-Allow-Headers", "Authorization, x-xsrf-token, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, " +
                "Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"));
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }

    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/comps/*");
    }
}
