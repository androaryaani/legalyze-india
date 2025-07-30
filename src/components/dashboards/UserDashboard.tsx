import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, Upload, Download, Clock, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { useAuth } from '../../utils/AuthContext';
import { translations } from '../../utils/translations';
import { Scale } from 'lucide-react';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Get language preference from localStorage
  const [language, setLanguage] = useState<'en' | 'hi'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'hi') ? savedLanguage : 'en';
  });
  
  // Update language if localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedLanguage = localStorage.getItem('language') as 'en' | 'hi' | null;
      if (savedLanguage === 'en' || savedLanguage === 'hi') {
        setLanguage(savedLanguage);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Mock data for user dashboard
  const recentDocuments = [
    { id: 1, title: 'Legal Notice', type: 'legal_notice', status: 'pending_review', date: '2025-03-15', icon: FileText },
    { id: 2, title: 'RTI Application', type: 'rti', status: 'completed', date: '2025-03-10', icon: FileText },
    { id: 3, title: 'Property Documents', type: 'property', status: 'in_progress', date: '2025-03-05', icon: FileText },
  ];

  const upcomingConsultations = [
    { id: 1, lawyer: 'Advocate Sharma', date: '2025-03-20', time: '14:00', type: 'video', status: 'confirmed' },
    { id: 2, lawyer: 'Advocate Patel', date: '2025-03-25', time: '11:30', type: 'office', status: 'pending' },
  ];

  const caseUpdates = [
    { id: 1, title: 'Property Dispute', court: 'Delhi High Court', nextDate: '2025-04-10', status: 'hearing_scheduled' },
    { id: 2, title: 'Consumer Complaint', court: 'Consumer Forum', nextDate: '2025-03-28', status: 'documents_required' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_review':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
          {language === 'en' ? 'Pending Review' : 'समीक्षा के लिए लंबित'}
        </span>;
      case 'completed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
          {language === 'en' ? 'Completed' : 'पूर्ण'}
        </span>;
      case 'in_progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {language === 'en' ? 'In Progress' : 'प्रगति पर'}
        </span>;
      case 'confirmed':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
          {language === 'en' ? 'Confirmed' : 'पुष्टि की गई'}
        </span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
          {language === 'en' ? 'Pending' : 'लंबित'}
        </span>;
      case 'hearing_scheduled':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
          {language === 'en' ? 'Hearing Scheduled' : 'सुनवाई निर्धारित'}
        </span>;
      case 'documents_required':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
          {language === 'en' ? 'Documents Required' : 'दस्तावेज़ आवश्यक'}
        </span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">{language === 'en' ? 'Recent Documents' : 'हाल के दस्तावेज़'}</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline">{language === 'en' ? 'View All' : 'सभी देखें'}</a>
              </div>
              <div className="space-y-4">
                {recentDocuments.map(doc => (
                  <div key={doc.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <doc.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{doc.title}</h4>
                        {getStatusBadge(doc.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{doc.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">{language === 'en' ? 'Upcoming Consultations' : 'आगामी परामर्श'}</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline">{language === 'en' ? 'View All' : 'सभी देखें'}</a>
              </div>
              <div className="space-y-4">
                {upcomingConsultations.map(consultation => (
                  <div key={consultation.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{consultation.lawyer}</h4>
                        {getStatusBadge(consultation.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{consultation.date}, {consultation.time} ({consultation.type === 'video' ? (language === 'en' ? 'Video Call' : 'वीडियो कॉल') : (language === 'en' ? 'Office Visit' : 'ऑफिस विजिट')})</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">{language === 'en' ? 'Case Updates' : 'केस अपडेट'}</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline">{language === 'en' ? 'View All' : 'सभी देखें'}</a>
              </div>
              <div className="space-y-4">
                {caseUpdates.map(caseUpdate => (
                  <div key={caseUpdate.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-green-50 p-2 rounded-lg">
                      <Scale className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{caseUpdate.title}</h4>
                        {getStatusBadge(caseUpdate.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{caseUpdate.court}, {language === 'en' ? 'Next Date:' : 'अगली तारीख:'} {caseUpdate.nextDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );
      case 'documents':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6">{language === 'en' ? 'My Documents' : 'मेरे दस्तावेज़'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentDocuments.map(doc => (
                <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-3">
                    <doc.icon className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium">{doc.title}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{doc.date}</span>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-blue-600">
                        <Search className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center hover:bg-gray-50 cursor-pointer transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">{language === 'en' ? 'Upload New Document' : 'नया दस्तावेज़ अपलोड करें'}</p>
              </div>
            </div>
          </div>
        );
      case 'consultations':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6">{language === 'en' ? 'My Consultations' : 'मेरे परामर्श'}</h3>
            <div className="space-y-4">
              {upcomingConsultations.map(consultation => (
                <div key={consultation.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{consultation.lawyer}</h4>
                      <p className="text-sm text-gray-500 mt-1">{consultation.date}, {consultation.time}</p>
                      <p className="text-sm text-gray-600 mt-2">{consultation.type === 'video' ? (language === 'en' ? 'Video Call' : 'वीडियो कॉल') : (language === 'en' ? 'Office Visit' : 'ऑफिस विजिट')}</p>
                    </div>
                    <div>
                      {getStatusBadge(consultation.status)}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-3">
                    <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                      {language === 'en' ? 'Cancel' : 'रद्द करें'}
                    </button>
                    <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                      {consultation.type === 'video' ? 
                        (language === 'en' ? 'Join' : 'जॉइन करें') : 
                        (language === 'en' ? 'View Directions' : 'दिशानिर्देश देखें')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'cases':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6">{language === 'en' ? 'My Cases' : 'मेरे केस'}</h3>
            <div className="space-y-6">
              {caseUpdates.map(caseUpdate => (
                <div key={caseUpdate.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium text-lg">{caseUpdate.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{caseUpdate.court}</p>
                    </div>
                    <div>
                      {getStatusBadge(caseUpdate.status)}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{language === 'en' ? `Next Hearing: ${caseUpdate.nextDate}` : `अगली सुनवाई: ${caseUpdate.nextDate}`}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                      {language === 'en' ? 'View Documents' : 'दस्तावेज़ देखें'}
                    </button>
                    <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                      {language === 'en' ? 'View Updates' : 'अपडेट देखें'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold mb-2">{language === 'en' ? `Hello, ${user?.name || 'User'}` : `नमस्ते, ${user?.name || 'उपयोगकर्ता'}`}</h2>
        <p className="text-gray-600">{language === 'en' ? 'Here is an overview of your legal matters' : 'यहां आपके कानूनी मामलों का एक अवलोकन है'}</p>
      </motion.div>

      <div className="mb-8">
        <nav className="flex space-x-1 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'overview' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {language === 'en' ? 'Overview' : 'अवलोकन'}
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'documents' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {language === 'en' ? 'Documents' : 'दस्तावेज़'}
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'consultations' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {language === 'en' ? 'Consultations' : 'परामर्श'}
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'cases' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            {language === 'en' ? 'Cases' : 'केस'}
          </button>
        </nav>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default UserDashboard;