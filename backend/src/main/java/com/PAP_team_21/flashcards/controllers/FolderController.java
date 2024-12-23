package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.folder.FolderDao;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/folder")
@RequiredArgsConstructor
public class FolderController {

    private final FolderJpaRepository folderRepository;
    private final CustomerRepository customerRepository;

    @GetMapping("/get")
    public ResponseEntity<?> getAllFolders(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending
    )
    {
        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        String email = authentication.getName();
        Optional<Customer> customer = customerRepository.findByEmail(email);

        if(customer.isPresent())
            return ResponseEntity.ok(folderRepository.findAllByCustomers(pageable, customer.get()));
        return ResponseEntity.badRequest().body("No user with this id found");

    }

    @GetMapping("/get")
    public ResponseEntity<?> searchByFolderName(
            Authentication authentication,
            @RequestParam(defaultValue = "") String matchingThis,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending
    )
    {
        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        String email = authentication.getName();
        Optional<Customer> customer = customerRepository.findByEmail(email);

        if(customer.isPresent())
            return ResponseEntity.ok(folderRepository.findByCustomersAndName(pageable, customer.get(), matchingThis));
        return ResponseEntity.badRequest().body("No user with this id found");    }

    @PostMapping("/create")
    public ResponseEntity<?> createFolder(Authentication authentication, Folder folder) {

        Optional<Folder> found = folderRepository.findById(folder.getId());
        if(found.isPresent())
            return ResponseEntity.badRequest().body("folder already exists");
        else
            return ResponseEntity.ok(folderRepository.save(folder));

    }

    @PostMapping("/update")
    public ResponseEntity<?> updateFolder(Authentication authentication, Folder folder) {

        Optional<Folder> found = folderRepository.findById(folder.getId());
        if(found.isEmpty())
            return ResponseEntity.badRequest().body("folder already exists");
        else
            return ResponseEntity.ok(folderRepository.save(folder));    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFolder(Authentication authentication, int folderId) {
        Optional<Folder> found = folderRepository.findById(folderId);
        if(found.isEmpty())
            return ResponseEntity.badRequest().body("folder does not exist");
        else
        {
            folderRepository.delete(found.get());
            return ResponseEntity.ok("folder deleted");
        }
    }
}
