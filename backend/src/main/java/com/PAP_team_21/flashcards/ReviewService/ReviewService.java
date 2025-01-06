package com.PAP_team_21.flashcards.ReviewService;

import com.PAP_team_21.flashcards.UserAnswer;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardService;
import com.PAP_team_21.flashcards.entities.flashcardProgress.FlashcardProgress;
import com.PAP_team_21.flashcards.entities.flashcardProgress.FlashcardProgressRepository;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.reviewLog.ReviewLog;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;

import org.apache.catalina.User;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.Period;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final FlashcardService flashcardService;
    private final FlashcardProgressRepository flashcardProgressRepository;


    @Transactional
    public List<Flashcard> reviewDeck(Customer customer, Deck deck, int batchSize)
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

    private Duration muliplyDurationWithSecondPercision(Duration duration, float multiplier)
    {
        return Duration.ofSeconds((long) (duration.getSeconds()*multiplier));
    }

    private float  getMultiplier(UserAnswer answer)
    {
        return switch (answer) {
            case HARD -> 1.0f;
            case GOOD -> 1.5f;
            case EASY -> 2.0f;
            default -> 0.0f;
        };
    }

    private  LocalDateTime getNextReview(LocalDateTime lastReview, LocalDateTime previousNextReview, UserAnswer answer)
    {
        // scheduled gap between previous review and next review - related to knowledge of flashcard
        Duration knowledgeGap = Duration.between(lastReview, previousNextReview);
        // how much after scheduled date was flashcard reviewed
        Duration scheduledGap = Duration.between(LocalDateTime.now(), lastReview);

        if(answer.equals(UserAnswer.FORGOT))
        {
            return LocalDateTime.now().plus(Duration.ofMinutes(1));
        }

        Duration tillNextReview = muliplyDurationWithSecondPercision(knowledgeGap, getMultiplier(answer));
        if(tillNextReview.get(ChronoUnit.YEARS) >= 1)
            tillNextReview = Duration.of(1L, ChronoUnit.YEARS);
        return LocalDateTime.now().plus(tillNextReview);
    }

    public void flashcardReviewed(Customer customer, Flashcard flashcard, UserAnswer userAnswer) {

        ReviewLog rl = new ReviewLog(flashcard,
                customer,
                LocalDateTime.now(),
                userAnswer);

        Optional<FlashcardProgress> progress = flashcardProgressRepository.findByCustomerAndFlashcard(customer, flashcard);
        if(progress.isEmpty())
        {

            FlashcardProgress fp = new FlashcardProgress(flashcard,
                    customer,
                    getNextReview(progress.get().getLastReviewLog().getWhen(), progress.get().getNext_review(), userAnswer),
                    rl);
            flashcardProgressRepository.save(fp);
        }
        else
        {
            progress.get().setLastReviewLog(rl);
            progress.get().setNext_review(getNextReview(progress.get().getLastReviewLog().getWhen(), progress.get().getNext_review(), userAnswer));
            flashcardProgressRepository.save(progress.get());
        }



    }
}
