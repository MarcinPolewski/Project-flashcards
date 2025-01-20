# =============================================================================
CREATE SEQUENCE customer_seq
    START WITH 100
    INCREMENT BY 1
    MINVALUE 100
    MAXVALUE 5000
    CYCLE
    CACHE 10;

CREATE SEQUENCE folder_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 10;

CREATE SEQUENCE authority_seq
    START WITH 100
    INCREMENT BY 1
    MINVALUE 100
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE access_level_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE friendship_seq
    START WITH 100
    INCREMENT BY 1
    MINVALUE 100
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE sent_verification_code_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE folder_parent_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE authorities_customers_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE access_level_folder_seq
    START WITH 100
    INCREMENT BY 1
    MINVALUE 100
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE friendship_notifications_seq
    START WITH 100
    INCREMENT BY 1
    MINVALUE 100
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE notifications_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE user_statistics_seq
    START WITH 100
    INCREMENT BY 1
    MINVALUE 100
    MAXVALUE 999
    CYCLE
    CACHE 10;

CREATE SEQUENCE flashcard_progress_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE user_preferences_seq
    START WITH 100
    INCREMENT BY 1
    MINVALUE 100
    MAXVALUE 999
    CYCLE
    CACHE 10;


CREATE SEQUENCE review_logs_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE folders_decks_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 20;

CREATE SEQUENCE flashcard_seq
    START WITH 10000
    INCREMENT BY 1
    MINVALUE 10000
    MAXVALUE 99999
    CYCLE
    CACHE 30;

CREATE SEQUENCE decks_seq
    START WITH 1000
    INCREMENT BY 1
    MINVALUE 1000
    MAXVALUE 9999
    CYCLE
    CACHE 20;

# =============================================================================
-- authorities

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_USER');

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_ADMIN');

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_SUPERADMIN');

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_MODERATOR');

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_VIEWER');

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_EDITOR');

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_ANALYST');

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_DEVELOPER');

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_SUPPORT');

INSERT INTO `Authorities` (
    `id`, `name`
) VALUES
    (NEXTVAL(authority_seq), 'ROLE_MANAGER');


-- customer

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
(NEXTVAL(customer_seq), 'user1@example.com', 'hashed_password_1', 'user1', 0, 0, 0, 1, NOW(),
    'exemplary_path', 1, 'hello'
);

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
    (NEXTVAL(customer_seq), 'user2@example.com', 'hashed_password_2', 'user2', 0, 0, 0, 1, NOW(),
     '/static/profile_pictures/user2.jpg', 2, 'Welcome to my profile!');

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
    (NEXTVAL(customer_seq), 'user3@example.com', 'hashed_password_3', 'user3', 1, 0, 1, 0, NOW(),
     '/static/profile_pictures/user3.jpg', 3, 'This is user3’s bio.');

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
    (NEXTVAL(customer_seq), 'user4@example.com', 'hashed_password_4', 'user4', 0, 1, 0, 1, NOW(),
     '/static/profile_pictures/user4.jpg', 4, 'Hello! User4 here.');


INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
    (NEXTVAL(customer_seq), 'user5@example.com', 'hashed_password_5', 'user5', 0, 0, 0, 1, NOW(),
     '/static/profile_pictures/user5.jpg', 5, 'I love using the Flashcards app!');

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
    (NEXTVAL(customer_seq), 'user6@example.com', 'hashed_password_6', 'user6', 0, 1, 0, 0, NOW(),
     NULL, 6, 'This is user6’s custom bio.');

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
    (NEXTVAL(customer_seq), 'user7@example.com', 'hashed_password_7', 'user7', 1, 0, 1, 0, NOW(),
     '/static/profile_pictures/user7.jpg', 7, NULL);

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
    (NEXTVAL(customer_seq), 'user8@example.com', 'hashed_password_8', 'user6', 0, 0, 0, 1, NOW(),
     '/static/profile_pictures/user8.jpg', 8, 'Hello from user8!');

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
    (NEXTVAL(customer_seq), 'user9@example.com', 'hashed_password_9', 'user7', 1, 1, 1, 0, NOW(),
     '/static/profile_pictures/user9.jpg', 9, 'Bio for user9');

INSERT INTO `Customers` (
    `id`, `email`, `password_hash`, `username`, `account_expired`,
    `account_locked`, `credentials_expired`, `enabled`, `profile_creation_date`,
    `profile_picture_path`, `root_folder_id`, `bio`
) VALUES
    (NEXTVAL(customer_seq), 'user10@example.com', 'hashed_password_10', 'user7', 0, 0, 0, 1, NOW(),
     '/static/profile_pictures/user10.jpg', 10, 'User10 loves this app!');

