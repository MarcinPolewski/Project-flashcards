package com.PAP_team_21.flashcards.reviewLog;

import com.PAP_team_21.flashcards.flashcard.Flashcard;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Transient;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewLogDaoImpl implements ReviewLogDao {

    private final EntityManager entityManager;

    @Autowired
    public ReviewLogDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(ReviewLog reviewLog) {
        entityManager.persist(reviewLog);
    }

    @Override
    public ReviewLog findById(int id) {
        return entityManager.find(ReviewLog.class, id);
    }

    @Override
    public List<ReviewLog> findForFlashcard(int flashcardId) {
        return entityManager.find(Flashcard.class, flashcardId)
                            .getReviewLogs();
    }

    @Override
    public List<ReviewLog> findAllReviewLogs() {
        String jpql = "SELECT r FROM ReviewLog r";
        return entityManager.createQuery(jpql, ReviewLog.class)
                            .getResultList();
    }

    @Override
    @Transactional
    public void update(ReviewLog reviewLog) {
        entityManager.merge(reviewLog);
    }

    @Override
    @Transactional
    public void deleteReviewLogByID(int id) {
        ReviewLog reviewLog = findById(id);
        Flashcard flashcard = reviewLog.getFlashcard();
        flashcard.getReviewLogs().remove(reviewLog);
        entityManager.merge(flashcard);
        entityManager.remove(reviewLog);
    }
}
