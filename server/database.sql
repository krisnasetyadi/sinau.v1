CREATE DATABASE sinau_database;
-- set database
-- student set 
CREATE TABLE sinau_student_users(
    student_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    student_name VARCHAR(250) NOT NULL,
    student_email VARCHAR(250) NOT NULL,
    student_password VARCHAR(250) NOT NULL
);
-- karna gabisa pake function kita donwload uuid-ossp dengan perintha di bawah
-- create extension if not exists "uuid-ossp";
-- ffake user
INSERT INTO sinau_student_users(student_name,student_email,student_password)VALUES('kris','kris@gmail.com','qwerty');
-- expect this
sinau_database-# ;
              student_id              | student_name | student_email  | student_password
--------------------------------------+--------------+----------------+------------------
 63c9fc07-0fe0-486d-abac-624b4702f857 | kris         | kris@gmail.com | qwerty