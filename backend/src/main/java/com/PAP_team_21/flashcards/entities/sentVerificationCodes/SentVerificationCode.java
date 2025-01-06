package com.PAP_team_21.flashcards.entities.sentVerificationCodes;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name="Sent_Verification_Codes")
@Getter
@Setter
@NoArgsConstructor
public class SentVerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToOne
    @JoinColumn(name="customer_id")
    private Customer customer;

    @Column(name="expiration_date")
    private LocalDateTime expirationDate;

    @Column(name="code")
    private String code;
}
