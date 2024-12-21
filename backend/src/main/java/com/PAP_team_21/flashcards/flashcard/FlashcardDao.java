package com.PAP_team_21.flashcards.flashcard;

import java.util.List;

public interface FlashcardDao {

    void save(Flashcard flashcard);

    Flashcard findFlashcardById(int id);

    List<Flashcard> findAllInDeck(int deckId);

    List<Flashcard> findAllFlashcards();

    void update(Flashcard flashcard);

    void deleteFlashcardById(int id);
}
