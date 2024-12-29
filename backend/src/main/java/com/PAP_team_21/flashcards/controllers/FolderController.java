package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.controllers.requests.FolderCreationRequest;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.folder.FolderDao;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import com.PAP_team_21.flashcards.entities.folder.FolderService;
import com.fasterxml.jackson.annotation.JsonView;
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

    private final FolderService folderService;
    private final CustomerRepository customerRepository;

    @GetMapping("/getFolderStructure")
    @JsonView(JsonViewConfig.Public.class)
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
        {
            return ResponseEntity.ok(customer.get().getRootFolder());
        }
            // return ResponseEntity.ok(folderService.findAllByCustomer(pageable, customer.get()));
        return ResponseEntity.badRequest().body("No user with this id found");
    }

    @PostMapping("/create")
    public ResponseEntity<?> createFolder(Authentication authentication,
                                          @RequestBody FolderCreationRequest request
    ) {

        String email = authentication.getName();
        Optional<Customer> customer = customerRepository.findByEmail(email);

        if(customer.isEmpty())
            return ResponseEntity.badRequest().body("No user with this id found");

        Optional<Folder> parentFolder = folderService.findById(request.getParentId());
        if(parentFolder.isEmpty())
            return ResponseEntity.badRequest().body("No folder with this id found");

        AccessLevel userAccessLevel = (parentFolder.get()).getAccessLevel(customer.get());
        if(userAccessLevel.equals(AccessLevel.EDITOR) || userAccessLevel.equals(AccessLevel.OWNER))
        {
            Folder folder = new Folder(request.getName(), customer.get(), parentFolder.get());
            folderService.save(folder);
            return ResponseEntity.ok("folder created!");
        }
        return ResponseEntity.badRequest().body("You do not have permission to create a folder here");
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateFolder(Authentication authentication,@RequestBody Folder folder) {

        if(folderService.hasFolder(folder))
            return ResponseEntity.badRequest().body("folder already exists");
        else
            return ResponseEntity.ok(folderService.save(folder));    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFolder(Authentication authentication, @RequestParam int folderId) {
        Optional<Folder> folderOpt = folderService.findById(folderId);

        if(folderOpt.isEmpty())
            return ResponseEntity.badRequest().body("folder does not exist");

        Folder folder = folderOpt.get();
        Optional<Customer> customer = customerRepository.findByEmail(authentication.getName());

        if(customer.isEmpty())
            return ResponseEntity.badRequest().body("No user with this id found");

        AccessLevel al = folder.getAccessLevel(customer.get());

        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {
            folderService.delete(folderId);
            return ResponseEntity.ok("folder deleted");
        }
        return ResponseEntity.badRequest().body("You do not have permission to delete this folder");
    }
}
