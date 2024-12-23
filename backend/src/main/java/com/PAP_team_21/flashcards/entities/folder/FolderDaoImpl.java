package com.PAP_team_21.flashcards.entities.folder;

import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FolderDaoImpl implements FolderDao {

    private final EntityManager entityManager;

    @Autowired
    public FolderDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public Page<Folder> getAllFoldersByCustomer(Pageable pageRequest, Customer customer)
    {
        pageRequest.getPageNumber();
        pageRequest.getSort();
        pageRequest.getPageSize();

        int customerId = customer.getId();

    Query query = entityManager.createQuery("FROM Folder ");
//        Query query = entityManager.createQuery("FROM Folder " +
//                "inner join FolderUser on Folder.id = FolderUser.flashcardFolder.id " +
//                "inner join Customer on FolderUser.customer.id = Customer.id" +
//                " where Customer.id = :customerId");
//        query.setParameter("customerId", customer.getId());
        query.setFirstResult(pageRequest.getPageNumber() * pageRequest.getPageSize());
        query.setMaxResults(pageRequest.getPageSize());

        List<Folder> queryResult = query.getResultList();

        return new PageImpl<>(queryResult, pageRequest, queryResult.size());
    }

}
