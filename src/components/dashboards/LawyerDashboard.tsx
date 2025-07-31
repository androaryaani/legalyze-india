import React, { useState, useEffect } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { getLegalCasesByLawyerId, updateUser } from '../../models/services';
import { LegalCaseModel, UserModel } from '../../models/index';
import CaseManagement from '../CaseManagement';
import SpecializationManagement from '../SpecializationManagement';
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
      lastUpdated: '2025-03-08'
    },
  ];*/

  const upcomingConsultations = [
    { 
      id: 1, 
      client: 'राजेश शर्मा', 
      date: '2025-03-20', 
      time: '14:00', 
      type: 'video', 
      status: 'confirmed',
      notes: 'संपत्ति विवाद के संबंध में दस्तावेज़ों की समीक्षा'
    },
    { 
      id: 2, 
      client: 'प्रिया पटेल', 
      date: '2025-03-25', 
      time: '11:30', 
      type: 'office', 
      status: 'pending',
      notes: 'उपभोक्ता शिकायत के लिए प्रारंभिक परामर्श'
    },
    { 
      id: 3, 
      client: 'नवीन कुमार', 
      date: '2025-03-22', 
      time: '16:00', 
      type: 'video', 
      status: 'confirmed',
      notes: 'नए मामले के लिए प्रारंभिक चर्चा'
    },
  ];

  const documentTemplates = [
    { id: 1, title: 'कानूनी नोटिस', category: 'notices', usageCount: 45, lastUsed: '2025-03-10' },
    { id: 2, title: 'संपत्ति विक्रय समझौता', category: 'agreements', usageCount: 32, lastUsed: '2025-03-15' },
    { id: 3, title: 'विवाह विच्छेद याचिका', category: 'petitions', usageCount: 28, lastUsed: '2025-03-05' },
    { id: 4, title: 'वसीयतनामा', category: 'wills', usageCount: 20, lastUsed: '2025-03-12' },
    { id: 5, title: 'मुख्तारनामा', category: 'power_of_attorney', usageCount: 18, lastUsed: '2025-03-08' },
  ];

  const recentActivities = [
    { id: 1, type: 'case_update', title: 'संपत्ति विवाद', client: 'राजेश शर्मा', timestamp: '2025-03-15T14:30:00', description: 'अगली सुनवाई की तारीख निर्धारित की गई' },
    { id: 2, type: 'document_created', title: 'कानूनी नोटिस', client: 'प्रिया पटेल', timestamp: '2025-03-14T11:45:00', description: 'उपभोक्ता शिकायत के लिए नोटिस तैयार किया गया' },
    { id: 3, type: 'consultation_completed', title: 'वीडियो परामर्श', client: 'अमित सिंह', timestamp: '2025-03-13T16:00:00', description: 'कॉपीराइट उल्लंघन मामले पर चर्चा की गई' },
  ];

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'case_update':
        return <div className="bg-purple-50 p-2 rounded-lg"><Scale className="w-5 h-5 text-purple-600" /></div>;
      case 'document_created':
        return <div className="bg-blue-50 p-2 rounded-lg"><FileText className="w-5 h-5 text-blue-600" /></div>;
      case 'consultation_completed':
        return <div className="bg-green-50 p-2 rounded-lg"><MessageSquare className="w-5 h-5 text-green-600" /></div>;
      default:
        return <div className="bg-gray-50 p-2 rounded-lg"><Clock className="w-5 h-5 text-gray-600" /></div>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, 'dd/MM/yyyy HH:mm');
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
              className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">आज के कार्य</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg flex items-center space-x-1 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>फ़िल्टर</span>
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg flex items-center space-x-1 hover:bg-gray-50">
                    <ChevronDown className="w-4 h-4" />
                    <span>सॉर्ट करें</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">क्लाइंट</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">केस</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">अदालत</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">अगली तारीख</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">स्थिति</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">प्राथमिकता</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">कार्रवाई</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {clientCases.map((caseItem) => (
                      <tr key={caseItem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{caseItem.client}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{caseItem.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{caseItem.court}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{caseItem.nextDate}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(caseItem.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPriorityBadge(caseItem.priority)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">देखें</a>
                          <a href="#" className="text-blue-600 hover:text-blue-900">अपडेट करें</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">आगामी परामर्श</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline">सभी देखें</a>
              </div>
              <div className="space-y-4">
                {upcomingConsultations.map(consultation => (
                  <div key={consultation.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="bg-purple-50 p-2 rounded-lg">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{consultation.client}</h4>
                        {getStatusBadge(consultation.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{consultation.date}, {consultation.time} ({consultation.type === 'video' ? 'वीडियो कॉल' : 'ऑफिस विजिट'})</p>
                      <p className="text-sm text-gray-600 mt-2">{consultation.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">हाल की गतिविधियाँ</h3>
                <a href="#" className="text-sm text-blue-600 hover:underline">सभी देखें</a>
              </div>
              <div className="space-y-4">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <span className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{activity.client}</p>
                      <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );
      case 'cases':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">मेरे केस</h3>
              <div className="flex space-x-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="केस खोजें..." 
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  नया केस जोड़ें
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              {clientCases.map(caseItem => (
                <div key={caseItem.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-lg">{caseItem.title}</h4>
                        {getPriorityBadge(caseItem.priority)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{caseItem.court}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(caseItem.status)}
                      <p className="text-xs text-gray-500 mt-2">अंतिम अपडेट: {caseItem.lastUpdated}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>अगली सुनवाई: {caseItem.nextDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>क्लाइंट: {caseItem.client}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                      दस्तावेज़ देखें
                    </button>
                    <button className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                      नोट्स जोड़ें
                    </button>
                    <button className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700">
                      अपडेट करें
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'templates':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">दस्तावेज़ टेम्पलेट्स</h3>
              <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                नया टेम्पलेट बनाएँ
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documentTemplates.map(template => (
                <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <h4 className="font-medium">{template.title}</h4>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Star className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    श्रेणी: {template.category === 'notices' ? 'नोटिस' : 
                            template.category === 'agreements' ? 'समझौते' :
                            template.category === 'petitions' ? 'याचिकाएँ' :
                            template.category === 'wills' ? 'वसीयतनामे' :
                            template.category === 'power_of_attorney' ? 'मुख्तारनामे' : template.category}
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>उपयोग: {template.usageCount} बार</span>
                    <span>अंतिम उपयोग: {template.lastUsed}</span>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end space-x-2">
                    <button className="px-2 py-1 text-xs text-gray-600 border border-gray-300 rounded hover:bg-gray-50">
                      संपादित करें
                    </button>
                    <button className="px-2 py-1 text-xs text-white bg-blue-600 rounded hover:bg-blue-700">
                      उपयोग करें
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6">प्रैक्टिस एनालिटिक्स</h3>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-blue-700">सक्रिय केस</h4>
                  <Briefcase className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-800">24</p>
                <p className="text-xs text-blue-600 mt-1">पिछले महीने से +3</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-green-700">इस महीने की आय</h4>
                  <BarChart2 className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-800">₹1,45,000</p>
                <p className="text-xs text-green-600 mt-1">पिछले महीने से +12%</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-purple-700">आगामी सुनवाई</h4>
                  <Gavel className="w-5 h-5 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-800">8</p>
                <p className="text-xs text-purple-600 mt-1">अगले 7 दिनों में</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mb-8">
              <h4 className="text-md font-medium mb-4">केस श्रेणी वितरण</h4>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">यहां पाई चार्ट आएगा</p>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="text-md font-medium mb-4">मासिक आय रुझान</h4>
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">यहां लाइन चार्ट आएगा</p>
              </div>
            </div>
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