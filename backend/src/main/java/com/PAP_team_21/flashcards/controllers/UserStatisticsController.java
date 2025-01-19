package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.controllers.DTOMappers.UserStatisticsMapper;
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
    private final UserStatisticsMapper userStatisticsMapper;

    @GetMapping("/getUserStatistics")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getUserStatistics(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        UserStatistics userStatistics = customerOpt.get().getUserStatistics();

        return ResponseEntity.ok(userStatisticsMapper.toDTO(customerOpt.get(), userStatistics));
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
}
