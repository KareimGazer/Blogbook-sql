-- Create the blogs table
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    url VARCHAR(255) NOT NULL,
    description TEXT,
    likes INTEGER DEFAULT 0,
    date DATE
);

-- Insert two blog entries
INSERT INTO blogs (title, author, url, description , likes)
VALUES
    ('some title', 'john doe', 'https://example.com', 'website description', 0),
    ('title', 'mary smith', 'https://example.com', 'another description', 0);

-- Verify the insertions
SELECT * FROM blogs;
