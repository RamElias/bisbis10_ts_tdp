-- Create restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    is_kosher BOOLEAN NOT NULL,
    cuisines JSONB[],
    averageRating DECIMAL(3,1)
);

-- Insert sample data into restaurants table
INSERT INTO restaurants (name, is_kosher, cuisines, averageRating) VALUES
    ('Taizu', false, '["Asian", "Mexican", "Indian"]', 4.83),
    ('Example Restaurant', true, '["Italian", "American", "French"]', 3.5),
    ('Sushi Bar', false, '["Japanese"]', 4.2),
    ('Pizza Palace', true, '["Italian", "American"]', 4.0),
    ('Curry House', false, '["Indian"]', 4.5);

-- Create dishes table
CREATE TABLE IF NOT EXISTS dishes (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);

-- Insert sample data into dishes table
INSERT INTO dishes (restaurant_id, name, description, price) VALUES
    (1, 'Noodles', 'Amazing one', 59.00),
    (1, 'Shakshuka', 'Great one', 34.00),
    (2, 'Pizza', 'Delicious pizza', 12.50),
    (3, 'Sushi Roll', 'Fresh sushi roll', 22.00),
    (3, 'Sashimi', 'Assortment of fresh sashimi', 28.00),
    (4, 'Margherita Pizza', 'Classic margherita pizza', 10.00),
    (4, 'Pepperoni Pizza', 'Spicy pepperoni pizza', 12.00),
    (5, 'Chicken Curry', 'Delicious chicken curry', 15.00),
    (5, 'Vegetable Biryani', 'Flavorful vegetable biryani', 18.00);

-- Create ratings table
CREATE TABLE IF NOT EXISTS ratings (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    rating DECIMAL(3,1) NOT NULL
);

-- Insert sample data into ratings table
INSERT INTO ratings (restaurant_id, rating) VALUES
    (1, 4.83),
    (2, 3.3),
    (3, 4.2),
    (4, 4.0),
    (5, 4.5);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    restaurant_id INTEGER NOT NULL,
    order_date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data into orders table
INSERT INTO orders (restaurant_id) VALUES
    (1),
    (2),
    (3),
    (4),
    (5);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    dish_id INTEGER NOT NULL,
    amount INTEGER NOT NULL
);

-- Insert sample data into order_items table
INSERT INTO order_items (order_id, dish_id, amount) VALUES
    (1, 1, 2),
    (1, 2, 1),
    (2, 3, 3),
    (3, 4, 1),
    (3, 5, 2),
    (4, 6, 1),
    (4, 7, 2),
    (5, 8, 3),
    (5, 9, 2);
