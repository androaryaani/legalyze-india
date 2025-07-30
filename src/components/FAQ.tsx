import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQProps {
  t: any;
}

const FAQ: React.FC<FAQProps> = ({ t }) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    { question: t.faq.q1.question, answer: t.faq.q1.answer },
    { question: t.faq.q2.question, answer: t.faq.q2.answer },
    { question: t.faq.q3.question, answer: t.faq.q3.answer },
    { question: t.faq.q4.question, answer: t.faq.q4.answer },
    { question: t.faq.q5.question, answer: t.faq.q5.answer },
    { question: t.faq.q6.question, answer: t.faq.q6.answer }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            {t.faq.heading}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <span className="text-lg font-serif text-black font-medium">
                  {faq.question}
                </span>
                {expandedItems.includes(index) ? (
                  <Minus className="w-5 h-5 text-black flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-black flex-shrink-0" />
                )}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                expandedItems.includes(index) ? 'max-h-96' : 'max-h-0'
              }`}>
                <div className="px-6 pb-4 text-gray-700 font-sans leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FAQ };