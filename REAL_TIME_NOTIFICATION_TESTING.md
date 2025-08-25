# Real-Time Notification Testing Guide

## 🚀 Quick Test Steps

### 1. Test Server Socket.io Status
- Open your browser and go to: `http://localhost:5000/test-socket`
- You should see: `{"ok":true,"message":"Socket.io is running","socketService":"Available"}`

### 2. Test Client Connection
- Open the app in your browser
- Login as any user (employer or applicant)
- Look at the header - you should see a green "Live" indicator
- If you see "Offline", check the browser console for errors

### 3. Test Real-Time Notifications

#### Test 1: New Application Notification (Employer)
1. **Open two browser windows/tabs**
2. **Window 1**: Login as an employer
3. **Window 2**: Login as an applicant
4. **Window 2**: Apply to a job posted by the employer
5. **Window 1**: Should immediately see a notification bell with a red badge
6. **Window 1**: Click the notification bell to see the new application

#### Test 2: Status Change Notifications (Applicant)
1. **Window 1**: As employer, go to a job with applications
2. **Window 2**: As applicant, keep the dashboard open
3. **Window 1**: Change application status to "shortlisted" or "rejected"
4. **Window 2**: Should immediately see a toast notification

## 🔍 Debugging Steps

### If Notifications Don't Work:

#### 1. Check Server Console
Look for these log messages:
```
✅ Socket.io initialized
🔌 User connected: [userId] with role: [role]
🔌 User joined rooms: user_[userId], role_[role]
📨 Sending new application notification to employer: [employerId]
✅ Notification saved to database for user: [userId]
📨 Real-time notification sent to room: user_[userId]
```

#### 2. Check Browser Console
Look for these log messages:
```
🔌 Attempting to connect to Socket.io server...
🔌 Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ Socket.io connected successfully!
🔌 Socket ID: [socketId]
📨 Received new_application notification: [data]
```

#### 3. Check Network Tab
- Look for WebSocket connections to `ws://localhost:5000`
- Check if there are any failed requests to `/test-socket`

### Common Issues & Fixes:

#### Issue 1: "Socket.io not initialized"
**Fix**: Restart the server
```bash
cd server
npm run dev
```

#### Issue 2: "Authentication error" in server console
**Fix**: Check that the JWT token is being sent correctly from the client

#### Issue 3: "Cast to ObjectId failed" in server console
**Fix**: This was fixed in the latest update - the system now properly extracts IDs

#### Issue 4: Client shows "Offline" but server is running
**Fix**: Check browser console for connection errors, ensure CORS is properly configured

## 🧪 Manual Testing Scenarios

### Scenario 1: Complete Application Flow
1. **Employer posts a job**
2. **Applicant applies to the job**
3. **Employer receives instant notification**
4. **Employer reviews application**
5. **Employer shortlists applicant**
6. **Applicant receives instant notification**

### Scenario 2: Multiple Status Updates
1. **Employer changes status from "applied" to "shortlisted"**
2. **Applicant sees notification**
3. **Employer changes status to "rejected"**
4. **Applicant sees notification**
5. **Employer changes status to "hired"**
6. **Applicant sees notification**

### Scenario 3: Multiple Users
1. **Multiple applicants apply to the same job**
2. **Employer receives notification for each application**
3. **Each applicant receives their own status update notifications**

## 📱 Testing on Different Devices

### Test Real-Time Across Devices:
1. **Desktop**: Login as employer
2. **Mobile**: Login as applicant
3. **Apply for job on mobile**
4. **Check desktop for instant notification**

## 🔧 Advanced Testing

### Test Connection Stability:
1. **Disconnect internet briefly**
2. **Reconnect internet**
3. **Check if Socket.io reconnects automatically**
4. **Verify notifications still work**

### Test Multiple Tabs:
1. **Open multiple tabs with the same user**
2. **Apply for a job in one tab**
3. **Check if all tabs receive notifications**

## 📊 Expected Results

### Successful Test Results:
- ✅ Server shows "Socket.io initialized"
- ✅ Client shows green "Live" indicator
- ✅ Notifications appear instantly (no page refresh needed)
- ✅ Database stores all notifications
- ✅ Toast notifications appear on client
- ✅ Notification bell shows unread count

### Failed Test Results:
- ❌ Server shows "Socket.io not initialized"
- ❌ Client shows red "Offline" indicator
- ❌ No real-time notifications
- ❌ Console errors about Socket.io
- ❌ Network errors in browser

## 🆘 Troubleshooting

### If Still Not Working:

1. **Check all console logs** (both server and client)
2. **Verify environment variables** are set correctly
3. **Restart both server and client**
4. **Clear browser cache and cookies**
5. **Check if firewall/antivirus is blocking WebSocket connections**
6. **Verify the server is accessible at `http://localhost:5000`**

### Emergency Reset:
```bash
# Stop all processes
# Clear node_modules and reinstall
cd server && rm -rf node_modules package-lock.json && npm install
cd ../client && rm -rf node_modules package-lock.json && npm install

# Restart both
cd ../server && npm run dev
# In another terminal:
cd ../client && npm run dev
```

## 🎯 Success Criteria

The real-time notification system is working correctly when:

1. **Instant Notifications**: Notifications appear within 1-2 seconds
2. **No Page Refresh**: Users don't need to refresh to see updates
3. **Persistent Storage**: Notifications are saved to database
4. **Real-Time Updates**: Status changes are reflected immediately
5. **Cross-Device**: Works across different browser tabs/devices
6. **Error Handling**: Gracefully handles connection issues
7. **Authentication**: Only authenticated users receive notifications

---

**Need Help?** Check the console logs first, then refer to this guide. The system includes comprehensive logging to help diagnose any issues.
