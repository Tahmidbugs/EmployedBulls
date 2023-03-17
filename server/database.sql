CREATE DATABASE EmployedBulls;



CREATE TABLE Student (
  UID SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  Resume TEXT,
  Applied_Jobs TEXT[],
  password VARCHAR(255) NOT NULL,
  Cover_letter TEXT,
  Degree VARCHAR(255),
  Major VARCHAR(255),
  Availability VARCHAR(255),
  Job_history TEXT[],
  Preferred_job_type VARCHAR(255)
);


CREATE TABLE users (
  rid SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  company VARCHAR(255),
  verified BOOLEAN,
  password VARCHAR(255)
);


ALTER TABLE users   
    ADD UNIQUE(email), ADD UNIQUE(username);

