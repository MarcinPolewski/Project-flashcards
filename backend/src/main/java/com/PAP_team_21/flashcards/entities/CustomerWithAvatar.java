package com.PAP_team_21.flashcards.entities;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.File;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerWithAvatar {
    private Customer customer;
    private File avatar;
}
