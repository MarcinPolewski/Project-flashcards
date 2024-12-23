package com.PAP_team_21.flashcards.entities.userStatistics;

public interface UserStatisticsDao {

    void save(UserStatistics userStatistics);

    UserStatistics findUserStatisticsById(int id);

    UserStatistics findByUserId(int userId);

    void update(UserStatistics userStatistics);

    void deleteUserStatisticsById(int id);
}
