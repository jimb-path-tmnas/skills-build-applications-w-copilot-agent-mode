import { Router } from 'express';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const items = await Team.find().sort({ name: 1 }).lean();

    response.json({
      resource: 'teams',
      count: items.length,
      items,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'teams',
      error: 'Failed to load teams',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;