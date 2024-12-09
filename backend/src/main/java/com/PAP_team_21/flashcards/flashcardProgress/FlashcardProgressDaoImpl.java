package com.PAP_team_21.flashcards.flashcardProgress;

import com.PAP_team_21.flashcards.flashcard.Flashcard;
import com.PAP_team_21.flashcards.user.User;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FlashcardProgressDaoImpl implements FlashcardProgressDao {

    private final EntityManager entityManager;

    @Autowired
    public FlashcardProgressDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(FlashcardProgress flashcardProgress) {
        entityManager.persist(flashcardProgress);
    }

    @Override
    public FlashcardProgress findFlashcardProgressById(int id) {
        return entityManager.find(FlashcardProgress.class, id);
    }

    @Override
    public List<FlashcardProgress> findByFlashcardId(int flashcardId) {
        return entityManager.find(Flashcard.class, flashcardId)
                            .getFlashcardProgresses();
    }

    @Override
    public List<FlashcardProgress> findAllOfUser(int userId) {
        return entityManager.find(User.class, userId)
                            .getFlashcardProgresses();
    }

    @Override
    public List<FlashcardProgress> findAllFlashcardProgresses() {
        String jpql = "SELECT f FROM FlashcardProgress f";
        return entityManager.createQuery(jpql, FlashcardProgress.class)
                            .getResultList();
    }

    @Override
    @Transactional
    public void update(FlashcardProgress flashcardProgress) {
        entityManager.merge(flashcardProgress);
    }

    @Override
    @Transactional
    public void deleteFlashcardProgressById(int id) {
        FlashcardProgress flashcardProgress = findFlashcardProgressById(id);
        Flashcard flashcard = flashcardProgress.getFlashcard();
        flashcard.getFlashcardProgresses().remove(flashcardProgress);
        entityManager.merge(flashcard);
        entityManager.remove(flashcardProgress);
    }
}
