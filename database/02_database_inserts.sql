# =============================================================================
CREATE SEQUENCE customer_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 5000
    CYCLE
    CACHE 10;

CREATE SEQUENCE folder_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 10;

CREATE SEQUENCE authority_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE folder_access_level_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE friendship_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE sent_verification_code_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE folder_parent_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE authorities_customers_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE access_level_folder_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE friendship_notifications_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE notifications_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE user_statistics_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE flashcard_progress_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE user_preferences_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 999
    CYCLE
    CACHE 10;


CREATE SEQUENCE review_logs_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE folders_decks_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE flashcard_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 99999
    CYCLE
    CACHE 30;

CREATE SEQUENCE decks_seq
    START WITH 1
    INCREMENT BY 1
    MINVALUE 1
    MAXVALUE 9999
    CYCLE
    CACHE 20;

# =============================================================================
-- authorities

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
      (NEXTVAL(authority_seq), 'ROLE_USER'),
      (NEXTVAL(authority_seq), 'ROLE_ADMIN'),
      (NEXTVAL(authority_seq), 'ROLE_SUPERADMIN');


-- customer

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
      (NEXTVAL(customer_seq), 'user1@example.com', 'hashed_password_1', 'user1', 0, 0, 0, 1, NOW(), 'exemplary_path', 1, 'hello'),
      (NEXTVAL(customer_seq), 'user2@example.com', 'hashed_password_2', 'user2', 0, 0, 0, 1, NOW(), '/static/profile_pictures/user2.jpg', 2, 'Welcome to my profile!'),
      (NEXTVAL(customer_seq), 'user3@example.com', 'hashed_password_3', 'user3', 1, 0, 1, 0, NOW(), '/static/profile_pictures/user3.jpg', 3, 'This is user3’s bio.'),
      (NEXTVAL(customer_seq), 'user4@example.com', 'hashed_password_4', 'user3', 0, 1, 0, 1, NOW(), '/static/profile_pictures/user4.jpg', 4, 'Hello! User4 here.'),
      (NEXTVAL(customer_seq), 'user5@example.com', 'hashed_password_5', 'user5', 0, 0, 0, 1, NOW(), '/static/profile_pictures/user5.jpg', 5, 'I love using the Flashcards app!'),
      (NEXTVAL(customer_seq), 'user6@example.com', 'hashed_password_6', 'user6', 0, 1, 0, 0, NOW(), NULL, 6, 'This is user6’s custom bio.'),
      (NEXTVAL(customer_seq), 'user7@example.com', 'hashed_password_7', 'user7', 1, 0, 1, 0, NOW(), '/static/profile_pictures/user7.jpg', 7, NULL),
      (NEXTVAL(customer_seq), 'user8@example.com', 'hashed_password_8', 'user6', 0, 0, 0, 1, NOW(), '/static/profile_pictures/user8.jpg', 8, 'Hello from user8!'),
      (NEXTVAL(customer_seq), 'user9@example.com', 'hashed_password_9', 'user7', 1, 1, 1, 0, NOW(), '/static/profile_pictures/user9.jpg', 9, 'Bio for user9'),
      (NEXTVAL(customer_seq), 'user10@example.com', 'hashed_password_10', 'user7', 0, 0, 0, 1, NOW(), '/static/profile_pictures/user10.jpg', 10, 'User10 loves this app!');


--  folders

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
      (NEXTVAL(folder_seq), 'ROOT1'),
      (NEXTVAL(folder_seq), 'ROOT2'),
      (NEXTVAL(folder_seq), 'ROOT3'),
      (NEXTVAL(folder_seq), 'ROOT4'),
      (NEXTVAL(folder_seq), 'ROOT5'),
      (NEXTVAL(folder_seq), 'ROOT6'),
      (NEXTVAL(folder_seq), 'ROOT7'),
      (NEXTVAL(folder_seq), 'ROOT8'),
      (NEXTVAL(folder_seq), 'ROOT9'),
      (NEXTVAL(folder_seq), 'ROOT10'),
      (NEXTVAL(folder_seq), 'Polish'),
      (NEXTVAL(folder_seq), 'English'),
      (NEXTVAL(folder_seq), 'Spanish'),
      (NEXTVAL(folder_seq), 'French'),
      (NEXTVAL(folder_seq), 'Italian');
