package com.PAP_team_21.flashcards.ReviewService;

import com.PAP_team_21.flashcards.UserAnswer;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardService;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import java.time.temporal.TemporalUnit;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.ArrayList;
import java.util.Collections;
import java.util.FormattableFlags;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final FlashcardService flashcardService;


    @Transactional
    public List<Flashcard> reviewBy(Customer customer, Deck deck, int batchSize)
    {
        // !!! to be defined later !!!
        Duration review_gap_constant = Duration.ofMinutes(10);
        Duration last_review_constant = Duration.ofMinutes(10);
        int max_currently_learning = 20; // max number of flashcards that are repeated in learning phase
        float learning_ratio = 0.7f; // ratio of flashcards that are repeated in learning phase

        // flashcards in learining, including those that are not due
        int totalInLearningCnt = flashcardService.countCurrentlyLearning(customer.getId(),
                deck.getId(),
                review_gap_constant,
                last_review_constant);
        // flashcards that are due and in learning phase
        int dueInLearningCnt = flashcardService.countDueInLearning(customer.getId(),
                deck.getId(),
                review_gap_constant,
                last_review_constant);
        // flashcards that are due, but are not in review phase - they are well enough known
        int dueToReviewCnt = flashcardService.countDueToReview(customer.getId(),
                deck.getId(),
                review_gap_constant,
                last_review_constant);
        int totalDue = dueToReviewCnt + dueInLearningCnt;

        ArrayList<Flashcard> result = new ArrayList<>();

        // how many flashcards of type a we want in returned batch
        int typeAFlashcardsCnt = (int) (learning_ratio*batchSize);
        int typeBFlashcardsCnt = batchSize - typeAFlashcardsCnt;


        if(totalDue < batchSize) // due cards do not fill the batch
        {
            // general idea:
            // return all due flashcards
            // try to introduce new cards
            // fill the rest with early reviews ?

            List<Flashcard> dueFlashcards = flashcardService.getDueFlashcards(customer.getId(),
                    deck.getId(),
                    Integer.MAX_VALUE);
            result.addAll(dueFlashcards);

            int howManyLeftToAdd = batchSize - dueFlashcards.size();
            int howManyNewCardsCanBeIntroduced = Math.min(max_currently_learning - totalInLearningCnt,
                    howManyLeftToAdd);

            if(howManyNewCardsCanBeIntroduced > 0)
            {
                List<Flashcard> newFlashcards = flashcardService.getNewFlashcards(customer.getId(),
                        deck.getId(),
                        howManyNewCardsCanBeIntroduced);
                result.addAll(newFlashcards);
            }

            howManyLeftToAdd = batchSize - result.size();
            if(howManyLeftToAdd > 0)
            {
                List<Flashcard> earlyReviewFlashcards = flashcardService.getEarlyReviewFlashcards(customer.getId(),
                        deck.getId(),
                        review_gap_constant,
                        last_review_constant,
                        howManyLeftToAdd);
                result.addAll(earlyReviewFlashcards);
            }

        }
        else // more cards are due than batch size
        {
            // general idea:
            // try to fill to learning_ratio with typeA
                // if  learning_ratio was not reached, try to fill to the learning ratio with new cards
            // try to fill the rest with typeB
            // fill the rest with remaing flashcards of typeA ( theoretically, this is possible or all the list is filled)

            List<Flashcard> dueInLearning = flashcardService.getDueInLearning(customer.getId(),
                    deck.getId(),
                    review_gap_constant,
                    last_review_constant,
                    typeAFlashcardsCnt);
            result.addAll(dueInLearning);
            if(dueInLearning.size() <  typeAFlashcardsCnt)
            {
                // try to introduce new flashcards
                int howManyNewCardsCanBeIntroduced =Math.min(max_currently_learning - totalInLearningCnt,
                                                            typeAFlashcardsCnt - dueInLearning.size());
                List<Flashcard> newFlashcards = flashcardService.getNewFlashcards(customer.getId(),
                        deck.getId(),
                        howManyNewCardsCanBeIntroduced);
                result.addAll(newFlashcards);
            }

            // try to fill the rest of the list with typeB flashcards
            int howManyLeftToAdd = batchSize - result.size();
            List<Flashcard> dueToReview = flashcardService.getDueToReview(customer.getId(),
                    deck.getId(),
                    review_gap_constant,
                    last_review_constant,
                    howManyLeftToAdd);
            result.addAll(dueToReview);

            // if there is still space, fill with type A or new flashcards
            howManyLeftToAdd = batchSize - result.size();
            if(howManyLeftToAdd > 0)
            {
                dueInLearning = flashcardService.getDueInLearning(customer.getId(),
                        deck.getId(),
                        review_gap_constant,
                        last_review_constant,
                        howManyLeftToAdd);
                if(dueInLearning.size() <  howManyLeftToAdd)
                {
                    // try to introduce new flashcards
                    int howManyNewCardsCanBeIntroduced =Math.min(max_currently_learning - totalInLearningCnt,
                            howManyLeftToAdd - dueInLearning.size());
                    List<Flashcard> newFlashcards = flashcardService.getNewFlashcards(customer.getId(),
                            deck.getId(),
                            howManyNewCardsCanBeIntroduced);
                    result.addAll(newFlashcards);
                }
            }


        }


        Collections.shuffle(result);
        return result;
    }
}
