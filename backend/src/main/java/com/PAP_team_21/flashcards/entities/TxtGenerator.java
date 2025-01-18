package com.PAP_team_21.flashcards.entities;

import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
public class TxtGenerator {
    public byte[] generateTxtFromDeck(Deck deck) {
        StringBuilder txtContent = new StringBuilder();

        txtContent.append("Deck: ").append(deck.getName()).append("\n\n");
        txtContent.append(String.format("%-20s %-20s\n", "Word", "Definition"));
        txtContent.append("========================================\n");

        for (Flashcard flashcard : deck.getFlashcards()) {
            String word = flashcard.getFront();
            String definition = flashcard.getBack();
            txtContent.append(String.format("%-20s %-20s\n", word.trim(), definition.trim()));
        }

        return txtContent.toString().getBytes(StandardCharsets.UTF_8);
    }
}