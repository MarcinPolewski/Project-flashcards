package com.PAP_team_21.flashcards.controllers.requests;

import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FlashcardsToReviewResponse {
    private List<Flashcard> flashcardList;
}
