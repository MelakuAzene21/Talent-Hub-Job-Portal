import express from 'express';
import { getPublicStats } from '../controllers/stats.controller';

const router = express.Router();

// Public stats endpoint (no authentication required)
router.get('/public', getPublicStats);

export default router;
