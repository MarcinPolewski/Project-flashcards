package com.PAP_team_21.flashcards.controllers;


import com.PAP_team_21.flashcards.controllers.requests.AuthorityCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.AuthorityUpdateRequest;
import com.PAP_team_21.flashcards.entities.authority.Authority;
import com.PAP_team_21.flashcards.entities.authority.AuthorityRepository;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/authority")
@RequiredArgsConstructor
public class AuthorityController {
    private final AuthorityRepository authorityRepository;
    private final CustomerRepository customerRepository;

    @GetMapping("/allAuthorities")
    public ResponseEntity<?> getAllAuthorities(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam() int deckId
    )
    {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        List<Authority> authorities = authorityRepository.findAll(pageable).getContent();

        if (authorities.isEmpty()) {
            return ResponseEntity.badRequest().body("No authorities found");
        }
        return ResponseEntity.ok(authorities);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAuthority(Authentication authentication, @PathVariable int id) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Authority> authorityOpt = authorityRepository.findById(id);

        if (authorityOpt.isPresent()) {
            return ResponseEntity.ok(authorityOpt.get());
        }
        return ResponseEntity.badRequest().body("No authority with this id found");
    }

    @PostMapping("/create")
    public ResponseEntity<?> createAuthority(Authentication authentication,
                                             @RequestBody AuthorityCreationRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Authority authority = new Authority(request.getName());
        authorityRepository.save(authority);

        return ResponseEntity.ok(authority);
    }

    @PostMapping("/update{id}")
    public ResponseEntity<?> updateAuthority(Authentication authentication,
                                             @PathVariable int id,
                                             @RequestBody AuthorityUpdateRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Authority> authorityOpt = authorityRepository.findById(id);
        if(authorityOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user found with this id");
        }

        Authority authority = authorityOpt.get();

        authority.setName(request.getName());
        authorityRepository.save(authority);

        return ResponseEntity.ok(authority);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAuthority(Authentication authentication, @RequestParam int authorityId) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);

        if(customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user found with this id");
        }

        Optional<Authority> authorityToDeleteOpt = authorityRepository.findById(authorityId);

        if (authorityToDeleteOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Authority not found");
        }
        authorityRepository.delete(authorityToDeleteOpt.get());
        return ResponseEntity.ok("Authority deleted successfully");
    }
}
