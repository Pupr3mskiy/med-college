-- Database schema for medical college system

DROP TABLE IF EXISTS medical_practice;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS hospital_departments;

CREATE TABLE hospital_departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    group_name VARCHAR(50)
);

CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    subject VARCHAR(100)
);

CREATE TABLE medical_practice (
    practice_id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    department_id INTEGER NOT NULL,
    grade INTEGER,

    CONSTRAINT fk_practice_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id),

    CONSTRAINT fk_practice_department
        FOREIGN KEY (department_id)
        REFERENCES hospital_departments(department_id)
);

INSERT INTO hospital_departments (department_name) VALUES
('Терапевтическое отделение'),
('Хирургическое отделение'),
('Приемное отделение');

INSERT INTO students (full_name, group_name) VALUES
('Иванова Мария Сергеевна', 'МД-21'),
('Петров Алексей Игоревич', 'МД-21'),
('Смирнова Анна Олеговна', 'МД-22');

INSERT INTO teachers (full_name, subject) VALUES
('Соколов Андрей Викторович', 'Терапия'),
('Кузнецова Елена Павловна', 'Хирургия'),
('Морозов Дмитрий Николаевич', 'Практическая подготовка');

INSERT INTO medical_practice (student_id, department_id, grade) VALUES
(1, 1, 5),
(2, 2, 4),
(3, 3, 5);
