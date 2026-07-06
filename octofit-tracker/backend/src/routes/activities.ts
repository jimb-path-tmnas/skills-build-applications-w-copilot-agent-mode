import { Router } from 'express';
import Activity from '../models/activity.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const items = await Activity.find()
      .populate('user')
      .populate('team')
      .sort({ performedAt: -1 })
      .lean();

    response.json({
      resource: 'activities',
      count: items.length,
      items,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'activities',
      error: 'Failed to load activities',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;