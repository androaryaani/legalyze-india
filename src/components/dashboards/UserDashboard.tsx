import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { getLegalCasesByClientId, updateUser } from '../../models/services';
import { LegalCaseModel } from '../../models/index';
import CaseManagement from '../CaseManagement';
import { User, Settings, FileText, Search } from 'lucide-react';

interface UserDashboardProps {
  t: any;
  showToast: (message: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ t, showToast }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('cases');
  const [cases, setCases] = useState<LegalCaseModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<{
    displayName: string;
    bio: string;
    contactNumber: string;
  }>({ displayName: '', bio: '', contactNumber: '' });

  useEffect(() => {
    if (user) {
      fetchCases();
      // Initialize profile data
      setProfileData({
        displayName: user.displayName || '',
        bio: user.bio || '',
        contactNumber: user.contactNumber || ''
      });
    }
  }, [user]);

  const fetchCases = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const fetchedCases = await getLegalCasesByClientId(user.id);
      setCases(fetchedCases);
    } catch (error) {
      console.error('Error fetching cases:', error);
      showToast(t.userDashboard.errorFetchingCases);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await updateUser(user.id, {
        displayName: profileData.displayName,
        bio: profileData.bio,
        contactNumber: profileData.contactNumber,
        updatedAt: new Date()
      });
      showToast(t.userDashboard.profileUpdatedSuccess);
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast(t.userDashboard.errorUpdatingProfile);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cases':
        return <CaseManagement t={t} showToast={showToast} />;
      case 'find-lawyer':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">{t.userDashboard.findLawyer}</h3>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.userDashboard.searchBySpecialization}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              </div>
            </div>
            
            <div className="text-center py-8">
              <p className="text-gray-600">{t.userDashboard.lawyerSearchPlaceholder}</p>
              <p className="text-gray-500 text-sm mt-2">{t.userDashboard.lawyerSearchDescription}</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">{t.userDashboard.profileSettings}</h3>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="display-name">
                  {t.userDashboard.displayName}
                </label>
                <input
                  id="display-name"
                  type="text"
                  value={profileData.displayName}
                  onChange={(e) => setProfileData({ ...profileData, displayName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="contact-number">
                  {t.userDashboard.contactNumber}
                </label>
                <input
                  id="contact-number"
                  type="tel"
                  value={profileData.contactNumber}
                  onChange={(e) => setProfileData({ ...profileData, contactNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="bio">
                  {t.userDashboard.bio}
                </label>
                <textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {t.userDashboard.saveChanges}
                </button>
              </div>
            </form>
          </div>
        );
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">{t.userDashboard.heading}</h1>
          <p className="text-gray-600">{t.userDashboard.welcome.replace('{name}', user?.displayName || 'User')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">{user?.displayName || 'User'}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <nav>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setActiveTab('cases')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'cases' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <FileText className="w-5 h-5 mr-3" />
                      {t.userDashboard.myCases}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('find-lawyer')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'find-lawyer' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <Search className="w-5 h-5 mr-3" />
                      {t.userDashboard.findLawyer}
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setActiveTab('profile')}
                      className={`w-full text-left px-4 py-2 rounded-md flex items-center ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      {t.userDashboard.profileSettings}
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-medium mb-4">{t.userDashboard.caseStatistics}</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{t.userDashboard.activeCases}</span>
                    <span className="text-sm font-medium">{cases.filter(c => c.status !== 'completed').length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${(cases.filter(c => c.status !== 'completed').length / Math.max(cases.length, 1)) * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{t.userDashboard.completedCases}</span>
                    <span className="text-sm font-medium">{cases.filter(c => c.status === 'completed').length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(cases.filter(c => c.status === 'completed').length / Math.max(cases.length, 1)) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;