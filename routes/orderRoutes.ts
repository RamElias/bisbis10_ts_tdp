import express from 'express';
import * as ordersController from '../controllers/orderController';

const router = express.Router();

router.post('/', ordersController.createOrder);

export default router;
