import { Request, Response } from 'express';
import Job from '../models/Job';
import User from '../models/User';
import Application from '../models/Application';

// Public stats for landing page
export const getPublicStats = async (_req: Request, res: Response) => {
  try {
    const [jobsCount, usersCount] = await Promise.all([
      Job.countDocuments(),
      User.countDocuments()
    ]);

    res.json({
      jobsCount,
      usersCount
    });
  } catch (error) {
    console.error('Error fetching public stats:', error);
    res.status(500).json({ 
      message: 'Failed to fetch statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
