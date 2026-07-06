import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_request, response) => {
  try {
    const items = await User.find().populate('team').sort({ name: 1 }).lean();

    response.json({
      resource: 'users',
      count: items.length,
      items,
    });
  } catch (error) {
    response.status(500).json({
      resource: 'users',
      error: 'Failed to load users',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;