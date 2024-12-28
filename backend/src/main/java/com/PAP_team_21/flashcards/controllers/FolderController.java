package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.folder.FolderDao;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import com.PAP_team_21.flashcards.entities.folder.FolderService;
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
        {
            return ResponseEntity.ok(customer.get().getRootFolder());
        }
            // return ResponseEntity.ok(folderService.findAllByCustomer(pageable, customer.get()));
        return ResponseEntity.badRequest().body("No user with this id found");

    }

    @GetMapping("/get-by-folder-name")
    public ResponseEntity<?> searchByFolderName(
            Authentication authentication,
            @RequestParam(defaultValue = "") String matchingThis,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending
    )
    {
////        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
////        Pageable pageable = PageRequest.of(page, size, sort);
//
//        String email = authentication.getName();
//        Optional<Customer> customer = customerRepository.findByEmail(email);
//
//        if(customer.isPresent())
//            return ResponseEntity.ok(customer.get().getRootFolder());
        return ResponseEntity.badRequest().body("No user with this id found");    }

    @PostMapping("/create")
    public ResponseEntity<?> createFolder(Authentication authentication,
                                          @RequestBody Folder folder,
                                          @RequestBody AccessLevel accessLevel
    ) {

        Optional<Folder> found = folderService.findById(folder.getId());
        if(found.isPresent()) {
            return ResponseEntity.badRequest().body("folder already exists");
        }
         if(folder.getName() == null)
                return ResponseEntity.badRequest().body("name cannot be null");

        // @TODO set ownership to this user
//        Optional<Customer> customerOptional = customerRepository.findByEmail(authentication.getName());
//        if(customerOptional.isEmpty())
//            return ResponseEntity.badRequest().body("No user with this id found");
//
//        Customer customer = customerOptional.get();
//        folder.getFolderUsers().add(new FolderUser(customer, folder, accessLevel, ))

        return ResponseEntity.ok(folderService.save(folder));

    }

    @PostMapping("/update")
    public ResponseEntity<?> updateFolder(Authentication authentication,@RequestBody Folder folder) {

        if(folderService.hasFolder(folder))
            return ResponseEntity.badRequest().body("folder already exists");
        else
            return ResponseEntity.ok(folderService.save(folder));    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFolder(Authentication authentication, @RequestParam int folderId) {
        if(folderService.hasFolder(folderId))
            return ResponseEntity.badRequest().body("folder does not exist");
        else
        {
            folderService.delete(folderId);
            return ResponseEntity.ok("folder deleted");
        }
    }
}
