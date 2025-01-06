package com.PAP_team_21.flashcards.authentication.AuthenticationService;

import com.PAP_team_21.flashcards.Errors.AlreadyVerifiedException;
import com.PAP_team_21.flashcards.Errors.CodeExpiredException;
import com.PAP_team_21.flashcards.Errors.ResourceNotFoundException;
import com.PAP_team_21.flashcards.authentication.AuthenticationResponse;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.folderAccessLevel.FolderAccessLevel;
import com.PAP_team_21.flashcards.entities.folderAccessLevel.FolderAccessLevelRepository;
import com.PAP_team_21.flashcards.entities.sentVerificationCodes.SentVerificationCode;
import com.PAP_team_21.flashcards.entities.sentVerificationCodes.SentVerificationCodeRepository;
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
    private final SentVerificationCodeRepository sentVerificationCodeRepository;

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

        // this will throw an exception if the authentication fails
        authentication = authenticationManager.authenticate(authentication);

        // at this point authentication is successful

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

            return Jwts.builder()
                    .issuer("flashcards")
                    .subject("JWT Token")
                    .claim("email", email)
                    .issuedAt(issued)
                    .expiration(new Date(issued.getTime() + tokenValidTime))
                    .signWith(secretKey)
                    .compact();
        }
        else
        {
            throw new RuntimeException("not an OAuth2 token provided");
        }
    }


    public void sendVerificationEmail(String email)
    {

    }

    private Customer extractCustomer(Authentication authentication) throws ResourceNotFoundException
    {
        String email = authentication.getName();

        Optional<Customer> customerOptional = customerRepository.findByEmail(email);

        if(customerOptional.isEmpty())
        {
            throw new RuntimeException("customer not found");
        }
        return customerOptional.get();
    }
    public void verifyUser(Authentication authentication, String code) throws RuntimeException
    {
        Customer customer = extractCustomer(authentication);
        SentVerificationCode verificationCode = customer.getSentVerificationCode();

        if(verificationCode == null)
        {
            throw new RuntimeException("verification code not found");
        }

        if(customer.isEnabled())
        {
            throw new AlreadyVerifiedException("user already verified");
        }

        if(verificationCode.isExpired())
        {
            throw new CodeExpiredException("verification code expired");
        }


        if(customer.getSentVerificationCode().getCode().equals(code))
        {
            customer.setEnabled(true);
            customer.setSentVerificationCode(null);
            sentVerificationCodeRepository.delete(verificationCode);
            customerRepository.save(customer);

        }
        else
        {
            throw new RuntimeException("verification code is incorrect");
        }
    }

    public void forgotPasswordRequest(String email) {
    }

    public void forgotPassword(String email, String code, String newPassword) {
    }

    public void changePassword(Authentication authentication, String oldPassword, String newPassword) {
    }
}
