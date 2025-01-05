package com.PAP_team_21.flashcards.entities.flashcard;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FlashcardService {
    private final FlashcardRepository flashcardRepository;


    public Optional<Flashcard> findById(int flashcardId) {
        return flashcardRepository.findById(flashcardId);
    }

    public void save(Flashcard flashcard) {
        flashcardRepository.save(flashcard);
    }

    public void delete(Flashcard flashcard) {
    flashcardRepository.delete(flashcard);
    }

    public int countCurrentlyLearning(Integer id, int id1, int reviewGapConstant, int lastReviewConstant) {
        return -1;
    }

    public int countDueInLearning(Integer id, int id1, int reviewGapConstant, int lastReviewConstant) {
        return -1;
    }

    public int countDueToReview(Integer id, int id1, int reviewGapConstant, int lastReviewConstant) {
        return -1;
    }

    public List<Flashcard> getDueFlashcards(Integer id, int id1, Pageable unpaged) {
        return null;
    }

    public List<Flashcard> getNewFlashcards(Customer customer, Deck deck, int howManyNewToAdd) {
        return null;
    }

    public List<Flashcard> getEarlyReviewFlashcards(Integer id, int id1, int reviewGapConstant, int reviewGapConstant1, Pageable pageable) {
        return null;
    }

    public List<Flashcard> getDueInLearning(Integer id, int id1, int reviewGapConstant, int lastReviewConstant, Pageable pageable) {
        return null;
    }

    public List<Flashcard> getDueToReview(Integer id, int id1, int reviewGapConstant, int lastReviewConstant, Pageable pageable) {
        return null;
    }
}
