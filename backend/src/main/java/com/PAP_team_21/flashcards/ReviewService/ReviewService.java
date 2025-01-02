package com.PAP_team_21.flashcards.ReviewService;

import com.PAP_team_21.flashcards.UserAnswer;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    public List<Flashcard> getToReview(int deckId, int packageSize) {
        return null;
    }

    public void flashcardReviewed(int flashcardId, UserAnswer userAnswer) {
        return;
    }
}
