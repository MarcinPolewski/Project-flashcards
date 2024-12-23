package com.PAP_team_21.flashcards.entities.folder;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface FolderDao {

    public Page<Folder> getAllFoldersByCustomer(Pageable pageRequest, Customer customer);
}
