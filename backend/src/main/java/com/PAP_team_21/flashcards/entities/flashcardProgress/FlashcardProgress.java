package com.PAP_team_21.flashcards.entities.flashcardProgress;

import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.reviewLog.ReviewLog;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "Flashcards_Progresses")
@Getter
@Setter
public class FlashcardProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "next_review")
    private LocalDateTime next_review;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="last_review_id")
    private ReviewLog lastReviewLog;

    @ManyToOne
    @JoinColumn(name = "flashcard_id")
    private Flashcard flashcard;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Customer customer;


    public FlashcardProgress() {}

    public FlashcardProgress(Flashcard flashcard, Customer customer, LocalDateTime next_review, ReviewLog lastReviewLog) {
        this.flashcard = flashcard;
        this.customer = customer;
        this.next_review = next_review;
        this.lastReviewLog = lastReviewLog;
    }
}
