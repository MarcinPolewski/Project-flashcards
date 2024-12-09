package com.PAP_team_21.flashcards.user;

import com.PAP_team_21.flashcards.folder.Folder;
import com.PAP_team_21.flashcards.authority.Authority;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    private final EntityManager entityManager;

    @Autowired
    public UserDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(User user) {
        entityManager.persist(user);
    }

    @Override
    public User findUserById(int id) {
        return entityManager.find(User.class, id);
    }

    @Override
    public User findUserByEmail(String email) {
        String jpql = "SELECT u FROM User u WHERE u.email = :email";;
        return entityManager.createQuery(jpql, User.class)
                .setParameter("email", email)
                .getSingleResult();
    }

    @Override
    public User findUserByUsername(String username) {
        String jpql = "SELECT u FROM User u WHERE u.username = :username";;
        return entityManager.createQuery(jpql, User.class)
                .setParameter("username", username)
                .getSingleResult();
    }

    @Override
    public List<User> findAllUsers() {
        String jpql = "SELECT u FROM User u";
        return entityManager.createQuery(jpql, User.class)
                .getResultList();
    }

    @Override
    @Transactional
    public void update(User user) {
        entityManager.merge(user);
    }

    @Override
    @Transactional
    public void deleteUserById(int id) {
        User user = findUserById(id);
        List<Folder> folders = user.getFolders();
        List<Authority> authorities = user.getAuthorities();
        for (Folder folder : folders) {
            folder.getUsers().remove(user);
            entityManager.merge(folder);
        }
        for (Authority authority: authorities) {
            authority.getUsers().remove(user);
            entityManager.merge(authority);
        }
        entityManager.remove(user);
    }
}
