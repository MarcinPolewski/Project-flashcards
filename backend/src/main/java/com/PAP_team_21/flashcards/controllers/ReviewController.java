package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.ReviewService.ReviewService;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.DeckAccessServiceResponse;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.FlashcardAccessServiceResponse;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.ResourceAccessService;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardsReviewedRequest;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardsToReviewRequest;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardsToReviewResponse;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/folder")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ResourceAccessService resourceAccessService;

    public ResponseEntity<?> requestReview(Authentication authentication,
                                           @RequestBody FlashcardsToReviewRequest reviewRequest){
        // returns flashcards to be reviewed

        DeckAccessServiceResponse response;
        try{
            response = resourceAccessService.getDeckAccessLevel(authentication, reviewRequest.getDeckId());
        } catch (Exception e){
            return ResponseEntity.badRequest().body("You do not have access to this deck");
        }
        if(response.getAccessLevel() == null)
        {
            return ResponseEntity.badRequest().body("You do not have access to this deck");
        }

        List<Flashcard> toReview = reviewService.getToReview(reviewRequest.getDeckId(), reviewRequest.getPackageSize());
        return ResponseEntity.ok(new FlashcardsToReviewResponse(toReview));
        // return flashcards to reviewed
    }

    public ResponseEntity<?> sendBackResults(Authentication authentication,
                                             @RequestBody FlashcardsReviewedRequest reviewResponse){
        // update information about flashcards
        FlashcardAccessServiceResponse response;
        try{
            response = resourceAccessService.getFlashcardAccessLevel(authentication, reviewResponse.getFlashcardId());
        } catch (Exception e){
            return ResponseEntity.badRequest().body("You do not have access to this deck");
        }
        if(response.getAccessLevel() == null)
        {
            return ResponseEntity.badRequest().body("You do not have access to this flashcard");
        }

        reviewService.flashcardReviewed(reviewResponse.getFlashcardId(), reviewResponse.getUserAnswer());
        return ResponseEntity.ok("Flashcard reviewed");
    }

}
