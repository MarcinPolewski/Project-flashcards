package com.PAP_team_21.flashcards.entities.reviewLog;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "Review_Logs")
@Getter
@Setter
public class ReviewLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "flashcard_id", insertable = false, updatable = false)
    private int flashcardId;

    @Column(name = "user_id", insertable = false, updatable = false)
    private int userId;

    @Column(name = "when")
    private LocalDateTime when;

    @Column(name = "user_answer")
    private int userAnswer;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "flashcard_id")
    private Flashcard flashcard;

    public ReviewLog() {}

    public ReviewLog(int flashcardId, int userId, LocalDateTime when, int userAnswer) {
        this.flashcardId = flashcardId;
        this.userId = userId;
        this.when = when;
        this.userAnswer = userAnswer;
    }

    public ReviewLog(int flashcardId, int userId, int userAnswer) {
        this.flashcardId = flashcardId;
        this.userId = userId;
        this.when = LocalDateTime.now();
        this.userAnswer = userAnswer;
    }
}
