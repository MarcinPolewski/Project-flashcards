package com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FlashcardAccessServiceResponse extends ResourceAccessServiceResponse {
    private Flashcard flashcard;
    public FlashcardAccessServiceResponse(Flashcard flashcard, AccessLevel accessLevel) {
        super(accessLevel);
        this.flashcard = flashcard;
    }
}
