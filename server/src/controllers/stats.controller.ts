import { Request, Response } from 'express';
import Job from '../models/Job';
import User from '../models/User';
import Application from '../models/Application';

// Public stats for landing page
export const getPublicStats = async (_req: Request, res: Response) => {
  try {
    console.log('🔍 Fetching public stats...');
    
    // Check if models are properly imported
    console.log('📊 Job model:', Job ? 'Loaded' : 'Not loaded');
    console.log('👥 User model:', User ? 'Loaded' : 'Not loaded');
    
    const [jobsCount, usersCount] = await Promise.all([
      Job.countDocuments(),
      User.countDocuments()
    ]);

    console.log('📈 Stats calculated:', { jobsCount, usersCount });

    res.json({
      jobsCount,
      usersCount
    });
  } catch (error) {
    console.error('❌ Error fetching public stats:', error);
    res.status(500).json({ 
      message: 'Failed to fetch statistics',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
