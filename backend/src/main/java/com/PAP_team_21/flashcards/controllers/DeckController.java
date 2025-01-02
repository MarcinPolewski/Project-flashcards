package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.controllers.requests.DeckCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.DeckUpdateRequest;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.FolderCreationRequest;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.deck.DeckDao;
import com.PAP_team_21.flashcards.entities.deck.DeckRepository;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardRepository;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import com.PAP_team_21.flashcards.entities.folderAccessLevel.FolderAccessLevel;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/deck")
@RequiredArgsConstructor
public class DeckController {
    private final CustomerRepository customerRepository;
    private final DeckRepository deckRepository;
    private final FolderJpaRepository folderRepository;
    private final FlashcardRepository flashcardRepository;

    @GetMapping("/flashcards")
    public ResponseEntity<?> getFlashcards(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam() int deckId)
    {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        // check if this user has access to this deck
        Optional<Deck> deckOpt = deckRepository.findById(deckId);
        if(deckOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No deck with this id found");
        }
        Deck deck = deckOpt.get();

        AccessLevel al = deck.getAccessLevel(customerOpt.get());
        if(al==null)
        {
            return ResponseEntity.badRequest().body("You dont have access to this deck");
        }

        return ResponseEntity.ok(deck.getFlashcards());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createDeck(
            Authentication authentication,
            @RequestBody DeckCreationRequest request)
    {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Folder> folderOpt = folderRepository.findById(request.getFolderId());
        if(folderOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No folder with this id found");
        }

        AccessLevel al = folderOpt.get().getAccessLevel(customerOpt.get());
        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {
            Deck deck = new Deck(request.getName(), folderOpt.get());
            deckRepository.save(deck);
            return ResponseEntity.ok(deck);
        }
        return ResponseEntity.badRequest().body("You do not have permission to create a deck here");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateDeck(
            Authentication authentication,
            @RequestBody DeckUpdateRequest request
    )
    {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Deck> deckOpt = deckRepository.findById(request.getDeckId());
        if(deckOpt.isEmpty())
            return ResponseEntity.badRequest().body("No deck with this id found");

        AccessLevel al = deckOpt.get().getAccessLevel(customerOpt.get());
        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {
            deckOpt.get().setName(request.getName());
            deckRepository.save(deckOpt.get());
            return ResponseEntity.ok(deckOpt.get());
        }
        return ResponseEntity.badRequest().body("You do not have permission to create a deck here");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteDeck(
            Authentication authentication,
            @RequestParam() int deckId
    )
    {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Deck> deckOpt = deckRepository.findById(deckId);
        if(deckOpt.isEmpty())
            return ResponseEntity.badRequest().body("No deck with this id found");

        AccessLevel al = deckOpt.get().getAccessLevel(customerOpt.get());
        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {

            deckRepository.delete(deckOpt.get());
            return ResponseEntity.ok("deck deleted");
        }
        return ResponseEntity.badRequest().body("You do not have permission to create a deck here");
    }


}
