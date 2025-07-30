import React from 'react';
import { Shield, X } from 'lucide-react';

interface CookieConsentProps {
  t: any;
  onAccept: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ t, onAccept }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-white flex-shrink-0" />
          <div>
            <p className="font-sans text-sm md:text-base">
              {t.cookies.message}
            </p>
            <a 
              href="#privacy" 
              className="text-blue-300 hover:text-blue-200 text-sm underline"
            >
              {t.cookies.readPolicy}
            </a>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={onAccept}
            className="bg-white text-black px-6 py-2 rounded-lg font-sans font-medium hover:bg-gray-100 transition-colors"
          >
            {t.cookies.accept}
          </button>
          <button
            onClick={onAccept}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export { CookieConsent };
export default CookieConsent;