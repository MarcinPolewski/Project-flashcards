package com.PAP_team_21.flashcards.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name="Notifications")
@Getter
@Setter
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private int userId;

    @Column(name="received")
    private boolean received;

    @Column(name="text")
    private String text;

    @Column(name="creation_date")
    private LocalDateTime creationDate;

    @Column(name="received_date")
    private LocalDateTime receivedDate;

    public Notification() {}

    public Notification(int userId, boolean received, String text, LocalDateTime creationDate,
                        LocalDateTime receivedDate) {
        this.userId = userId;
        this.received = received;
        this.text = text;
        this.creationDate = creationDate;
        this.receivedDate = receivedDate;
    }
}