-- access_levels

INSERT INTO `Folder_Access_Level` (`id`, `customer_id`, `access_level`)
VALUES
    (NEXTVAL(folder_access_level_seq), 1, 1),
    (NEXTVAL(folder_access_level_seq), 2, 2),
    (NEXTVAL(folder_access_level_seq), 3, 1),
    (NEXTVAL(folder_access_level_seq), 4, 3),
    (NEXTVAL(folder_access_level_seq), 5, 1),
    (NEXTVAL(folder_access_level_seq), 6, 2),
    (NEXTVAL(folder_access_level_seq), 7, 3),
    (NEXTVAL(folder_access_level_seq), 8, 1),
    (NEXTVAL(folder_access_level_seq), 9, 2),
    (NEXTVAL(folder_access_level_seq), 10, 3),
    (NEXTVAL(folder_access_level_seq), 1, 2),
    (NEXTVAL(folder_access_level_seq), 1, 3),
    (NEXTVAL(folder_access_level_seq), 2, 1),
    (NEXTVAL(folder_access_level_seq), 8, 2),
    (NEXTVAL(folder_access_level_seq), 10, 3);

-- friendships

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
      (NEXTVAL(friendship_seq), 1, 2, 1),
      (NEXTVAL(friendship_seq), 1, 3, 1),
      (NEXTVAL(friendship_seq), 1, 4, 1),
      (NEXTVAL(friendship_seq), 1, 5, 1),
      (NEXTVAL(friendship_seq), 1, 10, 1),
      (NEXTVAL(friendship_seq), 2, 5, 1),
      (NEXTVAL(friendship_seq), 5, 6, 0),
      (NEXTVAL(friendship_seq), 6, 2, 1),
      (NEXTVAL(friendship_seq), 10, 2, 1),
      (NEXTVAL(friendship_seq), 10, 3, 1),
      (NEXTVAL(friendship_seq), 2, 8, 0),
      (NEXTVAL(friendship_seq), 5, 7, 0),
      (NEXTVAL(friendship_seq), 5, 7, 0),
      (NEXTVAL(friendship_seq), 5, 7, 0),
      (NEXTVAL(friendship_seq), 5, 7, 0);


-- sent_verification_code

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
      (NEXTVAL(sent_verification_code_seq), 1, NOW() + INTERVAL 1 DAY, 'CODE1001'),
      (NEXTVAL(sent_verification_code_seq), 2, NOW() + INTERVAL 2 DAY, 'CODE1002'),
      (NEXTVAL(sent_verification_code_seq), 3, NOW() + INTERVAL 3 DAY, 'CODE1003'),
      (NEXTVAL(sent_verification_code_seq), 4, NOW() + INTERVAL 1 HOUR, 'CODE1004'),
      (NEXTVAL(sent_verification_code_seq), 5, NOW() + INTERVAL 6 HOUR, 'CODE1005'),
      (NEXTVAL(sent_verification_code_seq), 6, NOW() + INTERVAL 1 DAY, 'CODE1006'),
      (NEXTVAL(sent_verification_code_seq), 7, NOW() + INTERVAL 2 DAY, 'CODE1007'),
      (NEXTVAL(sent_verification_code_seq), 8, NOW() + INTERVAL 3 HOUR, 'CODE1008'),
      (NEXTVAL(sent_verification_code_seq), 9, NOW() + INTERVAL 2 HOUR, 'CODE1009'),
      (NEXTVAL(sent_verification_code_seq), 10, NOW() + INTERVAL 1 HOUR, 'CODE1010');

-- Insert into Folder_Parent table
INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
      (NEXTVAL(folder_parent_seq), 1, 11),
      (NEXTVAL(folder_parent_seq), 1, 12),
      (NEXTVAL(folder_parent_seq), 3, 13),
      (NEXTVAL(folder_parent_seq), 4, 14),
      (NEXTVAL(folder_parent_seq), 5, 15);

