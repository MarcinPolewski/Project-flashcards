package com.PAP_team_21.flashcards.reviewLog;

import java.util.List;

public interface ReviewLogDao {

    void save(ReviewLog reviewLog);

    ReviewLog findById(int id);

    List<ReviewLog> findForFlashcard(int flashcard_id);

    List<ReviewLog> findAllReviewLogs();

    void update(ReviewLog reviewLog);

    void deleteReviewLogByID(int id);
}
