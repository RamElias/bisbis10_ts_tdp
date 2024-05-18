import { Request, Response } from 'express';
import * as dishService from '../services/dishesService';

export const addDish = async (req: Request, res: Response) => {
  try {
    const { id: restaurantId } = req.params;
    const newDish = req.body;
    const result = await dishService.addDish(parseInt(restaurantId), newDish);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateDish = async (req: Request, res: Response) => {
  try {
    const { id: restaurantId, dishId } = req.params;
    const updatedDish = req.body;
    const result = await dishService.updateDish(parseInt(restaurantId), parseInt(dishId), updatedDish);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Dish not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteDish = async (req: Request, res: Response) => {
  try {
    const { id: restaurantId, dishId } = req.params;
    await dishService.deleteDish(parseInt(restaurantId), parseInt(dishId));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error});
  }
};

export const getDishesByRestaurant = async (req: Request, res: Response) => {
  try {
    const { id: restaurantId } = req.params;
    const result = await dishService.getDishesByRestaurant(parseInt(restaurantId));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
