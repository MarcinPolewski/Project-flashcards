package com.PAP_team_21.flashcards.controllers.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreferencesUpdateRequest {
    boolean darkMode;
    int language;
    LocalTime reminderTime;
    int timezone;
    int studyReminders;
}
