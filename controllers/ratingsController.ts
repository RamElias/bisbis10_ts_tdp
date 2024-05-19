import { Request, Response } from 'express';
import * as ratingService from '../services/ratingsService';

export const addRating = async (req: Request, res: Response) => {
  try {
    const newRating = req.body;
    const rating = await ratingService.addRating(newRating);
    res.status(200).json(rating);
  } catch (error) {
    res.status(500).json({ error });
  }
};
