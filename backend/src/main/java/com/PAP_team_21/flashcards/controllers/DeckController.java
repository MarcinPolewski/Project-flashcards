package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.Errors.ResourceNotFoundException;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.DeckAccessServiceResponse;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.FolderAccessServiceResponse;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.ResourceAccessService;
import com.PAP_team_21.flashcards.controllers.DTOMappers.DeckMapper;
import com.PAP_team_21.flashcards.controllers.requests.DeckCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.DeckUpdateRequest;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.deck.DeckService;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/deck")
@RequiredArgsConstructor
public class DeckController {
    private final ResourceAccessService resourceAccessService;
    private final CustomerRepository customerRepository;
    private final DeckService deckService;
    private final DeckMapper deckMapper;

    @GetMapping("/flashcards")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getFlashcards(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam() int deckId)
    {
        DeckAccessServiceResponse response;
        try {
            response = resourceAccessService.getDeckAccessLevel(authentication, deckId);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        AccessLevel al = response.getAccessLevel();
        if(al==null)
        {
            return ResponseEntity.badRequest().body("You dont have access to this deck");
        }
        return ResponseEntity.ok(response.getDeck().getFlashcards( page,  size,  sortBy,  ascending));
    }

    @GetMapping("/getLastUsed")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getLastUsed(
            Authentication authentication,
            @RequestParam(defaultValue = "3") int howMany
    )
    {
        if(howMany<=0)
        {
            return ResponseEntity.badRequest().body("howMany must be greater than 0");
        }

        String email = authentication.getName();
        Optional<Customer> cusomterOpt = customerRepository.findByEmail(email);
        if(cusomterOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("Customer not found");
        }

        List<Deck> decks = deckService.getLastUsedDecks(cusomterOpt.get().getId(), howMany);
        return ResponseEntity.ok(deckMapper.toDTO(cusomterOpt.get(), decks));
    }

    @PostMapping("/create")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> createDeck(
            Authentication authentication,
            @RequestBody DeckCreationRequest request)
    {
        FolderAccessServiceResponse response;
        try{
            response = resourceAccessService.getFolderAccessLevel(authentication, request.getFolderId());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        AccessLevel al = response.getAccessLevel();
        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {
            Deck deck = new Deck(request.getName(), response.getFolder());
            deckService.save(deck);
            return ResponseEntity.ok(deckMapper.toDTO(response.getCustomer(), deck));
        }
        return ResponseEntity.badRequest().body("You do not have permission to create a deck here");
    }

    @PutMapping("/update")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> updateDeck(
            Authentication authentication,
            @RequestBody DeckUpdateRequest request
    )
    {
        DeckAccessServiceResponse response;
        try{
            response = resourceAccessService.getDeckAccessLevel(authentication, request.getDeckId());
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        AccessLevel al = response.getAccessLevel();

        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {
            response.getDeck().setName(request.getName());
            deckService.save(response.getDeck());
            return ResponseEntity.ok(deckMapper.toDTO(response.getCustomer(), response.getDeck()));
        }
        return ResponseEntity.badRequest().body("You do not have permission to create a deck here");
    }

    @DeleteMapping("/delete")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> deleteDeck(
            Authentication authentication,
            @RequestParam() int deckId
    )
    {
        DeckAccessServiceResponse response;
        try{
            response = resourceAccessService.getDeckAccessLevel(authentication,deckId);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        AccessLevel al = response.getAccessLevel();

        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {
            deckService.delete(response.getDeck());
            return ResponseEntity.ok("deck deleted");
        }
        return ResponseEntity.badRequest().body("You do not have permission to delete this deck");
    }


}
