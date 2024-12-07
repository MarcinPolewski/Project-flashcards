package com.PAP_team_21.flashcards.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Folder_Decks")
@Getter
@Setter
public class FolderDeck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "folder_id")
    private int folderId;

    @Column(name = "deck_id")
    private int deckId;

    public FolderDeck() {}

    public FolderDeck(int folderId, int deckId) {
        this.folderId = folderId;
        this.deckId = deckId;
    }
}
