package com.PAP_team_21.flashcards.reviewLog;

import com.PAP_team_21.flashcards.flashcard.Flashcard;
import com.PAP_team_21.flashcards.user.User;
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

    @Column(name = "flashcard_id")
    private int flashcardId;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "when")
    private LocalDateTime when;

    @Column(name = "user_answer")
    private int userAnswer;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

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
}
