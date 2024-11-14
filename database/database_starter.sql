CREATE DATABASE IF NOT EXISTS my_database;
use my_database;

CREATE TABLE books(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64) NOT NULL
);

INSERT INTO books(name) VALUES
    ("book number 1"),
    ("book number 2");

-- manage creating new user
DROP USER if exists 'springstudent'@'%' ;
CREATE USER 'springstudent'@'%' IDENTIFIED BY 'springstudent';
GRANT ALL PRIVILEGES ON * . * TO 'springstudent'@'%';