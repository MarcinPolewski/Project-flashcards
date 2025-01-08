package com.PAP_team_21.flashcards.entities.deck;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface DeckRepository extends JpaRepository<Deck, Integer> {

    @Procedure(procedureName = "get_last_used_decks")
    List<Deck> getLastUsed(@Param("userId") int userId, @Param("howMany") int howMany);
}
