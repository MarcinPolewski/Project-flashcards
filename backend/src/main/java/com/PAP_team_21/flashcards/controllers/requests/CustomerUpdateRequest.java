package com.PAP_team_21.flashcards.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CustomerUpdateRequest {
    String email;
    String passwordHash;
    String username;
    boolean accountExpired;
    boolean accountLocked;
    boolean credentialsExpired;
    boolean enabled;
    String profilePicturePath;
}
