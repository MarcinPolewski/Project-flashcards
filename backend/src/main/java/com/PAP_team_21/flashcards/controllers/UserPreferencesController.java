package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.controllers.requests.UserPreferencesUpdateRequest;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.userPreferences.UserPreferences;
import com.PAP_team_21.flashcards.entities.userPreferences.UserPreferencesRepository;
import com.fasterxml.jackson.annotation.JsonView;
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

    @GetMapping("getUserPreferences")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getUserPreferences(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        UserPreferences userPreferences = customerOpt.get().getUserPreferences();

        return ResponseEntity.ok(userPreferences);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUserPreferences(Authentication authentication,
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
}
