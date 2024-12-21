package com.PAP_team_21.flashcards.notification;

import com.PAP_team_21.flashcards.friendship.Friendship;
import com.PAP_team_21.flashcards.customer.Customer;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class NotificationDaoImpl implements NotificationDao {

    private final EntityManager entityManager;

    @Autowired
    public NotificationDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Notification notification) {
        entityManager.persist(notification);
    }

    @Override
    public Notification findNotificationById(int id) {
        return entityManager.find(Notification.class, id);
    }

    @Override
    public List<Notification> findAllOfUser(int user_id) {
        Customer customer = entityManager.find(Customer.class, user_id);
        return customer.getNotifications();
    }

    @Override
    public List<Notification> findAllNotifications() {
        String jpql = "SElECT n FROM Notification n";
        return entityManager.createQuery(jpql, Notification.class)
                            .getResultList();
    }

    @Override
    @Transactional
    public void update(Notification notification) {
        entityManager.merge(notification);

    }

    @Override
    @Transactional
    public void deleteNotificationById(int id) {
        Notification notification = findNotificationById(id);
        List<Friendship> friendships = notification.getFriendships();
        for (Friendship friendship : friendships) {
            friendship.getNotifications().remove(notification);
            entityManager.merge(friendship);
        }
        entityManager.remove(notification);
    }
}
