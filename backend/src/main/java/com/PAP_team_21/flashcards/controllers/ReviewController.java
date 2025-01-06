package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.Errors.ResourceNotFoundException;
import com.PAP_team_21.flashcards.ReviewObjectType;
import com.PAP_team_21.flashcards.ReviewService.ReviewService;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.DeckAccessServiceResponse;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.FlashcardAccessServiceResponse;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.FolderAccessServiceResponse;
import com.PAP_team_21.flashcards.authentication.ResourceAccessLevelService.ResourceAccessService;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardsReviewedRequest;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardsToReviewRequest;
import com.PAP_team_21.flashcards.controllers.requests.FlashcardsToReviewResponse;
import com.PAP_team_21.flashcards.entities.flashcard.Flashcard;
import com.PAP_team_21.flashcards.entities.flashcardProgress.FlashcardProgressRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final ResourceAccessService resourceAccessService;

    @GetMapping("/reviewDeck")
    public ResponseEntity<?> reviewDeck(Authentication authentication,
                                          @RequestParam int deckId,
                                          @RequestParam(defaultValue = "10") int batchSize)
    {
        if(batchSize < 10)
            return ResponseEntity.badRequest().body("Batch size must be at least 10");

        DeckAccessServiceResponse response;
        try {
             response = resourceAccessService.getDeckAccessLevel(authentication, deckId);
        } catch(ResourceNotFoundException e)
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        if(response.getAccessLevel() == null)
        {
            return ResponseEntity.badRequest().body("You do not have access to this deck");
        }

        return ResponseEntity.ok(reviewService.reviewDeck(response.getCustomer(), response.getDeck(), batchSize));
    }

    @PostMapping("/flashcardReviewed")
    public ResponseEntity<?> flashcardReviewed(Authentication authentication,
                                               @RequestBody FlashcardsReviewedRequest reviewResponse){
        // update information about flashcards
        FlashcardAccessServiceResponse response;
        try{
            response = resourceAccessService.getFlashcardAccessLevel(authentication, reviewResponse.getFlashcardId());
        } catch (ResourceNotFoundException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        if(response.getAccessLevel() == null)
        {
            return ResponseEntity.badRequest().body("You do not have access to this flashcard");
        }

        reviewService.flashcardReviewed(response.getCustomer() , response.getFlashcard(), reviewResponse.getUserAnswer());
        return ResponseEntity.ok("Flashcard reviewed");
    }

//    public ResponseEntity<?> reviewForDay(Authentication authentication,
//                                          @RequestParam ReviewObjectType reviewObjectType, // folder or deck
//                                          @RequestParam int reviewObjectId,
//                                          @RequestParam LocalDateTime dateTime,
//                                          @RequestParam(defaultValue = "5") int batchSize)
//    {
//        if(reviewObjectType.equals(ReviewObjectType.FOLDER))
//        {
//            FolderAccessServiceResponse response;
//            try {
//                response = resourceAccessService.getFolderAccessLevel(authentication, reviewObjectId);
//            } catch (Exception e) {
//                return ResponseEntity.badRequest().body(e.getMessage());
//            }
//
//            return ResponseEntity.ok("");
//
//        }
//        else if(reviewObjectType.equals(ReviewObjectType.DECK))
//        {
//
//        }
//
//    }
//    public ResponseEntity<?> reviewNew(Authentication authentication,
//                                       @RequestParam ReviewObjectType reviewObjectType, // folder or deck
//                                       @RequestParam int reviewObjectId,
//                                       @RequestParam(defaultValue = "5") int batchSize)
//    {
//        return null;
//    }
//    public ResponseEntity<?> reviewAllDue(Authentication authentication,
//                                          @RequestParam(defaultValue = "5") int batchSize)
//    {
//        return null;
//    }


}

//    public ResponseEntity<?> reviewDeckBy(Authentication authentication,
//                                      @RequestParam(defaultValue = "0") int page,
//                                      @RequestParam(defaultValue = "5") int size,
//                                      @RequestParam(defaultValue = "id") String sortBy,
//                                      @RequestParam(defaultValue = "true") boolean ascending,
//                                      @RequestParam() int deckId)
//    {
//        DeckAccessServiceResponse response;
//        try {
//            response = resourceAccessService.getDeckAccessLevel(authentication, deckId);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//
//        if(response.getAccessLevel() == null)
//        {
//            return ResponseEntity.badRequest().body("You do not have access to this deck");
//        }
//
//        return ResponseEntity.ok(reviewService.reviewBy(response.getDeck(), page, size, sortBy, ascending));
//
//    }
//
//    public ResponseEntity<?> getReviewForTheDay(Authentication authentication,
//                                                @RequestParam() int deckId,
//                                                @RequestParam() int packageSize,
//                                                @RequestParam() @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date){
//        // returns flashcards to be reviewed
//
//        DeckAccessServiceResponse response;
//        try{
//            response = resourceAccessService.getDeckAccessLevel(authentication, deckId);
//        } catch (Exception e){
//            return ResponseEntity.badRequest().body("You do not have access to this deck");
//        }
//        if(response.getAccessLevel() == null)
//        {
//            return ResponseEntity.badRequest().body("You do not have access to this deck");
//        }
//
//        List<Flashcard> toReview = reviewService.getReviewForTheDay(response.getDeck(), packageSize);
//        return ResponseEntity.ok(new FlashcardsToReviewResponse(toReview));
//        // return flashcards to reviewed
//    }
//
//    public ResponseEntity<?> getReviewForToday(Authentication authentication,
//                                               @RequestParam() int deckId,
//                                               @RequestParam() int packageSize){
//        return getReviewForTheDay(authentication, deckId, packageSize, LocalDateTime.now());
//    }
//
//    public ResponseEntity<?> sendBackResults(Authentication authentication,
//                                             @RequestBody FlashcardsReviewedRequest reviewResponse){
//        // update information about flashcards
//        FlashcardAccessServiceResponse response;
//        try{
//            response = resourceAccessService.getFlashcardAccessLevel(authentication, reviewResponse.getFlashcardId());
//        } catch (Exception e){
//            return ResponseEntity.badRequest().body("You do not have access to this deck");
//        }
//        if(response.getAccessLevel() == null)
//        {
//            return ResponseEntity.badRequest().body("You do not have access to this flashcard");
//        }
//
//        reviewService.flashcardReviewed(reviewResponse.getFlashcardId(), reviewResponse.getUserAnswer());
//        return ResponseEntity.ok("Flashcard reviewed");
//    }
//
//}


// split by object type

// reviewForDay(objectType, objectId, date, batchSize)
// reviewNew(objectType, objectId, batchSize)
// reviewBy(objectType, objectId, pageSize, pageNumer, sortBy, ascending)
// # here paging
