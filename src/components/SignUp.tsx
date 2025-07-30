import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, User, Lock, Eye, EyeOff, Mail, UserPlus, Briefcase, ShieldCheck } from 'lucide-react';
// Using AuthContext for signup functionality
import { translations } from '../utils/translations';
import { UserRole } from '../types';

// SignUp component

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('user');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Get language preference from localStorage
  const [language, setLanguage] = useState<'en' | 'hi'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'hi') ? savedLanguage : 'en';
  });
  
  // Get translations based on language
  const t = translations[language];

  // Function to toggle language
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!email || !password || !confirmPassword || !name) {
      setError(language === 'en' ? 'All fields are required' : 'सभी फील्ड आवश्यक हैं');
      return;
    }

    if (password !== confirmPassword) {
      setError(language === 'en' ? 'Passwords do not match' : 'पासवर्ड मेल नहीं खाते');
      return;
    }

    if (password.length < 6) {
      setError(language === 'en' ? 'Password must be at least 6 characters' : 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए');
      return;
    }
    
    // Set role based on email for test accounts
    if (email === 'test_user@legalyze.in') {
      setRole('user');
    } else if (email === 'test_lawyer@legalyze.in') {
      setRole('lawyer');
    } else if (email === 'test_admin@legalyze.in') {
      setRole('admin');
    }

    try {
      const success = await signup(email, password, name, role);
      if (success) {
        navigate(`/${role === 'user' ? 'dashboard' : role === 'lawyer' ? 'lawyer-dashboard' : 'admin-dashboard'}`);
      } else {
        // Check if the issue might be with Firebase setup
        setError(language === 'en' ? 
          'Make sure you have set up Firebase Authentication in the Firebase Console' : 
          'सुनिश्चित करें कि आपने फायरबेस कंसोल में फायरबेस ऑथेंटिकेशन सेटअप किया है');
      }
    } catch (err: any) {
      console.error('Signup error:', err.code, err.message);
      if (err.code === 'auth/email-already-in-use') {
        setError(language === 'en' ? 'Email is already in use' : 'ईमेल पहले से उपयोग में है');
      } else if (err.code === 'auth/invalid-email') {
        setError(language === 'en' ? 'Invalid email address' : 'अमान्य ईमेल पता');
      } else if (err.code === 'auth/weak-password') {
        setError(language === 'en' ? 'Password is too weak' : 'पासवर्ड बहुत कमजोर है');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError(language === 'en' ? 
          'Email/password accounts are not enabled. Enable them in the Firebase Console, under the Auth section.' : 
          'ईमेल/पासवर्ड अकाउंट सक्षम नहीं हैं। उन्हें फायरबेस कंसोल के Auth सेक्शन में सक्षम करें।');
      } else if (err.code === 'auth/network-request-failed') {
        setError(language === 'en' ? 
          'Network error. Please check your internet connection.' : 
          'नेटवर्क त्रुटि। कृपया अपने इंटरनेट कनेक्शन की जांच करें।');
      } else {
        setError(language === 'en' ? 
          'An error occurred during sign up. Please try again later.' : 
          'साइन अप के दौरान एक त्रुटि हुई। कृपया बाद में पुन: प्रयास करें।');
      }
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
              src="/WhatsApp Image 2025-07-29 at 18.53.29_2c712bb9.jpg" 
              alt="Legalyze Logo" 
              className="h-20 w-auto"
            />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 font-serif">
            {language === 'en' ? 'Create your account' : 'अपना खाता बनाएं'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {language === 'en' ? 'Join the Legalyze platform' : 'लीगलाइज़ प्लेटफॉर्म से जुड़ें'}
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Full Name' : 'पूरा नाम'}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder={language === 'en' ? 'Enter your full name' : 'अपना पूरा नाम दर्ज करें'}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Email Address' : 'ईमेल पता'}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
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
                    autoComplete="new-password"
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
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Confirm Password' : 'पासवर्ड की पुष्टि करें'}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                    placeholder={language === 'en' ? 'Confirm your password' : 'अपने पासवर्ड की पुष्टि करें'}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {language === 'en' ? 'Select Role' : 'भूमिका चुनें'}
                </label>
                <div className="mt-2 flex space-x-4">
                  <div 
                    className={`flex items-center p-2 border rounded-lg cursor-pointer ${role === 'user' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}
                    onClick={() => setRole('user')}
                  >
                    <User className="w-5 h-5 mr-2 text-gray-700" />
                    <span>{language === 'en' ? 'User' : 'उपयोगकर्ता'}</span>
                  </div>
                  <div 
                    className={`flex items-center p-2 border rounded-lg cursor-pointer ${role === 'lawyer' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}
                    onClick={() => setRole('lawyer')}
                  >
                    <Briefcase className="w-5 h-5 mr-2 text-gray-700" />
                    <span>{language === 'en' ? 'Lawyer' : 'वकील'}</span>
                  </div>
                  <div 
                    className={`flex items-center p-2 border rounded-lg cursor-pointer ${role === 'admin' ? 'bg-blue-50 border-blue-500' : 'border-gray-300'}`}
                    onClick={() => setRole('admin')}
                  >
                    <ShieldCheck className="w-5 h-5 mr-2 text-gray-700" />
                    <span>{language === 'en' ? 'Admin' : 'प्रशासक'}</span>
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
                    <>
                      <UserPlus className="w-5 h-5 mr-2" />
                      {language === 'en' ? 'Sign Up' : 'साइन अप करें'}
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          <div className="text-center text-sm">
            <p className="text-gray-600">
              {language === 'en' ? 'Already have an account?' : 'पहले से ही खाता है?'}{' '}
              <a href="/login" className="text-blue-600 hover:text-blue-800 transition-colors">
                {language === 'en' ? 'Sign in' : 'साइन इन करें'}
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};