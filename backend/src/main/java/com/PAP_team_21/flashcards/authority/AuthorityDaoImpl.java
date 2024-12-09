package com.PAP_team_21.flashcards.authority;

import com.PAP_team_21.flashcards.user.User;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AuthorityDaoImpl implements AuthorityDao {

    private final EntityManager entityManager;

    @Autowired
    public AuthorityDaoImpl(EntityManager entityManager) { this.entityManager = entityManager;}

    @Override
    @Transactional
    public void save(Authority authority) {
        entityManager.persist(authority);
    }

    @Override
    public Authority findAuthorityById(int id) {
        return entityManager.find(Authority.class, id);
    }

    @Override
    public List<Authority> findAllAuthorities() {
        String jpql = "SELECT a FROM Authority a";
        return entityManager.createQuery(jpql, Authority.class)
                            .getResultList();
    }

    @Override
    @Transactional
    public void update(Authority authority) {
        entityManager.merge(authority);
    }

    @Override
    @Transactional
    public void deleteAuthorityById(int id) {
        Authority authority = findAuthorityById(id);
        List<User> users = authority.getUsers();
        for (User user : users) {
            user.getAuthorities().remove(authority);
        }
        entityManager.remove(authority);
    }
}
