package com.PAP_team_21.flashcards.entities.flashcard;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.flashcardProgress.FlashcardProgress;
import com.PAP_team_21.flashcards.entities.reviewLog.ReviewLog;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Comparator;
import java.util.List;

@Entity
@Table(name = "Flashcards")
@Getter
@Setter
public class Flashcard {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonView(JsonViewConfig.Public.class)
    private int id;

    @Column(name = "front")
    @JsonView(JsonViewConfig.Public.class)
    private String front;

    @Column(name = "back")
    @JsonView(JsonViewConfig.Public.class)
    private String back;

    @OneToMany(mappedBy = "flashcard", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonView(JsonViewConfig.Internal.class)
    private List<ReviewLog> reviewLogs;

    @OneToMany(mappedBy = "flashcard", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonView(JsonViewConfig.Internal.class)
    private List<FlashcardProgress> flashcardProgresses;

    @ManyToOne
    @JoinColumn(name = "deck_id")
    @JsonView(JsonViewConfig.Internal.class)
    private Deck deck;

    public Flashcard() {}

    public Flashcard(Deck deck, String front, String back) {
        this.deck = deck;
        this.front = front;
        this.back = back;
    }

    public static Comparator<Flashcard> comparatorBy(String fieldName, boolean ascending) throws IllegalArgumentException{
        Comparator<Flashcard> comparator =  switch (fieldName) {
            case "front" -> Comparator.comparing(Flashcard::getFront);
            case "back" -> Comparator.comparing(Flashcard::getBack);
            case "id" -> Comparator.comparing(Flashcard::getId);
            default -> throw new IllegalArgumentException("Unknown field name: " + fieldName);
        };

        return ascending ? comparator : comparator.reversed();
    }

    public AccessLevel getAccessLevel(Customer customer) {
        return deck.getAccessLevel(customer);
    }
}
