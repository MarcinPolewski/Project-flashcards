package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.controllers.requests.FriendshipCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.FriendshipUpdateRequest;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.friendship.Friendship;
import com.PAP_team_21.flashcards.entities.friendship.FriendshipRepository;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/friendship")
@RequiredArgsConstructor
public class FriendshipController {

    private final FriendshipRepository friendshipRepository;
    private final CustomerRepository customerRepository;

    @GetMapping("/{id}")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getAllFriendships(Authentication authentication, @PathVariable int id) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Friendship> friendshipOpt = friendshipRepository.findById(id);
        if (friendshipOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No friendship with this id found");
        }

        return ResponseEntity.ok(friendshipOpt.get());
    }

    @PostMapping("/create")
    public ResponseEntity<?> createFriendship(Authentication authentication,
                                              @RequestBody FriendshipCreationRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Friendship friendship = new Friendship(request.getSenderId(), request.getReceiverId(),
                                                request.isAccepted());

        friendshipRepository.save(friendship);
        return ResponseEntity.ok(friendship);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateFriendship(Authentication authentication,
                                              @RequestBody FriendshipUpdateRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Friendship> friendshipOpt = friendshipRepository.findById(request.getFriendshipId());
        if (friendshipOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No friendship with this id found");
        }

        Friendship friendship = friendshipOpt.get();
        friendship.setAccepted(request.isAccepted());

        friendshipRepository.save(friendship);
        return ResponseEntity.ok(friendship);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteFriendship(Authentication authentication, @RequestParam int friendshipId) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Friendship> friendshipOpt = friendshipRepository.findById(friendshipId);
        if (friendshipOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No friendship with this id found");
        }
        Friendship friendship = friendshipOpt.get();

        friendshipRepository.delete(friendship);
        return ResponseEntity.ok("Friendship successfully deleted");
    }

}