-- authorities_customers

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
      (NEXTVAL(authorities_customers_seq), 1, 1),
      (NEXTVAL(authorities_customers_seq), 1, 2),
      (NEXTVAL(authorities_customers_seq), 1, 3),
      (NEXTVAL(authorities_customers_seq), 1, 4),
      (NEXTVAL(authorities_customers_seq), 2, 5),
      (NEXTVAL(authorities_customers_seq), 2, 6),
      (NEXTVAL(authorities_customers_seq), 3, 7),
      (NEXTVAL(authorities_customers_seq), 3, 8),
      (NEXTVAL(authorities_customers_seq), 2, 9),
      (NEXTVAL(authorities_customers_seq), 1, 10);

-- access_levels
INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
      (NEXTVAL(access_level_folder_seq), 1, 1),
      (NEXTVAL(access_level_folder_seq), 2, 2),
      (NEXTVAL(access_level_folder_seq), 3, 3),
      (NEXTVAL(access_level_folder_seq), 4, 4),
      (NEXTVAL(access_level_folder_seq), 5, 5),
      (NEXTVAL(access_level_folder_seq), 6, 6),
      (NEXTVAL(access_level_folder_seq), 7, 7),
      (NEXTVAL(access_level_folder_seq), 8, 8),
      (NEXTVAL(access_level_folder_seq), 9, 9),
      (NEXTVAL(access_level_folder_seq), 10, 10),
      (NEXTVAL(access_level_folder_seq), 11, 11),
      (NEXTVAL(access_level_folder_seq), 12, 12),
      (NEXTVAL(access_level_folder_seq), 13, 13),
      (NEXTVAL(access_level_folder_seq), 14, 14),
      (NEXTVAL(access_level_folder_seq), 15, 15);


-- friendship_notifications
INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
      (NEXTVAL(friendship_notifications_seq), 1, 1),
      (NEXTVAL(friendship_notifications_seq), 2, 2),
      (NEXTVAL(friendship_notifications_seq), 3, 3),
      (NEXTVAL(friendship_notifications_seq), 4, 4),
      (NEXTVAL(friendship_notifications_seq), 5, 5),
      (NEXTVAL(friendship_notifications_seq), 6, 6),
      (NEXTVAL(friendship_notifications_seq), 7, 7),
      (NEXTVAL(friendship_notifications_seq), 8, 8),
      (NEXTVAL(friendship_notifications_seq), 9, 9),
      (NEXTVAL(friendship_notifications_seq), 10, 10),
      (NEXTVAL(friendship_notifications_seq), 11, 11),
      (NEXTVAL(friendship_notifications_seq), 12, 12),
      (NEXTVAL(friendship_notifications_seq), 13, 13),
      (NEXTVAL(friendship_notifications_seq), 14, 14),
      (NEXTVAL(friendship_notifications_seq), 15, 15);

-- Notifications
INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
      (NEXTVAL(notifications_seq), 2, 0, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 3, 1, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 4, 1, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 5, 1, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 10, 1, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 5, 1, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 6, 1, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 2, 0, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 5, 0, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 2, 0, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 3, 1, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 8, 1, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 7, 1, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 7, 0, 'New friendship request', NOW(), NOW()),
      (NEXTVAL(notifications_seq), 7, 0, 'New friendship request', NOW(), NOW());


-- userStatistics
INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
      (NEXTVAL(user_statistics_seq), 1, 500, 10, NOW(), 30, 5, 10),
      (NEXTVAL(user_statistics_seq), 2, 1200, 25, NOW(), 50, 10, 15),
      (NEXTVAL(user_statistics_seq), 3, 800, 15, NOW(), 40, 7, 12),
      (NEXTVAL(user_statistics_seq), 4, 1500, 30, NOW(), 60, 15, 20),
      (NEXTVAL(user_statistics_seq), 5, 2500, 50, NOW(), 100, 25, 35),
      (NEXTVAL(user_statistics_seq), 6, 300, 5, NOW(), 20, 3, 5),
      (NEXTVAL(user_statistics_seq), 7, 1100, 20, NOW(), 45, 12, 18),
      (NEXTVAL(user_statistics_seq), 8, 1400, 28, NOW(), 55, 10, 16),
      (NEXTVAL(user_statistics_seq), 9, 500, 8, NOW(), 18, 4, 7),
      (NEXTVAL(user_statistics_seq), 10, 750, 12, NOW(), 32, 6, 10);

