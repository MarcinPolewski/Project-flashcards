package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    private final FlashcardDao flashcardDao;

    @Autowired
    public FlashcardController(FlashcardDao flashcardDao) {
        this.flashcardDao = flashcardDao;
    }

    @GetMapping("/{id}")
    public Flashcard getFlashcard(@PathVariable int id) {
        return flashcardDao.findFlashcardById(id);
    }

    @GetMapping("/deck_id/{deckId}")
    public List<Flashcard> getFlashcardsByDeckId(@PathVariable int deckId) {
        return flashcardDao.findAllInDeck(deckId);
    }

    @GetMapping
    public List<Flashcard> getAllFlashcards() {
        return flashcardDao.findAllFlashcards();
    }

    @PostMapping
    public void saveFlashcard(@RequestBody Flashcard flashcard) {
        flashcardDao.save(flashcard);
    }

    @PostMapping("/{id}")
    public void updateFlashcard(@PathVariable int id, @RequestBody Flashcard flashcard) {
        flashcard.setId(id);
        flashcardDao.save(flashcard);
    }

    @DeleteMapping("/{id}")
    public void deleteFlashcard(@PathVariable int id) {
        flashcardDao.deleteFlashcardById(id);
    }

}
