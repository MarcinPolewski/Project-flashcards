package com.PAP_team_21.flashcards.flashcard;

import com.PAP_team_21.flashcards.FlashcardsApplication;
import com.PAP_team_21.flashcards.deck.Deck;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FlashcardDaoImpl implements FlashcardDao {

    private EntityManager entityManager;

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
    public Flashcard findById(int id) {
        return entityManager.find(Flashcard.class, id);
    }

    @Override
    public List<Flashcard> findAllInDeck(int deckId) {
        String jpql = "SELECT f FROM Flashcard f WHERE f.deck.id = :deckId";
        return entityManager.createQuery(jpql, Flashcard.class)
                            .setParameter("deckId",deckId)
                            .getResultList();
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
