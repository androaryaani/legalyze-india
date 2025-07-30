// App.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { Dashboard } from './components/Dashboard';
import { FAQ } from './components/FAQ';
import { LawyerCTA } from './components/LawyerCTA';
import { Footer } from './components/Footer';
import { FloatingChat } from './components/FloatingChat';
import { LawyerProfiles } from './components/LawyerProfiles';
import { ConsultationCalendar } from './components/ConsultationCalendar';
import { Templates } from './components/Templates';
import { NotificationBell } from './components/NotificationBell';
import { CookieConsent } from './components/CookieConsent';
import { ToastNotification } from './components/ToastNotification';
import { VisitingCard } from './components/VisitingCard';
import { DigiLockerIntegration } from './components/DigiLockerIntegration';
import { IntelligentAI } from './components/IntelligentAI';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { translations } from './utils/translations';
import { useAuth } from './utils/AuthContext';
import { CreateTestUsers } from './utils/CreateTestUsers';
import { UserRole } from './types';

// Import new components for database schema
import { CaseManagement } from './components/CaseManagement';
import { SpecializationManagement } from './components/SpecializationManagement';
import { ConversationManager } from './components/ConversationManager';
import { LawyerDashboard } from './components/LawyerDashboard';
import { UserDashboard } from './components/UserDashboard';
import { AdminDashboard } from './components/AdminDashboard';

// Define a type that extends UserRole to include 'main' for non-logged in users
type UserType = UserRole | 'main';

// Main App component
function App() {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguage] = useState<'en' | 'hi'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'hi') ? savedLanguage : 'en';
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const { user, logout } = useAuth();
  
  // Determine user type based on auth context
  const userType: UserType = user ? (user.role as UserType) : 'main';
  const isLoggedIn = !!user;

  useEffect(() => {
    // Check if cookie consent was given
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      setShowCookieConsent(false);
    }
    
    // Check if terms were accepted
    if (!localStorage.getItem('termsAccepted')) {
      alert('Welcome to Legalyze India - A government legal app that connects you with real lawyers. By using this application, you agree to our terms and conditions.');
      localStorage.setItem('termsAccepted', 'true');
    }
  }, []);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Function to handle logout
  const handleLogout = () => {
    logout();
  };

  // Save language preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = translations[language];

  return (
    <div className="min-h-screen bg-white text-black">
      <Header 
        language={language} 
        setLanguage={setLanguage}
        t={t}
        isLoggedIn={isLoggedIn}
        userType={userType}
        onLogout={handleLogout}
      />
      <CreateTestUsers />
      {isLoggedIn && <NotificationBell t={t} isLoggedIn={isLoggedIn} userType={userType} />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={isLoggedIn ? (
          userType === 'user' ? <Navigate to="/user-dashboard" /> :
          userType === 'lawyer' ? <Navigate to="/lawyer-dashboard" /> :
          userType === 'admin' ? <Navigate to="/admin-dashboard" /> :
          <Dashboard t={t} />
        ) : <Dashboard t={t} />} />
        
        {/* New routes for database schema components */}
        <Route path="/user-dashboard" element={
          isLoggedIn && userType === 'user' ? 
            <UserDashboard t={t} showToast={showToastMessage} /> : 
            <Navigate to="/login" />
        } />
        <Route path="/lawyer-dashboard" element={
          isLoggedIn && userType === 'lawyer' ? 
            <LawyerDashboard t={t} showToast={showToastMessage} /> : 
            <Navigate to="/login" />
        } />
        <Route path="/admin-dashboard" element={
          isLoggedIn && userType === 'admin' ? 
            <AdminDashboard t={t} showToast={showToastMessage} /> : 
            <Navigate to="/login" />
        } />
        <Route path="/cases" element={
          isLoggedIn ? 
            <CaseManagement t={t} showToast={showToastMessage} /> : 
            <Navigate to="/login" />
        } />
        <Route path="/specializations" element={
          isLoggedIn && (userType === 'lawyer' || userType === 'admin') ? 
            <SpecializationManagement t={t} showToast={showToastMessage} /> : 
            <Navigate to="/login" />
        } />
        <Route path="/messages" element={
          isLoggedIn ? 
            <ConversationManager t={t} showToast={showToastMessage} /> : 
            <Navigate to="/login" />
        } />
        <Route path="/" element={
          <>
            {/* Visible to all users */}
            <Hero t={t} />
            
            {/* Visible to main and user */}
            {(userType === 'main' || userType === 'user') && (
              <>
                <Features t={t} userType={userType} />
                <HowItWorks t={t} />
                <LawyerProfiles t={t} />
                <ConsultationCalendar t={t} isLoggedIn={isLoggedIn} />
                <FAQ t={t} />
                <LawyerCTA t={t} />
              </>
            )}
            
            {/* Visible only to logged-in users */}
            {isLoggedIn && userType === 'user' && (
              <>
                <IntelligentAI t={t} isLoggedIn={isLoggedIn} userType={userType} />
                <DigiLockerIntegration t={t} isLoggedIn={isLoggedIn} userType={userType} />
                <div className="mt-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">{t.userDashboard.title}</h2>
                  <div className="flex justify-center space-x-4">
                    <a href="/user-dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      {t.userDashboard.goToDashboard}
                    </a>
                    <a href="/cases" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      {t.caseManagement.manageCases}
                    </a>
                    <a href="/messages" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                      {t.conversationManager.messages}
                    </a>
                  </div>
                </div>
              </>
            )}
            
            {/* Visible only to lawyers */}
            {isLoggedIn && userType === 'lawyer' && (
              <>
                <Templates t={t} showToast={showToastMessage} />
                <div className="mt-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">{t.lawyerDashboard.title}</h2>
                  <div className="flex justify-center space-x-4">
                    <a href="/lawyer-dashboard" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      {t.lawyerDashboard.goToDashboard}
                    </a>
                    <a href="/cases" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      {t.caseManagement.manageCases}
                    </a>
                    <a href="/specializations" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                      {t.specializationManagement.manageSpecializations}
                    </a>
                    <a href="/messages" className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                      {t.conversationManager.messages}
                    </a>
                  </div>
                </div>
              </>
            )}
            
            {/* Visible only to admins */}
            {isLoggedIn && userType === 'admin' && (
              <>
                <div className="mt-8 text-center">
                  <h2 className="text-2xl font-bold mb-4">{t.adminDashboard.title}</h2>
                  <div className="flex justify-center space-x-4">
                    <a href="/admin-dashboard" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors">
                      {t.adminDashboard.goToDashboard}
                    </a>
                    <a href="/cases" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                      {t.caseManagement.manageCases}
                    </a>
                    <a href="/specializations" className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                      {t.specializationManagement.manageSpecializations}
                    </a>
                  </div>
                </div>
              </>
            )}
            
            {/* Visible to main, user, and lawyer */}
            {(userType === 'main' || userType === 'user' || userType === 'lawyer') && (
              <VisitingCard t={t} />
            )}
          </>
        } />
      </Routes>
      
      <Footer t={t} />
      <FloatingChat t={t} showToast={showToastMessage} userType={userType} />
      {showToast && <ToastNotification message={toastMessage} />}
      {showCookieConsent && (
        <CookieConsent 
          t={t} 
          onAccept={() => {
            localStorage.setItem('cookieConsent', 'true');
            setShowCookieConsent(false);
          }}
        />
      )}
    </div>
  );
}

export default App;