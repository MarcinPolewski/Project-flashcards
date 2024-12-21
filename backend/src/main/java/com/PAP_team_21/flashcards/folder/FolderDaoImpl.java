package com.PAP_team_21.flashcards.folder;

import com.PAP_team_21.flashcards.deck.Deck;
import com.PAP_team_21.flashcards.customer.Customer;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FolderDaoImpl implements FolderDao {

    private final EntityManager entityManager;

    @Autowired
    public FolderDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Folder folder) {
        entityManager.persist(folder);
    }

    @Override
    public Folder findFolderById(int id) {
        return entityManager.find(Folder.class, id);
    }

    @Override
    public List<Folder> findAllFolders() {
        String jpql = "SELECT f FROM Folder f";
        return entityManager.createQuery(jpql, Folder.class)
                            .getResultList();
    }

    @Override
    @Transactional
    public void update(Folder folder) {
        entityManager.merge(folder);
    }

    @Override
    @Transactional
    public void deleteFolderById(int id) {
        Folder folder = entityManager.find(Folder.class, id);
        List<Deck> decks = folder.getDecks();
        List<Customer> customers = folder.getCustomers();
        for (Customer customer : customers) {
            customer.getFolders().remove(folder);
            entityManager.merge(customer);
        }
        for (Deck deck : decks) {
            deck.getFolders().remove(folder);
            entityManager.merge(deck);
        }
        entityManager.remove(folder);
    }
}
