import client from '../db/db';
import { Rating } from '../models/models';

export const addRating = async (newRating: Omit<Rating, 'id'>): Promise<Rating> => {
  const { restaurantId, rating } = newRating;
  try {
    const result = await client.query(
      'INSERT INTO ratings (restaurant_id, rating) VALUES ($1, $2) RETURNING *',
      [restaurantId, rating]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error adding rating: ${error}`);
  }
};