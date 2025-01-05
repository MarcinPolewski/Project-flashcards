use my_database;

# ============================== example function ===============================================
DELIMITER //

CREATE PROCEDURE get_all_users(IN example_int INT)
BEGIN
    SELECT * FROM Folders;
END //


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
          TIMESTAMPDIFF(MINUTE, rl.when, fp.next_review) <= revGapMinutes AND
          TIMESTAMPDIFF(MINUTE, fp.next_review, NOW()) <= lastReviewConstant;

END //






DELIMITER ;