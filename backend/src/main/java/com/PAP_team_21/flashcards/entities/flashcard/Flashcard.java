package com.PAP_team_21.flashcards.entities.flashcard;

import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.flashcardProgress.FlashcardProgress;
import com.PAP_team_21.flashcards.entities.reviewLog.ReviewLog;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Flashcards")
@Getter
@Setter
public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "deck_id", insertable = false, updatable = false)
    private int deckId;

    @Column(name = "front")
    private String front;

    @Column(name = "back")
    private String back;

    @OneToMany(mappedBy = "flashcard", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ReviewLog> reviewLogs;

    @OneToMany(mappedBy = "flashcard", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FlashcardProgress> flashcardProgresses;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    private Deck deck;

    public Flashcard() {}

    public Flashcard(int deckId, String front, String back) {
        this.deckId = deckId;
        this.front = front;
        this.back = back;
    }
}
