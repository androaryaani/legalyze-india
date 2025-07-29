import React from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface VisitingCardProps {
  t: any;
}

const VisitingCard: React.FC<VisitingCardProps> = ({ t }) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-white mb-4">
            Meet Our Founder
          </h2>
          <p className="text-lg text-gray-300 font-sans">
            Leading the digital transformation of legal services in India
          </p>
        </div>

        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Logo and Company Info */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-6">
                <img 
                  src="/Screenshot_2025-07-29_184828-removebg-preview copy.png" 
                  alt="Legalyze-India Logo" 
                  className="w-16 h-16"
                />
                <div>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    LEGALYZE INDIA
                  </h3>
                  <p className="text-sm text-yellow-400 font-sans">
                    YOUR LEGAL BRIDGE TO JUSTICE
                  </p>
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <p className="text-lg text-yellow-400 font-serif mb-2">
                  Justice for Every Indian, One Voice at a Time
                </p>
              </div>
            </div>

            {/* Founder Info */}
            <div className="text-center md:text-right">
              <h4 className="text-3xl font-bold text-white font-serif mb-2">
                Aryan Saini
              </h4>
              <p className="text-lg text-yellow-400 font-sans mb-6">
                CEO & Founder
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-end space-x-3">
                  <Globe className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">www.legalyzeindia.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-end space-x-3">
                  <Phone className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">(91) 9414966535</span>
                </div>
                <div className="flex items-center justify-center md:justify-end space-x-3">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Jaipur, Raj., India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-6 border-t border-gray-700">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h5 className="text-white font-bold mb-2">🎯 Vision</h5>
                <p className="text-gray-300 text-sm">Making legal services accessible to every Indian</p>
              </div>
              <div>
                <h5 className="text-white font-bold mb-2">🚀 Innovation</h5>
                <p className="text-gray-300 text-sm">AI-powered legal solutions with human touch</p>
              </div>
              <div>
                <h5 className="text-white font-bold mb-2">🤝 Mission</h5>
                <p className="text-gray-300 text-sm">Bridging the gap between law and common people</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitingCard;