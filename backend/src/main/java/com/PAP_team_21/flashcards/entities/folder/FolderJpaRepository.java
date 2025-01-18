package com.PAP_team_21.flashcards.entities.folder;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FolderJpaRepository  extends JpaRepository<Folder, Integer> {
//    public Page<Folder> findAllByFolderUsers(Pageable pageable, FolderUser folderUser);
//    public Page<Folder> findByCustomersAndName(Pageable pageable, Customer customer, String name);
    @Procedure(procedureName = "get_all_user_folders")
    public List<Folder> findAllUserFolders(@Param("userId") Integer userId);

    @Procedure(procedureName = "get_all_user_folders")
    public List<Folder> findAllUserFolders(@Param("userId") Integer userId, Pageable pagable);
}
