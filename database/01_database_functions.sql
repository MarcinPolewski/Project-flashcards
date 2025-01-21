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

    SELECT fl.*
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
    SELECT DISTINCT fl.* FROM Flashcards fl
    LEFT JOIN Review_Logs rl ON fl.id = rl.flashcard_id
    WHERE deck_id = deckId AND
        (rl.user_id IS NULL or rl.user_id != userId)
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


    SELECT fl.*
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
    SELECT fl.*
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
    SELECT fl.*
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
SELECT d.*
FROM Decks d
    join Flashcards fl on d.id = fl.deck_id
    join Review_Logs rl on fl.id = rl.flashcard_id
    WHERE rl.user_id = userId
    Order by rl.when desc
    limit howMany;
END //


# =============================================================================

CREATE PROCEDURE get_deck_progress( IN userId INT,
    IN deckId INT,
    OUT progress FLOAT
)
BEGIN
    DECLARE total_flashcards INT;
    DECLARE learned_flashcards INT;

    SELECT count(*) INTO total_flashcards
                    FROM Flashcards fl
                    where deck_id = deckId;

    SELECT count(*) INTO learned_flashcards
        from Flashcards fl
        join Flashcards_Progresses fp on fl.id = fp.flashcard_id
        join Review_Logs rl on fp.last_review_id = rl.id
        where fl.deck_id = deckId and fp.user_id = userId
          and fp.next_review is not null
          and DATEDIFF(fp.next_review, rl.`when`) > 30;

    IF total_flashcards = 0
    THEN
        SET progress = 0;
    ELSE
        SET progress = learned_flashcards / total_flashcards;
    END IF;

END //

# =============================================================================

CREATE PROCEDURE count_decks_new_cards(
    IN userId INT,
    IN deckId INT,
    OUT newCardCount INT
)
BEGIN
    SELECT COUNT(DISTINCT fl.id)
    INTO newCardCount
    FROM Flashcards fl
             LEFT JOIN Review_Logs rl ON fl.id = rl.flashcard_id
    WHERE deck_id = deckId AND rl.user_id = userId AND rl.id IS NULL;
#     SELECT COUNT(*)
#     INTO newCardCount
#     FROM Flashcards fl
#
#     LEFT JOIN Review_Logs rl ON fl.id = rl.flashcard_id
#     WHERE deck_id = deckId AND
#         (rl.user_id IS NULL or rl.user_id != userId);
END //

# =============================================================================

CREATE PROCEDURE count_all_deck_due_cards(
    IN userId INT,
    IN deckId INT,
    OUT dueCardCount INT
)
BEGIN
    SELECT COUNT(*)
    INTO dueCardCount
    FROM Flashcards fl
    JOIN Flashcards_Progresses fp ON fl.id = fp.flashcard_id
    WHERE fl.deck_id = deckId
    AND fp.user_id = userId
    AND fp.next_review <= NOW();
END //

# =============================================================================

CREATE PROCEDURE count_all_deck_cards(
    IN userId INT,
    IN deckId INT,
    OUT totalCardCount INT
)
BEGIN
    SELECT COUNT(*)
    INTO totalCardCount
    FROM Flashcards fl
    WHERE fl.deck_id = deckId;
END //

# =============================================================================
CREATE PROCEDURE get_all_user_folders(
    IN userId INT
)
BEGIN
    SELECT f.*
    FROM Folders f
    JOIN Access_Levels_Folders alf ON f.id = alf.folder_id
    JOIN Folder_Access_Level fal ON alf.access_level_id = fal.id
    WHERE fal.customer_id = userId;
END //

# =============================================================================
CREATE PROCEDURE get_github_style_chart_data(
    IN userId INT
)
BEGIN
SELECT
    DATE(`when`) AS activity_date
FROM
    Review_Logs
WHERE
    user_id = userId
  AND `when` > DATE_SUB(NOW(), INTERVAL 1 YEAR)
GROUP BY
    DATE(`when`);
END //

# =============================================================================

CREATE PROCEDURE find_customers_last_review(
    IN userId INT,
    OUT lastReviewDate DATE
)
BEGIN
    SELECT MAX(`when`)
    INTO lastReviewDate
    FROM Review_Logs
    WHERE user_id = userId;
END //

# =============================================================================
# CREATE PROCEDURE count_all_new_cards(
#     IN userId INT,
#     OUT result INT
# )
# BEGIN
# SELECT COUNT(*)
# INTO result
# FROM Flashcards fl
# LEFT JOIN Review_Logs rl ON fl.id = rl.flashcard_id
# WHERE
#     rl.user_id = userId AND
#     rl.id IS NULL;
# END //

CREATE PROCEDURE count_all_new_cards(
    IN userId INT,
    OUT result INT
)
BEGIN
    SELECT COUNT(DISTINCT fl.id)
    INTO result
    FROM Flashcards fl
             LEFT JOIN Review_Logs rl ON fl.id = rl.flashcard_id
    WHERE rl.user_id = userId AND rl.id IS NULL;
END //

# =============================================================================

CREATE PROCEDURE count_all_due_cards(
    IN userId INT,
    OUT result INT
)
BEGIN
SELECT COUNT(*)
INTO result
FROM Flashcards fl
         JOIN Flashcards_Progresses fp ON fl.id = fp.flashcard_id
WHERE
  fp.user_id = userId
  AND fp.next_review <= NOW();
END //

# =============================================================================

CREATE PROCEDURE count_all_cards(
    IN userId INT,
    OUT result INT
)
BEGIN
SELECT COUNT(*)
INTO result
FROM Flashcards fl;
END //

