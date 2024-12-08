package com.PAP_team_21.flashcards.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    public Optional<Customer> findByEmail(String username);
    public Customer findOrCreate(String email, String name);


    // This class is a repository for the Customer entity
    // It provides methods to interact with the database
    // It extends the JpaRepository interface, which provides CRUD operations
    // for the Customer entity
}
