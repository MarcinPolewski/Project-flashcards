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

CREATE OR REPLACE FUNCTION get_deck_progress_func(userId INT, deckId INT)
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
