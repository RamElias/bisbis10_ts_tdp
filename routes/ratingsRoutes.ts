import express from 'express';
import * as ratingsController from '../controllers/ratingsController';

const router = express.Router();

router.post('/', ratingsController.addRating);

export default router;