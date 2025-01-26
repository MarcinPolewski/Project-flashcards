package com.PAP_team_21.flashcards.controllers.requests;

import com.PAP_team_21.flashcards.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ChangeAccessLevelRequest {
    String email;
    AccessLevel newAccessLevel;
}
