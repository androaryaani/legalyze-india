import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import { getLegalCasesByLawyerId, updateUser } from '../models/services';
import { LegalCaseModel, UserModel } from '../models/index';
import CaseManagement from './CaseManagement';
import SpecializationManagement from './SpecializationManagement';
import { User, Settings, Briefcase, FileText } from 'lucide-react';

interface LawyerDashboardProps {
  t: any;
  showToast: (message: string) => void;
}

export const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ t, showToast }) => {
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
      const fetchedCases = await getLegalCasesByLawyerId(user.id);
      setCases(fetchedCases);
    } catch (error) {
      console.error('Error fetching cases:', error);
      showToast(t.lawyerDashboard.errorFetchingCases);
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
      showToast(t.lawyerDashboard.profileUpdatedSuccess);
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast(t.lawyerDashboard.errorUpdatingProfile);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cases':
        return <CaseManagement t={t} showToast={showToast} />;
      case 'specializations':
        return <SpecializationManagement t={t} showToast={showToast} />;
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-6">{t.lawyerDashboard.profileSettings}</h3>
            <form onSubmit={handleProfileUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="display-name">
                  {t.lawyerDashboard.displayName}
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
                  {t.lawyerDashboard.contactNumber}
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
                  {t.lawyerDashboard.bio}
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
                  {t.lawyerDashboard.saveChanges}
                </button>
              </div>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading && activeTab === 'cases' && cases.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">{t.lawyerDashboard.heading}</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4 bg-blue-600 text-white">
                <h3 className="font-semibold">{t.lawyerDashboard.navigation}</h3>
              </div>
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('cases')}
                  className={`w-full text-left px-4 py-3 rounded-md flex items-center ${activeTab === 'cases' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Briefcase className="w-5 h-5 mr-3" />
                  {t.lawyerDashboard.myCases}
                </button>
                <button
                  onClick={() => setActiveTab('specializations')}
                  className={`w-full text-left px-4 py-3 rounded-md flex items-center ${activeTab === 'specializations' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  {t.lawyerDashboard.specializations}
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-3 rounded-md flex items-center ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  {t.lawyerDashboard.profile}
                </button>
              </nav>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden mt-6 p-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User className="w-6 h-6" />
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-800">{user?.displayName || user?.email}</h4>
                  <p className="text-sm text-gray-600">{t.lawyerDashboard.lawyerAccount}</p>
                </div>
              </div>
              {cases.length > 0 && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">{cases.length}</span> {t.lawyerDashboard.activeCases}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="md:w-3/4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LawyerDashboard;