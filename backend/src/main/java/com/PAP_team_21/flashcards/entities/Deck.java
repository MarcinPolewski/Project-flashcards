package com.PAP_team_21.flashcards.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Decks")
@Getter
@Setter
public class Deck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="folder_id")
    private int folderId;

    @Column(name="name")
    private String name;

    public Deck() {}

    public Deck(int folderId, String name) {
        this.folderId = folderId;
        this.name = name;
    }
}
