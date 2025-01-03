package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.controllers.requests.CustomerCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.CustomerUpdateRequest;
import com.PAP_team_21.flashcards.entities.FriendshipResponse;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.customer.CustomerService;
import com.PAP_team_21.flashcards.entities.folder.Folder;
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

    @PostMapping("/create")
    public ResponseEntity<?> createCustomer(Authentication authentication, @RequestBody CustomerCreationRequest request) {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Optional<Customer> existingCustomerOpt = customerRepository.findByEmail(request.getEmail());
        if(existingCustomerOpt.isPresent()) {
            return ResponseEntity.badRequest().body("A user with this email already exists");
        }

        Customer customer = new Customer(request.getEmail(), request.getPasswordHash(),
                                        request.getUsername(), request.getProfilePicturePath());
        customer.setEnabled(true);
        customer.setCredentialsExpired(false);
        customer.setAccountLocked(false);
        customer.setAccountExpired(false);
        customerRepository.save(customer);
        return ResponseEntity.ok(customer);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateCustomer(Authentication authentication, @RequestBody CustomerUpdateRequest request)
    {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);

        if(customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user found with this id");
        }

        Customer customer = customerOpt.get();

        if (customerService.checkIfEmailAvailable(request.getEmail()) || email.equals(request.getEmail())) {
            customer.setEmail(request.getEmail());
        }
        customer.setPasswordHash(request.getPasswordHash());
        customer.setUsername(request.getUsername());
        customer.setProfilePicturePath(request.getProfilePicturePath());

        customerRepository.save(customer);
        return ResponseEntity.ok(customer);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteCustomer(Authentication authentication) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);

        if(customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user found with this id");
        }
        Customer customer = customerOpt.get();

        customerRepository.delete(customer);
        return ResponseEntity.ok("Customer deleted successfully");
    }

    @GetMapping("/getSelf")
    @JsonView(JsonViewConfig.Public.class)
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

    @PostMapping("/sentFriendshipOfferById/{id}")
    public ResponseEntity<?> sentFriendshipOfferById(Authentication authentication, @PathVariable int id) {
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

        String invitationText = "User with Id: " + customer.getId() + ", email: " + customer.getEmail() +
                "username: " + customer.getUsername() + "has sent you the friend request.";
        Notification notification = new Notification(id, true, invitationText);
        Friendship friendship = new Friendship(customer.getId(), id, false);
        FriendshipResponse friendshipResponse = new FriendshipResponse(friendship, notification);

        notificationRepository.save(notification);
        friendshipRepository.save(friendship);

        return ResponseEntity.ok(friendshipResponse);
    }

    @PostMapping("/sentFriendshipOfferByEmail/{email}")
    public ResponseEntity<?> sentFriendshipOfferByEmail(Authentication authentication, @PathVariable String email) {
        String userEmail = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(userEmail);
        if (customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customer = customerOpt.get();

        Optional<Customer> customerToAddOpt = customerRepository.findByEmail(email);
        if (customerToAddOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user with this id found");
        }
        Customer customerToAdd = customerToAddOpt.get();

        String invitationText = "User with Id: " + customer.getId() + ", email: " + customer.getEmail() +
                "username: " + customer.getUsername() + "has sent you the friend request.";
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

        Optional<Friendship> friendshipOpt = friendshipRepository.findById(id);
        if (friendshipOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No friendship with this id found");
        }
        Friendship friendship = friendshipOpt.get();

        friendship.setAccepted(true);
        friendshipRepository.save(friendship);

        return ResponseEntity.ok(friendship);
    }
}

