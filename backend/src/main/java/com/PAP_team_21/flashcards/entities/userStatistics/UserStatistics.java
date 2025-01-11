package com.PAP_team_21.flashcards.entities.userStatistics;

import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.fasterxml.jackson.annotation.JsonView;
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
    @JsonView(JsonViewConfig.Public.class)
    private int id;

    @Column(name = "user_id")
    @JsonView(JsonViewConfig.Public.class)
    private int userId;

    @Column(name = "total_time_spent")
    @JsonView(JsonViewConfig.Public.class)
    private int totalTimeSpent;

    @Column(name = "login_count")
    @JsonView(JsonViewConfig.Public.class)
    private int loginCount;

    @Column(name = "last_login")
    @JsonView(JsonViewConfig.Public.class)
    private LocalDateTime lastLogin;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private Customer customer;

    public UserStatistics() {}

    public UserStatistics(int userId, int totalTimeSpent, int loginCount, LocalDateTime lastLogin) {
        this.userId = userId;
        this.totalTimeSpent = totalTimeSpent;
        this.loginCount = loginCount;
        this.lastLogin = lastLogin;
    }
}
