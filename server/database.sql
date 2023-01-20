CREATE DATABASE UnitTestMySkills



CREATE TABLE students (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(300) NOT NULL,
--   username VARCHAR(300) NOT NULL,
--   password VARCHAR(6) NOT NULL,
--   profilePicture character varying(300) DEFAULT https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png;
    UNIQUE(email), 
    -- UNIQUE(username);

);

CREATE TABLE userss (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(300) NOT NULL,
    UNIQUE(email), 

);

ALTER TABLE users   
    ADD UNIQUE(email), ADD UNIQUE(username);

