package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.controllers.requests.UserPreferencesCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.UserPreferencesUpdateRequest;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.userPreferences.UserPreferences;
import com.PAP_team_21.flashcards.entities.userPreferences.UserPreferencesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/userPreferences")
@RequiredArgsConstructor
public class UserPreferencesController {

    private final UserPreferencesRepository userPreferencesRepository;
    private final CustomerRepository customerRepository;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserPreferences(Authentication authentication, @PathVariable int id) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<UserPreferences> userPreferencesOpt = userPreferencesRepository.findById(id);
        if (userPreferencesOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No userPreferences with this id found");
        }
        UserPreferences userPreferences = userPreferencesOpt.get();

       if (userPreferences.getUserId() != customerOpt.get().getId()) {
           return ResponseEntity.badRequest().body("UserPreferences do not belong to user");
       }

       return ResponseEntity.ok(userPreferences);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUserPreferences(Authentication authentication,
                                                   @RequestBody UserPreferencesCreationRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        if (request.getUserId() != customerOpt.get().getId()) {
            return ResponseEntity.badRequest().body("UserPreferences do not belong to user");
        }

        UserPreferences userPreferences = new UserPreferences(request.getUserId(), request.isDarkMode(),
                                                                request.getLanguage());
        userPreferencesRepository.save(userPreferences);
        return ResponseEntity.ok(userPreferences);
    }

    @PostMapping("/update")
    public ResponseEntity<?> createUserPreferences(Authentication authentication,
                                                   @RequestBody UserPreferencesUpdateRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<UserPreferences> userPreferencesOpt = userPreferencesRepository.findById(
                                                        request.getUserPreferencesId());
        if (userPreferencesOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No userPreferences with this id found");
        }
        UserPreferences userPreferences = userPreferencesOpt.get();

        if (userPreferences.getUserId() != customerOpt.get().getId()) {
            return ResponseEntity.badRequest().body("UserPreferences do not belong to user");
        }

        userPreferences.setDarkMode(request.isDarkMode());
        userPreferences.setLanguage(request.getLanguage());
        userPreferencesRepository.save(userPreferences);
        return ResponseEntity.ok(userPreferences);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUserPreferences(Authentication authentication,
                                                   @RequestParam int userPreferencesId) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<UserPreferences> userPreferencesOpt = userPreferencesRepository.findById(userPreferencesId);
        if (userPreferencesOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No userPreferences with this id found");
        }
        UserPreferences userPreferences = userPreferencesOpt.get();

        if (userPreferences.getUserId() != customerOpt.get().getId()) {
            return ResponseEntity.badRequest().body("UserPreferences do not belong to user");
        }

        userPreferencesRepository.delete(userPreferences);
        return ResponseEntity.ok("UserPreferences deleted successfully");
    }
}
