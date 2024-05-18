// services/dishService.ts
import client from '../db/db';
import { Dish } from '../models/models';

export const addDish = async (restaurantId: number, newDish: Partial<Dish>): Promise<Dish> => {
  const { name, description, price } = newDish;
  if (!name || !description || !price) {
    throw new Error('Missing required fields for adding a dish');
  }
  try {
    const result = await client.query<Dish>(
      'INSERT INTO dishes (restaurant_id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [restaurantId, name, description, price]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error adding dish: ${(error as Error).message}`);
  }
};

export const updateDish = async (restaurantId: number, dishId: number, updatedDish: Partial<Dish>): Promise<Dish | null> => {
  const { description, price } = updatedDish;
  if (!description || !price) {
    throw new Error('Missing required fields for updating a dish');
  }
  try {
    const result = await client.query<Dish>(
      'UPDATE dishes SET description = $1, price = $2 WHERE restaurant_id = $3 AND id = $4 RETURNING *',
      [description, price, restaurantId, dishId]
    );
    return result.rows[0] || null;
  } catch (error) {
    throw new Error(`Error updating dish with ID ${dishId}: ${(error as Error).message}`);
  }
};

export const deleteDish = async (restaurantId: number, dishId: number): Promise<void> => {
  try {
    await client.query(
      'DELETE FROM dishes WHERE restaurant_id = $1 AND id = $2',
      [restaurantId, dishId]
    );
  } catch (error) {
    throw new Error(`Error deleting dish with ID ${dishId}: ${(error as Error).message}`);
  }
};

export const getDishesByRestaurant = async (restaurantId: number): Promise<Dish[]> => {
  try {
    const result = await client.query(
      'SELECT * FROM dishes WHERE restaurant_id = $1',
      [restaurantId]
    );
    return result.rows;
  } catch (error) {
    throw new Error(`Error fetching dishes for restaurant with ID ${restaurantId}: ${(error as Error).message}`);
  }
};