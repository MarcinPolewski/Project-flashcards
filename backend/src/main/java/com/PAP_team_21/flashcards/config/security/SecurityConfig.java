package com.PAP_team_21.flashcards.config.security;

import com.PAP_team_21.flashcards.filters.JtwFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{

    private final JtwFilter jwtFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    protected SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests( auth->
                        auth.requestMatchers("/actuator/health")// Allow unauthenticated access to /actuator/health
                        .permitAll()
                        .requestMatchers("/api/auth/**") // allow unauthenticated access to auth endpoints
                        .permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin( Customizer.withDefaults())
                .oauth2Login( oauth -> oauth
                        .defaultSuccessUrl("/api/auth/oauth2/success", true)
                )
                .httpBasic(Customizer.withDefaults())
                        .addFilterAfter(jwtFilter, BasicAuthenticationFilter.class);


        return http.build();
    }


    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public UserDetailsService userDetailsService()
    {
        return userDetailsService;
    }
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
                                                       PasswordEncoder passwordEncoder)
    {
        UsernamePasswordAuthentication authProvider = new UsernamePasswordAuthentication(userDetailsService, passwordEncoder);
        ProviderManager providerManager = new ProviderManager(authProvider);
        providerManager.setEraseCredentialsAfterAuthentication(false);
        return providerManager;
    }
}