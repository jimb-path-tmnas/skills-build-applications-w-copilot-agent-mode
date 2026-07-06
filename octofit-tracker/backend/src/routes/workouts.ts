import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const items = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();

    response.json({
      resource: 'workouts',
      count: items.length,
      items,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'workouts',
      error: 'Failed to load workouts',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;