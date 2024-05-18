import express from 'express';
import * as dishesController from '../controllers/dishesController';

const router = express.Router();

router.post('/:id/dishes', dishesController.addDish);
router.put('/:id/dishes/:dishId', dishesController.updateDish);
router.delete('/:id/dishes/:dishId', dishesController.deleteDish);
router.get('/:id/dishes', dishesController.getDishesByRestaurant);

export default router;