package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.controllers.requests.DeckCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.DeckUpdateRequest;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardUpdateRequest;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.deck.Deck;
import com.PAP_team_21.flashcards.entities.deck.DeckRepository;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardRepository;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/flashcard")
@RequiredArgsConstructor
public class FlashcardController {
    private final CustomerRepository customerRepository;
    private final DeckRepository deckRepository;
    private final FolderJpaRepository folderRepository;
    private final FlashcardRepository flashcardRepository;

    // create flashcard
    @PostMapping("/create")
    public ResponseEntity<?> createFlashcard(
            Authentication authentication,
            @RequestBody FlashcardCreationRequest request)
    {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Deck> deckOpt = deckRepository.findById(request.getDeckId());
        if(deckOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No deck with this id found");
        }
        AccessLevel al =  deckOpt.get().getAccessLevel(customerOpt.get());
        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {
            Flashcard flashcard = new Flashcard(deckOpt.get(), request.getFront(), request.getBack());
            flashcardRepository.save(flashcard);
            return ResponseEntity.ok(flashcard);
        }

        return ResponseEntity.badRequest().body("You do not have permission to create a deck here");
    }
    // update flashcard
    @PostMapping("/update")
    public ResponseEntity<?> updateFlashcard(
            Authentication authentication,
            @RequestBody FlashcardUpdateRequest request)
    {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

       Optional<Flashcard> flashcardOpt = flashcardRepository.findById(request.getFlashcardId());
        if(flashcardOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No flashcard with this id found");
        }
        AccessLevel al = flashcardOpt.get().getAccessLevel(customerOpt.get());

        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {
            flashcardOpt.get().setFront(request.getFront());
            flashcardOpt.get().setBack(request.getBack());
            flashcardRepository.save(flashcardOpt.get());
            return ResponseEntity.ok(flashcardOpt.get());
        }

        return ResponseEntity.badRequest().body("You do not have permission to create a deck here");
    }

    // delete
    @DeleteMapping("/delete")
    public ResponseEntity<?> updateFlashcard(
            Authentication authentication,
            @RequestParam int flashcardId)
    {

        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Flashcard> flashcardOpt = flashcardRepository.findById(flashcardId);
        if(flashcardOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No flashcard with this id found");
        }
        AccessLevel al = flashcardOpt.get().getAccessLevel(customerOpt.get());

        if(al.equals(AccessLevel.OWNER) || al.equals(AccessLevel.EDITOR))
        {

            flashcardRepository.delete(flashcardOpt.get());
            return ResponseEntity.ok("flashcard deleted");
        }

        return ResponseEntity.badRequest().body("You do not have permission to create a deck here");
    }


    @PostMapping("/deleteFlashcardFromDeck")
    public ResponseEntity<?> deleteFlashcardFromDeck(
            Authentication authentication,
            @RequestParam() int deckId,
            @RequestParam() int flashcardId
    )
    {
        return ResponseEntity.ok("twoja stara");
    }

    @PostMapping("/copyFlashcardToDeck")
    public ResponseEntity<?> addFlashcardToDeck(
            Authentication authentication,
            @RequestParam() int deckId,
            @RequestParam() int flashcardId
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

        Optional<Flashcard> flashcard = flashcardRepository .findById(flashcardId);
        if(flashcard.isEmpty())
            return ResponseEntity.badRequest().body("No flashcard with this id found");

        AccessLevel destinationDeckAccessLevel = deckOpt.get().getAccessLevel(customerOpt.get());
        AccessLevel flashcardAccessLevel = flashcard.get().getAccessLevel(customerOpt.get());
        if (!(destinationDeckAccessLevel.equals(AccessLevel.EDITOR)  ||
                destinationDeckAccessLevel.equals(AccessLevel.OWNER))
        )
        {
            return ResponseEntity.badRequest().body("You do not have permission to add to this deck: " + deckId);
        }

        if(!(flashcardAccessLevel.equals(AccessLevel.EDITOR)  ||
                flashcardAccessLevel.equals(AccessLevel.OWNER)) ||
                flashcardAccessLevel.equals(AccessLevel.VIEWER)) // @TODO check this - is this last condidtion always false?
        {
            return ResponseEntity.badRequest().body("You do not have permission to  this flashcard");
        }

        Flashcard newFlashcard = new Flashcard(deckOpt.get(), flashcard.get().getFront(), flashcard.get().getBack());
        flashcardRepository.save(newFlashcard);

        return ResponseEntity.ok("Flashcard copied to deck");
    }

    @PostMapping("/moveFlashcardToOtherDeck")
    public ResponseEntity<?> moveFlashcardToOtherDeck(
            Authentication authentication,
            @RequestParam() int sourceDeckId,
            @RequestParam() int destinationDeckId,
            @RequestParam() int flashcardId
    )
    {
        String email = authentication.getName();
        Optional<Customer> customer = customerRepository.findByEmail(email);

        if(customer.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Deck> sourceDeck = deckRepository.findById(sourceDeckId);
        Optional<Deck> destinationDeck = deckRepository.findById(destinationDeckId);
        Optional <Flashcard> flashcard = flashcardRepository.findById(flashcardId);

        if(sourceDeck.isEmpty())
        {
            return ResponseEntity.badRequest().body("No source deck with this id found");
        }
        if(destinationDeck.isEmpty())
        {
            return ResponseEntity.badRequest().body("No destination deck with this id found");
        }
        if(flashcard.isEmpty())
        {
            return ResponseEntity.badRequest().body("No flashcard with this id found");
        }

        AccessLevel sourceDeckAccessLevel = sourceDeck.get().getAccessLevel(customer.get());
        AccessLevel destinationDeckAccessLevel = destinationDeck.get().getAccessLevel(customer.get());

        if(!(sourceDeckAccessLevel.equals(AccessLevel.EDITOR) || sourceDeckAccessLevel.equals(AccessLevel.OWNER)))
        {
            return ResponseEntity.badRequest().body("You do not have permission to edit this deck: " + sourceDeckId);
        }
        if(!(destinationDeckAccessLevel.equals(AccessLevel.EDITOR) || destinationDeckAccessLevel.equals(AccessLevel.OWNER)))
        {
            return ResponseEntity.badRequest().body("You do not have permission to edit this deck: " + destinationDeckId);
        }

        if(flashcard.get().getDeck().getId() != sourceDeckId)
        {
            return ResponseEntity.badRequest().body("Flashcard is not in source deck");
        }

        sourceDeck.get().getFlashcards().remove(flashcard.get());
        deckRepository.save(sourceDeck.get());

        destinationDeck.get().getFlashcards().add(flashcard.get());
        deckRepository.save(destinationDeck.get());


        return ResponseEntity.ok("flashcard moved!");
    }
}