--  folders

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'Polish');

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'English');

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'German');

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'Spanish');

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'French');

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'Italian');

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'Russian');

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'Chinese');

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'Japanese');

INSERT INTO `Folders` (
    `id`, `name`
) VALUES
    (NEXTVAL(folder_seq), 'Portuguese');

-- access_levels

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1001, 1000);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1002, 1001);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1003, 1002);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1004, 1003);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1005, 1004);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1006, 1005);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1007, 1006);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1008, 1007);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1009, 1008);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_seq), 1010, 1009);

-- friendships

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 100, 101, 0);

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 101, 102, 1);

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 102, 103, 0);

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 103, 104, 1);

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 104, 105, 0);

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 105, 106, 1);

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 106, 107, 0);

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 107, 108, 1);

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 108, 109, 0);

INSERT INTO `Friendships` (
    `id`, `sender_id`, `receiver_id`, `accepted`
) VALUES
    (NEXTVAL(friendship_seq), 109, 110, 1);

-- sent_verification_code

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 100, NOW() + INTERVAL 1 DAY, 'CODE1001');

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 101, NOW() + INTERVAL 2 DAY, 'CODE1002');

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 102, NOW() + INTERVAL 3 DAY, 'CODE1003');

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 103, NOW() + INTERVAL 1 HOUR, 'CODE1004');

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 104, NOW() + INTERVAL 6 HOUR, 'CODE1005');

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 105, NOW() + INTERVAL 1 DAY, 'CODE1006');

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 106, NOW() + INTERVAL 2 DAY, 'CODE1007');

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 107, NOW() + INTERVAL 3 HOUR, 'CODE1008');

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 108, NOW() + INTERVAL 2 HOUR, 'CODE1009');

INSERT INTO `Sent_Verification_Codes` (
    `id`, `customer_id`, `expiration_date`, `code`
) VALUES
    (NEXTVAL(sent_verification_code_seq), 109, NOW() + INTERVAL 1 HOUR, 'CODE1010');

-- folder_parent

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1000, 1001);

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1001, 1002);

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1002, 1003);

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1003, 1004);

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1004, 1005);

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1005, 1006);

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1006, 1007);

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1007, 1008);

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1008, 1009);

INSERT INTO `Folder_Parent` (
    `id`, `parent_folder_id`, `child_folder_id`
) VALUES
    (NEXTVAL(folder_parent_seq), 1009, 1010);

--authorities_customers

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1001, 1001);

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1002, 1002);

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1003, 1003);

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1004, 1004);

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1005, 1005);

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1006, 1006);

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1007, 1007);

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1008, 1008);

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1009, 1009);

INSERT INTO `Authorities_Customers` (
    `id`, `authority_id`, `customer_id`
) VALUES
    (NEXTVAL(authorities_customers_seq), 1010, 1010);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1001, 1000);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1002, 1001);

-- access_levels

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1003, 1002);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1004, 1003);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1005, 1004);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1006, 1005);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1007, 1006);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1008, 1007);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1009, 1008);

INSERT INTO `Access_Levels_Folders` (
    `id`, `access_level_id`, `folder_id`
) VALUES
    (NEXTVAL(access_level_folder_seq), 1010, 1009);

-- friendship_notifications

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 100, 1000);

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 101, 1001);

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 102, 1002);

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 103, 1003);

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 104, 1004);

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 105, 1005);

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 106, 1006);

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 107, 1007);

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 108, 1008);

INSERT INTO `Friendships_Notifications` (
    `id`, `friendship_id`, `notification_id`
) VALUES
    (NEXTVAL(friendship_notifications_seq), 109, 1009);

-- Notifications

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 100, 0, 'New message received', NOW(), NOW());

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 101, 0, 'Your friend request was accepted', NOW(), NOW());

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 102, 0, 'Reminder: Your profile is incomplete', NOW(), NOW());

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 103, 0, 'New comment on your post', NOW(), NOW());

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 104, 0, 'Someone liked your photo', NOW(), NOW());

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 105, 0, 'New friend suggestion', NOW(), NOW());

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 106, 0, 'Your post is now live', NOW(), NOW());

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 107, 0, 'New follower on your account', NOW(), NOW());

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 108, 0, 'Your password was changed successfully', NOW(), NOW());

INSERT INTO `Notifications` (
    `id`, `user_id`, `received`, `text`, `creation_date`, `received_date`
) VALUES
    (NEXTVAL(notifications_seq), 109, 0, 'Security alert: Unusual login attempt', NOW(), NOW());

-- userStatistics
INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 100, 500, 10, NOW(), 30, 5, 10);

INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 101, 1200, 25, NOW(), 50, 10, 15);

INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 102, 800, 15, NOW(), 40, 7, 12);

INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 103, 1500, 30, NOW(), 60, 15, 20);

INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 104, 2500, 50, NOW(), 100, 25, 35);

INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 105, 300, 5, NOW(), 20, 3, 5);

INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 106, 1100, 20, NOW(), 45, 12, 18);

INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 107, 1400, 28, NOW(), 55, 10, 16);

INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 108, 500, 8, NOW(), 18, 4, 7);

INSERT INTO `User_Statistics` (
    `id`, `user_id`, `total_time_spent`, `login_count`, `last_login`, `total_days_learning`, `days_learning_streak`, `longest_learning_streak`
) VALUES
    (NEXTVAL(user_statistics_seq), 109, 750, 12, NOW(), 32, 6, 10);

-- flashcard_progress

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 1, 100, NOW() + INTERVAL 1 DAY, 101);

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 2, 101, NOW() + INTERVAL 2 DAY, 102);

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 3, 102, NOW() + INTERVAL 3 DAY, 103);

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 4, 103, NOW() + INTERVAL 4 DAY, 104);

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 5, 104, NOW() + INTERVAL 5 DAY, 105);

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 6, 105, NOW() + INTERVAL 6 DAY, 106);

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 7, 106, NOW() + INTERVAL 7 DAY, 107);

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 8, 107, NOW() + INTERVAL 8 DAY, 108);

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 9, 108, NOW() + INTERVAL 9 DAY, 109);

INSERT INTO `Flashcards_Progresses` (
    `id`, `flashcard_id`, `user_id`, `next_review`, `last_review_id`
) VALUES
    (NEXTVAL(flashcard_progress_seq), 10, 109, NOW() + INTERVAL 10 DAY, 110);

-- userPreferences

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 100, TRUE, 1, '08:00:00', 1, 1);

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 101, FALSE, 2, '09:00:00', 2, 0);

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 102, TRUE, 1, '10:00:00', 3, 1);

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 103, TRUE, 3, '11:00:00', 4, 0);

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 104, FALSE, 2, '12:00:00', 5, 1);

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 105, TRUE, 1, '13:00:00', 6, 0);

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 106, FALSE, 3, '14:00:00', 7, 1);

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 107, TRUE, 1, '15:00:00', 8, 0);

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 108, TRUE, 2, '16:00:00', 9, 1);

INSERT INTO `User_Preferences` (
    `id`, `user_id`, `dark_mode`, `language`, `reminder_time`, `timezone`, `study_reminders`
) VALUES
    (NEXTVAL(user_preferences_seq), 109, FALSE, 3, '17:00:00', 10, 0);

-- reviewLogs

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 101, 100, NOW(), 1);

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 102, 101, NOW(), 0);

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 103, 102, NOW(), 1);

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 104, 103, NOW(), 0);

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 105, 104, NOW(), 1);

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 106, 105, NOW(), 0);

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 107, 106, NOW(), 1);

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 108, 107, NOW(), 0);

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 109, 108, NOW(), 1);

INSERT INTO `Review_Logs` (
    `id`, `flashcard_id`, `user_id`, `when`, `user_answer`
) VALUES
    (NEXTVAL(review_logs_seq), 110, 109, NOW(), 0);

-- folder_decks

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 1, 101);

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 2, 102);

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 3, 103);

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 4, 104);

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 5, 105);

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 6, 106);

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 7, 107);

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 8, 108);

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 9, 109);

INSERT INTO `Folders_Decks` (
    `id`, `folder_id`, `deck_id`
) VALUES
    (NEXTVAL(folders_decks_seq), 10, 110);

-- flashcard

INSERT INTO `Flashcards` (
    `id`, `deck_id`, `front`, `back`
) VALUES
      (NEXTVAL(flashcard_seq), 1, 'Apple', 'Jabłko'),
      (NEXTVAL(flashcard_seq), 1, 'Computer', 'Komputer'),
      (NEXTVAL(flashcard_seq), 2, 'Car', 'Samochód'),
      (NEXTVAL(flashcard_seq), 2, 'Dog', 'Pies'),
      (NEXTVAL(flashcard_seq), 3, 'Tree', 'Drzewo'),
      (NEXTVAL(flashcard_seq), 3, 'Mountain', 'Góra'),
      (NEXTVAL(flashcard_seq), 4, 'House', 'Dom'),
      (NEXTVAL(flashcard_seq), 4, 'River', 'Rzeka'),
      (NEXTVAL(flashcard_seq), 5, 'Book', 'Książka'),
      (NEXTVAL(flashcard_seq), 5, 'School', 'Szkoła');

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
(NEXTVAL(decks_seq), 'Deck 10');
