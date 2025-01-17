package com.PAP_team_21.flashcards.controllers.DTO;

import com.PAP_team_21.flashcards.entities.JsonViewConfig;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@JsonView(JsonViewConfig.Public.class)
public class DeckDTO {
    private int id;
    private String name;
    private float progress;
    private int newCards;
    private int toReview;
    private int totalCards;
    private  int learnedCards;
}
