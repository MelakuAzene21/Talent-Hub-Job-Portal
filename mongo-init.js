// MongoDB initialization script for Docker
db = db.getSiblingDB('talenthub');

// Create collections with proper indexes
db.createCollection('users');
db.createCollection('jobs');
db.createCollection('applications');
db.createCollection('notifications');
db.createCollection('savedjobs');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "createdAt": -1 });

db.jobs.createIndex({ "title": "text", "description": "text", "company": "text" });
db.jobs.createIndex({ "createdBy": 1 });
db.jobs.createIndex({ "jobType": 1 });
db.jobs.createIndex({ "location": 1 });
db.jobs.createIndex({ "createdAt": -1 });
db.jobs.createIndex({ "isActive": 1 });

db.applications.createIndex({ "jobId": 1 });
db.applications.createIndex({ "applicantId": 1 });
db.applications.createIndex({ "status": 1 });
db.applications.createIndex({ "createdAt": -1 });

db.notifications.createIndex({ "userId": 1 });
db.notifications.createIndex({ "read": 1 });
db.notifications.createIndex({ "createdAt": -1 });

db.savedjobs.createIndex({ "applicantId": 1 });
db.savedjobs.createIndex({ "jobId": 1 });
db.savedjobs.createIndex({ "savedAt": -1 });

print('MongoDB initialized successfully!');
