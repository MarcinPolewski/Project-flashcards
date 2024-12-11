package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.authentication.AuthenticationRequest;
import com.PAP_team_21.flashcards.authentication.AuthenticationResponse;
import com.PAP_team_21.flashcards.authentication.RegisterRequest;
import com.PAP_team_21.flashcards.customer.Customer;
import com.PAP_team_21.flashcards.customer.CustomerRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomerRepository customerRepository;

    @Value("${jwt.token-valid-time}")
    private long tokenValidTime;

    @Value("${jwt.secret-key}")
    private String jwtSecret;
    @GetMapping("/oauth2/success")
    public  ResponseEntity<?> oauth2Success(Authentication authentication)
    {
        // @TODO should this be verified ??

        /* successful social logins will be redirected here, to obtain JWT */
        if(authentication instanceof OAuth2AuthenticationToken)
        {
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

            String email = oAuth2User.getAttribute("email");
            String name = oAuth2User.getName();

            Optional<Customer> userOptional = customerRepository.findByEmail(email);
            Customer user;
            if(userOptional.isPresent())
            {
                user = userOptional.get();
            } else {
                user = new Customer(name, email, null);
                user.setProfileCreationDate(LocalDateTime.now());
                user = customerRepository.save(user);
            }
//            Customer user = customerRepository.findOrCreate(email);
            // String token = jwtService.generateToken(customer);

            Date issued = new Date(System.currentTimeMillis());
            SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());

            String token = Jwts.builder()
                    .issuer("flashcards")
                    .subject("JWT Token")
                    .claim("email", email)
                    .issuedAt(issued)
                    .expiration(new Date(issued.getTime() + tokenValidTime))
                    .signWith(secretKey)
                    .compact();


            return ResponseEntity.ok(Map.of("token", token, "customer", user));
        }

        return ResponseEntity.badRequest().build();
    }

    // endpoints for oauth2 login are autmatically created by spring security at:
    // http://localhost:8080/oauth2/authorization/<provider>


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(
            @RequestBody RegisterRequest request
    )
    {
        try
        {
            String passwordHash = passwordEncoder.encode(request.getPassword());
            String name = request.getUsername();
            String email = request.getEmail();

            Customer customer = new Customer(name, email, passwordHash);
            customer.setProfileCreationDate(LocalDateTime.now());

            Customer saved = customerRepository.save(customer);

            if(saved.getId() > 0)
            {
                return ResponseEntity.status(HttpStatus.CREATED).body("customer registered");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("registration failed");
            }
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("exception occurred: " + e.getMessage());
        }
    }

    @PostMapping("/usernamePasswordLogin")
    public ResponseEntity<AuthenticationResponse> usernamePasswordLogin(
            @RequestBody AuthenticationRequest request
    ){
        String token =" ";
        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
                request.getEmail(),
                request.getPassword()
        );
        authentication = authenticationManager.authenticate(authentication);
        if(authentication != null && authentication.isAuthenticated())
        {
            SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

            Date issued = new Date(System.currentTimeMillis());

            token = Jwts.builder()
                    .issuer("flashcards")
                    .subject("JWT Token")
                    .claim("email", request.getEmail())
                    .issuedAt(issued)
                    .expiration(new Date(issued.getTime() + tokenValidTime))
                    .signWith(secretKey)
                    .compact();
        }

        return ResponseEntity.ok(new AuthenticationResponse(token));

    }

}
