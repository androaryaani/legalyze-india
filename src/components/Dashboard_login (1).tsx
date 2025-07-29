import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { UserDashboard } from '../components/dashboards/UserDashboard';
import { LawyerDashboard } from '../components/dashboards/LawyerDashboard';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Please log in to access your dashboard
          </h2>
        </motion.div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'lawyer':
        return <LawyerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <UserDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderDashboard()}
    </div>
  );
};