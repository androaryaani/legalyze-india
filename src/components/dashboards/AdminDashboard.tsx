import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileText, Shield, TrendingUp, AlertTriangle, CheckCircle, UserCheck, Tag, Eye, UserX, Edit, Trash2, Search, UserPlus, Filter, Download, Settings, BarChart2, PieChart } from 'lucide-react';
import { useAuth } from '../../utils/AuthContext';
import { getAllUsers, getAllLegalCases, getAllSpecializations, addSpecialization } from '../../models/services';
import { UserModel, LegalCaseModel, SpecializationModel } from '../../models/index';

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
    { title: t.adminDashboard.totalUsers, value: userCount.toString(), icon: Users, change: '+12%' },
    { title: t.adminDashboard.activeLawyers, value: lawyerCount.toString(), icon: Shield, change: '+8%' },
    { title: t.adminDashboard.totalCases, value: caseCount.toString(), icon: FileText, change: '+24%' },
    { title: t.adminDashboard.specializations, value: specializations.length.toString(), icon: Tag, change: '+18%' },
  ];

  const recentActivities = [
    { id: '1', type: 'user_registration', message: t.adminDashboard.newUserRegistered.replace('{email}', 'john.doe@email.com'), time: t.adminDashboard.fiveMinutesAgo },
    { id: '2', type: 'document_created', message: t.adminDashboard.legalNoticeCreated.replace('{userId}', '2847'), time: t.adminDashboard.twelveMinutesAgo },
    { id: '3', type: 'lawyer_verification', message: t.adminDashboard.lawyerProfileVerified.replace('{name}', 'Adv. Priya Sharma'), time: t.adminDashboard.oneHourAgo },
    { id: '4', type: 'subscription', message: t.adminDashboard.premiumSubscriptionActivated.replace('{email}', 'rahul.singh@email.com'), time: t.adminDashboard.twoHoursAgo },
  ];

  const pendingReviews = [
    { id: '1', type: t.adminDashboard.lawyerApplication, name: 'Adv. Rajesh Kumar', status: 'pending' },
    { id: '2', type: t.adminDashboard.contentReport, name: t.adminDashboard.inappropriateAIResponse, status: 'urgent' },
    { id: '3', type: t.adminDashboard.userComplaint, name: t.adminDashboard.documentQualityIssue, status: 'pending' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.adminDashboard.statusOperational}</span>;
      case 'degraded':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{t.adminDashboard.statusDegraded}</span>;
      case 'down':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">{t.adminDashboard.statusDown}</span>;
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{t.adminDashboard.statusActive}</span>;
      case 'inactive':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{t.adminDashboard.statusInactive}</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">{t.adminDashboard.statusPending}</span>;
      case 'urgent':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">{t.adminDashboard.statusUrgent}</span>;
      case 'completed':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">{t.adminDashboard.statusCompleted}</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

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
                  <p className="text-sm text-green-600">{stat.change} {t.adminDashboard.thisMonth}</p>
                </div>
                <stat.icon className="w-8 h-8 text-gray-600" />
              </div>
            </motion.div>
          ))}
        </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">{t.adminDashboard.systemStatus}</h3>
                <button className="text-sm text-blue-600 hover:underline">{t.adminDashboard.detailedReport}</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.service}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.status}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.uptime}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.lastIncident}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { id: '1', service: 'API Service', status: 'operational', uptime: '99.9%', lastIncident: '30 days ago' },
                      { id: '2', service: 'Database', status: 'operational', uptime: '99.8%', lastIncident: '14 days ago' },
                      { id: '3', service: 'AI Service', status: 'degraded', uptime: '98.5%', lastIncident: '2 days ago' },
                      { id: '4', service: 'Storage', status: 'operational', uptime: '99.9%', lastIncident: '45 days ago' }
                    ].map((service) => (
                      <tr key={service.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0">
                              {service.status === 'operational' ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : service.status === 'degraded' ? (
                                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                              ) : (
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{service.service}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(service.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {service.uptime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {service.lastIncident}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t.adminDashboard.recentActivities}</h2>
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
              <h2 className="text-xl font-semibold text-gray-900">{t.adminDashboard.pendingReviews}</h2>
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
                        {t.adminDashboard.approve}
                      </button>
                      <button className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs hover:bg-red-200 transition-colors">
                        {t.adminDashboard.reject}
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
      case 'users':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">{t.adminDashboard.userManagement}</h2>
                <div className="flex space-x-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder={t.adminDashboard.searchUsers} 
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>{t.adminDashboard.newUser}</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.name}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.email}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.role}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.status}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.joined}</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.lastActive}</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.actions}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {user.role === 'user' ? t.adminDashboard.userRole : 
                           user.role === 'lawyer' ? t.adminDashboard.lawyerRole : 
                           user.role === 'admin' ? t.adminDashboard.adminRole : user.role}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.joinDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.lastActive}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                            <Eye className="w-4 h-4" title={t.adminDashboard.view} />
                          </button>
                          <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                            <Edit className="w-4 h-4" title={t.adminDashboard.edit} />
                          </button>
                          <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                            <UserX className="w-4 h-4" title={t.adminDashboard.suspend} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'cases':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">{t.adminDashboard.caseManagement}</h2>
                <div className="flex space-x-3">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={t.adminDashboard.searchCases} 
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.caseId}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.title}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.client}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.lawyer}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.status}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.createdAt}</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cases.map(caseItem => (
                      <tr key={caseItem.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{caseItem.id.substring(0, 8)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{caseItem.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.clientName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{caseItem.lawyerName || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(caseItem.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(caseItem.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                              <Eye className="w-4 h-4" title={t.adminDashboard.view} />
                            </button>
                            <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                              <Edit className="w-4 h-4" title={t.adminDashboard.edit} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'specializations':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">{t.adminDashboard.specializationManagement}</h2>
                <button 
                  onClick={() => setShowAddSpecializationForm(!showAddSpecializationForm)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Tag className="w-4 h-4" />
                  <span>{t.adminDashboard.addSpecialization}</span>
                </button>
              </div>
              
              {showAddSpecializationForm && (
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                  <form onSubmit={handleAddSpecialization} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminDashboard.specializationName}</label>
                      <input 
                        type="text" 
                        value={newSpecializationName}
                        onChange={(e) => setNewSpecializationName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminDashboard.specializationDescription}</label>
                      <textarea 
                        value={newSpecializationDescription}
                        onChange={(e) => setNewSpecializationDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button 
                        type="button"
                        onClick={() => setShowAddSpecializationForm(false)}
                        className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        {t.adminDashboard.cancel}
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        {t.adminDashboard.save}
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              <div className="p-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.name}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.description}</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.lawyersCount}</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{t.adminDashboard.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {specializations.map(specialization => (
                      <tr key={specialization.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{specialization.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-500">{specialization.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {users.filter(user => user.specializations?.includes(specialization.id)).length}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                              <Edit className="w-4 h-4" title={t.adminDashboard.edit} />
                            </button>
                            <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                              <Trash2 className="w-4 h-4" title={t.adminDashboard.delete} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">{t.adminDashboard.platformAnalytics}</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg flex items-center space-x-1 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>{t.adminDashboard.filter}</span>
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg flex items-center space-x-1 hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    <span>{t.adminDashboard.download}</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{t.adminDashboard.userGrowth}</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart2 className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{t.adminDashboard.userDistribution}</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <PieChart className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{t.adminDashboard.documentUsage}</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart2 className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{t.adminDashboard.revenueTrends}</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-6">{t.adminDashboard.performanceMetrics}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{t.adminDashboard.apiResponseTime}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">245ms</span>
                    <span className="text-sm text-green-600">-12%</span>
                  </div>
                  <div className="mt-4 h-24 bg-gray-100 rounded-lg"></div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{t.adminDashboard.serverLoad}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">42%</span>
                    <span className="text-sm text-green-600">{t.adminDashboard.stable}</span>
                  </div>
                  <div className="mt-4 h-24 bg-gray-100 rounded-lg"></div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">{t.adminDashboard.aiProcessing}</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">1.2s</span>
                    <span className="text-sm text-red-600">+8%</span>
                  </div>
                  <div className="mt-4 h-24 bg-gray-100 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold mb-6">{t.adminDashboard.systemSettings}</h3>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-md font-medium mb-4">{t.adminDashboard.generalSettings}</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h5 className="font-medium">{t.adminDashboard.maintenanceMode}</h5>
                      <p className="text-sm text-gray-500">{t.adminDashboard.maintenanceModeDesc}</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h5 className="font-medium">{t.adminDashboard.newRegistrations}</h5>
                      <p className="text-sm text-gray-500">{t.adminDashboard.newRegistrationsDesc}</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600">
                      <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h5 className="font-medium">{t.adminDashboard.debugMode}</h5>
                      <p className="text-sm text-gray-500">{t.adminDashboard.debugModeDesc}</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-md font-medium mb-4">{t.adminDashboard.apiSettings}</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminDashboard.apiRateLimit}</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value="100"
                    />
                    <p className="text-xs text-gray-500 mt-1">{t.adminDashboard.requestsPerMinute}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminDashboard.apiTimeout}</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value="30"
                    />
                    <p className="text-xs text-gray-500 mt-1">{t.adminDashboard.inSeconds}</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-md font-medium mb-4">{t.adminDashboard.nyayGPTSettings}</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h5 className="font-medium">{t.adminDashboard.nyayGPTLegalAssistant}</h5>
                      <p className="text-sm text-gray-500">{t.adminDashboard.enableAILegalAssistant}</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600">
                      <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminDashboard.aiModel}</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>GPT-4</option>
                      <option>GPT-3.5</option>
                      <option>Claude</option>
                      <option>Gemini</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminDashboard.aiApiKey}</label>
                    <div className="flex">
                      <input 
                        type="password" 
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                        placeholder="sk-***********************"
                      />
                      <button className="px-3 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                        {t.adminDashboard.update}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{t.adminDashboard.apiKeySecurelyStored}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminDashboard.userRolePrompt}</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24" 
                      placeholder={t.adminDashboard.enterUserAIPrompt}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminDashboard.lawyerRolePrompt}</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24" 
                      placeholder={t.adminDashboard.enterLawyerAIPrompt}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.adminDashboard.adminRolePrompt}</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24" 
                      placeholder={t.adminDashboard.enterAdminAIPrompt}
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-t border-gray-100 mt-2">
                    <div>
                      <h5 className="font-medium">{t.adminDashboard.databaseAccess}</h5>
                      <p className="text-sm text-gray-500">{t.adminDashboard.databaseAccessDesc}</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600">
                      <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  {t.adminDashboard.reset}
                </button>
                <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  {t.adminDashboard.save}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="w-full py-6">
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">{t.adminDashboard.heading}</h2>
          <p className="text-gray-600">{t.adminDashboard.subheading}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-64 flex-shrink-0"
          >
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{user?.displayName || t.adminDashboard.admin}</h3>
                    <p className="text-sm text-gray-500">{t.adminDashboard.adminRole}</p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-lg ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span>{t.adminDashboard.dashboard}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-lg ${activeTab === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Users className="w-5 h-5" />
                    <span>{t.adminDashboard.users}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cases')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-lg ${activeTab === 'cases' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <FileText className="w-5 h-5" />
                    <span>{t.adminDashboard.cases}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('specializations')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm rounded-lg ${activeTab === 'specializations' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    <Tag className="w-5 h-5" />
                    <span>{t.adminDashboard.specializations}</span>
                  </button>
                </nav>
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{t.adminDashboard.totalUsers}</span>
                      <span className="text-sm font-medium">{users.length}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{t.adminDashboard.activeCases}</span>
                      <span className="text-sm font-medium">{cases.filter(c => c.status === 'active').length}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;