package com.PAP_team_21.flashcards.entities.customer;

import com.PAP_team_21.flashcards.entities.authority.Authority;
import com.PAP_team_21.flashcards.entities.flashcardProgress.FlashcardProgress;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.friendship.Friendship;
import com.PAP_team_21.flashcards.entities.notification.Notification;
import com.PAP_team_21.flashcards.entities.reviewLog.ReviewLog;
import com.PAP_team_21.flashcards.entities.userPreferences.UserPreferences;
import com.PAP_team_21.flashcards.entities.userStatistics.UserStatistics;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.DynamicInsert;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Customers")
@Getter
@Setter
@NoArgsConstructor
@DynamicInsert
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

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private UserPreferences userPreferences;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private UserStatistics userStatistics;

    @OneToMany(mappedBy = "sender", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Friendship> sentFriendships;

    @OneToMany(mappedBy = "receiver", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Friendship> receivedFriendships;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Notification> notifications;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<FlashcardProgress> flashcardProgresses;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<ReviewLog> reviewLogs;

    @ManyToMany(mappedBy = "customers", fetch = FetchType.LAZY,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE,
                        CascadeType.DETACH, CascadeType.REFRESH})
    private List<Authority> authorities;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="root_folder_id")
    private Folder rootFolder;

    public Customer(String email, String username, String passwordHash) {
        this.email = email;
        this.username = username;
        this.passwordHash = passwordHash;
        this.profileCreationDate = LocalDateTime.now();
        this.rootFolder = new Folder("ROOT");
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
        this.rootFolder = new Folder("ROOT");
    }
}
