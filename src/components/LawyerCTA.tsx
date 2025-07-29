import React from 'react';
import { Phone } from 'lucide-react';

interface LawyerCTAProps {
  t: any;
}

const LawyerCTA: React.FC<LawyerCTAProps> = ({ t }) => {
  const handleBookLawyer = () => {
    alert('Lawyer booking feature would be implemented here');
  };

  return (
    <section className="bg-black text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold font-serif mb-6">
          {t.lawyerCTA.heading}
        </h2>
        <button
          onClick={handleBookLawyer}
          className="bg-white text-black px-8 py-4 rounded-lg font-sans font-medium text-lg hover:scale-105 transition-all flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl"
        >
          <Phone className="w-5 h-5" />
          <span>{t.lawyerCTA.button}</span>
        </button>
      </div>
    </section>
  );
};

export default LawyerCTA;