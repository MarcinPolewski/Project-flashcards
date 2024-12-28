package com.PAP_team_21.flashcards.entities.reviewLog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/review_logs")
public class ReviewLogController {

    private final ReviewLogDao reviewLogDao;

    @Autowired
    public ReviewLogController(ReviewLogDao reviewLogDao) {
        this.reviewLogDao = reviewLogDao;
    }

    @GetMapping("/{id}")
    public ReviewLog getReviewLog(@PathVariable int id) {
        return reviewLogDao.findById(id);
    }

    @GetMapping("/flashcard_id/{flashcardId}")
    public List<ReviewLog> getReviewLogForFlashcard(@PathVariable int flashcardId) {
        return reviewLogDao.findForFlashcard(flashcardId);
    }

    @GetMapping
    public List<ReviewLog> getAllReviewLogs() {
        return reviewLogDao.findAllReviewLogs();
    }

    @PostMapping
    public void saveReviewLog(@RequestBody ReviewLog reviewLog) {
        reviewLogDao.save(reviewLog);
    }

    @PostMapping("/{id}")
    public void updateReviewLog(@PathVariable int id, @RequestBody ReviewLog reviewLog) {
        reviewLog.setId(id);
        reviewLogDao.save(reviewLog);
    }

    @DeleteMapping("/{id}")
    public void deleteReviewLog(@PathVariable int id) {
        reviewLogDao.deleteReviewLogById(id);
    }
}
