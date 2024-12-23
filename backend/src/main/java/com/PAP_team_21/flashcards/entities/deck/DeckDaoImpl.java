package com.PAP_team_21.flashcards.entities.deck;

import com.PAP_team_21.flashcards.entities.folder.Folder;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DeckDaoImpl implements DeckDao {

    private final EntityManager entityManager;

    @Autowired
    public DeckDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    @Transactional
    public void save(Deck deck) {
        entityManager.persist(deck);
    }

    @Override
    public Deck findDeckById(int id) {
        return entityManager.find(Deck.class, id);
    }

    @Override
    public List<Deck> findAllDecks() {
        String jpql = "SELECT d FROM Deck d";
        return entityManager.createQuery(jpql, Deck.class)
                            .getResultList();
    }

    @Override
    @Transactional
    public void update(Deck deck) {
        entityManager.merge(deck);
    }

    @Override
    @Transactional
    public void deleteDeckById(int id) {
        Deck deck = findDeckById(id);
        List<Folder> folders = deck.getFolders();
        for (Folder folder : folders) {
            folder.getDecks().remove(deck);
            entityManager.merge(folder);
        }
        entityManager.remove(deck);
    }
}
