import React from 'react';
import { ArrowRight, MessageSquare, Shield, FileText, Scale, Gavel } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  t: {
    hero: {
      heading: string;
      subtext: string;
      cta: string;
    }
  };
}

const Hero: React.FC<HeroProps> = ({ t }) => {
  const handleStartQuery = () => {
    // Scroll to chat or open chat interface
    const chatElement = document.querySelector('#floating-chat') as HTMLElement;
    chatElement?.click();
  };
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-2">
              India's #1 Legal AI Platform with DigiLocker Integration 🇮🇳
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-serif text-black leading-tight">
              {t.hero.heading}
            </h1>
            <p className="text-lg text-gray-800 font-sans leading-relaxed">
              {t.hero.subtext}
            </p>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <div className="bg-green-100 p-1 rounded-full">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-800">{t.hero.features.encryption}</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="bg-blue-100 p-1 rounded-full">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-800">{t.hero.features.verification}</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="bg-purple-100 p-1 rounded-full">
                  <Gavel className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-800">{t.hero.features.connection}</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={handleStartQuery}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-black text-white px-8 py-4 rounded-lg font-sans font-medium text-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>{t.hero.cta}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.a 
                href="#features"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-black text-black px-8 py-4 rounded-lg font-sans font-medium text-lg transition-all duration-300 flex items-center space-x-2"
              >
                <span>View Features</span>
              </motion.a>
            </div>
            
            {/* Trust indicators */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">{t.hero.features.encryption}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Scale className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">{t.hero.features.compliance}</span>
              </div>
              <div className="flex items-center space-x-1">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">{t.hero.features.digilocker}</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl relative overflow-hidden border border-gray-100">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-3 gap-6 items-center justify-center"
              >
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                  <div className="bg-blue-50 p-4 rounded-full">
                    <img 
                      src="/WhatsApp Image 2025-07-29 at 18.53.29_2c712bb9.jpg" 
                      alt="Legalyze Logo" 
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">Legal Bridge</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                  <div className="bg-purple-50 p-4 rounded-full">
                    <MessageSquare className="w-12 h-12 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-center">AI Friend</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                  <div className="bg-green-50 p-4 rounded-full">
                    <FileText className="w-12 h-12 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-center">DigiLocker</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-full">
                    <Gavel className="w-12 h-12 text-yellow-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Legal Advice</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                  <div className="bg-red-50 p-4 rounded-full">
                    <Shield className="w-12 h-12 text-red-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Security</span>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-full">
                    <Scale className="w-12 h-12 text-indigo-600" />
                  </div>
                  <span className="text-sm font-medium text-center">Justice</span>
                </motion.div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-50 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-yellow-100 to-green-100 rounded-full opacity-50 blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export { Hero };
export default Hero;