package com.PAP_team_21.flashcards.entities.customer;

import com.PAP_team_21.flashcards.entities.authority.Authority;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CustomerDaoImpl implements CustomerDao {

    private final EntityManager entityManager;

    @Autowired
    public CustomerDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Customer customer) {
        entityManager.persist(customer);
    }

    @Override
    public Customer findUserById(int id) {
        return entityManager.find(Customer.class, id);
    }

    @Override
    public Customer findUserByEmail(String email) {
        String jpql = "SELECT u FROM Customer u WHERE u.email = :email";;
        return entityManager.createQuery(jpql, Customer.class)
                .setParameter("email", email)
                .getSingleResult();
    }

    @Override
    public List<Customer> findUserByUsername(String username) {
        String jpql = "SELECT u FROM Customer u WHERE u.username = :username";;
        return entityManager.createQuery(jpql, Customer.class)
                .setParameter("username", username)
                .getResultList();
    }

    @Override
    public List<Customer> findAllUsers() {
        String jpql = "SELECT u FROM Customer u";
        return entityManager.createQuery(jpql, Customer.class)
                .getResultList();
    }

    @Override
    @Transactional
    public void update(Customer customer) {
        entityManager.merge(customer);
    }

    @Override
    @Transactional
    public void deleteUserById(int id) {
//        Customer customer = findUserById(id);
//        List<Folder> folders = customer.getFolders();
//        List<Authority> authorities = customer.getAuthorities();
//        for (Folder folder : folders) {
//            folder.getCustomers().remove(customer);
//            entityManager.merge(folder);
//        }
//        for (Authority authority: authorities) {
//            authority.getCustomers().remove(customer);
//            entityManager.merge(authority);
//        }
//        entityManager.remove(customer);
    }

    @Override
    public boolean checkIfEmailAvailable(String email) {
        String jpql = "SELECT u FROM Customer u";
        List<Customer> customers = entityManager.createQuery(jpql, Customer.class).getResultList();
        for (Customer customer : customers) {
            if (customer.getEmail().equals(email)) {
                return false;
            }
        }
        return true;
    }
}


