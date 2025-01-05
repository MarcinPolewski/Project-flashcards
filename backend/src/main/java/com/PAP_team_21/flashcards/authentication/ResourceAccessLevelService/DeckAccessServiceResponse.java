package com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeckAccessServiceResponse extends ResourceAccessServiceResponse {
    private Deck deck;

    public DeckAccessServiceResponse(Deck deck, AccessLevel accessLevel, Customer customer) {
        super(accessLevel, customer);
        this.deck = deck;
    }
}
