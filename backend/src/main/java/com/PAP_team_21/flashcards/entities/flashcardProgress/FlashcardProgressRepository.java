package com.PAP_team_21.flashcards.entities.flashcardProgress;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface FlashcardProgressRepository extends JpaRepository<FlashcardProgress, Integer> {
    Optional<FlashcardProgress> findByCustomerAndFlashcard(Customer customer, Flashcard flashcard);

    @Procedure(procedureName = "find_customers_last_review")
    Optional<LocalDateTime> findCustomersLastReview(@Param("customerId") int id);
}
