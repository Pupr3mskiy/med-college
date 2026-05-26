DROP TABLE IF EXISTS medical_practice;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS hospital_departments;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    username VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL
        CHECK (role IN ('student', 'teacher', 'admin')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE hospital_departments (
    department_id SERIAL PRIMARY KEY,

    department_name VARCHAR(100)
    NOT NULL
);

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,

    user_id INTEGER UNIQUE,

    group_name VARCHAR(50),

    CONSTRAINT fk_student_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,

    user_id INTEGER UNIQUE,

    subject VARCHAR(100),

    CONSTRAINT fk_teacher_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


CREATE TABLE medical_practice (
    practice_id SERIAL PRIMARY KEY,

    student_id INTEGER NOT NULL,

    department_id INTEGER NOT NULL,

    grade INTEGER,

    CONSTRAINT fk_practice_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_practice_department
        FOREIGN KEY (department_id)
        REFERENCES hospital_departments(department_id)
        ON DELETE CASCADE
);


INSERT INTO users (username, full_name, email, password_hash, role)
VALUES
('admin', 'Admin User', 'admin@mail.ru', 'hash', 'admin');


INSERT INTO hospital_departments (
    department_name
)
VALUES
('Терапевтическое отделение'),
('Хирургическое отделение'),
('Приемное отделение');

INSERT INTO students (user_id, group_name)
VALUES
(1, 'МК-1');


INSERT INTO teachers (user_id, subject)
VALUES
(2, 'анатомия');

INSERT INTO medical_practice (
    student_id,
    department_id,
    grade
)
VALUES
(
    1,
    1,
    5
);