-- flashcard_progress
INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
      (NEXTVAL(flashcard_progress_seq), 1, 1, NOW() + INTERVAL 1 DAY, 101),
      (NEXTVAL(flashcard_progress_seq), 2, 2, NOW() + INTERVAL 2 DAY, 102),
      (NEXTVAL(flashcard_progress_seq), 3, 3, NOW() + INTERVAL 3 DAY, 103),
      (NEXTVAL(flashcard_progress_seq), 4, 4, NOW() + INTERVAL 4 DAY, 104),
      (NEXTVAL(flashcard_progress_seq), 5, 5, NOW() + INTERVAL 5 DAY, 105),
      (NEXTVAL(flashcard_progress_seq), 6, 6, NOW() + INTERVAL 6 DAY, 106),
      (NEXTVAL(flashcard_progress_seq), 7, 7, NOW() + INTERVAL 7 DAY, 107),
      (NEXTVAL(flashcard_progress_seq), 8, 8, NOW() + INTERVAL 8 DAY, 108),
      (NEXTVAL(flashcard_progress_seq), 9, 9, NOW() + INTERVAL 9 DAY, 109),
      (NEXTVAL(flashcard_progress_seq), 10, 10, NOW() + INTERVAL 10 DAY, 110),
      (NEXTVAL(flashcard_progress_seq), 11, 1, NOW() + INTERVAL 1 DAY, 101),
      (NEXTVAL(flashcard_progress_seq), 12, 1, NOW() + INTERVAL 2 DAY, 102),
      (NEXTVAL(flashcard_progress_seq), 13, 1, NOW() + INTERVAL 3 DAY, 103),
      (NEXTVAL(flashcard_progress_seq), 14, 2, NOW() + INTERVAL 4 DAY, 104),
      (NEXTVAL(flashcard_progress_seq), 15, 1, NOW() + INTERVAL 5 DAY, 105),
      (NEXTVAL(flashcard_progress_seq), 16, 1, NOW() + INTERVAL 6 DAY, 106),
      (NEXTVAL(flashcard_progress_seq), 17, 1, NOW() + INTERVAL 7 DAY, 107),
      (NEXTVAL(flashcard_progress_seq), 18, 1, NOW() + INTERVAL 8 DAY, 108),
      (NEXTVAL(flashcard_progress_seq), 19, 1, NOW() + INTERVAL 9 DAY, 109),
      (NEXTVAL(flashcard_progress_seq), 20, 10, NOW() + INTERVAL 10 DAY, 110),
      (NEXTVAL(flashcard_progress_seq), 1, 1, NOW() + INTERVAL 1 DAY, 101),
      (NEXTVAL(flashcard_progress_seq), 1, 1, NOW() + INTERVAL 2 DAY, 102),
      (NEXTVAL(flashcard_progress_seq), 1, 1, NOW() + INTERVAL 3 DAY, 103),
      (NEXTVAL(flashcard_progress_seq), 1, 1, NOW() + INTERVAL 4 DAY, 104),
      (NEXTVAL(flashcard_progress_seq), 2, 2, NOW() + INTERVAL 5 DAY, 105),
      (NEXTVAL(flashcard_progress_seq), 2, 2, NOW() + INTERVAL 6 DAY, 106),
      (NEXTVAL(flashcard_progress_seq), 2, 2, NOW() + INTERVAL 7 DAY, 107),
      (NEXTVAL(flashcard_progress_seq), 4, 4, NOW() + INTERVAL 8 DAY, 108),
      (NEXTVAL(flashcard_progress_seq), 4, 4, NOW() + INTERVAL 9 DAY, 109),
      (NEXTVAL(flashcard_progress_seq), 10, 10, NOW() + INTERVAL 10 DAY, 110),
      (NEXTVAL(flashcard_progress_seq), 10, 10, NOW() + INTERVAL 1 DAY, 101),
      (NEXTVAL(flashcard_progress_seq), 15, 1, NOW() + INTERVAL 2 DAY, 102),
      (NEXTVAL(flashcard_progress_seq), 15, 1, NOW() + INTERVAL 3 DAY, 103),
      (NEXTVAL(flashcard_progress_seq), 15, 1, NOW() + INTERVAL 4 DAY, 104),
      (NEXTVAL(flashcard_progress_seq), 17, 1, NOW() + INTERVAL 5 DAY, 105),
      (NEXTVAL(flashcard_progress_seq), 20, 8, NOW() + INTERVAL 6 DAY, 106),
      (NEXTVAL(flashcard_progress_seq), 20, 8, NOW() + INTERVAL 7 DAY, 107),
      (NEXTVAL(flashcard_progress_seq), 20, 10, NOW() + INTERVAL 8 DAY, 108),
      (NEXTVAL(flashcard_progress_seq), 20, 10, NOW() + INTERVAL 9 DAY, 109),
      (NEXTVAL(flashcard_progress_seq), 20, 10, NOW() + INTERVAL 10 DAY, 110);

