package com.PAP_team_21.flashcards.entities.deck;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
interface DeckRepository extends JpaRepository<Deck, Integer> {

    @Procedure(procedureName = "get_last_used_decks")
    List<Deck> getLastUsed(@Param("userId") int userId, @Param("howMany") int howMany);

    @Procedure(procedureName = "get_deck_progress")
    float getDeckProgress(@Param("userId")int customerId,@Param("deckId") int deckId);
}
