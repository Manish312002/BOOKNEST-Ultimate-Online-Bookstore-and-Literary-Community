-- USER DATA TABLE SCHEMA

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL
);


-- ALL BOOKS DATA TABLE SCHEMA 

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    title VARCHAR(255),
    author VARCHAR(255),
    imgpath VARCHAR(255),
    category VARCHAR(100),
    description TEXT,
    bookurl VARCHAR(255),
    price VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ALL POSTS DATA TABLE SCHEMA 

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    contenttype VARCHAR(50) NOT NULL,
    summary TEXT,
    author VARCHAR(255),
    publish_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    content TEXT NOT NULL,
    filepath VARCHAR(255)
);

-- ALL REVIEW POSTS DATA TABLE SCHEMA

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE NO ACTION,
    book_id INTEGER REFERENCES books(id) ON DELETE NO ACTION,
    title VARCHAR(255) UNIQUE,
    author VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    booktitle VARCHAR(255),
    username VARCHAR(255)
);

-- CART DATA TABLE SCHEMA 

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE NO ACTION,
    book_id INTEGER REFERENCES books(id) ON DELETE NO ACTION,
    bookimg TEXT,
    booktitle VARCHAR(255),
    bookauthor VARCHAR(255),
    quantity INTEGER,
    price VARCHAR(20),
    category VARCHAR(255),
    UNIQUE (user_id, book_id)
);
