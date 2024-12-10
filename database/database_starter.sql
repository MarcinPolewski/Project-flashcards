CREATE DATABASE IF NOT EXISTS my_database;
use my_database;

-- manage creating new user
DROP USER if exists 'springstudent'@'%' ;
CREATE USER 'springstudent'@'%' IDENTIFIED BY 'springstudent';
GRANT ALL PRIVILEGES ON * . * TO 'springstudent'@'%';

CREATE TABLE `Customers`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `account_expired` BOOLEAN NOT NULL,
    `account_locked` BOOLEAN NOT NULL,
    `credentials_expired` BOOLEAN NOT NULL,
    `enabled` BOOLEAN NOT NULL,
    `profile_creation_date` DATETIME NOT NULL,
    `profile_picture` BLOB NOT NULL
);
ALTER TABLE
    `Customers` ADD UNIQUE `customers_email_unique`(`email`);
CREATE TABLE `Flashcards`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `deck_id` BIGINT UNSIGNED NOT NULL,
    `front` VARCHAR(255) NOT NULL,
    `back` VARCHAR(255) NOT NULL
);
CREATE TABLE `Folders`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE `Decks`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE `Folders_Users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `flashcard_folder_id` BIGINT UNSIGNED NOT NULL,
    `access_level` BIGINT NOT NULL,
    `parent_folder_id` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `Flashcards_Progresses`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `flashcard_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `next_review` DATETIME NOT NULL,
    `valid` BOOLEAN NOT NULL
);
CREATE TABLE `User_Preferences`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `dark_mode` BOOLEAN NOT NULL,
    `language` BIGINT NOT NULL
);
CREATE TABLE `User_Statistics`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `total_time_spent` BIGINT NOT NULL,
    `login_count` BIGINT NOT NULL,
    `last_login` DATETIME NOT NULL
);
CREATE TABLE `Review_Logs`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `flashcard_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `when` DATETIME NOT NULL,
    `user_answer` BIGINT NOT NULL
);
CREATE TABLE `Folders_Decks`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Folder_id` BIGINT UNSIGNED NOT NULL,
    `Deck_id` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `Friendships`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `sender_id` BIGINT UNSIGNED NOT NULL,
    `receiver_id` BIGINT UNSIGNED NOT NULL,
    `accepted` BOOLEAN NOT NULL
);
CREATE TABLE `Notifications`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `received` BOOLEAN NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `creation_date` DATETIME NOT NULL,
    `received_date` DATETIME NOT NULL
);
CREATE TABLE `Friendships_Notifications`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `friendship_id` BIGINT UNSIGNED NOT NULL,
    `notification_id` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `Authorities`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
CREATE TABLE `Authorities_Customers`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `authority_id` BIGINT UNSIGNED NOT NULL,
    `customer_id` BIGINT UNSIGNED NOT NULL
);
ALTER TABLE
    `Authorities_Customers` ADD CONSTRAINT `authorities_customers_customer_id_foreign` FOREIGN KEY(`customer_id`) REFERENCES `Customers`(`id`);
ALTER TABLE
    `Flashcards_Progresses` ADD CONSTRAINT `flashcards_progresses_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Customers`(`id`);
ALTER TABLE
    `Notifications` ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Customers`(`id`);
ALTER TABLE
    `Friendships_Notifications` ADD CONSTRAINT `friendships_notifications_notification_id_foreign` FOREIGN KEY(`notification_id`) REFERENCES `Notifications`(`id`);
ALTER TABLE
    `Folders_Decks` ADD CONSTRAINT `folders_decks_deck_id_foreign` FOREIGN KEY(`Deck_id`) REFERENCES `Decks`(`id`);
ALTER TABLE
    `Flashcards` ADD CONSTRAINT `flashcards_deck_id_foreign` FOREIGN KEY(`deck_id`) REFERENCES `Decks`(`id`);
ALTER TABLE
    `Review_Logs` ADD CONSTRAINT `review_logs_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Customers`(`id`);
ALTER TABLE
    `Folders_Decks` ADD CONSTRAINT `folders_decks_folder_id_foreign` FOREIGN KEY(`Folder_id`) REFERENCES `Folders`(`id`);
ALTER TABLE
    `Friendships` ADD CONSTRAINT `friendships_sender_id_foreign` FOREIGN KEY(`sender_id`) REFERENCES `Customers`(`id`);
ALTER TABLE
    `Folders_Users` ADD CONSTRAINT `folders_users_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Customers`(`id`);
ALTER TABLE
    `Friendships_Notifications` ADD CONSTRAINT `friendships_notifications_friendship_id_foreign` FOREIGN KEY(`friendship_id`) REFERENCES `Friendships`(`id`);
ALTER TABLE
    `Authorities_Customers` ADD CONSTRAINT `authorities_customers_authority_id_foreign` FOREIGN KEY(`authority_id`) REFERENCES `Authorities`(`id`);
ALTER TABLE
    `User_Statistics` ADD CONSTRAINT `user_statistics_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Customers`(`id`);
ALTER TABLE
    `Review_Logs` ADD CONSTRAINT `review_logs_flashcard_id_foreign` FOREIGN KEY(`flashcard_id`) REFERENCES `Flashcards`(`id`);
ALTER TABLE
    `Folders_Users` ADD CONSTRAINT `folders_users_flashcard_folder_id_foreign` FOREIGN KEY(`flashcard_folder_id`) REFERENCES `Folders`(`id`);
ALTER TABLE
    `User_Preferences` ADD CONSTRAINT `user_preferences_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `Customers`(`id`);
ALTER TABLE
    `Friendships` ADD CONSTRAINT `friendships_receiver_id_foreign` FOREIGN KEY(`receiver_id`) REFERENCES `Customers`(`id`);
ALTER TABLE
    `Flashcards_Progresses` ADD CONSTRAINT `flashcards_progresses_flashcard_id_foreign` FOREIGN KEY(`flashcard_id`) REFERENCES `Flashcards`(`id`);
ALTER TABLE
    `Folders_Users` ADD CONSTRAINT `folders_users_parent_folder_id_foreign` FOREIGN KEY(`parent_folder_id`) REFERENCES `Folders`(`id`);