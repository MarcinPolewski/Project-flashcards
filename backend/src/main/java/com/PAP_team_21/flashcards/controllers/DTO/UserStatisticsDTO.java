package com.PAP_team_21.flashcards.controllers.DTO;

import java.time.LocalDateTime;
import java.util.List;

public class UserStatisticsDTO
{
    private int daysLearning;
    private int longestStreak;
    private int currentStreak;
    private int allNewCards;
    private int allLearningCards;
    private int allRememberedCards;
    private List<LocalDateTime> loginDates;
}
