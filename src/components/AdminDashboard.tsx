import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Shield, TrendingUp, AlertTriangle, CheckCircle, UserCheck, Tag } from 'lucide-react';
import { useAuth } from '../utils/AuthContext';
import { translations } from '../utils/translations';
import { getAllUsers, getAllLegalCases, getAllSpecializations, addSpecialization } from '../models/services';
import { UserModel, LegalCaseModel, SpecializationModel } from '../models/index';

interface AdminDashboardProps {
  t: any;
  showToast: (message: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ t, showToast }) => {
  const { user } = useAuth();
  
  // Get language preference from localStorage
  const language = useState<'en' | 'hi'>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'hi') ? savedLanguage : 'en';
  });
  
  const [users, setUsers] = useState<UserModel[]>([]);
  const [cases, setCases] = useState<LegalCaseModel[]>([]);
  const [specializations, setSpecializations] = useState<SpecializationModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showAddSpecializationForm, setShowAddSpecializationForm] = useState<boolean>(false);
  const [newSpecializationName, setNewSpecializationName] = useState<string>('');
  const [newSpecializationDescription, setNewSpecializationDescription] = useState<string>('');
  
  // Get translations based on language
// Remove unused translations constant since it's not being used

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fetchedUsers, fetchedCases, fetchedSpecializations] = await Promise.all([
        getAllUsers(),
        getAllLegalCases(),
        getAllSpecializations()
      ]);
      
      setUsers(fetchedUsers);
      setCases(fetchedCases);
      setSpecializations(fetchedSpecializations);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      showToast(t.adminDashboard.errorFetchingData);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSpecialization = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newSpecialization = {
        name: newSpecializationName,
        description: newSpecializationDescription
      };

      await addSpecialization(newSpecialization);
      showToast(t.adminDashboard.specializationAddedSuccess);
      setNewSpecializationName('');
      setNewSpecializationDescription('');
      setShowAddSpecializationForm(false);
      fetchData(); // Refresh data
    } catch (error) {
      console.error('Error adding specialization:', error);
      showToast(t.adminDashboard.errorAddingSpecialization);
    }
  };

  // Calculate stats from actual data
  const lawyerCount = users.filter(user => user.userType === 'lawyer').length;
  const userCount = users.filter(user => user.userType === 'user').length;
  const caseCount = cases.length;
  
  const systemStats = [
    { title: language[0] === 'en' ? 'Total Users' : 'कुल उपयोगकर्ता', value: userCount.toString(), icon: Users, change: '+12%' },
    { title: language[0] === 'en' ? 'Active Lawyers' : 'सक्रिय वकील', value: lawyerCount.toString(), icon: Shield, change: '+8%' },
    { title: language[0] === 'en' ? 'Total Cases' : 'कुल केस', value: caseCount.toString(), icon: FileText, change: '+24%' },
    { title: language[0] === 'en' ? 'Specializations' : 'विशेषज्ञताएँ', value: specializations.length.toString(), icon: Tag, change: '+18%' },
  ];

  const recentActivities = [
    { id: '1', type: 'user_registration', message: language === 'en' ? 'New user registered: john.doe@email.com' : 'नया उपयोगकर्ता पंजीकृत: john.doe@email.com', time: language === 'en' ? '5 minutes ago' : '5 मिनट पहले' },
    { id: '2', type: 'document_created', message: language === 'en' ? 'Legal notice created by user ID: 2847' : 'उपयोगकर्ता ID: 2847 द्वारा कानूनी नोटिस बनाया गया', time: language === 'en' ? '12 minutes ago' : '12 मिनट पहले' },
    { id: '3', type: 'lawyer_verification', message: language === 'en' ? 'Lawyer profile verified: Adv. Priya Sharma' : 'वकील प्रोफाइल सत्यापित: एडवोकेट प्रिया शर्मा', time: language === 'en' ? '1 hour ago' : '1 घंटा पहले' },
    { id: '4', type: 'subscription', message: language === 'en' ? 'Premium subscription activated for user: rahul.singh@email.com' : 'उपयोगकर्ता के लिए प्रीमियम सदस्यता सक्रिय: rahul.singh@email.com', time: language === 'en' ? '2 hours ago' : '2 घंटे पहले' },
  ];

  const pendingReviews = [
    { id: '1', type: language === 'en' ? 'Lawyer Application' : 'वकील आवेदन', name: 'Adv. Rajesh Kumar', status: 'pending' },
    { id: '2', type: language === 'en' ? 'Content Report' : 'सामग्री रिपोर्ट', name: language === 'en' ? 'Inappropriate AI Response' : 'अनुचित AI प्रतिक्रिया', status: 'urgent' },
    { id: '3', type: language === 'en' ? 'User Complaint' : 'उपयोगकर्ता शिकायत', name: language === 'en' ? 'Document Quality Issue' : 'दस्तावेज़ गुणवत्ता समस्या', status: 'pending' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'users':
        return renderUsers();
      case 'cases':
        return renderCases();
      case 'specializations':
        return renderSpecializations();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => {
    return (
      <div>
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {systemStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-black">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} {language[0] === 'en' ? 'this month' : 'इस महीने'}</p>
                </div>
                <stat.icon className="w-8 h-8 text-gray-600" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{language[0] === 'en' ? 'Recent Activities' : 'हाल की गतिविधियां'}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pending Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{language[0] === 'en' ? 'Pending Reviews' : 'लंबित समीक्षाएं'}</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {pendingReviews.map((review) => (
                  <div key={review.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {review.status === 'urgent' ? (
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-yellow-500" />
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900">{review.type}</h4>
                        <p className="text-sm text-gray-600">{review.name}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs hover:bg-green-200 transition-colors">
                        {language[0] === 'en' ? 'Approve' : 'स्वीकृत करें'}
                      </button>
                      <button className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200 transition-colors">
                        {language[0] === 'en' ? 'Reject' : 'अस्वीकार करें'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  };

  const renderUsers = () => {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{language[0] === 'en' ? 'User Management' : 'उपयोगकर्ता प्रबंधन'}</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Name' : 'नाम'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Email' : 'ईमेल'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Role' : 'भूमिका'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Created At' : 'बनाया गया'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Actions' : 'कार्रवाई'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">{user.displayName?.charAt(0) || user.email.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.displayName || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.userType === 'lawyer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt.toDate()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">{language[0] === 'en' ? 'Edit' : 'संपादित करें'}</button>
                      <button className="text-red-600 hover:text-red-900">{language[0] === 'en' ? 'Delete' : 'हटाएं'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderCases = () => {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{language[0] === 'en' ? 'Case Management' : 'केस प्रबंधन'}</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Title' : 'शीर्षक'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Status' : 'स्थिति'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Client' : 'ग्राहक'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Lawyer' : 'वकील'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Created At' : 'बनाया गया'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {language[0] === 'en' ? 'Actions' : 'कार्रवाई'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cases.map((legalCase) => (
                  <tr key={legalCase.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{legalCase.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        legalCase.status === 'open' ? 'bg-yellow-100 text-yellow-800' :
                        legalCase.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                        legalCase.status === 'closed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {legalCase.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {legalCase.clientId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {legalCase.lawyerId || 'Not Assigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(legalCase.createdAt.toDate()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">{language[0] === 'en' ? 'View' : 'देखें'}</button>
                      <button className="text-red-600 hover:text-red-900">{language[0] === 'en' ? 'Delete' : 'हटाएं'}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderSpecializations = () => {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">{language[0] === 'en' ? 'Specialization Management' : 'विशेषज्ञता प्रबंधन'}</h2>
          <button 
            onClick={() => setShowAddSpecializationForm(!showAddSpecializationForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
          >
            <span className="mr-2">+</span>
            {language[0] === 'en' ? 'Add Specialization' : 'विशेषज्ञता जोड़ें'}
          </button>
        </div>
        
        {showAddSpecializationForm && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium mb-4">{language[0] === 'en' ? 'Add New Specialization' : 'नई विशेषज्ञता जोड़ें'}</h3>
            <form onSubmit={handleAddSpecialization}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="specialization-name">
                  {language[0] === 'en' ? 'Name' : 'नाम'}
                </label>
                <input
                  id="specialization-name"
                  type="text"
                  value={newSpecializationName}
                  onChange={(e) => setNewSpecializationName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="specialization-description">
                  {language[0] === 'en' ? 'Description' : 'विवरण'}
                </label>
                <textarea
                  id="specialization-description"
                  value={newSpecializationDescription}
                  onChange={(e) => setNewSpecializationDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAddSpecializationForm(false)}
                  className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {language[0] === 'en' ? 'Cancel' : 'रद्द करें'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  {language[0] === 'en' ? 'Submit' : 'जमा करें'}
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specializations.map((specialization) => (
              <div key={specialization.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-lg mb-2">{specialization.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{specialization.description || (language[0] === 'en' ? 'No description' : 'कोई विवरण नहीं')}</p>
                <div className="text-xs text-gray-500">
                  {language[0] === 'en' ? 'Created' : 'बनाया गया'}: {new Date(specialization.createdAt.toDate()).toLocaleDateString()}
                </div>
                <div className="mt-4 flex justify-end">
                  <button className="text-blue-600 hover:text-blue-900 mr-3 text-sm">{language[0] === 'en' ? 'Edit' : 'संपादित करें'}</button>
                  <button className="text-red-600 hover:text-red-900 text-sm">{language[0] === 'en' ? 'Delete' : 'हटाएं'}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language[0] === 'en' ? 'Admin Dashboard' : 'एडमिन डैशबोर्ड'}
          </h1>
          <p className="text-gray-600">{language[0] === 'en' ? 'System overview and management tools' : 'सिस्टम अवलोकन और प्रबंधन उपकरण'}</p>
        </div>
        
        <div className="flex space-x-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-md ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {language[0] === 'en' ? 'Dashboard' : 'डैशबोर्ड'}
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-md ${activeTab === 'users' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {language[0] === 'en' ? 'Users' : 'उपयोगकर्ता'}
          </button>
          <button 
            onClick={() => setActiveTab('cases')}
            className={`px-4 py-2 rounded-md ${activeTab === 'cases' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {language[0] === 'en' ? 'Cases' : 'केस'}
          </button>
          <button 
            onClick={() => setActiveTab('specializations')}
            className={`px-4 py-2 rounded-md ${activeTab === 'specializations' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {language[0] === 'en' ? 'Specializations' : 'विशेषज्ञताएँ'}
          </button>
        </div>
      </motion.div>

      {renderTabContent()}
      
      {/* System Controls */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 bg-white rounded-lg shadow-md border border-gray-200"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{language[0] === 'en' ? 'System Controls' : 'सिस्टम नियंत्रण'}</h2>
        </div>
        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <button 
              onClick={() => setActiveTab('users')}
              className="bg-blue-100 text-blue-700 p-4 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Users className="w-6 h-6 mb-2" />
              <span className="block font-medium">{language[0] === 'en' ? 'Manage Users' : 'उपयोगकर्ता प्रबंधन'}</span>
            </button>
            <button 
              onClick={() => setActiveTab('cases')}
              className="bg-green-100 text-green-700 p-4 rounded-lg hover:bg-green-200 transition-colors"
            >
              <Shield className="w-6 h-6 mb-2" />
              <span className="block font-medium">{language[0] === 'en' ? 'Manage Cases' : 'केस प्रबंधन'}</span>
            </button>
            <button 
              onClick={() => setActiveTab('specializations')}
              className="bg-yellow-100 text-yellow-700 p-4 rounded-lg hover:bg-yellow-200 transition-colors"
            >
              <Tag className="w-6 h-6 mb-2" />
              <span className="block font-medium">{language[0] === 'en' ? 'Manage Specializations' : 'विशेषज्ञता प्रबंधन'}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};