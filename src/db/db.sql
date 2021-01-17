CREATE DATABASE papainoel;
use papainoel;

CREATE TABLE letters(
 letter_id int not null auto_increment primary key,
 name text,
 age text,
 good_actions text,
 gift text,
 full_text text,
 created_at datetime DEFAULT current_timestamp(),
 updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
);

CREATE TABLE users(
 user_id int not null auto_increment primary key,
 email text,
 password text,
 created_at datetime DEFAULT current_timestamp(),
 updated_at datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
);