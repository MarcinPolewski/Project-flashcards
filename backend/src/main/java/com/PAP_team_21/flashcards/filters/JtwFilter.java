package com.PAP_team_21.flashcards.filters;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
public class JtwFilter extends OncePerRequestFilter {

    private final String jwtSecret;

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request, // this is our request
            @NonNull HttpServletResponse response, // this is our response to request
            @NonNull FilterChain filterChain // this contains list of other filter to be executed - we will call a method to execute next filter
    ) throws ServletException, IOException {
        String token = request.getHeader("Authorization"); // default JWT authorization header
        try{
            if(token != null)
            {
                token = token.substring(7);
                SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));

                Claims claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
                String username = String.valueOf(claims.get("email"));
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, null);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e)
        {
            ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            throw new BadCredentialsException("Invalid token");
        }
        filterChain.doFilter(request, response);
    }
}
