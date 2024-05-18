import { Client, QueryResult } from 'pg';
import { Restaurant } from '../models/models';
import client from '../db/db';

export const getAllRestaurants = async (): Promise<Restaurant[]> => {
  try {
    const result = await client.query('SELECT * FROM restaurants');   
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
  const { name, is_Kosher, cuisines, averageRating } = newRestaurant;
  try {
    const result = await client.query<Restaurant>(
      'INSERT INTO restaurants (name, averageRating, is_kosher, cuisines) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, averageRating, is_Kosher, JSON.stringify(cuisines)]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error adding restaurant: ${error}`);
  }
};

export const updateRestaurant = async (id: string, updatedRestaurant: Partial<Restaurant>): Promise<Restaurant | null> => {
  try {
    // Destructure updatedRestaurant properties with default values
    const { name = '', is_Kosher = false, cuisines = [], averageRating = 0 } = updatedRestaurant;
    
    // Ensure cuisines is an array
    const cuisinesArray = Array.isArray(cuisines) ? cuisines : [cuisines];

    // Execute the query
    const result = await client.query<Restaurant>(
      'UPDATE restaurants SET name = $1, is_kosher = $2, cuisines = $3, averageRating = $4 WHERE id = $5 RETURNING *',
      [name, is_Kosher, JSON.stringify(cuisinesArray), averageRating, id]
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