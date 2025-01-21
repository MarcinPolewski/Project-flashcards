# =============================================================================
# CREATE SEQUENCE customer_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 5000
#     CYCLE
#     CACHE 10;
#
# CREATE SEQUENCE folder_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 10;
#
# CREATE SEQUENCE authority_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 999
#     CYCLE
#     CACHE 10;
#
# CREATE SEQUENCE folder_access_level_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 20;
#
# CREATE SEQUENCE friendship_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 999
#     CYCLE
#     CACHE 10;
#
# CREATE SEQUENCE sent_verification_code_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 20;
#
# CREATE SEQUENCE folder_parent_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 20;
#
# CREATE SEQUENCE authorities_customers_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 20;
#
# CREATE SEQUENCE access_level_folder_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 999
#     CYCLE
#     CACHE 10;
#
# CREATE SEQUENCE friendship_notifications_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 999
#     CYCLE
#     CACHE 10;
#
# CREATE SEQUENCE notifications_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 20;
#
# CREATE SEQUENCE user_statistics_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 999
#     CYCLE
#     CACHE 10;
#
# CREATE SEQUENCE flashcard_progress_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 20;
#
# CREATE SEQUENCE user_preferences_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 999
#     CYCLE
#     CACHE 10;
#
#
# CREATE SEQUENCE review_logs_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 20;
#
# CREATE SEQUENCE folders_decks_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 20;
#
# CREATE SEQUENCE flashcard_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 99999
#     CYCLE
#     CACHE 30;
#
# CREATE SEQUENCE decks_seq
#     START WITH 1
#     INCREMENT BY 1
#     MINVALUE 1
#     MAXVALUE 9999
#     CYCLE
#     CACHE 20;

# =============================================================================
-- authorities

INSERT INTO `Authorities` (`name`) VALUES
                                       ('ROLE_USER'),
                                       ('ROLE_ADMIN'),
                                       ('ROLE_SUPERADMIN');

-- customer

