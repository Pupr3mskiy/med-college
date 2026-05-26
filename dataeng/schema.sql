DROP TABLE IF EXISTS medical_practice;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS hospital_departments;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    user_name VARCHAR(100) NOT NULL,

    email VARCHAR(100)
    UNIQUE
    NOT NULL,

    password_hash TEXT NOT NULL,

    role VARCHAR(20)
    DEFAULT 'student',

    created_at TIMESTAMP
    DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE hospital_departments (
    department_id SERIAL PRIMARY KEY,

    department_name VARCHAR(100)
    NOT NULL
);

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,

    user_id INTEGER UNIQUE,

    full_name VARCHAR(100)
    NOT NULL,

    group_name VARCHAR(50),

    CONSTRAINT fk_student_user
        FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,

    user_id INTEGER UNIQUE,

    full_name VARCHAR(100)
    NOT NULL,

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


INSERT INTO users (
    user_name,
    email,
    password_hash,
    role
)
VALUES
(
    'admin',
    'admin@mail.ru',
    'hashed_admin_password',
    'admin'
),
(
    'student1',
    'student1@mail.ru',
    'hashed_student_password',
    'student'
),
(
    'teacher1',
    'teacher1@mail.ru',
    'hashed_teacher_password',
    'teacher'
);


INSERT INTO hospital_departments (
    department_name
)
VALUES
('Терапевтическое отделение'),
('Хирургическое отделение'),
('Приемное отделение');

INSERT INTO students (
    user_id,
    full_name,
    group_name
)
VALUES
(
    2,
    'Иванова Мария Сергеевна',
    'МД-21'
);


INSERT INTO teachers (
    user_id,
    full_name,
    subject
)
VALUES
(
    3,
    'Соколов Андрей Викторович',
    'Терапия'
);

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
