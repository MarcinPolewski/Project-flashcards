package com.PAP_team_21.flashcards.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserStatisticsUpdateRequest {
    int userStatisticsId;
    int totalTimeSpent;
    int loginCount;
    LocalDateTime lastLogin;
}
