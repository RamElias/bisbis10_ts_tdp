import express from 'express';
import * as restaurantController from '../controllers/restaurantsController';

const router = express.Router();

// Define routes
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.get('/by-cuisine', restaurantController.getRestaurantsByCuisine);
router.post('/', restaurantController.addRestaurant);
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);

export default router;
