package com.PAP_team_21.flashcards.controllers;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DemoController {
    @GetMapping("/this-is-secure")
    public String secured(Authentication authentication)
    {

        if (authentication instanceof UsernamePasswordAuthenticationToken)
        {
            String email = ((UsernamePasswordAuthenticationToken)authentication).getName();
        }
        else if( authentication instanceof OAuth2AuthenticationToken)
        {
            // z tego authentication można wyciągnąc mail
            ((OAuth2AuthenticationToken)authentication).getPrincipal().getAttribute("email");

        }
        return "secured";
    }
}
