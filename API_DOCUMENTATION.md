# 🔌 TalentHub API Documentation

> **Comprehensive API documentation for the TalentHub job portal backend**

## 📋 Overview

The TalentHub API is a RESTful service built with Express.js and TypeScript, featuring real-time capabilities through Socket.io, secure authentication, and comprehensive job management functionality.

## 🏗 API Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client App   │◄──►│  Express API    │◄──►│   MongoDB       │
│                 │    │                 │    │                 │
│ • HTTP Requests│    │ • REST Endpoints│    │ • User Data     │
│ • WebSocket    │    │ • Middleware    │    │ • Jobs          │
│ • File Upload  │    │ • Validation    │    │ • Applications  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔐 Authentication

### JWT Token Structure
```typescript
interface JWTPayload {
  id: string;           // User ID
  role: 'employer' | 'applicant' | 'admin';
  name: string;         // User's full name
  iat: number;          // Issued at timestamp
  exp: number;          // Expiration timestamp
}
```

### Protected Routes
All routes except `/auth/login` and `/auth/register` require a valid JWT token in the Authorization header:
```http
Authorization: Bearer <jwt_token>
```

## 📚 API Endpoints

### 🔐 Authentication Routes

#### POST `/auth/register`
**Description**: Register a new user account

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "applicant"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "applicant"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST `/auth/login`
**Description**: Authenticate user and receive JWT token

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "success": true,
  "user": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "applicant"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET `/auth/profile`
**Description**: Get authenticated user's profile

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "id": "64f8a1b2c3d4e5f6a7b8c9d0",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "applicant",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

### 💼 Job Management Routes

#### GET `/jobs`
**Description**: Get all available jobs with pagination and filtering

**Query Parameters**:
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search term for job title/description
- `category` (string): Job category filter
- `location` (string): Location filter

**Response**:
```json
{
  "jobs": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "title": "Senior React Developer",
      "company": "TechCorp Inc.",
      "location": "San Francisco, CA",
      "category": "Technology",
      "description": "We're looking for an experienced React developer...",
      "salary": "$120,000 - $150,000",
      "createdBy": "64f8a1b2c3d4e5f6a7b8c9d2",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### POST `/jobs`
**Description**: Create a new job posting (Employer only)

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "Senior React Developer",
  "company": "TechCorp Inc.",
  "location": "San Francisco, CA",
  "category": "Technology",
  "description": "We're looking for an experienced React developer...",
  "salary": "$120,000 - $150,000",
  "requirements": ["React", "TypeScript", "Node.js"]
}
```

**Response**:
```json
{
  "success": true,
  "job": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "title": "Senior React Developer",
    "company": "TechCorp Inc.",
    "createdBy": "64f8a1b2c3d4e5f6a7b8c9d2",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### PUT `/jobs/:id`
**Description**: Update existing job posting (Owner only)

**Headers**: `Authorization: Bearer <token>`

**Request Body**: Same as POST `/jobs`

#### DELETE `/jobs/:id`
**Description**: Delete job posting (Owner or Admin only)

**Headers**: `Authorization: Bearer <token>`

### 📝 Application Routes

#### POST `/applications`
**Description**: Submit a job application (Applicant only)

**Headers**: `Authorization: Bearer <token>`

**Request Body** (multipart/form-data):
- `jobId` (string): Job ID to apply for
- `coverLetter` (string): Cover letter text
- `resume` (file): Resume file (PDF, DOC, DOCX)

**Response**:
```json
{
  "success": true,
  "application": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d3",
    "jobId": "64f8a1b2c3d4e5f6a7b8c9d1",
    "applicantId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "coverLetter": "I'm excited to apply for this position...",
    "resumeUrl": "https://res.cloudinary.com/...",
    "status": "applied",
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
}
```

#### GET `/applications/:userId`
**Description**: Get user's applications (Owner only)

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "applications": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "job": {
        "title": "Senior React Developer",
        "company": "TechCorp Inc."
      },
      "status": "applied",
      "appliedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### PUT `/applications/:id/status`
**Description**: Update application status (Employer or Admin only)

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "status": "shortlisted"
}
```

**Valid Statuses**: `applied`, `shortlisted`, `rejected`, `hired`

### 🔔 Notification Routes

#### GET `/notifications`
**Description**: Get user notifications

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `page` (number): Page number
- `limit` (number): Items per page
- `unreadOnly` (boolean): Filter unread notifications

**Response**:
```json
{
  "notifications": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d4",
      "type": "new_application",
      "title": "New Application Received",
      "message": "New application received for your job posting...",
      "isRead": false,
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 15,
    "pages": 2
  },
  "unreadCount": 5
}
```

