package com.PAP_team_21.flashcards.userStatistics;

import com.PAP_team_21.flashcards.user.User;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Repository;

@Repository
public class UserStatisticsDaoImpl implements UserStatisticsDao {

    private final EntityManager entityManager;

    public UserStatisticsDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void save(UserStatistics userStatistics) {
        entityManager.persist(userStatistics);
    }

    @Override
    public UserStatistics findUserStatisticsById(int id) {
        return entityManager.find(UserStatistics.class, id);
    }

    @Override
    public UserStatistics findByUserId(int userId) {
        User user = entityManager.find(User.class, userId);
        return user.getUserStatistics();
    }

    @Override
    public void update(UserStatistics userStatistics) {
        entityManager.merge(userStatistics);
    }

    @Override
    public void deleteUserStatisticsById(int id) {
        UserStatistics userStatistics = findUserStatisticsById(id);
        User user = entityManager.find(User.class, userStatistics.getUserId());
        user.setUserPreferences(null);
        entityManager.merge(user);
        entityManager.remove(userStatistics);
    }
}
