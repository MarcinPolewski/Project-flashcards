package com.PAP_team_21.flashcards.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="Friendships")
@Getter
@Setter
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="sender_id")
    private int senderId;

    @Column(name="receiver_id")
    private int receiverId;

    @Column(name="accepted")
    private boolean accepted;

    public Friendship() {}

    public Friendship(int senderId, int receiverId, boolean accepted) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.accepted = accepted;
    }
}
