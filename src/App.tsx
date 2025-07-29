import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Dashboard from './components/Dashboard';
import FAQ from './components/FAQ';
import LawyerCTA from './components/LawyerCTA';
import Footer from './components/Footer';
import FloatingChat from './components/FloatingChat';
import LawyerProfiles from './components/LawyerProfiles';
import ConsultationCalendar from './components/ConsultationCalendar';
import Templates from './components/Templates';
import NotificationBell from './components/NotificationBell';
import CookieConsent from './components/CookieConsent';
import ToastNotification from './components/ToastNotification';
import VisitingCard from './components/VisitingCard';
import DigiLockerIntegration from './components/DigiLockerIntegration';
import IntelligentAI from './components/IntelligentAI';
import VisitingCard from './components/VisitingCard';
import DigiLockerIntegration from './components/DigiLockerIntegration';
import IntelligentAI from './components/IntelligentAI';
import { translations } from './utils/translations';

function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  useEffect(() => {
    // Simulate checking login status
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    
    // Check if cookie consent was given
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (cookieConsent) {
      setShowCookieConsent(false);
    }
  }, []);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-white text-black">
      <Header 
        language={language} 
        setLanguage={setLanguage}
        t={t}
        isLoggedIn={isLoggedIn}
      />
      <NotificationBell t={t} isLoggedIn={isLoggedIn} />
      <Hero t={t} />
      <Features t={t} />
      <HowItWorks t={t} />
      <Dashboard isLoggedIn={isLoggedIn} t={t} />
      <Templates t={t} showToast={showToastMessage} />
      <LawyerProfiles t={t} />
      <ConsultationCalendar t={t} isLoggedIn={isLoggedIn} />
      <IntelligentAI t={t} isLoggedIn={isLoggedIn} />
      <DigiLockerIntegration t={t} isLoggedIn={isLoggedIn} />
      <IntelligentAI t={t} isLoggedIn={isLoggedIn} />
      <DigiLockerIntegration t={t} isLoggedIn={isLoggedIn} />
      <FAQ t={t} />
      <VisitingCard t={t} />
      <VisitingCard t={t} />
      <LawyerCTA t={t} />
      <Footer t={t} />
      <FloatingChat t={t} showToast={showToastMessage} />
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