package com.PAP_team_21.flashcards.entities.flashcard;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
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

    public int countCurrentlyLearning(Integer id, int id1, Duration reviewGapConstant, Duration lastReviewConstant) {
        return flashcardRepository.countCurrentlyLearning( id,  id1,  (int)reviewGapConstant.get(ChronoUnit.MINUTES),  (int)lastReviewConstant.get(ChronoUnit.MINUTES));
    }

    public int countDueInLearning(Integer id, int id1, Duration reviewGapConstant, Duration lastReviewConstant) {
        return 0;
        //return flashcardRepository.countDueInLearning(id, id1, reviewGapConstant.get(ChronoUnit.MINUTES), lastReviewConstant.get(ChronoUnit.MINUTES));
    }

    public int countDueToReview(Integer id, int id1, Duration reviewGapConstant, Duration lastReviewConstant) {
        return 0;
        //return flashcardRepository.countDueToReview(id, id1, reviewGapConstant.get(ChronoUnit.MINUTES), lastReviewConstant.get(ChronoUnit.MINUTES));
    }

    public List<Flashcard> getDueFlashcards(Integer id, int id1, Pageable pageable) {
        return null;
        //return flashcardRepository.getDueFlashcards(id, id1, pageable);
    }

    public List<Flashcard> getNewFlashcards(Customer customer, Deck deck, int howManyNewToAdd) {
        return null;
        //return null;
    }

    public List<Flashcard> getEarlyReviewFlashcards(Integer id, int id1, Duration reviewGapConstant, Duration reviewGapConstant1, Pageable pageable) {
        return null;
        //return flashcardRepository.getEarlyReviewFlashcards(id, id1, reviewGapConstant, reviewGapConstant1, pageable);
    }

    public List<Flashcard> getDueInLearning(Integer id, int id1, Duration reviewGapConstant, Duration lastReviewConstant, Pageable pageable) {
        return null;
        //return flashcardRepository.getDueInLearning(id, id1, reviewGapConstant, lastReviewConstant, pageable);
    }

    public List<Flashcard> getDueToReview(Integer id, int id1, Duration reviewGapConstant, Duration lastReviewConstant, Pageable pageable) {
        return null;
        //return flashcardRepository.getDueToReview(id, id1, reviewGapConstant, lastReviewConstant, pageable);
    }
}
