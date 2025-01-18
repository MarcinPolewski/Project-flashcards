package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.controllers.requests.LoadDataFromTxtRequest;
import com.PAP_team_21.flashcards.entities.TxtLoader;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.deck.DeckService;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.Authentication;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class TxtLoaderController {
    private final TxtLoader txtLoader;
    private final DeckService deckService;
    private final FolderJpaRepository folderJpaRepository;
    private final CustomerRepository customerRepository;

    @PostMapping("/loadDeckTxt")
    public ResponseEntity<?> loadDeckTxt(Authentication authentication,
                                            @RequestBody LoadDataFromTxtRequest loadDataFromTxtRequest) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);

        if (customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        String filePath = loadDataFromTxtRequest.getFilePath();
        int folderId = loadDataFromTxtRequest.getFolderId();

        Optional<Folder> folderOpt = folderJpaRepository.findById(folderId);
        if (folderOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid folder id");
        }
        Folder folder = folderOpt.get();

        AccessLevel al = folder.getAccessLevel(customer);
        if (al == null)
        {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body("You don't have access to this folder");
        }

        try {
            byte[] txtData = Files.readAllBytes(Paths.get(filePath));
            Deck deck = txtLoader.loadDeckFromTxt(txtData, folder);
            deckService.save(deck);
            return ResponseEntity.ok(deck);
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid TXT format:");
        }
    }
}
