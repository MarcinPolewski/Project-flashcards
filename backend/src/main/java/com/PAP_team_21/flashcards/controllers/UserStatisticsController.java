package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.controllers.requests.UserStatisticsCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.UserStatisticsUpdateRequest;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.userStatistics.UserStatistics;
import com.PAP_team_21.flashcards.entities.userStatistics.UserStatisticsRepository;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/userStatistics")
@RequiredArgsConstructor
public class UserStatisticsController {
    private final UserStatisticsRepository userStatisticsRepository;
    private final CustomerRepository customerRepository;

    @GetMapping("/getUserStatistics/{id}")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getUserStatistics(Authentication authentication, @PathVariable int id) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<UserStatistics> userStatisticsOpt = userStatisticsRepository.findById(id);
        if (userStatisticsOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No userStatistics with this id found");
        }
        UserStatistics userStatistics = userStatisticsOpt.get();

        if (userStatistics.getUserId() != customerOpt.get().getId()) {
            return ResponseEntity.badRequest().body("UserStatistics do not belong to the user");
        }

        return ResponseEntity.ok(userStatistics);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUserStatistics(Authentication authentication,
                                                   @RequestBody UserStatisticsCreationRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        if (request.getUserId() != customerOpt.get().getId()) {
            return ResponseEntity.badRequest().body("UserStatistics do not belong to the user");
        }

        UserStatistics userStatistics = new UserStatistics(request.getUserId(), request.getTotalTimeSpent(),
                                                            request.getLoginCount(), request.getLastLogin());
        userStatisticsRepository.save(userStatistics);
        return ResponseEntity.ok(userStatistics);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUserStatistics(Authentication authentication,
                                                   @RequestBody UserStatisticsUpdateRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<UserStatistics> userStatisticsOpt = userStatisticsRepository.findById(
                request.getUserStatisticsId());
        if (userStatisticsOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No userStatistics with this id found");
        }
        UserStatistics userStatistics = userStatisticsOpt.get();

        if (userStatistics.getUserId() != customerOpt.get().getId()) {
            return ResponseEntity.badRequest().body("UserStatistics do not belong to user");
        }

        userStatistics.setTotalTimeSpent(request.getTotalTimeSpent());
        userStatistics.setLoginCount(request.getLoginCount());
        userStatistics.setLastLogin(request.getLastLogin());
        userStatisticsRepository.save(userStatistics);
        return ResponseEntity.ok(userStatistics);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUserStatistics(Authentication authentication,
                                                   @RequestParam int userStatisticsId) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<UserStatistics> userStatisticsOpt = userStatisticsRepository.findById(userStatisticsId);
        if (userStatisticsOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No userStatistics with this id found");
        }
        UserStatistics userStatistics = userStatisticsOpt.get();

        if (userStatistics.getUserId() != customerOpt.get().getId()) {
            return ResponseEntity.badRequest().body("UserStatistics do not belong to the user");
        }

        userStatisticsRepository.delete(userStatistics);
        return ResponseEntity.ok("UserStatistics deleted successfully");
    }
}
