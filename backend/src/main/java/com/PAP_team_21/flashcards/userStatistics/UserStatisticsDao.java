package com.PAP_team_21.flashcards.userStatistics;

public interface UserStatisticsDao {

    void save(UserStatistics userStatistics);

    UserStatistics findById(int id);

    UserStatistics findByUserId(int userId);

    void update(UserStatistics userStatistics);

    void deleteUserStatisticsById(int id);
}
