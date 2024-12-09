package com.PAP_team_21.flashcards.user;

import com.PAP_team_21.flashcards.authority.Authority;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Arrays;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Customers")
public class Customer {
    @Id
    private Long id;
    private String username;
    private String email;
    private String passwordHash;
    private Date creationDate;
    private Set<Authority> authorities;

    public Customer(String username, String email, String passwordHash) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }

}
