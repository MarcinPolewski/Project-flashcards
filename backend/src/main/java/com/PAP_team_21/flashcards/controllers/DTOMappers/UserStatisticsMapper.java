package com.PAP_team_21.flashcards.controllers.DTOMappers;

import com.PAP_team_21.flashcards.controllers.DTO.UserStatisticsDTO;
import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.flashcard.FlashcardService;
import com.PAP_team_21.flashcards.entities.userStatistics.UserStatistics;
import com.PAP_team_21.flashcards.entities.userStatistics.UserStatisticsRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserStatisticsMapper {

    private final FlashcardService flashcardService;
    private final UserStatisticsRepository userStatisticsRepository;

    public UserStatisticsDTO toDTO(Customer customer, UserStatistics userStatistics) {

            int customerId = customer.getId();

        int daysLearning = userStatistics.getTotalDaysLearning();
         int longestStreak = userStatistics.getLongestLearningStreak();
         int currentStreak = userStatistics.getDaysLearningStreak();
         int allNewCards = flashcardService.countAllNewCards(customerId) ;
         int allLearningCards = flashcardService.countAllDueCards(customerId);
         int allRememberedCards = flashcardService.countAllCards(customerId) - allLearningCards -allNewCards;
         List<LocalDateTime> loginDates = userStatisticsRepository.getGithubStyleChartData(customerId);

        return new UserStatisticsDTO(daysLearning, longestStreak, currentStreak, allNewCards, allLearningCards, allRememberedCards, loginDates);
    }
}
