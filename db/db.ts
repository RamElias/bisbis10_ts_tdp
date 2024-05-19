import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "example",
  database: "postgres",
});

client.connect().then(() => {
  console.log("Connected to DB");
  initializeDatabase().then(() => {
    console.log("Database initialized successfully.");
  }).catch(err => {
    console.error("Failed to initialize database:", err);
  });
}).catch(err => {
  console.error("DB connection error", err.stack);
});

async function initializeDatabase() {
  try {
    // Drop tables if they exist, ensuring we drop dependent objects
    const dropQueries = `
      DROP TABLE IF EXISTS order_items CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS ratings CASCADE;
      DROP TABLE IF EXISTS dishes CASCADE;
      DROP TABLE IF EXISTS restaurants CASCADE;
    `

    
    await client.query(dropQueries);
    

    const createTables = `
      CREATE TABLE IF NOT EXISTS restaurants (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        isKosher BOOLEAN NOT NULL,
        cuisines TEXT[],
        averageRating DECIMAL(3,1)
      );
      INSERT INTO restaurants (name, isKosher, cuisines, averageRating) VALUES
      ('Taizu', false, ARRAY['Asian', 'Mexican', 'Indian'], 4.83);
      CREATE TABLE IF NOT EXISTS dishes (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS ratings (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
        rating DECIMAL(3,1) NOT NULL
      );
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        restaurant_id INTEGER NOT NULL REFERENCES restaurants(id),
        order_date TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER NOT NULL REFERENCES orders(id),
        dish_id INTEGER NOT NULL REFERENCES dishes(id),
        amount INTEGER NOT NULL
      );
    `

    await client.query(createTables);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error initializing database', err);
  } finally {
    await client.end();
  }
}

export default client;
