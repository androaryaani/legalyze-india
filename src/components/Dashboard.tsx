import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../utils/AuthContext';
import { UserDashboard } from './dashboards/UserDashboard';
import { LawyerDashboard } from './dashboards/LawyerDashboard';
import { AdminDashboard } from './dashboards/AdminDashboard';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../utils/translations';

interface DashboardProps {
  t: any;
}

const Dashboard: React.FC<DashboardProps> = ({ t }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const isLoggedIn = !!user;
  
  // Get language preference from localStorage
  const [language, setLanguage] = useState<'en' | 'hi'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'hi') ? savedLanguage : 'en';
  });
  
  // Get translations based on language
  const localT = translations[language];
  
  const handleLogin = () => {
    navigate('/login');
  };

  const renderDashboard = () => {
    if (!user) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'en' ? (t.dashboard.loginRequired || 'Please log in to access your dashboard') : 'डैशबोर्ड तक पहुंचने के लिए कृपया लॉगिन करें'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'en' ? (t.dashboard.loginMessage || 'You need to login to access the dashboard') : 'डैशबोर्ड तक पहुंचने के लिए आपको लॉगिन करना होगा'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              {language === 'en' ? (t.dashboard.loginButton || 'Login') : 'लॉगिन करें'}
            </motion.button>
          </motion.div>
        </div>
      );
    }

    switch (user.role) {
      case 'lawyer':
        return <LawyerDashboard t={localT} showToast={(msg: string) => alert(msg)} />;
      case 'admin':
        return <AdminDashboard t={localT} showToast={(msg: string) => alert(msg)} />;
      default:
        return <UserDashboard t={localT} showToast={(msg: string) => alert(msg)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderDashboard()}
    </div>
  );
};

export { Dashboard };
export default Dashboard;