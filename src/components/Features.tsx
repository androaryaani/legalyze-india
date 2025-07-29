import React from 'react';
import { MessageSquare, FileText, AlertTriangle, Eye, Users, Search, Database, Shield } from 'lucide-react';

interface FeaturesProps {
  t: any;
}

const Features: React.FC<FeaturesProps> = ({ t }) => {
  const features = [
    { icon: MessageSquare, title: t.features.aiChat.title, description: t.features.aiChat.description + " (Hinglish Support)" },
    { icon: FileText, title: t.features.legalNotice.title, description: t.features.legalNotice.description },
    { icon: AlertTriangle, title: t.features.fir.title, description: t.features.fir.description },
    { icon: Eye, title: t.features.rti.title, description: t.features.rti.description + " with DigiLocker" },
    { icon: Users, title: t.features.consultation.title, description: t.features.consultation.description },
    { icon: Search, title: t.features.tracking.title, description: t.features.tracking.description },
    { icon: Database, title: "DigiLocker Integration", description: "Fetch your government documents automatically" },
    { icon: Shield, title: "Personal Legal Profile", description: "AI knows your complete legal history and case status" }
    { icon: Database, title: "DigiLocker Integration", description: "Fetch your government documents automatically" },
    { icon: Shield, title: "Personal Legal Profile", description: "AI knows your complete legal history and case status" }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            {t.features.heading}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
            >
              <feature.icon className="w-12 h-12 text-black mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold font-serif text-black mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 font-sans leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;