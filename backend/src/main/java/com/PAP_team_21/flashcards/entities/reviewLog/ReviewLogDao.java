package com.PAP_team_21.flashcards.entities.reviewLog;

import java.util.List;

public interface ReviewLogDao {

    void save(ReviewLog reviewLog);

    ReviewLog findById(int id);

    List<ReviewLog> findForFlashcard(int flashcardId);

    List<ReviewLog> findAllReviewLogs();

    void update(ReviewLog reviewLog);

    void deleteReviewLogById(int id);
}
