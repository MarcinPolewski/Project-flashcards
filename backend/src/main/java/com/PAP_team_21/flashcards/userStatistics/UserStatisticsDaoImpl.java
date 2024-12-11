package com.PAP_team_21.flashcards.userStatistics;

import com.PAP_team_21.flashcards.customer.Customer;
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
        Customer customer = entityManager.find(Customer.class, userId);
        return customer.getUserStatistics();
    }

    @Override
    public void update(UserStatistics userStatistics) {
        entityManager.merge(userStatistics);
    }

    @Override
    public void deleteUserStatisticsById(int id) {
        UserStatistics userStatistics = findUserStatisticsById(id);
        Customer customer = entityManager.find(Customer.class, userStatistics.getUserId());
        customer.setUserPreferences(null);
        entityManager.merge(customer);
        entityManager.remove(userStatistics);
    }
}
