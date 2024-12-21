package com.PAP_team_21.flashcards.customer;

import java.util.List;

public interface CustomerDao {

    void save(Customer customer);

    Customer findUserById(int id);

    Customer findUserByEmail(String email);

    Customer findUserByUsername(String username);

    List<Customer> findAllUsers();

    void update(Customer customer);

    void deleteUserById(int id);
}