#### PUT `/notifications/:id/read`
**Description**: Mark notification as read

**Headers**: `Authorization: Bearer <token>`

#### PUT `/notifications/read-all`
**Description**: Mark all notifications as read

**Headers**: `Authorization: Bearer <token>`

## 🔌 WebSocket Events

### Connection Events
```typescript
// Client connects
'socket:connect' → { userId: string, userRole: string }

// Client disconnects
'socket:disconnect' → { reason: string }
```

### Notification Events
```typescript
// New job application
'new_application' → {
  type: 'new_application',
  jobId: string,
  application: ApplicationData,
  message: string,
  timestamp: string
}

// Application status change
'application_status_change' → {
  type: 'application_status_change',
  jobId: string,
  status: string,
  jobTitle: string,
  message: string,
  timestamp: string
}

// Application shortlisted
'shortlisted' → {
  type: 'shortlisted',
  jobId: string,
  jobTitle: string,
  message: string,
  timestamp: string
}

// Application rejected
'rejected' → {
  type: 'rejected',
  jobId: string,
  jobTitle: string,
  message: string,
  timestamp: string
}

// Application hired
'hired' → {
  type: 'hired',
  jobId: string,
  jobTitle: string,
  message: string,
  timestamp: string
}
```

## 🛡️ Security Features

### Authentication Middleware
```typescript
// JWT token validation
const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('No token provided');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
```

### Role-Based Access Control
```typescript
// Role verification middleware
const permit = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};
```

### Input Validation
```typescript
// Request validation using Joi
const validateJob = (req: Request, res: Response, next: NextFunction) => {
  const { error } = jobSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors: error.details 
    });
  }
  next();
};
```

## 📊 Error Handling

### Standard Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation errors)
- `401` - Unauthorized (Invalid/missing token)
- `403` - Forbidden (Insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## 🚀 Performance Optimizations

### Database Indexing
```typescript
// User model indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ role: 1 });

// Job model indexes
jobSchema.index({ title: 'text', description: 'text' });
jobSchema.index({ category: 1, location: 1 });
jobSchema.index({ createdBy: 1, createdAt: -1 });

// Application model indexes
applicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });
applicationSchema.index({ applicantId: 1, status: 1 });

// Notification model indexes
notificationSchema.index({ recipientId: 1, isRead: 1, createdAt: -1 });
```

### Response Caching
```typescript
// Cache frequently accessed data
const cacheMiddleware = (duration: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const key = `cache:${req.originalUrl}`;
    const cached = cache.get(key);
    
    if (cached) {
      return res.json(cached);
    }
    
    res.sendResponse = res.json;
    res.json = (body: any) => {
      cache.set(key, body, duration);
      res.sendResponse(body);
    };
    next();
  };
};
```

## 📝 API Rate Limiting

### Rate Limiter Configuration
```typescript
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply to all routes
app.use('/api/', apiLimiter);

// Stricter limits for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 requests per 15 minutes
  message: 'Too many login attempts, please try again later.',
});
app.use('/auth/login', authLimiter);
```

## 🔍 API Testing

### Example cURL Commands

#### Register User
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "applicant"
  }'
```

#### Login User
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### Create Job (with auth)
```bash
curl -X POST http://localhost:5000/jobs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React Developer",
    "company": "TechCorp",
    "location": "San Francisco",
    "description": "We need a React developer"
  }'
```

## 📈 Monitoring & Logging

### Request Logging
```typescript
import morgan from 'morgan';

// Log all requests
app.use(morgan('combined'));

// Custom logging for API calls
app.use('/api', morgan(':method :url :status :response-time ms'));
```

### Error Logging
```typescript
// Global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', error.stack);
  
  // Log to external service in production
  if (process.env.NODE_ENV === 'production') {
    logger.error({
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});
```

---

## 🎯 **API Design Principles**

This API demonstrates senior-level backend development skills:

✅ **RESTful Design**: Proper HTTP methods and status codes  
✅ **Security First**: JWT authentication, role-based access, input validation  
✅ **Performance**: Database indexing, caching, rate limiting  
✅ **Real-time**: Socket.io integration with database persistence  
✅ **Error Handling**: Comprehensive error responses and logging  
✅ **Documentation**: Clear endpoint documentation with examples  
✅ **Testing**: cURL examples for API testing  
✅ **Monitoring**: Request logging and error tracking  

**The API follows industry best practices and demonstrates enterprise-level backend development capabilities.**