-- userPreferences
INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
      (NEXTVAL(user_preferences_seq), 1, TRUE, 1, '08:00:00', 1, 1),
      (NEXTVAL(user_preferences_seq), 2, FALSE, 2, '09:00:00', 2, 0),
      (NEXTVAL(user_preferences_seq), 3, TRUE, 1, '10:00:00', 3, 1),
      (NEXTVAL(user_preferences_seq), 4, TRUE, 3, '11:00:00', 4, 0),
      (NEXTVAL(user_preferences_seq), 5, FALSE, 2, '12:00:00', 5, 1),
      (NEXTVAL(user_preferences_seq), 6, TRUE, 1, '13:00:00', 6, 0),
      (NEXTVAL(user_preferences_seq), 7, FALSE, 3, '14:00:00', 7, 1),
      (NEXTVAL(user_preferences_seq), 8, TRUE, 1, '15:00:00', 8, 0),
      (NEXTVAL(user_preferences_seq), 9, TRUE, 2, '16:00:00', 9, 1),
      (NEXTVAL(user_preferences_seq), 10, FALSE, 3, '17:00:00', 10, 0);

-- reviewLogs

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
      (NEXTVAL(review_logs_seq), 1, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 2, 2, NOW(), 0),
      (NEXTVAL(review_logs_seq), 3, 3, NOW(), 1),
      (NEXTVAL(review_logs_seq), 4, 4, NOW(), 0),
      (NEXTVAL(review_logs_seq), 5, 5, NOW(), 1),
      (NEXTVAL(review_logs_seq), 6, 6, NOW(), 0),
      (NEXTVAL(review_logs_seq), 7, 7, NOW(), 1),
      (NEXTVAL(review_logs_seq), 8, 8, NOW(), 0),
      (NEXTVAL(review_logs_seq), 9, 9, NOW(), 1),
      (NEXTVAL(review_logs_seq), 10, 10, NOW(), 0),
      (NEXTVAL(review_logs_seq), 11, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 12, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 13, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 14, 2, NOW(), 0),
      (NEXTVAL(review_logs_seq), 15, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 16, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 17, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 18, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 19, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 20, 10, NOW(), 0),
      (NEXTVAL(review_logs_seq), 1, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 1, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 1, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 1, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 1, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 2, 2, NOW(), 0),
      (NEXTVAL(review_logs_seq), 2, 2, NOW(), 1),
      (NEXTVAL(review_logs_seq), 5, 5, NOW(), 0),
      (NEXTVAL(review_logs_seq), 5, 5, NOW(), 1),
      (NEXTVAL(review_logs_seq), 5, 5, NOW(), 0),
      (NEXTVAL(review_logs_seq), 6, 6, NOW(), 1),
      (NEXTVAL(review_logs_seq), 6, 6, NOW(), 0),
      (NEXTVAL(review_logs_seq), 6, 6, NOW(), 1),
      (NEXTVAL(review_logs_seq), 6, 6, NOW(), 0),
      (NEXTVAL(review_logs_seq), 6, 6, NOW(), 1),
      (NEXTVAL(review_logs_seq), 6, 6, NOW(), 0),
      (NEXTVAL(review_logs_seq), 6, 6, NOW(), 1),
      (NEXTVAL(review_logs_seq), 8, 8, NOW(), 0),
      (NEXTVAL(review_logs_seq), 9, 9, NOW(), 1),
      (NEXTVAL(review_logs_seq), 12, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 12, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 15, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 15, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 15, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 16, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 17, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 17, 1, NOW(), 1),
      (NEXTVAL(review_logs_seq), 19, 1, NOW(), 0),
      (NEXTVAL(review_logs_seq), 20, 10, NOW(), 1),
      (NEXTVAL(review_logs_seq), 20, 10, NOW(), 0);


