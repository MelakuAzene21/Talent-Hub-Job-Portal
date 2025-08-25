const mongoose = require('mongoose');
const Job = require('../models/Job');
const User = require('../models/User');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/talenthub', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testStats() {
  try {
    console.log('Testing stats endpoint...');
    
    const jobsCount = await Job.countDocuments();
    const usersCount = await User.countDocuments();
    
    console.log('Jobs count:', jobsCount);
    console.log('Users count:', usersCount);
    
    // Check if there are any jobs
    const sampleJob = await Job.findOne();
    if (sampleJob) {
      console.log('Sample job:', {
        id: sampleJob._id,
        title: sampleJob.title,
        company: sampleJob.company
      });
    } else {
      console.log('No jobs found in database');
    }
    
    // Check if there are any users
    const sampleUser = await User.findOne();
    if (sampleUser) {
      console.log('Sample user:', {
        id: sampleUser._id,
        name: sampleUser.name,
        email: sampleUser.email,
        role: sampleUser.role
      });
    } else {
      console.log('No users found in database');
    }
    
  } catch (error) {
    console.error('Error testing stats:', error);
  } finally {
    mongoose.connection.close();
  }
}

testStats();
