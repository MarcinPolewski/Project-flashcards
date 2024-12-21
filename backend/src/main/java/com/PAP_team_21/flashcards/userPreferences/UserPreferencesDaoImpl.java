package com.PAP_team_21.flashcards.userPreferences;

import com.PAP_team_21.flashcards.customer.Customer;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserPreferencesDaoImpl implements UserPreferencesDao {

    private final EntityManager entityManager;

    @Autowired
    public UserPreferencesDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(UserPreferences userPreferences) {
        entityManager.persist(userPreferences);
    }

    @Override
    public UserPreferences findUserPreferencesById(int id) {
        return entityManager.find(UserPreferences.class, id);
    }

    @Override
    public UserPreferences findByUserId(int userId) {
        Customer customer = entityManager.find(Customer.class, userId);
        return customer.getUserPreferences();
    }

    @Override
    @Transactional
    public void update(UserPreferences userPreferences) {
        entityManager.merge(userPreferences);
    }

    @Override
    @Transactional
    public void deleteUserPreferencesById(int id) {
        UserPreferences userPreferences = findUserPreferencesById(id);
        Customer customer = entityManager.find(Customer.class, userPreferences.getUserId());
        customer.setUserPreferences(null);
        entityManager.merge(customer);
        entityManager.remove(userPreferences);
    }
}
