package com.PAP_team_21.flashcards.userStatistics;

import com.PAP_team_21.flashcards.customer.Customer;
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
    @Column(name = "id")
    private int id;

    @Column(name = "user_id", insertable = false, updatable = false)
    private int userId;

    @Column(name = "total_time_spent")
    private int totalTimeSpent;

    @Column(name = "login_count")
    private int loginCount;

    @Column(name = "last_login")
    private LocalDateTime lastLogin;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Customer customer;

    public UserStatistics() {}

    public UserStatistics(int userId, int totalTimeSpent, int loginCount, LocalDateTime lastLogin) {
        this.userId = userId;
        this.totalTimeSpent = totalTimeSpent;
        this.loginCount = loginCount;
        this.lastLogin = lastLogin;
    }
}
