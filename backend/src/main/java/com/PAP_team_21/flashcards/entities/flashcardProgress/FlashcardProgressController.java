package com.PAP_team_21.flashcards.entities.flashcardProgress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flashcard_progresses")
public class FlashcardProgressController {

    private final FlashcardProgressDao flashcardProgressDao;

    @Autowired
    public FlashcardProgressController(FlashcardProgressDao flashcardProgressDao) {
        this.flashcardProgressDao = flashcardProgressDao;
    }

    @GetMapping("/{id}")
    public FlashcardProgress getFlashcardProgress(@PathVariable int id) {
        return flashcardProgressDao.findFlashcardProgressById(id);
    }

    @GetMapping("flashcard_id/{flashcardId}")
    public List<FlashcardProgress> getFlashcardProgressByFlashcardId(@PathVariable int flashcardId) {
        return flashcardProgressDao.findByFlashcardId(flashcardId);
    }

    @GetMapping
    public List<FlashcardProgress> getAllFlashcardProgress() {
        return flashcardProgressDao.findAllFlashcardProgresses();
    }

    @PostMapping
    public void saveFlashcardProgress(@RequestBody FlashcardProgress flashcardProgress) {
        flashcardProgressDao.save(flashcardProgress);
    }

    @PostMapping("/{id}")
    public void updateFlashcardProgress(@PathVariable int id, @RequestBody FlashcardProgress flashcardProgress) {
        flashcardProgress.setId(id);
        flashcardProgressDao.save(flashcardProgress);
    }

    @DeleteMapping("/{id}")
    public void deleteFlashcardProgress(@PathVariable int id) {
        flashcardProgressDao.deleteFlashcardProgressById(id);
    }
}
