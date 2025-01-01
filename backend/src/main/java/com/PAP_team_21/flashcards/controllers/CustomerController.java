package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.controllers.requests.CustomerCreationRequest;
import com.PAP_team_21.flashcards.controllers.requests.CustomerUpdateRequest;
import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.folder.Folder;
import com.PAP_team_21.flashcards.entities.friendship.Friendship;
import com.PAP_team_21.flashcards.entities.notification.Notification;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerRepository customerRepository;

    @GetMapping("/allCustomers")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getAllCustomers(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "true") boolean ascending,
            @RequestParam() int deckId
    )
    {
        String email = authentication.getName();
        Optional<Customer> customerOpt= customerRepository.findByEmail(email);
        if(customerOpt.isEmpty())
        {
            return ResponseEntity.badRequest().body("No user with this id found");
        }

        Sort sort = ascending ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);

        List<Customer> customers = customerRepository.findAll(pageable).getContent();

        if (customers.isEmpty())
        {
            return ResponseEntity.badRequest().body("No users found");
        }
        return ResponseEntity.ok(customers);
    }

    @GetMapping("/{id}")
    @JsonView(JsonViewConfig.Public.class)
    public ResponseEntity<?> getCustomer(Authentication authentication, @PathVariable int id) {
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

        customer.setEmail(request.getEmail());
        customer.setPasswordHash(request.getPasswordHash());
        customer.setUsername(request.getUsername());
        customer.setAccountExpired(request.isAccountExpired());
        customer.setAccountLocked(request.isAccountLocked());
        customer.setCredentialsExpired(request.isCredentialsExpired());
        customer.setEnabled(request.isEnabled());
        customer.setProfilePicturePath(request.getProfilePicturePath());

        customerRepository.save(customer);
        return ResponseEntity.ok(customer);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteCustomer(Authentication authentication, @RequestParam int customerId) {
        String email = authentication.getName();
        Optional<Customer> customerOpt = customerRepository.findByEmail(email);

        if(customerOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No user found with this id");
        }

        Optional<Customer> customerToDeleteOpt = customerRepository.findById(customerId);

        if (customerToDeleteOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Customer not found");
        }
        customerRepository.delete(customerToDeleteOpt.get());
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
}

