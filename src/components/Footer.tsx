import React from 'react';
import { Mail, Phone, Shield } from 'lucide-react';

interface FooterProps {
  t: any;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/WhatsApp Image 2025-07-29 at 18.53.29_2c712bb9.jpg" 
                alt="Legalyze-India Logo" 
                className="w-12 h-12"
              />
              <h3 className="text-2xl font-bold font-serif text-black">Legalyze-India</h3>
            </div>
            <div className="space-y-3">
              <a href="#" className="block text-gray-700 hover:text-black transition-colors">
                About Legalyze-India
              </a>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors">
                {t.footer.about.story}
              </a>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors">
                {t.footer.about.mission}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold font-serif text-black mb-6">
              {t.footer.contact.title}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-black" />
                <span className="text-gray-700">{t.footer.contact.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-black" />
                <span className="text-gray-700">(91) 9414966535</span>
              </div>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors">
                {t.footer.contact.support}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold font-serif text-black mb-6">
              {t.footer.legal.title}
            </h3>
            <div className="space-y-3">
              <a href="#" className="block text-gray-700 hover:text-black transition-colors">
                {t.footer.legal.privacy}
              </a>
              <a href="#" className="block text-gray-700 hover:text-black transition-colors">
                {t.footer.legal.terms}
              </a>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-black" />
                <span className="text-gray-700 text-sm">{t.footer.legal.compliance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 text-center">
          <p className="text-gray-500 text-xs font-sans">
            © {new Date().getFullYear()} Legalyze-India. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };