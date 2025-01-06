package com.PAP_team_21.flashcards.authentication.AuthenticationService;

import com.PAP_team_21.flashcards.authentication.AuthenticationResponse;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.folderAccessLevel.FolderAccessLevel;
import com.PAP_team_21.flashcards.entities.folderAccessLevel.FolderAccessLevelRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
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
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomerRepository customerRepository;
    private final FolderAccessLevelRepository folderAccessLevelRepository;

    @Value("${jwt.token-valid-time}")
    private long tokenValidTime;

    @Value("${jwt.secret-key}")
    private String jwtSecret;

    public void registerUser(String email, String name,  String password) throws RuntimeException{
        String passwordHash = passwordEncoder.encode(password);


        Customer customer = new Customer(email, name, passwordHash);
        customer.setProfileCreationDate(LocalDateTime.now());

        FolderAccessLevel al = customer.getFolderAccessLevels().get(0);

        // @TODO why customerReposiotory.save() doednt work - solution below works just fine

        Optional<Customer> opt = customerRepository.findByEmail(email);
        if(opt.isPresent())
        {
            throw new RuntimeException("user already exists");
        }
        folderAccessLevelRepository.save(al);
    }

    public String loginUser(String email, String password) throws AuthenticationException {
        String token =" ";
        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(
                email, password
        );
        authentication = authenticationManager.authenticate(authentication);
        if(authentication != null && authentication.isAuthenticated())
        {
            SecretKey secretKey = Keys.hmacShaKeyFor(jwtSecret.getBytes(StandardCharsets.UTF_8));
            Date issued = new Date(System.currentTimeMillis());

            token = Jwts.builder()
                    .issuer("flashcards")
                    .subject("JWT Token")
                    .claim("email", email)
                    .issuedAt(issued)
                    .expiration(new Date(issued.getTime() + tokenValidTime))
                    .signWith(secretKey)
                    .compact();
        }

        return token;
    }

    public String convertOAuth2ToJWT(Authentication authentication)
    {
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


            return token;
        }
        else
        {
            throw new RuntimeException("not an OAuth2 token provided");
        }
    }

    public void verifyUser(String verificationToke)
    {

    }

    public void sendVerificationEmail(String email)
    {

    }
}
