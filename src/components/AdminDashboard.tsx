import React from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Shield, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  const systemStats = [
    { title: 'Total Users', value: '2,847', icon: Users, change: '+12%' },
    { title: 'Active Lawyers', value: '156', icon: Shield, change: '+8%' },
    { title: 'Documents Created', value: '12,543', icon: FileText, change: '+24%' },
    { title: 'Revenue', value: '₹5,67,890', icon: TrendingUp, change: '+18%' },
  ];

  const recentActivities = [
    { id: '1', type: 'user_registration', message: 'New user registered: john.doe@email.com', time: '5 minutes ago' },
    { id: '2', type: 'document_created', message: 'Legal notice created by user ID: 2847', time: '12 minutes ago' },
    { id: '3', type: 'lawyer_verification', message: 'Lawyer profile verified: Adv. Priya Sharma', time: '1 hour ago' },
    { id: '4', type: 'subscription', message: 'Premium subscription activated for user: rahul.singh@email.com', time: '2 hours ago' },
  ];

  const pendingReviews = [
    { id: '1', type: 'Lawyer Application', name: 'Adv. Rajesh Kumar', status: 'pending' },
    { id: '2', type: 'Content Report', name: 'Inappropriate AI Response', status: 'urgent' },
    { id: '3', type: 'User Complaint', name: 'Document Quality Issue', status: 'pending' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">System overview and management tools</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {systemStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-black">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change} this month</p>
              </div>
              <stat.icon className="w-8 h-8 text-gray-600" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Pending Reviews */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md border border-gray-200"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Pending Reviews</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {review.status === 'urgent' ? (
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-yellow-500" />
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{review.type}</h4>
                      <p className="text-sm text-gray-600">{review.name}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs hover:bg-green-200 transition-colors">
                      Approve
                    </button>
                    <button className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* System Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">System Controls</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <button className="bg-blue-100 text-blue-700 p-4 rounded-lg hover:bg-blue-200 transition-colors">
              <Users className="w-6 h-6 mb-2" />
              <span className="block font-medium">Manage Users</span>
            </button>
            <button className="bg-green-100 text-green-700 p-4 rounded-lg hover:bg-green-200 transition-colors">
              <Shield className="w-6 h-6 mb-2" />
              <span className="block font-medium">Lawyer Verification</span>
            </button>
            <button className="bg-yellow-100 text-yellow-700 p-4 rounded-lg hover:bg-yellow-200 transition-colors">
              <FileText className="w-6 h-6 mb-2" />
              <span className="block font-medium">Content Moderation</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};