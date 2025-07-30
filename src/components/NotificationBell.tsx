import React, { useState } from 'react';
import { Bell, X, FileText, Calendar, MessageSquare, CheckCircle } from 'lucide-react';

interface NotificationBellProps {
  t: any;
  isLoggedIn: boolean;
  userType?: 'main' | 'user' | 'admin' | 'lawyer';
}

const NotificationBell: React.FC<NotificationBellProps> = ({ t, isLoggedIn, userType = 'user' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    // Different notifications based on user type
    if (userType === 'user') {
      return [
        {
          id: 1,
          type: 'document',
          title: 'Legal Notice Ready',
          message: 'Your legal notice has been reviewed and approved by Adv. Rajesh Kumar',
          time: '2 hours ago',
          read: false,
          icon: FileText
        },
        {
          id: 2,
          type: 'consultation',
          title: 'Consultation Reminder',
          message: 'Your consultation with Adv. Priya Sharma is scheduled for tomorrow at 2:00 PM',
          time: '1 day ago',
          read: false,
          icon: Calendar
        },
        {
          id: 3,
          type: 'message',
          title: 'New Message',
          message: 'You have received a response to your legal query about property dispute',
          time: '2 days ago',
          read: true,
          icon: MessageSquare
        },
        {
          id: 4,
          type: 'update',
          title: 'Case Status Update',
          message: 'Your RTI application has been successfully submitted to the concerned authority',
          time: '3 days ago',
          read: true,
          icon: CheckCircle
        }
      ];
    } else if (userType === 'lawyer') {
      return [
        {
          id: 1,
          type: 'client',
          title: 'New Client Request',
          message: 'Rahul Sharma has requested a consultation for a property dispute case',
          time: '1 hour ago',
          read: false,
          icon: MessageSquare
        },
        {
          id: 2,
          type: 'document',
          title: 'Document Review Required',
          message: 'A legal notice draft requires your review and approval',
          time: '3 hours ago',
          read: false,
          icon: FileText
        },
        {
          id: 3,
          type: 'consultation',
          title: 'Consultation Scheduled',
          message: 'You have a video consultation with Priya Patel at 4:00 PM today',
          time: '1 day ago',
          read: true,
          icon: Calendar
        },
        {
          id: 4,
          type: 'payment',
          title: 'Payment Received',
          message: 'You have received a payment of ₹5,000 for consultation services',
          time: '2 days ago',
          read: true,
          icon: CheckCircle
        }
      ];
    } else if (userType === 'admin') {
      return [
        {
          id: 1,
          type: 'system',
          title: 'System Alert',
          message: 'High traffic detected on the platform. Server resources at 80%',
          time: '30 minutes ago',
          read: false,
          icon: Bell
        },
        {
          id: 2,
          type: 'user',
          title: 'New User Registrations',
          message: '15 new users have registered in the last 24 hours',
          time: '2 hours ago',
          read: false,
          icon: CheckCircle
        },
        {
          id: 3,
          type: 'lawyer',
          title: 'Lawyer Verification Pending',
          message: '3 lawyer profiles are awaiting verification and approval',
          time: '1 day ago',
          read: true,
          icon: FileText
        },
        {
          id: 4,
          type: 'report',
          title: 'Weekly Report Ready',
          message: 'The platform usage and analytics report for last week is ready',
          time: '2 days ago',
          read: true,
          icon: Calendar
        }
      ];
    } else {
      return [];
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="fixed top-20 right-6 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative bg-white border border-gray-200 p-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
      >
        <Bell className="w-6 h-6 text-black" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-16 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold font-serif text-black">
              {t.notifications.title}
            </h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  {t.notifications.markAllRead}
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-sans">{t.notifications.noNotifications}</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      notification.type === 'document' ? 'bg-green-100' :
                      notification.type === 'consultation' ? 'bg-blue-100' :
                      notification.type === 'message' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      <notification.icon className={`w-4 h-4 ${
                        notification.type === 'document' ? 'text-green-600' :
                        notification.type === 'consultation' ? 'text-blue-600' :
                        notification.type === 'message' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          !notification.read ? 'text-black font-bold' : 'text-gray-800'
                        }`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-3 border-t border-gray-200 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800 font-sans">
              {t.notifications.viewAll}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { NotificationBell };
export default NotificationBell;