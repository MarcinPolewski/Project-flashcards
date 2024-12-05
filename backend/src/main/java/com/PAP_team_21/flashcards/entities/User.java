package com.PAP_team_21.flashcards.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="Users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="email")
    private String email;

    @Column(name="password_hash")
    private String passwordHash;

    @Column(name="username")
    private String username;

    @Column(name="account_expired")
    private boolean accountExpired;

    @Column(name="account_locked")
    private boolean accountLocked;

    @Column(name="credentials_expired")
    private boolean credentialsExpired;

    @Column(name="enabled")
    private boolean enabled;

    @Column(name="profile_creation_date")
    private LocalDateTime profileCreationDate;

    @Column(name="profile_picture_path")
    private String profilePicturePath;

    public User() {}

    public User(String email, String passwordHash, String username, boolean accountExpired,
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
