package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.Errors.ResourceNotFoundException;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.DeckAccessServiceResponse;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.FolderAccessServiceResponse;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.ResourceAccessService;
import com.PAP_team_21.flashcards.controllers.requests.DeckCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.DeckUpdateRequest;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.deck.DeckRepository;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardRepository;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/deck")
@RequiredArgsConstructor
public class DeckController {
    private final DeckRepository deckRepository;
    private final ResourceAccessService resourceAccessService;

    @GetMapping("/flashcards")
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
        return ResponseEntity.ok(response.getDeck().getFlashcards());
    }

    @PostMapping("/create")
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
            deckRepository.save(response.getDeck());
            return ResponseEntity.ok(response.getDeck());
        }
        return ResponseEntity.badRequest().body("You do not have permission to create a deck here");
    }

    @DeleteMapping("/delete")
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
            deckRepository.delete(response.getDeck());
            return ResponseEntity.ok("deck deleted");
        }
        return ResponseEntity.badRequest().body("You do not have permission to delete this deck");
    }


}
