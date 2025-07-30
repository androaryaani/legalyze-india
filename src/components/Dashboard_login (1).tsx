import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../utils/AuthContext';
import { UserDashboard } from './dashboards/UserDashboard';
import { LawyerDashboard } from './dashboards/LawyerDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  t: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ t }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const isLoggedIn = !!user;
  
  const handleLogin = () => {
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t?.dashboard?.loginRequired || 'Please log in to access your dashboard'}
          </h2>
          <p className="text-gray-600 mb-6">
            {t?.dashboard?.loginMessage || 'You need to login to access the dashboard'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            {t?.dashboard?.loginButton || 'Login'}
          </motion.button>
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