package com.PAP_team_21.flashcards.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .requestMatchers("/actuator/health").permitAll()  // Allow unauthenticated access to /actuator/health
                .anyRequest().authenticated()                       // Require authentication for other endpoints
                .and()
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}