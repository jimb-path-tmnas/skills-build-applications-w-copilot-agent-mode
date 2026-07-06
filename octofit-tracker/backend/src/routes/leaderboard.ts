import { Router } from 'express';
import Leaderboard from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const items = await Leaderboard.find()
      .populate('user')
      .populate('team')
      .sort({ rank: 1, score: -1 })
      .lean();

    response.json({
      resource: 'leaderboard',
      count: items.length,
      items,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'leaderboard',
      error: 'Failed to load leaderboard',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;