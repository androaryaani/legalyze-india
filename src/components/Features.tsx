import React from 'react';
import { MessageSquare, FileText, AlertTriangle, Eye, Users, Search, Database, Shield, Video } from 'lucide-react';

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
      { icon: Database, title: "DigiLocker Integration", description: "Secure access to your government documents with one-click authentication" },
      { icon: Shield, title: "Data Security", description: "End-to-end encryption for all your legal documents and communications" },
    ];

    const userFeatures = [
      { icon: MessageSquare, title: t.features.aiChat.title, description: t.features.aiChat.description + " (Hinglish Support)" },
      { icon: FileText, title: t.features.legalNotice.title, description: t.features.legalNotice.description + " with lawyer verification" },
      { icon: AlertTriangle, title: t.features.fir.title, description: t.features.fir.description + " with step-by-step guidance" },
      { icon: Eye, title: t.features.rti.title, description: t.features.rti.description + " with DigiLocker integration" },
      { icon: Users, title: t.features.consultation.title, description: t.features.consultation.description + " via video, phone, or in-person" },
      { icon: Search, title: t.features.tracking.title, description: t.features.tracking.description + " with real-time updates" },
      { icon: Database, title: "DigiLocker Integration", description: "Fetch your government documents automatically and use them in legal filings" },
      { icon: Shield, title: "Personal Legal Profile", description: "AI remembers your complete legal history and case status for personalized assistance" }
    ];

    const lawyerFeatures = [
      { icon: MessageSquare, title: "Client Communication", description: "Chat with your clients securely with end-to-end encryption" },
      { icon: FileText, title: "Legal Document Templates", description: "Access and customize 100+ legal document templates for clients" },
      { icon: Users, title: "Consultation Management", description: "Schedule and manage client consultations with automated reminders" },
      { icon: Search, title: "Case Tracking", description: "Track all your ongoing cases with deadline notifications and status updates" },
      { icon: Shield, title: "Professional Profile", description: "Showcase your expertise, experience, and client reviews to attract more clients" },
      { icon: Database, title: "Document Management", description: "Store, organize, and share legal documents securely with clients" },
      { icon: Video, title: "Video Consultations", description: "Conduct secure video consultations with screen sharing and recording" }
    ];

    const adminFeatures = [
      { icon: Users, title: "User Management", description: "Manage all users, lawyers, and admins with role-based access control" },
      { icon: Shield, title: "Platform Security", description: "Monitor and ensure platform security with audit logs and threat detection" },
      { icon: Database, title: "Data Management", description: "Manage all platform data with automated backups and disaster recovery" },
      { icon: Search, title: "Analytics Dashboard", description: "Track platform usage, performance, and user engagement with detailed reports" },
      { icon: FileText, title: "Content Management", description: "Manage legal templates, articles, and resources across the platform" },
      { icon: MessageSquare, title: "Support System", description: "Handle user queries and issues through an integrated ticketing system" }
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
          <p className="text-lg text-gray-700 font-sans max-w-2xl mx-auto mb-8">
            {userType === 'main' ? "Explore our comprehensive legal solutions powered by AI and verified by lawyers" :
             userType === 'user' ? "Access powerful tools to manage your legal needs efficiently" :
             userType === 'lawyer' ? "Powerful tools to enhance your legal practice and client management" :
             "Comprehensive tools to manage and monitor the entire platform"}
          </p>
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