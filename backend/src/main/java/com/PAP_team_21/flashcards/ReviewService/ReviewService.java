package com.PAP_team_21.flashcards.ReviewService;

import com.PAP_team_21.flashcards.UserAnswer;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardService;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.FormattableFlags;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final FlashcardService flashcardService;


    public List<Flashcard> reviewBy(Customer customer, Deck deck, int batchSize)
    {
        // !!! to be defined later !!!
        int review_gap_constant = 30;
        int last_review_constant = 30;
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
                    Pageable.unpaged());
            result.addAll(dueFlashcards);

            int howManyLeftToAdd = batchSize - dueFlashcards.size();
            int howManyNewCardsCanBeIntroduced = max_currently_learning - totalInLearningCnt;

            if(howManyNewCardsCanBeIntroduced > 0)
            {
                int howManyNewToAdd = Math.min(howManyLeftToAdd, howManyNewCardsCanBeIntroduced);
                List<Flashcard> newFlashcards = flashcardService.getNewFlashcards(customer,
                        deck,
                        howManyNewToAdd);
                result.addAll(newFlashcards);
            }

            howManyLeftToAdd = batchSize - result.size();
            if(howManyLeftToAdd > 0)
            {
                List<Flashcard> earlyReviewFlashcards = flashcardService.getEarlyReviewFlashcards(customer.getId(),
                        deck.getId(),
                        review_gap_constant,
                        last_review_constant,
                        Pageable.ofSize(howManyLeftToAdd));
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
                    Pageable.ofSize(typeAFlashcardsCnt));
            if(dueInLearning.size() <  typeAFlashcardsCnt)
            {
                // try to introduce new flashcards
                int howManyNewCardsCanBeIntroduced =Math.min(max_currently_learning - totalInLearningCnt,
                                                            typeAFlashcardsCnt - dueInLearning.size());
                List<Flashcard> newFlashcards = flashcardService.getNewFlashcards(customer,
                        deck,
                        howManyNewCardsCanBeIntroduced);
                result.addAll(newFlashcards);
            }

            // try to fill the rest of the list with typeB flashcards
            int howManyLeftToAdd = batchSize - result.size();
            List<Flashcard> dueToReview = flashcardService.getDueToReview(customer.getId(),
                    deck.getId(),
                    review_gap_constant,
                    last_review_constant,
                    Pageable.ofSize(howManyLeftToAdd));
            result.addAll(dueToReview);

            // if there is still space, fill with type A or new flashcards
            howManyLeftToAdd = batchSize - result.size();
            if(howManyLeftToAdd > 0)
            {
                dueInLearning = flashcardService.getDueInLearning(customer.getId(),
                        deck.getId(),
                        review_gap_constant,
                        last_review_constant,
                        Pageable.ofSize(howManyLeftToAdd));
                if(dueInLearning.size() <  howManyLeftToAdd)
                {
                    // try to introduce new flashcards
                    int howManyNewCardsCanBeIntroduced =Math.min(max_currently_learning - totalInLearningCnt,
                            howManyLeftToAdd - dueInLearning.size());
                    List<Flashcard> newFlashcards = flashcardService.getNewFlashcards(customer,
                            deck,
                            howManyNewCardsCanBeIntroduced);
                    result.addAll(newFlashcards);
                }
            }


        }



        return result;
    }
//    public List<Flashcard> reviewBy(Customer customer, Deck deck, int page, int size, String sortBy, boolean ascending) {
//        return null;
//    }
//
//    public List<Flashcard> getReviewForTheDay(Customer customer, Deck deck, int packageSize) throws IllegalArgumentException {
//        return null;
//    }
//
//    public List<Flashcard> reviewBy(Customer customer, Folder folder, int page, int size, String sortBy, boolean ascending) {
//        return null;
//    }
//
//    public List<Flashcard> getReviewForTheDay(Customer customer, Folder folder, int packageSize, LocalDateTime dateTime) throws IllegalArgumentException {
//
//
//        return flashcardRepository.getReviewForTheDay(customer.getId(), folder.getId(), packageSize);
//    }
//
//
//    public void flashcardReviewed(int flashcardId, UserAnswer userAnswer) {
//        // calculate next review
//
//        // update next review table
//
//    }
}
