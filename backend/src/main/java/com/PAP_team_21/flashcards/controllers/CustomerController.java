package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.controllers.requests.UpdateUsernameRequest;
import com.PAP_team_21.flashcards.entities.FriendshipResponse;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.customer.CustomerService;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import com.PAP_team_21.flashcards.entities.friendship.Friendship;
import com.PAP_team_21.flashcards.entities.friendship.FriendshipRepository;
import com.PAP_team_21.flashcards.entities.notification.Notification;
import com.PAP_team_21.flashcards.entities.notification.NotificationRepository;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerRepository customerRepository;
    private final NotificationRepository notificationRepository;
    private final FriendshipRepository friendshipRepository;
    private final CustomerService customerService;
    private final FolderJpaRepository folderJpaRepository;

    @GetMapping("/findById/{id}")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getCustomerById(Authentication authentication, @PathVariable int id) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Customer> customer = customerRepository.findById(id);

        if (customer.isPresent()) {
            return ResponseEntity.ok(customer.get());
        }
        return ResponseEntity.badRequest().body("Customer not found");
    }

    @GetMapping("/findByEmail/{email}")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getCustomerByEmail(Authentication authentication, @PathVariable String email) {
        String userEmail = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(userEmail);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Customer> customer = customerRepository.findByEmail(email);

        if (customer.isPresent()) {
            return ResponseEntity.ok(customer.get());
        }
        return ResponseEntity.badRequest().body("Customer not found");
    }

    @PostMapping("/updateUsername")
    public ResponseEntity<?> updateUsername(Authentication authentication, @RequestBody UpdateUsernameRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        String newUsername = request.getNewUsername();
        if(newUsername.trim().isEmpty())
        {
            return ResponseEntity.badRequest().body("Username cannot be empty");
        }

        Customer customer = customerOpt.get();
        customer.setUsername(newUsername);
        customerRepository.save(customer);
        return ResponseEntity.ok("Username updated successfully");
    }


    @GetMapping("/findByUsername/{username}")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getCustomersByUsername(Authentication authentication, @PathVariable String username) {
        String userEmail = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(userEmail);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        List<Customer> customers = customerService.findByUsername(username);

        if (customers.isEmpty()) {
            return ResponseEntity.badRequest().body("Customer not found");
        }
        return ResponseEntity.ok(customers);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCustomer(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);

        if(customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user found with this id");
        }
        Customer customer = customerOpt.get();
        folderJpaRepository.delete(customer.getRootFolder());
        customerRepository.delete(customer);
        return ResponseEntity.ok("Customer deleted successfully");
    }

    @GetMapping("/getSelf")
    @JsonView(JsonViewConfig.Internal.class)
    public ResponseEntity<?> getSelf(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Customer customer = customerOpt.get();
        return ResponseEntity.ok(customer);
    }

    @GetMapping("/getReceivedFriendships")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getReceivedFriendships(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        List<Friendship> receivedFriendships = customer.getReceivedFriendships();
        return ResponseEntity.ok(receivedFriendships);
    }

    @GetMapping("/getSentFriendships")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getSentFriendships(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        List<Friendship> sentFriendships = customer.getSentFriendships();
        return ResponseEntity.ok(sentFriendships);
    }

    @GetMapping("/getNotifications")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getNotifications(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        List<Notification> notifications = customer.getNotifications();
        return ResponseEntity.ok(notifications);
    }

    @GetMapping("/getRootFolder")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getRootFolder(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Folder rootFolder = customer.getRootFolder();
        return ResponseEntity.ok(rootFolder);
    }

    @GetMapping("/getFriends")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getFriends(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        List<Customer> friends = new ArrayList<Customer>();

        List<Friendship> possibleFriendships = customer.getSentFriendships();
        for (Friendship friendship : possibleFriendships) {
            if (friendship.isAccepted()) {
                friends.add(friendship.getReceiver());
            }
        }

        possibleFriendships = customer.getReceivedFriendships();
        for (Friendship friendship : possibleFriendships) {
            if (friendship.isAccepted()) {
                friends.add(friendship.getSender());
            }
        }

        return ResponseEntity.ok(friends);
    }

    @GetMapping("/getFriendById/{id}")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getFriendById(Authentication authentication, @PathVariable int id) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<Customer> customerToFindOpt = customerRepository.findById(id);
        if (customerToFindOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No friend with this id found");
        }

        List<Friendship> possibleFriendships = customer.getSentFriendships();

        Customer friend = null;
        for (Friendship friendship : possibleFriendships) {
            if (friendship.getReceiverId() == id && friendship.isAccepted()) {
                friend = friendship.getReceiver();
                break;
            }
        }

        if (friend == null) {
            possibleFriendships = customer.getReceivedFriendships();
            for (Friendship friendship : possibleFriendships) {
                if (friendship.getSenderId() == id && friendship.isAccepted()) {
                    friend = friendship.getSender();
                    break;
                }
            }
        }

        if (friend == null) {
            return ResponseEntity.badRequest().body("No friend with this id found");
        }
        return ResponseEntity.ok(friend);
    }

    @GetMapping("/getFriendByEmail/{email}")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getFriendByEmail(Authentication authentication, @PathVariable String email) {
        String userEmail = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(userEmail);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<Customer> customerToFindOpt = customerRepository.findByEmail(email);
        if (customerToFindOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No friend with this id found");
        }

        int id = customerToFindOpt.get().getId();
        List<Friendship> possibleFriendships = customer.getSentFriendships();

        Customer friend = null;
        for (Friendship friendship : possibleFriendships) {
            if (friendship.getReceiverId() == id && friendship.isAccepted()) {
                friend = friendship.getReceiver();
                break;
            }
        }

        if (friend == null) {
            possibleFriendships = customer.getReceivedFriendships();
            for (Friendship friendship : possibleFriendships) {
                if (friendship.getSenderId() == id && friendship.isAccepted()) {
                    friend = friendship.getSender();
                    break;
                }
            }
        }

        if (friend == null) {
            return ResponseEntity.badRequest().body("No friend with this id found");
        }
        return ResponseEntity.ok(friend);
    }

    @PostMapping("/sendFriendshipOfferById/{id}")
    public ResponseEntity<?> sendFriendshipOfferById(Authentication authentication, @PathVariable int id) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<Customer> customerToAddOpt = customerRepository.findById(id);
        if (customerToAddOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        if (customerToAddOpt.get().getId() == customer.getId()) {
            return ResponseEntity.badRequest().body("You cannot send friendship request to yourself");
        }

        String invitationText = "User with Id: " + customer.getId() + ", email: " + customer.getEmail() +
                " username: " + customer.getUsername() + " has sent you the friend request.";
        Notification notification = new Notification(id, true, invitationText);
        Friendship friendship = new Friendship(customer.getId(), id, false);
        FriendshipResponse friendshipResponse = new FriendshipResponse(friendship, notification);

        notificationRepository.save(notification);
        friendshipRepository.save(friendship);

        return ResponseEntity.ok(friendshipResponse);
    }

    @PostMapping("/sendFriendshipOfferByEmail/{email}")
    public ResponseEntity<?> sendFriendshipOfferByEmail(Authentication authentication, @PathVariable String email) {
        String userEmail = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(userEmail);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<Customer> customerToAddOpt = customerRepository.findByEmail(email);
        if (customerToAddOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user with this email found");
        }
        Customer customerToAdd = customerToAddOpt.get();

        if (customerToAdd.getId() == customer.getId()) {
            return ResponseEntity.badRequest().body("You cannot send friendship request to yourself");
        }

        String invitationText = "User with Id: " + customer.getId() + ", email: " + customer.getEmail() +
                " username: " + customer.getUsername() + " has sent you the friend request.";
        Notification notification = new Notification(customerToAdd.getId(), true, invitationText);
        Friendship friendship = new Friendship(customer.getId(), customerToAdd.getId(), false);
        FriendshipResponse friendshipResponse = new FriendshipResponse(friendship, notification);

        notificationRepository.save(notification);
        friendshipRepository.save(friendship);

        return ResponseEntity.ok(friendshipResponse);
    }

    @PostMapping("/acceptFriendshipOfferById/{id}")
    public ResponseEntity<?> acceptFriendshipOfferById(Authentication authentication, @PathVariable int id) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<Friendship> friendshipOpt = friendshipRepository.findById(id);
        if (friendshipOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No friendship with this id found");
        }
        Friendship friendship = friendshipOpt.get();

        if (customer.getId() != friendship.getReceiverId()) {
            return ResponseEntity.badRequest().body("You are not the receiver of the friendship, you cannot accept it.");
        }

        friendship.setAccepted(true);
        friendshipRepository.save(friendship);

        return ResponseEntity.ok(friendship);
    }
}

