import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare, FileEdit, UserCheck, Download } from 'lucide-react';

interface HowItWorksProps {
  t: any;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ t }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: MessageSquare, title: t.howItWorks.step1.title, description: t.howItWorks.step1.description },
    { icon: FileEdit, title: t.howItWorks.step2.title, description: t.howItWorks.step2.description },
    { icon: UserCheck, title: t.howItWorks.step3.title, description: t.howItWorks.step3.description },
    { icon: Download, title: t.howItWorks.step4.title, description: t.howItWorks.step4.description }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            {t.howItWorks.heading}
          </h2>
        </div>

        <div className="relative bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevStep}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentStep ? 'bg-black' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="bg-white p-6 rounded-full shadow-lg">
                {React.createElement(steps[currentStep].icon, {
                  className: "w-16 h-16 text-black"
                })}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold font-serif text-black mb-4">
              Step {currentStep + 1}: {steps[currentStep].title}
            </h3>
            <p className="text-lg text-gray-700 font-sans max-w-2xl mx-auto">
              {steps[currentStep].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;