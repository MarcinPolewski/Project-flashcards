package com.PAP_team_21.flashcards.entities.friendshipNotification;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Friendships_Notifications")
@Getter
@Setter
public class FriendshipsNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "friendship_id")
    private int friendshipId;

    @Column(name = "notification_id")
    private int notificationId;

    public FriendshipsNotification() {}

    public FriendshipsNotification(int friendshipId, int notificationId) {
        this.friendshipId = friendshipId;
        this.notificationId = notificationId;
    }
}
