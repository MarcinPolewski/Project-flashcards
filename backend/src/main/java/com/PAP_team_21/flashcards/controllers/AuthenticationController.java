package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.authentication.AuthenticationRequest;
import com.PAP_team_21.flashcards.authentication.AuthenticationResponse;
import com.PAP_team_21.flashcards.authentication.AuthenticationService.AuthenticationService;
import com.PAP_team_21.flashcards.authentication.RegisterRequest;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.folderAccessLevel.FolderAccessLevel;
import com.PAP_team_21.flashcards.entities.folderAccessLevel.FolderAccessLevelRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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

    private final AuthenticationService authenticationService;

    @GetMapping("/oauth2/success")
    public  ResponseEntity<?> oauth2Success(Authentication authentication) {
        // @TODO should this be verified ??
        try {
            return ResponseEntity.ok(new AuthenticationResponse(authenticationService.convertOAuth2ToJWT(authentication)));
        } catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("exception occurred: " + e.getMessage());
        }
    }

    // endpoints for oauth2 login are autmatically created by spring security at:
    // http://localhost:8080/oauth2/authorization/<provider>


    @PostMapping("/register")
    public ResponseEntity<String> registerUser(
            @RequestBody RegisterRequest request
    )
    {
        try{
            authenticationService.registerUser(request.getEmail(), request.getUsername(), request.getPassword());
            return ResponseEntity.status(HttpStatus.CREATED).body("customer registered");
        }
        catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("exception occurred: " + e.getMessage());
        }
    }

    @PostMapping("/usernamePasswordLogin")
    public ResponseEntity<?> usernamePasswordLogin(
            @RequestBody AuthenticationRequest request
    ){
        try{
            return ResponseEntity.ok(new AuthenticationResponse(authenticationService.loginUser(request.getEmail(), request.getPassword())));
        } catch(AuthenticationException e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
