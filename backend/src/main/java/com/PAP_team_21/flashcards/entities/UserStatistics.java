package com.PAP_team_21.flashcards.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name="User_Statistics")
@Getter
@Setter
public class UserStatistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="user_id")
    private int userId;

    @Column(name="total_time_spent")
    private long totalTimeSpent;

    @Column(name="login_count")
    private int loginCount;

    @Column(name="last_login")
    private LocalDateTime lastLogin;

    public UserStatistics() {}

    public UserStatistics(int userId, long totalTimeSpent, int loginCount, LocalDateTime lastLogin) {
        this.userId = userId;
        this.totalTimeSpent = totalTimeSpent;
        this.loginCount = loginCount;
        this.lastLogin = lastLogin;
    }
}
