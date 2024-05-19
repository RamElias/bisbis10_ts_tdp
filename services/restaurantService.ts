import { Restaurant } from '../models/models';
import client from '../db/db';

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const result = await client.query('SELECT * FROM restaurants');
    console.log(`result: ${result}`)   
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching restaurants: ${error}`);
  }
};

export const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
  try {
    const result = await client.query('SELECT * FROM restaurants WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    throw new Error(`Error fetching restaurant by ID ${id}: ${error}`);
  }
};

export const getRestaurantsByCuisine = async (cuisine: string): Promise<Restaurant[]> => {
  try {
    const result = await client.query('SELECT * FROM restaurants WHERE cuisines @> $1::jsonb[]', [[cuisine]]);
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching restaurants by cuisine ${cuisine}: ${error}`);
  }
};

export const addRestaurant = async (newRestaurant: Restaurant): Promise<Restaurant> => {
  const { name, isKosher, cuisines, averageRating } = newRestaurant;
  try {
    const result = await client.query<Restaurant>(
      'INSERT INTO restaurants (name, isKosher, cuisines, averageRating) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, isKosher, JSON.stringify(cuisines), averageRating]  // Ensure cuisines is handled according to your schema
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error adding restaurant:', error);  // Log the full error stack
    throw new Error(`Error adding restaurant: ${error}`);
  }
};


export const updateRestaurant = async (id: string, updatedRestaurant: Partial<Restaurant>): Promise<Restaurant | null> => {
  try {
    const { name = '', isKosher = false, cuisines = [], averageRating = 0 } = updatedRestaurant;
    
    const cuisinesArray = Array.isArray(cuisines) ? cuisines : [cuisines];

    const result = await client.query<Restaurant>(
      'UPDATE restaurants SET name = $1, isKosher = $2, cuisines = $3, averageRating = $4 WHERE id = $5 RETURNING *',
      [name, isKosher, JSON.stringify(cuisinesArray), averageRating, id]
    );

    return result.rows[0] || null;
  } catch (error) {
    throw new Error(`Error updating restaurant with ID ${id}: ${error}`);
  }
};


export const deleteRestaurant = async (id: string): Promise<void> => {
  try {
    await client.query('DELETE FROM restaurants WHERE id = $1', [id]);
  } catch (error) {
    throw new Error(`Error deleting restaurant with ID ${id}: ${error}`);
  }
};