package com.PAP_team_21.flashcards.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "User_Preferences")
@Getter
@Setter
public class UserPreferences {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_id")
    private int userId;

    @Column(name = "dark_mode")
    private boolean darkMode;

    @Column(name = "language")
    private String language;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    public UserPreferences() {}

    public UserPreferences(int userId, boolean darkMode, String language) {
        this.userId = userId;
        this.darkMode = darkMode;
        this.language = language;
    }
}
