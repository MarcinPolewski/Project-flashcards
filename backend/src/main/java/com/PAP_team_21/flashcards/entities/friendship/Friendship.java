package com.PAP_team_21.flashcards.entities.friendship;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.notification.Notification;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "Friendships")
@Getter
@Setter
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "sender_id", insertable = false, updatable = false)
    private int senderId;

    @Column(name = "receiver_id", insertable = false, updatable = false)
    private int receiverId;

    @Column(name = "accepted")
    private boolean accepted;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Customer sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private Customer receiver;

    @ManyToMany
    @JoinTable (
            name = "Friendships_Notifications",
            joinColumns = @JoinColumn(name = "friendship_id"),
            inverseJoinColumns = @JoinColumn(name = "notification_id")
    )
    private List<Notification> notifications;

    public Friendship() {}

    public Friendship(int senderId, int receiverId, boolean accepted) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.accepted = accepted;
    }

    public Friendship(int senderId, int receiverId) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.accepted = false;
    }
}
