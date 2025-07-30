import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Server, Database, Activity, AlertTriangle, CheckCircle, BarChart2, PieChart, TrendingUp, Search, Filter, ChevronDown, UserPlus, Settings, Shield, Download } from 'lucide-react';
import { useAuth } from '../../utils/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for admin dashboard
  const platformStats = [
    { id: 1, title: 'कुल उपयोगकर्ता', value: '5,234', change: '+12%', trend: 'up', icon: Users },
    { id: 2, title: 'कुल वकील', value: '342', change: '+5%', trend: 'up', icon: Shield },
    { id: 3, title: 'कुल दस्तावेज़', value: '18,453', change: '+8%', trend: 'up', icon: Database },
    { id: 4, title: 'कुल परामर्श', value: '2,876', change: '+15%', trend: 'up', icon: Activity },
  ];

  const systemStatus = [
    { id: 1, service: 'मुख्य एपीआई', status: 'operational', uptime: '99.98%', lastIncident: '15 दिन पहले' },
    { id: 2, service: 'डेटाबेस', status: 'operational', uptime: '99.95%', lastIncident: '8 दिन पहले' },
    { id: 3, service: 'फाइल स्टोरेज', status: 'operational', uptime: '99.99%', lastIncident: '30 दिन पहले' },
    { id: 4, service: 'एआई सर्विस', status: 'degraded', uptime: '98.75%', lastIncident: '2 दिन पहले' },
    { id: 5, service: 'पेमेंट गेटवे', status: 'operational', uptime: '99.90%', lastIncident: '12 दिन पहले' },
  ];

  const recentUsers = [
    { id: 1, name: 'अमित शर्मा', email: 'amit.sharma@example.com', role: 'user', status: 'active', joinDate: '2025-03-10', lastActive: '2025-03-15' },
    { id: 2, name: 'प्रिया पटेल', email: 'priya.patel@example.com', role: 'lawyer', status: 'active', joinDate: '2025-03-08', lastActive: '2025-03-15' },
    { id: 3, name: 'राहुल सिंह', email: 'rahul.singh@example.com', role: 'user', status: 'inactive', joinDate: '2025-03-05', lastActive: '2025-03-07' },
    { id: 4, name: 'नेहा गुप्ता', email: 'neha.gupta@example.com', role: 'lawyer', status: 'pending', joinDate: '2025-03-12', lastActive: '2025-03-12' },
    { id: 5, name: 'विकास जैन', email: 'vikas.jain@example.com', role: 'user', status: 'active', joinDate: '2025-03-11', lastActive: '2025-03-14' },
  ];

  const recentActivities = [
    { id: 1, type: 'user_signup', user: 'नेहा गुप्ता', timestamp: '2025-03-15T14:30:00', details: 'नए वकील ने साइन अप किया' },
    { id: 2, type: 'document_upload', user: 'अमित शर्मा', timestamp: '2025-03-15T13:45:00', details: 'नया दस्तावेज़ अपलोड किया गया' },
    { id: 3, type: 'payment_received', user: 'प्रिया पटेल', timestamp: '2025-03-15T12:20:00', details: '₹5,000 का भुगतान प्राप्त हुआ' },
    { id: 4, type: 'system_alert', user: 'सिस्टम', timestamp: '2025-03-15T10:15:00', details: 'एआई सर्विस में प्रदर्शन की समस्या' },
    { id: 5, type: 'consultation_booked', user: 'राहुल सिंह', timestamp: '2025-03-15T09:30:00', details: 'नया परामर्श बुक किया गया' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">चालू</span>;
      case 'degraded':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">धीमा</span>;
      case 'down':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">बंद</span>;
      case 'active':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">सक्रिय</span>;
      case 'inactive':
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">निष्क्रिय</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">लंबित</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">{status}</span>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_signup':
        return <div className="bg-green-50 p-2 rounded-lg"><UserPlus className="w-5 h-5 text-green-600" /></div>;
      case 'document_upload':
        return <div className="bg-blue-50 p-2 rounded-lg"><Database className="w-5 h-5 text-blue-600" /></div>;
      case 'payment_received':
        return <div className="bg-purple-50 p-2 rounded-lg"><TrendingUp className="w-5 h-5 text-purple-600" /></div>;
      case 'system_alert':
        return <div className="bg-red-50 p-2 rounded-lg"><AlertTriangle className="w-5 h-5 text-red-600" /></div>;
      case 'consultation_booked':
        return <div className="bg-indigo-50 p-2 rounded-lg"><Users className="w-5 h-5 text-indigo-600" /></div>;
      default:
        return <div className="bg-gray-50 p-2 rounded-lg"><Activity className="w-5 h-5 text-gray-600" /></div>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString('hi-IN')} ${date.toLocaleTimeString('hi-IN')}`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformStats.map(stat => (
                <motion.div 
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: stat.id * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <stat.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">सिस्टम स्टेटस</h3>
                <button className="text-sm text-blue-600 hover:underline">विस्तृत रिपोर्ट</button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">सर्विस</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">स्टेटस</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">अपटाइम</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">अंतिम घटना</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {systemStatus.map((service) => (
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
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
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
                          <h4 className="font-medium">{activity.user}</h4>
                          <span className="text-xs text-gray-500">{formatTimestamp(activity.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{activity.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">त्वरित रिपोर्ट</h3>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 border border-gray-200 rounded-lg">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-blue-600 border border-gray-200 rounded-lg">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">उपयोगकर्ता वृद्धि</h4>
                    <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">यहां ग्राफ आएगा</p>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">राजस्व अवलोकन</h4>
                    <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">यहां ग्राफ आएगा</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">उपयोगकर्ता प्रबंधन</h3>
              <div className="flex space-x-3">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="उपयोगकर्ता खोजें..." 
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                </div>
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>नया उपयोगकर्ता</span>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">नाम</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ईमेल</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">भूमिका</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">स्थिति</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">शामिल हुए</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">अंतिम सक्रिय</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">कार्रवाई</th>
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
                          {user.role === 'user' ? 'उपयोगकर्ता' : 
                           user.role === 'lawyer' ? 'वकील' : 
                           user.role === 'admin' ? 'प्रशासक' : user.role}
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
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">देखें</a>
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">संपादित करें</a>
                        <a href="#" className="text-red-600 hover:text-red-900">निलंबित करें</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold">प्लेटफॉर्म एनालिटिक्स</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg flex items-center space-x-1 hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    <span>फ़िल्टर</span>
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded-lg flex items-center space-x-1 hover:bg-gray-50">
                    <Download className="w-4 h-4" />
                    <span>डाउनलोड</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">उपयोगकर्ता वृद्धि</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart2 className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">उपयोगकर्ता वितरण</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <PieChart className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">दस्तावेज़ उपयोग</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <BarChart2 className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">राजस्व रुझान</h4>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold mb-6">प्रदर्शन मेट्रिक्स</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">एपीआई प्रतिक्रिया समय</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">245ms</span>
                    <span className="text-sm text-green-600">-12%</span>
                  </div>
                  <div className="mt-4 h-24 bg-gray-100 rounded-lg"></div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">सर्वर लोड</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">42%</span>
                    <span className="text-sm text-green-600">स्थिर</span>
                  </div>
                  <div className="mt-4 h-24 bg-gray-100 rounded-lg"></div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">एआई प्रोसेसिंग</h4>
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
            <h3 className="text-lg font-bold mb-6">सिस्टम सेटिंग्स</h3>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-md font-medium mb-4">सामान्य सेटिंग्स</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h5 className="font-medium">मेंटेनेंस मोड</h5>
                      <p className="text-sm text-gray-500">प्लेटफॉर्म को मेंटेनेंस मोड में रखें</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h5 className="font-medium">नए पंजीकरण</h5>
                      <p className="text-sm text-gray-500">नए उपयोगकर्ता पंजीकरण की अनुमति दें</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600">
                      <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h5 className="font-medium">डिबग मोड</h5>
                      <p className="text-sm text-gray-500">विस्तृत लॉगिंग सक्षम करें</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-md font-medium mb-4">एपीआई सेटिंग्स</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">एपीआई रेट लिमिट</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value="100"
                    />
                    <p className="text-xs text-gray-500 mt-1">प्रति मिनट अनुरोधों की संख्या</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">एपीआई टाइमआउट</label>
                    <input 
                      type="number" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value="30"
                    />
                    <p className="text-xs text-gray-500 mt-1">सेकंड में</p>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h4 className="text-md font-medium mb-4">एआई सेटिंग्स</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <h5 className="font-medium">एआई असिस्टेंट</h5>
                      <p className="text-sm text-gray-500">एआई असिस्टेंट सक्षम करें</p>
                    </div>
                    <div className="relative inline-block w-12 h-6 rounded-full bg-blue-600">
                      <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">एआई मॉडल</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>GPT-4</option>
                      <option>GPT-3.5</option>
                      <option>Claude</option>
                      <option>Gemini</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  रीसेट करें
                </button>
                <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  सेव करें
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex justify-between items-center"
      >
        <div>
          <h2 className="text-2xl font-bold mb-2">नमस्ते, {user?.name || 'प्रशासक'}</h2>
          <p className="text-gray-600">प्लेटफॉर्म का अवलोकन यहां है</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>रिपोर्ट डाउनलोड करें</span>
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>सिस्टम सेटिंग्स</span>
          </button>
        </div>
      </motion.div>

      <div className="mb-8">
        <nav className="flex space-x-1 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'overview' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            अवलोकन
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'users' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            उपयोगकर्ता
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'analytics' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            एनालिटिक्स
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${activeTab === 'settings' ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            सेटिंग्स
          </button>
        </nav>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default AdminDashboard;