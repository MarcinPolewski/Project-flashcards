package com.PAP_team_21.flashcards.entities.friendship;

import com.PAP_team_21.flashcards.entities.notification.Notification;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FriendshipDaoImpl implements FriendshipDao {

    private final EntityManager entityManager;

    @Autowired
    FriendshipDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Friendship friendship) {
        entityManager.persist(friendship);
    }

    @Override
    public Friendship findFriendshipById(int id) {
        return entityManager.find(Friendship.class, id);
    }

    @Override
    public List<Friendship> findAllFriendships() {
        String jpql = "SELECT f FROM Friendship f";
        return entityManager.createQuery(jpql, Friendship.class)
                            .getResultList();
    }

    @Override
    @Transactional
    public void update(Friendship friendship) {
        entityManager.merge(friendship);
    }

    @Override
    @Transactional
    public void deleteFriendshipById(int id) {
        Friendship friendship = findFriendshipById(id);
        List<Notification> notifications = friendship.getNotifications();
        for (Notification notification : notifications) {
            notification.getFriendships().remove(friendship);
            entityManager.merge(notification);
        }
        entityManager.remove(friendship);
    }
}
