package com.PAP_team_21.flashcards.controllers.requests;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewPasswordAfterForgetRequest {
    private String email;
    private String code;
    private String newPassword;
}
