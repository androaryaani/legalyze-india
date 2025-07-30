import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, User, Lock, Eye, EyeOff } from 'lucide-react';
import { translations } from '../utils/translations';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Get language preference from localStorage
  const language = useState<'en' | 'hi'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'hi') ? savedLanguage : 'en';
  });
  
  // Get translations based on language
  const t = translations[language[0]];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Email or password is invalid');
      }
    } catch (err) {
      setError('An error occurred while logging in. Please try again later.');
      console.error('Login error:', err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center"
          >
            <img 
              src="/Screenshot_2025-07-29_184828-removebg-preview.png" 
              alt="Legalyze Logo" 
              className="h-20 w-auto"
            />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 font-serif">
            {language === 'en' ? 'Sign in to your account' : 'अपने अकाउंट में साइन इन करें'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {language === 'en' ? 'Access your legal dashboard' : 'अपना कानूनी डैशबोर्ड एक्सेस करें'}
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Email Address' : 'ईमेल पता'}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder={language === 'en' ? 'Enter your email' : 'अपना ईमेल दर्ज करें'}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Password' : 'पासवर्ड'}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder={language === 'en' ? 'Enter your password' : 'अपना पासवर्ड दर्ज करें'}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md"
                >
                  {error}
                </motion.div>
              )}

              <div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    language === 'en' ? 'Sign In' : 'साइन इन करें'
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          {/* Test Credentials */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 p-6 rounded-xl border border-blue-100"
          >
            <h3 className="text-sm font-medium text-blue-800 mb-3">{language === 'en' ? 'Test Credentials:' : 'टेस्ट क्रेडेंशियल्स:'}</h3>
            <div className="text-xs text-blue-700 space-y-2">
              <div className="p-2 bg-white rounded-md"><strong>{language === 'en' ? 'User:' : 'उपयोगकर्ता:'}</strong> test_user@legalyze.in / user123</div>
              <div className="p-2 bg-white rounded-md"><strong>{language === 'en' ? 'Lawyer:' : 'वकील:'}</strong> test_lawyer@legalyze.in / lawyer123</div>
              <div className="p-2 bg-white rounded-md"><strong>{language === 'en' ? 'Admin:' : 'एडमिन:'}</strong> test_admin@legalyze.in / admin123</div>
            </div>
            <p className="mt-3 text-xs text-blue-600">* {language === 'en' ? 'These credentials are for demo purposes only' : 'ये क्रेडेंशियल्स केवल डेमो उद्देश्यों के लिए हैं'}</p>
          </motion.div>

          <div className="text-center text-sm space-y-2">
            <div>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                {language === 'en' ? 'Forgot Password?' : 'पासवर्ड भूल गए?'}
              </a>
            </div>
            <div>
              <span className="text-gray-600">{language === 'en' ? 'Don\'t have an account? ' : 'खाता नहीं है? '}</span>
              <a href="/signup" className="text-blue-600 hover:text-blue-800 transition-colors">
                {language === 'en' ? 'Sign up' : 'साइन अप करें'}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};