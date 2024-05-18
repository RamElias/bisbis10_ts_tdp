import { Request, Response } from 'express';
import * as orderService from '../services/orderService';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder = req.body;
    const result = await orderService.createOrder(newOrder);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
