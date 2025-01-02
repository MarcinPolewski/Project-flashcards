package com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeckAccessServiceResponse extends ResourceAccessServiceResponse {
    Deck deck;

    public DeckAccessServiceResponse(Deck deck, AccessLevel accessLevel) {
        super(accessLevel);
        this.deck = deck;
    }
}
