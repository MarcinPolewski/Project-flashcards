package com.PAP_team_21.flashcards.user;

import com.PAP_team_21.flashcards.authority.Authority;
import com.PAP_team_21.flashcards.flashcardProgress.FlashcardProgress;
import com.PAP_team_21.flashcards.folder.Folder;
import com.PAP_team_21.flashcards.friendship.Friendship;
import com.PAP_team_21.flashcards.notification.Notification;
import com.PAP_team_21.flashcards.reviewLog.ReviewLog;
import com.PAP_team_21.flashcards.userPreferences.UserPreferences;
import com.PAP_team_21.flashcards.userStatistics.UserStatistics;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Customers")
@Getter
@Setter
@NoArgsConstructor
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password_hash")
    private String passwordHash;

    @Column(name = "username")
    private String username;

    @Column(name = "account_expired")
    private boolean accountExpired;

    @Column(name = "account_locked")
    private boolean accountLocked;

    @Column(name = "credentials_expired")
    private boolean credentialsExpired;

    @Column(name = "enabled")
    private boolean enabled;

    @Column(name = "profile_creation_date")
    private LocalDateTime profileCreationDate;

    @Column(name = "profile_picture_path")
    private String profilePicturePath;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserPreferences userPreferences;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private UserStatistics userStatistics;

    @OneToMany(mappedBy = "sender", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Friendship> sentFriendships;

    @OneToMany(mappedBy = "receiver", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Friendship> receivedFriendships;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Notification> notifications;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FlashcardProgress> flashcardProgresses;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ReviewLog> reviewLogs;

    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<Folder> folders;

    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<Authority> authorities;


    public Customer(String email, String username, String passwordHash) {
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
    }


    public Customer(String email, String passwordHash, String username, boolean accountExpired,
                    boolean accountLocked, boolean credentialsExpired, boolean enabled,
                    LocalDateTime profileCreationDate, String profilePicturePath) {
        this.email = email;
        this.passwordHash = passwordHash;
        this.username = username;
        this.accountExpired = accountExpired;
        this.accountLocked = accountLocked;
        this.credentialsExpired = credentialsExpired;
        this.enabled = enabled;
        this.profileCreationDate = profileCreationDate;
        this.profilePicturePath = profilePicturePath;
    }
}