INSERT INTO `Customers` (
    `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
      ('user1@example.com', 'hashed_password_1', 'user1', 0, 0, 0, 1, NOW(), 'exemplary_path', 1, 'hello'),
      ('user2@example.com', 'hashed_password_2', 'user2', 0, 0, 0, 1, NOW(), '/static/profile_pictures/user2.jpg', 2, 'Welcome to my profile!'),
      ('user3@example.com', 'hashed_password_3', 'user3', 1, 0, 1, 0, NOW(), '/static/profile_pictures/user3.jpg', 3, 'This is user3’s bio.'),
      ('user4@example.com', 'hashed_password_4', 'user3', 0, 1, 0, 1, NOW(), '/static/profile_pictures/user4.jpg', 4, 'Hello! User4 here.'),
      ('user5@example.com', 'hashed_password_5', 'user5', 0, 0, 0, 1, NOW(), '/static/profile_pictures/user5.jpg', 5, 'I love using the Flashcards app!'),
      ('user6@example.com', 'hashed_password_6', 'user6', 0, 1, 0, 0, NOW(), NULL, 6, 'This is user6’s custom bio.'),
      ('user7@example.com', 'hashed_password_7', 'user7', 1, 0, 1, 0, NOW(), '/static/profile_pictures/user7.jpg', 7, NULL),
      ('user8@example.com', 'hashed_password_8', 'user6', 0, 0, 0, 1, NOW(), '/static/profile_pictures/user8.jpg', 8, 'Hello from user8!'),
      ('user9@example.com', 'hashed_password_9', 'user7', 1, 1, 1, 0, NOW(), '/static/profile_pictures/user9.jpg', 9, 'Bio for user9'),
      ('user10@example.com', 'hashed_password_10', 'user7', 0, 0, 0, 1, NOW(), '/static/profile_pictures/user10.jpg', 10, 'User10 loves this app!');


--  folders

INSERT INTO `Folders` (`name`) VALUES
       ('ROOT1'),
       ('ROOT2'),
       ('ROOT3'),
       ('ROOT4'),
       ('ROOT5'),
       ('ROOT6'),
       ('ROOT7'),
       ('ROOT8'),
       ('ROOT9'),
       ('ROOT10'),
       ('Polish'),
       ('English'),
       ('Spanish'),
       ('French'),
       ('Italian');

-- access_levels

INSERT INTO `Folder_Access_Level` (`customer_id`, `access_level`) VALUES
      (1, 1),
      (2, 2),
      (3, 1),
      (4, 3),
      (5, 1),
      (6, 2),
      (7, 3),
      (8, 1),
      (9, 2),
      (10, 3),
      (1, 2),
      (1, 3),
      (2, 1),
      (8, 2),
      (10, 3);
-- friendships

INSERT INTO `Friendships` (`sender_id`, `receiver_id`, `accepted`) VALUES
       (1, 2, 1),
       (1, 3, 1),
       (1, 4, 1),
       (1, 5, 1),
       (1, 10, 1),
       (2, 5, 1),
       (5, 6, 0),
       (6, 2, 1),
       (10, 2, 1),
       (10, 3, 1),
       (2, 8, 0),
       (5, 7, 0),
       (5, 7, 0),
       (5, 7, 0),
       (5, 7, 0);

-- sent_verification_code

INSERT INTO `Sent_Verification_Codes` (`customer_id`, `expiration_date`, `code`) VALUES
     (1, NOW() + INTERVAL 1 DAY, 'CODE1001'),
     (2, NOW() + INTERVAL 2 DAY, 'CODE1002'),
     (3, NOW() + INTERVAL 3 DAY, 'CODE1003'),
     (4, NOW() + INTERVAL 1 HOUR, 'CODE1004'),
     (5, NOW() + INTERVAL 6 HOUR, 'CODE1005'),
     (6, NOW() + INTERVAL 1 DAY, 'CODE1006'),
     (7, NOW() + INTERVAL 2 DAY, 'CODE1007'),
     (8, NOW() + INTERVAL 3 HOUR, 'CODE1008'),
     (9, NOW() + INTERVAL 2 HOUR, 'CODE1009'),
     (10, NOW() + INTERVAL 1 HOUR, 'CODE1010');


-- Insert into Folder_Parent table
INSERT INTO `Folder_Parent` (`parent_folder_id`, `child_folder_id`) VALUES
    (1, 11),
    (1, 12),
    (3, 13),
    (4, 14),
    (5, 15);

-- authorities_customers

INSERT INTO `Authorities_Customers` (`authority_id`, `customer_id`) VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 5),
    (2, 6),
    (3, 7),
    (3, 8),
    (2, 9),
    (1, 10);

-- access_levels
INSERT INTO `Access_Levels_Folders` (`access_level_id`, `folder_id`) VALUES
     (1, 1),
     (2, 2),
     (3, 3),
     (4, 4),
     (5, 5),
     (6, 6),
     (7, 7),
     (8, 8),
     (9, 9),
     (10, 10),
     (11, 11),
     (12, 12),
     (13, 13),
     (14, 14),
     (15, 15);


-- friendship_notifications
INSERT INTO `Friendships_Notifications` (
    `friendship_id`, `notification_id`
) VALUES
      (1, 1),
      (2, 2),
      (3, 3),
      (4, 4),
      (5, 5),
      (6, 6),
      (7, 7),
      (8, 8),
      (9, 9),
      (10, 10),
      (11, 11),
      (12, 12),
      (13, 13),
      (14, 14),
      (15, 15);


-- Notifications
INSERT INTO `Notifications` (
    `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
      (2, 0, 'New friendship request', NOW(), NOW()),
      (3, 1, 'New friendship request', NOW(), NOW()),
      (4, 1, 'New friendship request', NOW(), NOW()),
      (5, 1, 'New friendship request', NOW(), NOW()),
      (10, 1, 'New friendship request', NOW(), NOW()),
      (5, 1, 'New friendship request', NOW(), NOW()),
      (6, 1, 'New friendship request', NOW(), NOW()),
      (2, 0, 'New friendship request', NOW(), NOW()),
      (5, 0, 'New friendship request', NOW(), NOW()),
      (2, 0, 'New friendship request', NOW(), NOW()),
      (3, 1, 'New friendship request', NOW(), NOW()),
      (8, 1, 'New friendship request', NOW(), NOW()),
      (7, 1, 'New friendship request', NOW(), NOW()),
      (7, 0, 'New friendship request', NOW(), NOW()),
      (7, 0, 'New friendship request', NOW(), NOW());


-- userStatistics
INSERT INTO `User_Statistics` (
    `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
      (1, 500, 10, NOW(), 30, 5, 10),
      (2, 1200, 25, NOW(), 50, 10, 15),
      (3, 800, 15, NOW(), 40, 7, 12),
      (4, 1500, 30, NOW(), 60, 15, 20),
      (5, 2500, 50, NOW(), 100, 25, 35),
      (6, 300, 5, NOW(), 20, 3, 5),
      (7, 1100, 20, NOW(), 45, 12, 18),
      (8, 1400, 28, NOW(), 55, 10, 16),
      (9, 500, 8, NOW(), 18, 4, 7),
      (10, 750, 12, NOW(), 32, 6, 10);


-- flashcard_progress
INSERT INTO `Flashcards_Progresses` (
    `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
      (1, 1, NOW() + INTERVAL 1 DAY, 101),
      (2, 2, NOW() + INTERVAL 2 DAY, 102),
      (3, 3, NOW() + INTERVAL 3 DAY, 103),
      (4, 4, NOW() + INTERVAL 4 DAY, 104),
      (5, 5, NOW() + INTERVAL 5 DAY, 105),
      (6, 6, NOW() + INTERVAL 6 DAY, 106),
      (7, 7, NOW() + INTERVAL 7 DAY, 107),
      (8, 8, NOW() + INTERVAL 8 DAY, 108),
      (9, 9, NOW() + INTERVAL 9 DAY, 109),
      (10, 10, NOW() + INTERVAL 10 DAY, 110),
      (1, 1, NOW() + INTERVAL 1 DAY, 101),
      (2, 1, NOW() + INTERVAL 2 DAY, 102),
      (3, 1, NOW() + INTERVAL 3 DAY, 103),
      (4, 2, NOW() + INTERVAL 4 DAY, 104),
      (5, 1, NOW() + INTERVAL 5 DAY, 105),
      (6, 1, NOW() + INTERVAL 6 DAY, 106),
      (7, 1, NOW() + INTERVAL 7 DAY, 107),
      (8, 1, NOW() + INTERVAL 8 DAY, 108),
      (9, 1, NOW() + INTERVAL 9 DAY, 109),
      (10, 10, NOW() + INTERVAL 10 DAY, 110),
      (1, 1, NOW() + INTERVAL 1 DAY, 101),
      (1, 1, NOW() + INTERVAL 2 DAY, 102),
      (1, 1, NOW() + INTERVAL 3 DAY, 103),
      (1, 1, NOW() + INTERVAL 4 DAY, 104),
      (2, 2, NOW() + INTERVAL 5 DAY, 105),
      (2, 2, NOW() + INTERVAL 6 DAY, 106),
      (2, 2, NOW() + INTERVAL 7 DAY, 107),
      (4, 4, NOW() + INTERVAL 8 DAY, 108),
      (4, 4, NOW() + INTERVAL 9 DAY, 109),
      (10, 10, NOW() + INTERVAL 10 DAY, 110),
      (10, 10, NOW() + INTERVAL 1 DAY, 101),
      (15, 1, NOW() + INTERVAL 2 DAY, 102),
      (15, 1, NOW() + INTERVAL 3 DAY, 103),
      (15, 1, NOW() + INTERVAL 4 DAY, 104),
      (17, 1, NOW() + INTERVAL 5 DAY, 105),
      (20, 8, NOW() + INTERVAL 6 DAY, 106),
      (20, 8, NOW() + INTERVAL 7 DAY, 107),
      (20, 10, NOW() + INTERVAL 8 DAY, 108),
      (20, 10, NOW() + INTERVAL 9 DAY, 109),
      (20, 10, NOW() + INTERVAL 10 DAY, 110);

-- userPreferences
INSERT INTO `User_Preferences` (
    `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
      (1, TRUE, 1, '08:00:00', 1, 1),
      (2, FALSE, 2, '09:00:00', 2, 0),
      (3, TRUE, 1, '10:00:00', 3, 1),
      (4, TRUE, 3, '11:00:00', 4, 0),
      (5, FALSE, 2, '12:00:00', 5, 1),
      (6, TRUE, 1, '13:00:00', 6, 0),
      (7, FALSE, 3, '14:00:00', 7, 1),
      (8, TRUE, 1, '15:00:00', 8, 0),
      (9, TRUE, 2, '16:00:00', 9, 1),
      (10, FALSE, 3, '17:00:00', 10, 0);

-- folder_decks

INSERT INTO `Folders_Decks` (`folder_id`, `deck_id`) VALUES
     (1, 1),
     (1, 2),
     (2, 3),
     (3, 4),
     (4, 5),
     (5, 6),
     (6, 7),
     (7, 8),
     (8, 9),
     (9, 10),
     (1, 11),
     (11, 12),
     (12, 13),
     (13, 14),
     (14, 15);


-- flashcard

INSERT INTO `Flashcards` (
    `deck_id`, `front`, `back`
) VALUES
      (1, 'Apple', 'Jabłko'),
      (2, 'Computer', 'Komputer'),
      (3, 'Car', 'Samochód'),
      (4, 'Dog', 'Pies'),
      (5, 'Tree', 'Drzewo'),
      (6, 'Mountain', 'Góra'),
      (7, 'House', 'Dom'),
      (8, 'River', 'Rzeka'),
      (9, 'Book', 'Książka'),
      (10, 'School', 'Szkoła'),
      (1, 'Apple', 'Jabłko'),
      (1, 'Computer', 'Komputer'),
      (11, 'Car', 'Samochód'),
      (2, 'Dog', 'Pies'),
      (5, 'Tree', 'Drzewo'),
      (2, 'Mountain', 'Góra'),
      (1, 'House', 'Dom'),
      (2, 'River', 'Rzeka'),
      (5, 'Book', 'Książka'),
      (10, 'School', 'Szkoła');


-- decks
INSERT INTO `Decks` (`name`) VALUES
     ('Deck 1'),
     ('Deck 2'),
     ('Deck 3'),
     ('Deck 4'),
     ('Deck 5'),
     ('Deck 6'),
     ('Deck 7'),
     ('Deck 8'),
     ('Deck 9'),
     ('Deck 10'),
     ('Deck 11'),
     ('Deck 12'),
     ('Deck 13'),
     ('Deck 14'),
     ('Deck 15');

-- reviewLogs

INSERT INTO `Review_Logs` (
    `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
      (1, 1, NOW(), 1),
      (2, 2, NOW(), 0),
      (3, 3, NOW(), 1),
      (4, 4, NOW(), 0),
      (5, 5, NOW(), 1),
      (6, 6, NOW(), 0),
      (7, 7, NOW(), 1),
      (8, 8, NOW(), 0),
      (9, 9, NOW(), 1),
      (10, 10, NOW(), 0),
      (1, 1, NOW(), 1),
      (12, 1, NOW(), 0),
      (13, 1, NOW(), 1),
      (14, 2, NOW(), 0),
      (15, 1, NOW(), 1),
      (16, 1, NOW(), 0),
      (17, 1, NOW(), 1),
      (18, 1, NOW(), 0),
      (19, 1, NOW(), 1),
      (20, 10, NOW(), 0),
      (1, 1, NOW(), 1),
      (1, 1, NOW(), 0),
      (1, 1, NOW(), 1),
      (1, 1, NOW(), 0),
      (1, 1, NOW(), 1),
      (2, 2, NOW(), 0),
      (2, 2, NOW(), 1),
      (5, 5, NOW(), 0),
      (5, 5, NOW(), 1),
      (5, 5, NOW(), 0),
      (6, 6, NOW(), 1),
      (6, 6, NOW(), 0),
      (6, 6, NOW(), 1),
      (6, 6, NOW(), 0),
      (6, 6, NOW(), 1),
      (6, 6, NOW(), 0),
      (6, 6, NOW(), 1),
      (8, 8, NOW(), 0),
      (9, 9, NOW(), 1),
      (12, 1, NOW(), 0),
      (12, 1, NOW(), 1),
      (15, 1, NOW(), 0),
      (15, 1, NOW(), 1),
      (15, 1, NOW(), 0),
      (16, 1, NOW(), 1),
      (17, 1, NOW(), 0),
      (17, 1, NOW(), 1),
      (19, 1, NOW(), 0),
      (20, 10, NOW(), 1),
      (20, 10, NOW(), 0);

