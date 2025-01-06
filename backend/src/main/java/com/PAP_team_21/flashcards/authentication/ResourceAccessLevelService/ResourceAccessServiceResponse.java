package com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService;

import com.PAP_team_21.flashcards.AccessLevel;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResourceAccessServiceResponse {
    private AccessLevel accessLevel;
    private Customer customer;
}
