package com.PAP_team_21.flashcards.entities.flashcard;

import com.PAP_team_21.flashcards.FlashcardsApplication;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FlashcardDaoImpl implements FlashcardDao {

    private final EntityManager entityManager;

    @Autowired
    public FlashcardDaoImpl(EntityManager entityManager, FlashcardsApplication flashcardsApplication) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Flashcard flashcard) {
        entityManager.persist(flashcard);
    }

    @Override
    public Flashcard findFlashcardById(int id) {
        return entityManager.find(Flashcard.class, id);
    }

    @Override
    public List<Flashcard> findAllInDeck(int deckId) {
        Deck deck = entityManager.find(Deck.class, deckId);
        return deck.getFlashcards();
    }

    @Override
    public List<Flashcard> findAllFlashcards() {
        String jpql = "SELECT f FROM Flashcard f";
        return entityManager.createQuery(jpql, Flashcard.class)
                            .getResultList();
    }

    @Override
    @Transactional
    public void update(Flashcard flashcard) {
        entityManager.merge(flashcard);
    }

    @Override
    @Transactional
    public void deleteFlashcardById(int id) {
        Flashcard flashcard = entityManager.find(Flashcard.class, id);
        Deck deck = flashcard.getDeck();
        deck.getFlashcards().remove(flashcard);
        entityManager.merge(deck);
        entityManager.remove(flashcard);
    }
}
