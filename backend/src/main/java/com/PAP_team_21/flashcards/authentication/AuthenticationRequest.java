package com.PAP_team_21.flashcards.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationRequest {
    /*
    this class represents a request send to sever to authenticate a user
     */
    private String email;
    private String password;
}
