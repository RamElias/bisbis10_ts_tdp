import { Request, Response } from 'express';
import * as restaurantService from '../services/restaurantService';

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


export const addRestaurant = async (req: Request, res: Response) => {
  try {
    const newRestaurant = req.body;
    const restaurant = await restaurantService.addRestaurant(newRestaurant);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error });
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
