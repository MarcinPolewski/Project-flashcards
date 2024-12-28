package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.deck.DeckDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/decks")
public class DeckController {

    private final DeckDao deckDao;

    @Autowired
    public DeckController(DeckDao deckDao) {
        this.deckDao = deckDao;
    }

    @GetMapping("/{id}")
    public Deck getDeck(@PathVariable int id) {
        return deckDao.findDeckById(id);
    }

    @GetMapping
    public List<Deck> getAllDecks() {
        return deckDao.findAllDecks();
    }

    @PostMapping
    public void saveDeck(@RequestBody Deck deck) {
        deckDao.save(deck);
    }

    @PostMapping("/{id}")
    public void updateDeck(@PathVariable int id, @RequestBody Deck deck) {
        deck.setId(id);
        deckDao.save(deck);
    }

    @DeleteMapping("/{id}")
    public void deleteDeck(@PathVariable int id) {
        deckDao.deleteDeckById(id);
    }
}
