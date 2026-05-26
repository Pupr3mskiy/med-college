-- Database schema for medical college system

DROP TABLE IF EXISTS medical_practice;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS hospital_departments;

CREATE TABLE hospital_departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,

    user_name VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(150) NOT NULL,

    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,

    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,

    user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,

    group_name VARCHAR(10) CHECK (
        group_name IN ('МК-1','МК-2','МК-3','МК-4','МК-5','МК-6','МК-7')
    )
);

CREATE TABLE teachers (
    teacher_id SERIAL PRIMARY KEY,

    user_id INTEGER UNIQUE NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,

    subject VARCHAR(50) CHECK (
        subject IN (
            'биология',
            'патология',
            'фармакология',
            'основы латинского языка',
            'анатомия',
            'практика',
            'врачевание'
        )
    )
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
