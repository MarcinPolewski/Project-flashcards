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

//    public Page<Folder> getAllFoldersByCustomer(Pageable pageRequest, Customer customer)
//    {
//        pageRequest.getPageNumber();
//        pageRequest.getSort();
//        pageRequest.getPageSize();
//
//        int customerId = customer.getId();
//
//        Query query = entityManager.createQuery(
//                "SELECT f FROM Folder f " +
//                        "JOIN f.folderUsers fu " +
//                        "JOIN fu.customer c " +
//                        "WHERE c.id = :customerId", Folder.class);
//        query.setParameter("customerId", customerId);
//
//        query.setFirstResult(pageRequest.getPageNumber() * pageRequest.getPageSize());
//        query.setMaxResults(pageRequest.getPageSize());
//
//        List<Folder> queryResult = query.getResultList();
//
//        return new PageImpl<>(queryResult, pageRequest, queryResult.size());
//    }

//    @Override
//    public Page<Folder>  findByCustomersAndName(Pageable pageable, Customer customer, String matchingThis) {
//        pageable.getPageNumber();
//        pageable.getSort();
//        pageable.getPageSize();
//
//        int customerId = customer.getId();
//
//        Query query = entityManager.createQuery(
//                "SELECT f FROM Folder f " +
//                        "JOIN f.folderUsers fu " +
//                        "JOIN fu.customer c " +
//                        "WHERE c.id = :customerId and f.name like :matchingThis", Folder.class);
//        query.setParameter("customerId", customerId);
//        query.setParameter("matchingThis", "%" + matchingThis + "%");
//
//        query.setFirstResult(pageable.getPageNumber() * pageable.getPageSize());
//        query.setMaxResults(pageable.getPageSize());
//
//        List<Folder> queryResult = query.getResultList();
//
//        return new PageImpl<>(queryResult, pageable, queryResult.size());
//    }

}
