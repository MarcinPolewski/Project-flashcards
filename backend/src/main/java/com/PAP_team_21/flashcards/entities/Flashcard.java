package com.PAP_team_21.flashcards.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Flashcards")
@Getter
@Setter
public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="deck_id")
    private int deckId;

    @Column(name="front")
    private String front;

    @Column(name="back")
    private String back;

    public Flashcard() {}

    public Flashcard(int deckId, String front, String back) {
        this.deckId = deckId;
        this.front = front;
        this.back = back;
    }
}
