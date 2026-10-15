
CREATE DATABASE IF NOT EXISTS jobflow_db;

USE jobflow_db;


-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- 2. COMPANIES TABLE
CREATE TABLE IF NOT EXISTS companies (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    website VARCHAR(255),
    industry VARCHAR(100),
    location VARCHAR(150),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 3. JOBS TABLE
CREATE TABLE IF NOT EXISTS jobs (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    company_id INT UNSIGNED,
    title VARCHAR(150) NOT NULL,
    location VARCHAR(150),
    job_type ENUM(
        'Full-time',
        'Part-time',
        'Casual',
        'Contract',
        'Internship'
    ) DEFAULT 'Full-time',
    salary_min DECIMAL(10, 2),
    salary_max DECIMAL(10, 2),
    job_url VARCHAR(500),
    description TEXT,
    status ENUM('Open', 'Closed') DEFAULT 'Open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_jobs_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE SET NULL
);


-- 4. APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS applications (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    job_id INT UNSIGNED,
    company_id INT UNSIGNED,
    job_title VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    application_date DATE NOT NULL,
    status ENUM(
        'Saved',
        'Applied',
        'Interview',
        'Assessment',
        'Offer',
        'Rejected',
        'Withdrawn'
    ) DEFAULT 'Saved',
    notes TEXT,
    job_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_applications_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_applications_job
        FOREIGN KEY (job_id)
        REFERENCES jobs(id)
        ON DELETE SET NULL,

    CONSTRAINT fk_applications_company
        FOREIGN KEY (company_id)
        REFERENCES companies(id)
        ON DELETE SET NULL
);
