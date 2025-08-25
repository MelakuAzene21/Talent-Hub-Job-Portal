import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetNotificationCountQuery, useGetUserNotificationsQuery, useMarkNotificationAsReadMutation, useMarkAllNotificationsAsReadMutation } from '../../features/notifications/notificationsApi';
import { toast } from 'react-hot-toast';
import Button from './Button';
import socketService from '../../services/socket';

export default function NotificationBell() {
  const { user } = useSelector((state: any) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  
  const { data: countData, refetch: refetchCount } = useGetNotificationCountQuery();
  const { data: notificationsData, refetch: refetchNotifications } = useGetUserNotificationsQuery({
    page: 1,
    limit: 10,
    unreadOnly: showUnreadOnly
  });
  
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead] = useMarkAllNotificationsAsReadMutation();

  const unreadCount = countData?.unreadCount || 0;
  const notifications = notificationsData?.notifications || [];

  // Listen for real-time notifications
  useEffect(() => {
    if (!user) return;

    // Listen for new application notifications
    const handleNewApplication = (data: any) => {
      console.log('📨 Real-time: New application notification received:', data);
      toast.success(`New application received for ${data.job?.title || 'your job posting'}`, {
        duration: 5000,
        position: 'top-right'
      });
      // Refresh notifications from database
      refetchCount();
      refetchNotifications();
    };

    // Listen for application status change notifications
    const handleStatusChange = (data: any) => {
      console.log('📨 Real-time: Status change notification received:', data);
      toast.success(`Application status updated: ${data.status}`, {
        duration: 5000,
        position: 'top-right'
      });
      // Refresh notifications from database
      refetchCount();
      refetchNotifications();
    };

    // Listen for shortlisted notifications
    const handleShortlisted = (data: any) => {
      console.log('📨 Real-time: Shortlisted notification received:', data);
      toast.success(`🎉 Congratulations! You've been shortlisted for ${data.jobTitle}`, {
        duration: 8000,
        position: 'top-right'
      });
      // Refresh notifications from database
      refetchCount();
      refetchNotifications();
    };

    // Listen for rejected notifications
    const handleRejected = (data: any) => {
      console.log('📨 Real-time: Rejected notification received:', data);
      toast.error(`Application for ${data.jobTitle} was not selected`, {
        duration: 8000,
        position: 'top-right'
      });
      // Refresh notifications from database
      refetchCount();
      refetchNotifications();
    };

    // Listen for hired notifications
    const handleHired = (data: any) => {
      console.log('📨 Real-time: Hired notification received:', data);
      toast.success(`🎊 Congratulations! You've been hired for ${data.jobTitle}!`, {
        duration: 10000,
        position: 'top-right'
      });
      // Refresh notifications from database
      refetchCount();
      refetchNotifications();
    };

    // Add event listeners to socket service
    const socket = socketService.getSocket();
    if (socket) {
      socket.on('new_application', handleNewApplication);
      socket.on('application_status_change', handleStatusChange);
      socket.on('shortlisted', handleShortlisted);
      socket.on('rejected', handleRejected);
      socket.on('hired', handleHired);
    }

    // Cleanup event listeners
    return () => {
      if (socket) {
        socket.off('new_application', handleNewApplication);
        socket.off('application_status_change', handleStatusChange);
        socket.off('shortlisted', handleShortlisted);
        socket.off('rejected', handleRejected);
        socket.off('hired', handleHired);
      }
    };
  }, [user, refetchCount, refetchNotifications]);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
      toast.success('Notification marked as read');
      // Refresh the count and notifications
      refetchCount();
      refetchNotifications();
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead().unwrap();
      toast.success('All notifications marked as read');
      // Refresh the count and notifications
      refetchCount();
      refetchNotifications();
    } catch (error) {
      toast.error('Failed to mark all notifications as read');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'shortlisted':
        return '🎉';
      case 'hired':
        return '🎊';
      case 'rejected':
        return '❌';
      case 'new_application':
        return '📝';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'shortlisted':
      case 'hired':
        return 'text-green-600';
      case 'rejected':
        return 'text-red-600';
      case 'new_application':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  if (!user) return null;

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M9 11h.01M9 8h.01M15 14h.01M15 11h.01M15 8h.01M15 5h.01M12 5h.01M12 2h.01" />
        </svg>
        
        {/* Notification Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                  className="text-xs"
                >
                  {showUnreadOnly ? 'Show All' : 'Unread Only'}
                </Button>
                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleMarkAllAsRead}
                    className="text-xs"
                  >
                    Mark All Read
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                {showUnreadOnly ? 'No unread notifications' : 'No notifications yet'}
              </div>
            ) : (
              notifications.map((notification: any) => (
                <div
                  key={notification._id}
                  className={`p-4 border-b border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors ${
                    !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`text-sm font-medium ${getNotificationColor(notification.type)}`}>
                          {notification.title}
                        </h4>
                        {!notification.isRead && (
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </span>
                        {!notification.isRead && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => handleMarkAsRead(notification._id)}
                            className="text-xs text-blue-600 hover:text-blue-700"
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-zinc-700">
              <Button
                variant="link"
                onClick={() => {/* Navigate to full notifications page */}}
                className="w-full text-center"
              >
                View All Notifications
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

