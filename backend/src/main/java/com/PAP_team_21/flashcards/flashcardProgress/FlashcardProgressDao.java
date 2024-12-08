package com.PAP_team_21.flashcards.flashcardProgress;

import java.util.List;

public interface FlashcardProgressDao {

    void save(FlashcardProgress flashcardProgress);

    FlashcardProgress findById(int id);

    FlashcardProgress findByFlashcardId(int flashcardId);

    List<FlashcardProgress> findAllOfUser(int userId);

    List<FlashcardProgress> findAllFlashcardProgresses();

    void update(FlashcardProgress flashcardProgress);

    void deleteFlashcardProgressById(int id);
}
