import React from 'react';
import { MessageSquare, FileText, AlertTriangle, Eye, Users, Search, Database, Shield } from 'lucide-react';

interface FeaturesProps {
  t: any;
  userType?: 'main' | 'user' | 'admin' | 'lawyer';
}

const Features: React.FC<FeaturesProps> = ({ t, userType = 'main' }) => {
  // Define features based on user type
  const getFeaturesByUserType = () => {
    const commonFeatures = [
      { icon: Users, title: t.features.consultation.title, description: t.features.consultation.description },
      { icon: Search, title: t.features.tracking.title, description: t.features.tracking.description },
    ];

    const mainFeatures = [
      ...commonFeatures,
      { icon: FileText, title: t.features.legalNotice.title, description: t.features.legalNotice.description },
      { icon: AlertTriangle, title: t.features.fir.title, description: t.features.fir.description },
      { icon: Eye, title: t.features.rti.title, description: t.features.rti.description + " with DigiLocker" },
      { icon: Database, title: "How DigiLocker Integration Helps", description: "Secure access to your government documents" },
    ];

    const userFeatures = [
      { icon: MessageSquare, title: t.features.aiChat.title, description: t.features.aiChat.description + " (Hinglish Support)" },
      { icon: FileText, title: t.features.legalNotice.title, description: t.features.legalNotice.description },
      { icon: AlertTriangle, title: t.features.fir.title, description: t.features.fir.description },
      { icon: Eye, title: t.features.rti.title, description: t.features.rti.description + " with DigiLocker" },
      { icon: Users, title: t.features.consultation.title, description: t.features.consultation.description },
      { icon: Search, title: t.features.tracking.title, description: t.features.tracking.description },
      { icon: Database, title: "DigiLocker Integration", description: "Fetch your government documents automatically" },
      { icon: Shield, title: "Personal Legal Profile", description: "AI knows your complete legal history and case status" }
    ];

    const lawyerFeatures = [
      { icon: MessageSquare, title: "Client Communication", description: "Chat with your clients securely" },
      { icon: FileText, title: "Legal Document Templates", description: "Create and customize legal documents for clients" },
      { icon: Users, title: "Consultation Management", description: "Schedule and manage client consultations" },
      { icon: Search, title: "Case Tracking", description: "Track all your ongoing cases in one place" },
      { icon: Shield, title: "Professional Profile", description: "Showcase your expertise and experience" }
    ];

    const adminFeatures = [
      { icon: Users, title: "User Management", description: "Manage all users, lawyers, and admins" },
      { icon: Shield, title: "Platform Security", description: "Monitor and ensure platform security" },
      { icon: Database, title: "Data Management", description: "Manage all platform data and backups" },
      { icon: Search, title: "Analytics Dashboard", description: "Track platform usage and performance" }
    ];

    switch (userType) {
      case 'user':
        return userFeatures;
      case 'lawyer':
        return lawyerFeatures;
      case 'admin':
        return adminFeatures;
      default:
        return mainFeatures;
    }
  };

  const features = getFeaturesByUserType();

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            {userType === 'main' || userType === 'user' ? t.features.heading : 
             userType === 'lawyer' ? "What You Can Do As A Lawyer" : 
             "Admin Dashboard Features"}
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

export { Features };