CREATE DATABASE perntodo;

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    task_content VARCHAR(255),
    user_id INT NOT NULL,
    constraint fk_user foreign key(user_id) REFERENCES users(id),
    supervisor_id INT not null,
    constraint fk_supervisor foreign key(supervisor_id) users(id),
    date date not null,
    deadline date not null
)

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    password text NOT NULL ,
    role varchar DEFAULT 'user',
    password_change_date date
)