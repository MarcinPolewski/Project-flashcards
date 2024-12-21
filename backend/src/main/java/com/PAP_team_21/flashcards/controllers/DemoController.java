package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.authentication.AuthenticationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/demo")
public class DemoController {
    @GetMapping("/this-is-secure")
    public ResponseEntity<String> secured(Authentication authentication)
    {
        String email = (String)((UsernamePasswordAuthenticationToken)authentication).getPrincipal();
        return ResponseEntity.ok("hello, your email is: " + email);
//        if (authentication instanceof UsernamePasswordAuthenticationToken)
//        {
//            String email = ((UsernamePasswordAuthenticationToken)authentication).getPrincipal();
//        }
//        else if( authentication instanceof OAuth2AuthenticationToken)
//        {
//            // z tego authentication można wyciągnąc mail
//            ((OAuth2AuthenticationToken)authentication).getPrincipal().getAttribute("email");
//
//        }
//        return "secured";
    }
}
