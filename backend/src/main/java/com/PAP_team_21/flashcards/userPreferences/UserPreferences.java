package com.PAP_team_21.flashcards.userPreferences;

import com.PAP_team_21.flashcards.customer.Customer;
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

    @Column(name = "user_id", insertable = false, updatable = false)
    private int userId;

    @Column(name = "dark_mode")
    private boolean darkMode;

    @Column(name = "language")
    private int language;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Customer customer;

    public UserPreferences() {}

    public UserPreferences(int userId, boolean darkMode, int language) {
        this.userId = userId;
        this.darkMode = darkMode;
        this.language = language;
    }
}
