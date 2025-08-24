# 🚀 Socket.io Real-Time Notifications Setup Guide

This guide explains how to set up and use the real-time notification system built with Socket.io for the TalentHub application.

## 📋 **Features Implemented**

### **Real-Time Notifications**
- ✅ **New Application Notifications** - Employers get notified when someone applies to their job
- ✅ **Status Change Notifications** - Applicants get notified when their application status changes
- ✅ **Shortlisted Notifications** - Special notifications for shortlisted applicants
- ✅ **Rejected Notifications** - Notifications for rejected applications
- ✅ **Hired Notifications** - Congratulations notifications for hired applicants

### **Database Storage**
- ✅ **Persistent Notifications** - All notifications are stored in MongoDB
- ✅ **Read/Unread Status** - Track which notifications have been read
- ✅ **Notification History** - View all past notifications

### **Client-Side Features**
- ✅ **Notification Bell** - Shows unread count and notification dropdown
- ✅ **Real-Time Updates** - Instant notifications without page refresh
- ✅ **Toast Notifications** - Beautiful toast messages for different notification types
- ✅ **Auto-Reconnection** - Automatic reconnection if connection is lost

## 🛠️ **Installation & Setup**

### **1. Server Dependencies**
```bash
cd server
npm install socket.io
```

### **2. Client Dependencies**
```bash
cd client
npm install socket.io-client
```

## 🔧 **Server Configuration**

### **Socket.io Service** (`server/src/socket/socket.ts`)
- Handles WebSocket connections
- Authenticates users via JWT tokens
- Manages user rooms for targeted notifications
- Saves notifications to database

### **Notification Model** (`server/src/models/Notification.ts`)
- MongoDB schema for storing notifications
- Includes type, recipient, message, and metadata
- Indexed for efficient queries

### **Integration Points**
- **Applications Controller** - Sends notifications on status changes
- **Applications Routes** - Sends notifications on new applications
- **Server Entry Point** - Initializes Socket.io with HTTP server

## 📱 **Client Configuration**

### **Socket Service** (`client/src/services/socket.ts`)
- Manages WebSocket connection lifecycle
- Handles different notification types
- Shows toast notifications
- Auto-reconnection logic

### **Notification Bell Component** (`client/src/components/ui/NotificationBell.tsx`)
- Displays unread notification count
- Shows notification dropdown
- Allows marking notifications as read
- Filter between all and unread notifications

### **Socket Hook** (`client/src/hooks/useSocket.ts`)
- Manages Socket.io connection in React components
- Automatically connects/disconnects based on user authentication

## 🔄 **How It Works**

### **1. Connection Flow**
```
User Login → JWT Token → Socket.io Connection → Join User Room
```

### **2. Notification Flow**
```
Event Occurs → Server Sends Notification → Client Receives → Toast + Update UI
```

### **3. Event Types**
- `new_application` - When someone applies to a job
- `shortlisted` - When applicant is shortlisted
- `rejected` - When applicant is rejected
- `hired` - When applicant is hired
- `application_status_change` - General status updates

## 📊 **API Endpoints**

### **Notifications API**
- `GET /notifications` - Get user notifications
- `GET /notifications/count` - Get unread count
- `PUT /notifications/:id/read` - Mark as read
- `PUT /notifications/read-all` - Mark all as read
- `DELETE /notifications/:id` - Delete notification

## 🎯 **Usage Examples**

### **Server-Side (Sending Notifications)**
```typescript
// Notify employer about new application
await global.socketService.notifyNewApplication(jobId, employerId, applicationData);

// Notify applicant about shortlisting
await global.socketService.notifyShortlisted(applicantId, jobId, jobTitle);
```

### **Client-Side (Receiving Notifications)**
```typescript
// Initialize Socket.io connection
useSocket();

// Show notification bell in header
<NotificationBell />
```

## 🧪 **Testing the System**

### **1. Start the Server**
```bash
cd server
npm run dev
```

### **2. Start the Client**
```bash
cd client
npm run dev
```

### **3. Test Notifications**
1. **Login as an employer** and post a job
2. **Login as an applicant** and apply to the job
3. **Check employer dashboard** - should see real-time notification
4. **Change application status** as employer
5. **Check applicant dashboard** - should see status change notification

## 🔍 **Debugging**

### **Server Console**
- Socket.io connection logs
- Notification sending logs
- Database operation logs

### **Client Console**
- Socket.io connection status
- Notification reception logs
- Reconnection attempts

### **Browser Network Tab**
- WebSocket connection status
- Socket.io handshake details

## 🚨 **Common Issues & Solutions**

### **1. Connection Failed**
- Check if server is running on port 5000
- Verify CORS configuration
- Check JWT token validity

### **2. Notifications Not Showing**
- Verify Socket.io connection status
- Check browser console for errors
- Ensure user is authenticated

### **3. Database Errors**
- Check MongoDB connection
- Verify Notification model is imported
- Check database permissions

## 🔒 **Security Features**

- **JWT Authentication** - Only authenticated users can connect
- **User Isolation** - Users only receive their own notifications
- **Room-Based Access** - Notifications sent to specific user rooms
- **Input Validation** - All notification data is validated

## 📈 **Performance Considerations**

- **Connection Pooling** - Efficient WebSocket management
- **Database Indexing** - Fast notification queries
- **Lazy Loading** - Notifications loaded on demand
- **Auto-Reconnection** - Minimal disruption on connection loss

## 🎨 **Customization**

### **Notification Styles**
- Modify toast styles in `socket.ts`
- Update notification colors in `NotificationBell.tsx`
- Customize notification icons and messages

### **New Notification Types**
- Add new types to Notification model
- Create new notification methods in SocketService
- Handle new events in client socket service

## 📚 **Additional Resources**

- [Socket.io Documentation](https://socket.io/docs/)
- [React Hot Toast](https://react-hot-toast.com/)
- [MongoDB with Mongoose](https://mongoosejs.com/)

## 🤝 **Support**

If you encounter any issues:
1. Check the console logs
2. Verify all dependencies are installed
3. Ensure MongoDB is running
4. Check network connectivity
5. Review the authentication flow

---

**Happy Coding! 🚀**
