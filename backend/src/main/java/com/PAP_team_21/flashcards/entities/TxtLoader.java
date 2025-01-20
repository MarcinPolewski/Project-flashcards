package com.PAP_team_21.flashcards.entities;

import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.deck.DeckService;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardService;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class TxtLoader {
    private final FlashcardService flashcardService;
    private final DeckService deckService;

    public Deck loadDeckFromTxt(byte[] txtData, Folder folderParent) {
        String content = new String(txtData, StandardCharsets.UTF_8);
        String[] lines = content.split("\n");

        if (lines.length < 3 || !lines[0].startsWith("Deck: ")) {
            throw new IllegalArgumentException("Invalid TXT format");
        }

        String deckName = lines[0].substring(6).trim();
        Deck deck = new Deck(deckName, folderParent);
        deckService.save(deck);

        for (int i = 4; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.isEmpty()) continue;

            String[] parts = line.split("\s{2,}"); // Split by 2+ spaces
            if (parts.length < 2) {
                throw new IllegalArgumentException("Invalid line format: " + line);
            }

            String front = parts[0].trim();
            String back = parts[1].trim();
            Flashcard flashcard = new Flashcard(deck, front, back);
            flashcardService.save(flashcard);
        }

        return deck;
    }
}

