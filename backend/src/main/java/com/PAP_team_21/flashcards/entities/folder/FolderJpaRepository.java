package com.PAP_team_21.flashcards.entities.folder;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.folderUser.FolderUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderJpaRepository  extends JpaRepository<Folder, Integer> {
    public Page<Folder> findAllByFolderUsers(Pageable pageable, FolderUser folderUser);
//    public Page<Folder> findByCustomersAndName(Pageable pageable, Customer customer, String name);
}
