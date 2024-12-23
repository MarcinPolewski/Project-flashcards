package com.PAP_team_21.flashcards.entities.deck;


import java.util.List;

public interface DeckDao {

    void save(Deck deck);

    Deck findDeckById(int id);

    List<Deck> findAllDecks();

    void update(Deck deck);

    void deleteDeckById(int id);
}
