import React from 'react';
import { ArrowRight, MessageSquare, Shield, FileText } from 'lucide-react';

interface HeroProps {
  t: any;
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  const handleStartQuery = () => {
    // Scroll to chat or open chat interface
    document.querySelector('#floating-chat')?.click();
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold font-serif text-black leading-tight">
              {t.hero.heading}
            </h1>
            <p className="text-lg text-gray-800 font-sans leading-relaxed">
              {t.hero.subtext}
            </p>
            <button
              onClick={handleStartQuery}
              className="group bg-black text-white px-8 py-4 rounded-lg font-sans font-medium text-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>{t.hero.cta}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="relative animate-fade-in-right">
            <div className="bg-gray-50 rounded-2xl p-12 relative overflow-hidden">
              <div className="grid grid-cols-3 gap-6 items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                  <img 
                    src="/Screenshot_2025-07-29_184828-removebg-preview copy.png" 
                    alt="Legalyze Logo" 
                    className="w-16 h-16"
                  />
                  <img 
                    src="/Screenshot_2025-07-29_184828-removebg-preview copy.png" 
                    alt="Legalyze Logo" 
                    className="w-16 h-16"
                  />
                  <span className="text-sm font-serif text-center">Legal Bridge</span>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <MessageSquare className="w-16 h-16 text-black" />
                  <span className="text-sm font-serif text-center">AI Friend</span>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <FileText className="w-16 h-16 text-black" />
                  <span className="text-sm font-serif text-center">DigiLocker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;