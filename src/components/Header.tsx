import React, { useState, useEffect } from 'react';
import { Globe, Menu, X } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  t: any;
  isLoggedIn: boolean;
  userType?: 'main' | 'user' | 'admin' | 'lawyer';
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, t, isLoggedIn, userType = 'main', onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.header.nav.home, href: '/' },
    { label: t.header.nav.features, href: '/#features' },
    { label: t.header.nav.lawyers, href: '/#lawyers' },
    { label: t.header.nav.templates, href: '/#templates' },
    { label: t.header.nav.about, href: '/#about' }
  ];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/Screenshot_2025-07-29_184828-removebg-preview copy.png" 
            alt="Legalyze-India Logo" 
            className="w-14 h-14"
          />
          <div>
            <h1 className="text-2xl font-bold font-serif text-black">
              {t.header.title}
            </h1>
            <p className="text-xs text-gray-600 font-sans">
              {t.header.tagline}
            </p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className="text-black hover:text-gray-600 transition-colors font-sans"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <div className="hidden lg:flex space-x-2">
            {isLoggedIn ? (
              <>
                <span className="text-black px-4 py-2 rounded text-sm font-sans">
                  {userType === 'user' ? 'User' : userType === 'admin' ? 'Admin' : 'Lawyer'}
                </span>
                <button 
                  onClick={onLogout} 
                  className="bg-black text-white px-4 py-2 rounded text-sm font-sans hover:scale-105 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="bg-black text-white px-4 py-2 rounded text-sm font-sans hover:scale-105 transition-all inline-block">
                  {t.header.signIn}
                </a>
                <a href="/signup" className="border border-black text-black px-4 py-2 rounded text-sm font-sans hover:scale-105 transition-all inline-block">
                  {t.header.signUp}
                </a>
              </>
            )}
          </div>
          <Globe className="w-4 h-4 text-black" />
          <select
            value={language}
            onChange={(e) => {
              const newLang = e.target.value as 'en' | 'hi';
              // Save language preference to localStorage
              localStorage.setItem('language', newLang);
              setLanguage(newLang);
            }}
            className="bg-transparent border border-black text-black px-3 py-1 rounded text-sm font-sans focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-black"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="px-4 py-4 space-y-4">
            {navItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="block text-black hover:text-gray-600 transition-colors font-sans py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="space-y-2">
              {isLoggedIn ? (
                <>
                  <span className="block text-black px-4 py-2 text-sm font-sans">
                    {userType === 'user' ? 'User' : userType === 'admin' ? 'Admin' : 'Lawyer'}
                  </span>
                  <button 
                    onClick={onLogout} 
                    className="w-full bg-black text-white px-4 py-2 rounded text-sm font-sans hover:scale-105 transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a href="/login" className="block w-full bg-black text-white px-4 py-2 rounded text-sm font-sans hover:scale-105 transition-all text-center">
                    {t.header.signIn}
                  </a>
                  <a href="/signup" className="block w-full border border-black text-black px-4 py-2 rounded text-sm font-sans hover:scale-105 transition-all text-center">
                    {t.header.signUp}
                  </a>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export { Header };