# =============================================================================
-- TRIGGERS

CREATE TRIGGER after_insert_customer_statistics
AFTER INSERT ON Customers
FOR EACH ROW
BEGIN
    INSERT INTO User_Statistics (user_id, last_login)
    VALUES (NEW.id, NOW());
END;

CREATE TRIGGER before_insert_notification
BEFORE INSERT ON Notifications
FOR EACH ROW
BEGIN
    SET NEW.creation_date = NOW();
END;

CREATE TRIGGER after_insert_customer_folder
AFTER INSERT ON Customers
FOR EACH ROW
BEGIN
    INSERT INTO Folders (name) VALUES (CONCAT('Root Folder - ', NEW.username));
    SET NEW.root_folder_id = LAST_INSERT_ID();
END;

CREATE TRIGGER after_insert_friendship_notification
AFTER INSERT ON Friendships
FOR EACH ROW
BEGIN
    IF NEW.accepted = 0 THEN
        INSERT INTO Notifications (user_id, text, creation_date) 
        VALUES (NEW.receiver_id, CONCAT('You have a new friend request from user ID: ', NEW.sender_id), NOW());
    END IF;
END;

#==============================================================================
-- FUNCTIONS
CREATE OR REPLACE FUNCTION count_decks_new_cards_func (
    userId IN NUMBER,
    deckId IN NUMBER
) RETURN NUMBER IS
    newCardCount NUMBER;
BEGIN
    SELECT COUNT(DISTINCT fl.id)
    INTO newCardCount
    FROM Flashcards fl
    LEFT JOIN Review_Logs rl ON fl.id = rl.flashcard_id
    WHERE fl.deck_id = deckId
      AND (rl.user_id IS NULL OR rl.user_id != userId);

    RETURN newCardCount;
END;

CREATE OR REPLACE FUNCTION get_deck_progress(userId INT, deckId INT)
    RETURN FLOAT
IS
    total_flashcards INT;
    learned_flashcards INT;
    progress FLOAT;
BEGIN
    -- Count the total number of flashcards in the deck
    SELECT count(*) INTO total_flashcards
    FROM Flashcards fl
    WHERE fl.deck_id = deckId;

    -- Count the number of learned flashcards for the user
    SELECT count(*) INTO learned_flashcards
    FROM Flashcards fl
    JOIN Flashcards_Progresses fp ON fl.id = fp.flashcard_id
    JOIN Review_Logs rl ON fp.last_review_id = rl.id
    WHERE fl.deck_id = deckId
      AND fp.user_id = userId
      AND fp.next_review IS NOT NULL
      AND DATEDIFF(fp.next_review, rl."when") > 30;

    -- Calculate the progress
    IF total_flashcards = 0 THEN
        progress := 0;
    ELSE
        progress := learned_flashcards / total_flashcards;
    END IF;

    -- Return the progress
    RETURN progress;
END;

-- FUNCTIONS AND CURSORS

CREATE OR REPLACE FUNCTION calculate_study_time(userId INT)
    RETURN FLOAT
IS
    total_time INT := 0;
    study_time_in_seconds INT;
BEGIN
    -- Calculate the total time spent on review for the last 7 days by the user
    FOR rec IN (
        SELECT rl.`when`, rl.user_answer
        FROM Review_Logs rl
        WHERE rl.user_id = userId
        AND rl.`when` >= NOW() - INTERVAL 7 DAY
    ) LOOP
        -- Each review log represents a study session, and we consider the time spent in seconds.
        -- For simplicity, we assume the average study time per log is 10 minutes (600 seconds).
        study_time_in_seconds := 600;
        total_time := total_time + study_time_in_seconds;
    END LOOP;

    RETURN total_time / 3600;
END;

CREATE OR REPLACE FUNCTION calculate_longest_learning_streak(userId INT)
    RETURN INT
IS
    longest_streak INT := 0;
    current_streak INT := 0;
    prev_date DATE;
    current_date DATE;
BEGIN
    -- Loop through the user's review logs and find the longest streak of consecutive days
    FOR rec IN (
        SELECT DISTINCT DATE(rl.`when`) AS review_date
        FROM Review_Logs rl
        WHERE rl.user_id = userId
        ORDER BY review_date
    ) LOOP
        current_date := rec.review_date;

        IF prev_date IS NOT NULL AND current_date = prev_date + INTERVAL 1 DAY THEN
            -- Consecutive day, increment the current streak
            current_streak := current_streak + 1;
        ELSE
            -- Not a consecutive day, reset the current streak
            current_streak := 1;
        END IF;

        -- Update the longest streak if the current streak is greater
        IF current_streak > longest_streak THEN
            longest_streak := current_streak;
        END IF;

        -- Update prev_date for next iteration
        prev_date := current_date;
    END LOOP;

    -- Return the longest streak of learning days
    RETURN longest_streak;
END;

CREATE OR REPLACE FUNCTION calculate_flashcards_learned_last_30_days(userId INT)
    RETURN INT
IS
    flashcards_learned INT := 0;
BEGIN
    -- Count the number of flashcards reviewed in the last 30 days
    SELECT COUNT(DISTINCT fp.flashcard_id)
    INTO flashcards_learned
    FROM Flashcards_Progresses fp
    JOIN Review_Logs rl ON fp.last_review_id = rl.id
    WHERE fp.user_id = userId
    AND fp.next_review IS NOT NULL
    AND DATEDIFF(CURRENT_DATE, rl.`when`) <= 30;

    -- Return the count of learned flashcards
    RETURN flashcards_learned;
END;


# =============================================================================
DELIMITER ;
