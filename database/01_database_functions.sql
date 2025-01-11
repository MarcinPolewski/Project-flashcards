use my_database;

DELIMITER //

# =============================================================================

CREATE PROCEDURE count_current_learning(
    IN userId INT,
    IN deckId INT,
    IN revGapMinutes INT,
    IN lastReviewConstant INT,
    OUT learningCount INT
)
BEGIN
    SELECT COUNT(*)
    INTO learningCount
    FROM Flashcards fl
    JOIN Decks d ON fl.deck_id = d.id
    JOIN Flashcards_Progresses fp on fl.id = fp.flashcard_id
    JOIN Review_Logs rl on rl.id = fp.last_review_id

    WHERE d.id = deckId AND
          fp.user_id = userId AND
          TIMESTAMPDIFF(MINUTE,fp.next_review,  rl.when ) <= revGapMinutes AND # time between last review and next review is less than gap
          TIMESTAMPDIFF(MINUTE, fp.next_review, NOW()) <= lastReviewConstant AND # next_review scheduled around now timestampt
          TIMESTAMPDIFF(MINUTE, fp.next_review, NOW()) >= -lastReviewConstant;
END //

# =============================================================================

CREATE PROCEDURE count_due_in_learning(
    IN userId INT,
    IN deckId INT,
    IN revGapMinutes INT,
    IN lastReviewConstant INT,
    OUT learningCount INT
)
BEGIN
    SELECT COUNT(*)
    INTO learningCount
    FROM Flashcards fl
             JOIN Decks d ON fl.deck_id = d.id
             JOIN Flashcards_Progresses fp on fl.id = fp.flashcard_id
             JOIN Review_Logs rl on rl.id = fp.last_review_id

    WHERE d.id = deckId AND
        fp.user_id = userId AND
      # od pierwszego odejmuje drugi
        TIMESTAMPDIFF(MINUTE,fp.next_review,  rl.when ) <= revGapMinutes AND # time between last review and next review is less than gap
        TIMESTAMPDIFF(MINUTE, fp.next_review, NOW()) >= -lastReviewConstant AND
        next_review <= NOW(); # that makes a flashcard due

    # time between  now and ne

END //

# =============================================================================

# cards that are due but are not in learning
CREATE PROCEDURE count_due_to_review(
    IN userId INT,
    IN deckId INT,
    IN revGapMinutes INT,
    IN lastReviewConstant INT,
    OUT learningCount INT
)
BEGIN
    SELECT COUNT(*)
    INTO learningCount
    FROM Flashcards fl
             JOIN Decks d ON fl.deck_id = d.id
             JOIN Flashcards_Progresses fp on fl.id = fp.flashcard_id
             JOIN Review_Logs rl on rl.id = fp.last_review_id

    WHERE d.id = deckId AND
        fp.user_id = userId AND
        # simply negate contition that makes flashcard in learning
        (not (TIMESTAMPDIFF(MINUTE,fp.next_review,  rl.when ) <= revGapMinutes AND
        TIMESTAMPDIFF(MINUTE, fp.next_review, NOW()) >= -lastReviewConstant)) AND
        next_review <= NOW();

    # time between  now and ne

END //


# =============================================================================

CREATE PROCEDURE get_due_flashcards(
    IN userId INT,
    IN deckId INT,
    IN howMany INT

)
BEGIN

    SELECT *
    FROM Flashcards fl
             JOIN Decks d ON fl.deck_id = d.id
             JOIN Flashcards_Progresses fp on fl.id = fp.flashcard_id
             JOIN Review_Logs rl on rl.id = fp.last_review_id

    WHERE d.id = deckId AND
        fp.user_id = userId AND
        next_review <= NOW()

    LIMIT howMany;
    # time between  now and ne

END //

# =============================================================================

CREATE PROCEDURE get_new_flashcard(
    IN userId INT,
    IN deckId INT,
    IN howMany INT
)
BEGIN
    SELECT * FROM Flashcards fl
    LEFT JOIN Review_Logs rl ON fl.id = rl.flashcard_id
    WHERE deck_id = deckId AND
        rl.user_id = userId AND
        rl.id IS NULL
    LIMIT howMany;
END //

# =============================================================================

CREATE PROCEDURE get_early_review(
    IN userId INT,
    IN deckId INT,
    IN howMany INT,
    IN revGapMinutes INT,
    IN lastReviewConstant INT
)
BEGIN


    SELECT *
    FROM Flashcards fl
             JOIN Decks d ON fl.deck_id = d.id
             JOIN Flashcards_Progresses fp on fl.id = fp.flashcard_id
             JOIN Review_Logs rl on rl.id = fp.last_review_id

    WHERE d.id = deckId AND
        fp.user_id = userId AND
        next_review > NOW() AND # card is not due
        TIMESTAMPDIFF(MINUTE,fp.next_review,  rl.when ) <= revGapMinutes AND # time between last review and next review is less than gap
        TIMESTAMPDIFF(MINUTE, fp.next_review, NOW()) <= lastReviewConstant  # next_review scheduled around now timestampt

    LIMIT howMany;
    # time between  now and ne

END //

# =============================================================================
CREATE PROCEDURE get_due_in_learning(
    IN userId INT,
    IN deckId INT,
    IN howMany INT,
    IN revGapMinutes INT,
    IN lastReviewConstant INT
)
BEGIN
    SELECT *
    FROM Flashcards fl
             JOIN Decks d ON fl.deck_id = d.id
             JOIN Flashcards_Progresses fp on fl.id = fp.flashcard_id
             JOIN Review_Logs rl on rl.id = fp.last_review_id

    WHERE d.id = deckId AND
        fp.user_id = userId AND
        TIMESTAMPDIFF(MINUTE,fp.next_review,  rl.when ) <= revGapMinutes AND # time between last review and next review is less than gap
        TIMESTAMPDIFF(MINUTE, fp.next_review, NOW()) >= -lastReviewConstant AND
        next_review <= NOW() # that makes a flashcard due
    LIMIT howMany;
    # time between  now and ne

END //
# =============================================================================
CREATE PROCEDURE get_due_to_review(
    IN userId INT,
    IN deckId INT,
    IN howMany INT,
    IN revGapMinutes INT,
    IN lastReviewConstant INT
)
BEGIN
    SELECT *
    FROM Flashcards fl
             JOIN Decks d ON fl.deck_id = d.id
             JOIN Flashcards_Progresses fp on fl.id = fp.flashcard_id
             JOIN Review_Logs rl on rl.id = fp.last_review_id

    WHERE d.id = deckId AND
        fp.user_id = userId AND
        (not(TIMESTAMPDIFF(MINUTE,fp.next_review,  rl.when ) <= revGapMinutes AND # time between last review and next review is less than gap
        TIMESTAMPDIFF(MINUTE, fp.next_review, NOW()) >= -lastReviewConstant)) AND
        next_review <= NOW() # that makes a flashcard due
    LIMIT howMany;
    # time between  now and ne

END //

# =============================================================================
CREATE PROCEDURE get_last_used_decks(
    IN userId INT,
    IN howMany INT
)
BEGIN
SELECT *
FROM Decks d
    join Flashcards fl on d.id = fl.deck_id
    join Review_Logs rl on fl.id = rl.flashcard_id
    WHERE rl.user_id = userId
    Order by rl.when desc
    limit howMany;
END //

# =============================================================================
DELIMITER ;
