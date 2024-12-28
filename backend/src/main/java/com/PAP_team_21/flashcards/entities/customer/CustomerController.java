package com.PAP_team_21.flashcards.entities.customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/customers")
public class CustomerController {

    private final CustomerDao customerDao;

    @Autowired
    public CustomerController(CustomerDao customerDao) {
        this.customerDao = customerDao;
    }

    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable int id) {
        return customerDao.findUserById(id);
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerDao.findAllUsers();
    }

    @PostMapping
    public void saveCustomer(@RequestBody Customer customer) {
        customerDao.save(customer);
    }

    @PutMapping("/{id}")
    public void updateCustomer(@PathVariable int id, @RequestBody Customer customer) {
        customer.setId(id);
        customerDao.update(customer);
    }

    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable int id) {
        customerDao.deleteUserById(id);
    }
}
