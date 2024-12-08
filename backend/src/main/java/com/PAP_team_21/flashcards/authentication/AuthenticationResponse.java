package com.PAP_team_21.flashcards.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {
    /*
    * represents a response sent back after successful user authentication
    * */
    private String token;
}
