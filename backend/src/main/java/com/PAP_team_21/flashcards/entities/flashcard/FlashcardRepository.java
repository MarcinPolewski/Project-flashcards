package com.PAP_team_21.flashcards.entities.flashcard;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface FlashcardRepository extends JpaRepository<Flashcard, Integer> {

    @Procedure(procedureName = "count_current_learning")
    int countCurrentlyLearning(@Param("userId")Integer customerId,
                               @Param("deckId") int deckId,
                               @Param("revGapMinutes")int reviewGapConstantMinutes,
                               @Param("lastReviewConstant")int lastReviewConstantMinutes);

    @Procedure(procedureName = "count_due_in_learning")
    int countDueInLearning(@Param("userId")Integer customerId,
                           @Param("deckId") int deckId,
                           @Param("revGapMinutes")int reviewGapConstantMinutes,
                           @Param("lastReviewConstant")int lastReviewConstantMinutes);

    @Procedure(procedureName = "count_due_to_review")
    int countDueToReview(@Param("userId")Integer customerId,
                         @Param("deckId") int deckId,
                         @Param("revGapMinutes")int reviewGapConstantMinutes,
                         @Param("lastReviewConstant")int lastReviewConstantMinutes);

    @Procedure(procedureName = "get_due_flashcards")
    List<Flashcard> getDueFlashcards(@Param("userId")Integer customerId,
                                     @Param("deckId") int deckId,
                                     @Param("howMany")int howMany);

    @Procedure(procedureName = "get_new_flashcard")
    List<Flashcard> getNewFlashcards(@Param("userId")Integer customerId,
                                     @Param("deckId") int deckId,
                                     @Param("howMany")int howMany);

    @Procedure(procedureName = "get_early_review")
    List<Flashcard> getEarlyReviewFlashcards(@Param("userId")Integer customerId,
                                             @Param("deckId") int deckId,
                                             @Param("revGapMinutes")int reviewGapConstantMinutes,
                                             @Param("lastReviewConstant")int lastReviewConstantMinutes,
                                             @Param("howMany")int howMany);

    @Procedure(procedureName = "get_due_in_learning")
    List<Flashcard> getDueInLearning(@Param("userId")Integer customerId,
                                     @Param("deckId") int deckId,
                                     @Param("revGapMinutes")int reviewGapConstantMinutes,
                                     @Param("lastReviewConstant")int lastReviewConstantMinutes,
                                     @Param("howMany")int howMany);

    @Procedure(procedureName = "get_due_to_review")
    List<Flashcard> getDueToReview(@Param("userId")Integer customerId,
                                   @Param("deckId") int deckId,
                                   @Param("revGapMinutes")int reviewGapConstantMinutes,
                                   @Param("lastReviewConstant")int lastReviewConstantMinutes,
                                   @Param("howMany")int howMany);

    @Procedure(procedureName = "count_all_new_cards")
    int countAllNewCards(@Param("userId")int customerId);

    @Procedure(procedureName = "count_all_due_cards")
    int countAllDueCards(@Param("userId")int customerId);


    @Procedure(procedureName = "count_all_cards")
    int countAllCards(@Param("userId")int customerId);

//
//
//    int countDueInLearning(Integer id, int id1, Duration reviewGapConstant, Duration lastReviewConstant);
//
//    int countDueToReview(Integer id, int id1, Duration reviewGapConstant, Duration lastReviewConstant);
//
//    List<Flashcard> getDueFlashcards(Integer id, int id1, Pageable pageable);
//
//    List<Flashcard> getEarlyReviewFlashcards(Integer id, int id1, int reviewGapConstant, int reviewGapConstant1, Pageable pageable);
//    @Query(value = "SELECT * FROM flashcards" +
//            " join FlashcardProgress on flashcards.id = FlashcardProgress.flashcard_id" +
//    "WHERE FlashcardProgress.user_id = :userId AND" +
//            //" FlashcardProgress.next_review < :time" +
//            "date_format(date(FlashcardProgress.next_review),'%d-%m-%Y') = date_format(date(:time),'%d-%m-%Y')" +
//            " ORDER BY FlashcardProgress.next_review ASC LIMIT :packageSize", nativeQuery = true)
//    List<Flashcard> getAllToReviewForDay(@Param("userId")int userId,
//                                       @Param("packageSize") int packageSize,
//                                       @Param("time") LocalDateTime time);
//
//    @Query(value = "SELECT * FROM flashcards" +
//            " join FlashcardProgress on flashcards.id = FlashcardProgress.flashcard_id" +
//            "WHERE FlashcardProgress.user_id = :userId AND" +
//            //" FlashcardProgress.next_review < :time" +
//            "date_format(date(FlashcardProgress.next_review),'%d-%m-%Y') <= date_format(date(:time),'%d-%m-%Y')" +
//            " ORDER BY FlashcardProgress.next_review ASC LIMIT :packageSize", nativeQuery = true)
//    List<Flashcard> getAllToReviewBefore(@Param("userId")int userId,
//                                       @Param("packageSize") int packageSize,
//                                       @Param("time") LocalDateTime time);

    // flashcard is due when:
    // next_review <= current_time

    // flashcard is in learning when:
    // |next_review - previous_review| <=
    // |now - next_review| <= time_constant




//
//
//    List<Flashcard> GetFromFolderToReviewForDay(@Param("userId")int userId,
//                                                @Param("packageSize") int packageSize,
//                                                @Param("time") LocalDateTime time,
//                                                @Param("folderId") int folderId);
//
//    List<Flashcard> GetFromFolderToReviewBefore(@Param("userId")int userId,
//                                                @Param("packageSize") int packageSize,
//                                                @Param("time") LocalDateTime time,
//                                                @Param("folderId") int folderId);
//    List<Flashcard> GetFromDeckToReviewForDay(@Param("userId")int userId,
//                                              @Param("packageSize") int packageSize,
//                                              @Param("time") LocalDateTime time,
//                                              @Param("deckId") int deckId);
//    List<Flashcard> GetFromDeckToReviewBefore(@Param("userId")int userId,
//                                              @Param("packageSize") int packageSize,
//                                              @Param("time") LocalDateTime time,
//                                              @Param("deckId") int deckId);

}


