import { Request, Response } from 'express';
import * as restaurantService from '../services/restaurantService';
import client from '../db/db';
import { Restaurant } from '../models/models';

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error});
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantService.getRestaurantById(id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error});
  }
};

export const getRestaurantsByCuisine = async (req: Request, res: Response) => {
  try {
    const cuisine: string | undefined = req.query.cuisine as string | undefined;

    if (typeof cuisine === 'string') {
      const restaurants = await restaurantService.getRestaurantsByCuisine(cuisine);
      res.status(200).json(restaurants);
    } else {
      res.status(400).json({ error: 'Invalid cuisine parameter' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const addRestaurant = async (newRestaurant: Restaurant): Promise<Restaurant> => {
  const { name, isKosher, cuisines, averageRating } = newRestaurant;
  try {
    const result = await client.query<Restaurant>(
      'INSERT INTO restaurants (name, isKosher, cuisines, averageRating) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, isKosher, JSON.stringify(cuisines), averageRating]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error adding restaurant:', error);
    throw new Error(`Error adding restaurant: ${error}`);
  }
};


export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedRestaurant = req.body;
    const restaurant = await restaurantService.updateRestaurant(id, updatedRestaurant);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await restaurantService.deleteRestaurant(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error });
  }
};