-- folder_decks

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
      (NEXTVAL(folders_decks_seq), 1, 1),
      (NEXTVAL(folders_decks_seq), 1, 2),
      (NEXTVAL(folders_decks_seq), 2, 3),
      (NEXTVAL(folders_decks_seq), 3, 4),
      (NEXTVAL(folders_decks_seq), 4, 5),
      (NEXTVAL(folders_decks_seq), 5, 6),
      (NEXTVAL(folders_decks_seq), 6, 7),
      (NEXTVAL(folders_decks_seq), 7, 8),
      (NEXTVAL(folders_decks_seq), 8, 9),
      (NEXTVAL(folders_decks_seq), 9, 10),
      (NEXTVAL(folders_decks_seq), 1, 11),
      (NEXTVAL(folders_decks_seq), 11, 12),
      (NEXTVAL(folders_decks_seq), 12, 13),
      (NEXTVAL(folders_decks_seq), 13, 14),
      (NEXTVAL(folders_decks_seq), 14, 15);

-- flashcard

INSERT INTO `Flashcards` (
    `id`, `deck_id`, `front`, `back`
) VALUES

    (NEXTVAL(flashcard_seq), 1, 'Apple', 'Jabłko'),
    (NEXTVAL(flashcard_seq), 2, 'Computer', 'Komputer'),
    (NEXTVAL(flashcard_seq), 3, 'Car', 'Samochód'),
    (NEXTVAL(flashcard_seq), 4, 'Dog', 'Pies'),
    (NEXTVAL(flashcard_seq), 5, 'Tree', 'Drzewo'),
    (NEXTVAL(flashcard_seq), 6, 'Mountain', 'Góra'),
    (NEXTVAL(flashcard_seq), 7, 'House', 'Dom'),
    (NEXTVAL(flashcard_seq), 8, 'River', 'Rzeka'),
    (NEXTVAL(flashcard_seq), 9, 'Book', 'Książka'),
    (NEXTVAL(flashcard_seq), 10, 'School', 'Szkoła'),
    (NEXTVAL(flashcard_seq), 1, 'Apple', 'Jabłko'),
    (NEXTVAL(flashcard_seq), 1, 'Computer', 'Komputer'),
    (NEXTVAL(flashcard_seq), 11, 'Car', 'Samochód'),
    (NEXTVAL(flashcard_seq), 2, 'Dog', 'Pies'),
    (NEXTVAL(flashcard_seq), 5, 'Tree', 'Drzewo'),
    (NEXTVAL(flashcard_seq), 2, 'Mountain', 'Góra'),
    (NEXTVAL(flashcard_seq), 1, 'House', 'Dom'),
    (NEXTVAL(flashcard_seq), 2, 'River', 'Rzeka'),
    (NEXTVAL(flashcard_seq), 5, 'Book', 'Książka'),
    (NEXTVAL(flashcard_seq), 10, 'School', 'Szkoła');

-- decks

INSERT INTO `Decks` (`id`, `name`) VALUES
(NEXTVAL(decks_seq), 'Deck 1'),
(NEXTVAL(decks_seq), 'Deck 2'),
(NEXTVAL(decks_seq), 'Deck 3'),
(NEXTVAL(decks_seq), 'Deck 4'),
(NEXTVAL(decks_seq), 'Deck 5'),
(NEXTVAL(decks_seq), 'Deck 6'),
(NEXTVAL(decks_seq), 'Deck 7'),
(NEXTVAL(decks_seq), 'Deck 8'),
(NEXTVAL(decks_seq), 'Deck 9'),
(NEXTVAL(decks_seq), 'Deck 10'),
(NEXTVAL(decks_seq), 'Deck 11'),
(NEXTVAL(decks_seq), 'Deck 12'),
(NEXTVAL(decks_seq), 'Deck 13'),
(NEXTVAL(decks_seq), 'Deck 14'),
(NEXTVAL(decks_seq), 'Deck 15');
