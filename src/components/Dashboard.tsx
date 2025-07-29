import React from 'react';
import { FileText, Calendar, Upload, Lock } from 'lucide-react';

interface DashboardProps {
  isLoggedIn: boolean;
  t: any;
}

const Dashboard: React.FC<DashboardProps> = ({ isLoggedIn, t }) => {
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    window.location.reload();
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            {t.dashboard.heading}
          </h2>
        </div>

        <div className="relative">
          <div className={`bg-white rounded-2xl p-8 lg:p-12 shadow-lg ${!isLoggedIn ? 'blur-sm' : ''}`}>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold font-serif text-black">
                  {t.dashboard.trackTitle}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <FileText className="w-8 h-8 text-black" />
                    <div>
                      <h4 className="font-bold text-black">{t.dashboard.lastDocument}</h4>
                      <p className="text-gray-600 text-sm">Legal Notice - Pending Review</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-black" />
                    <div>
                      <h4 className="font-bold text-black">{t.dashboard.consultation}</h4>
                      <p className="text-gray-600 text-sm">Tomorrow, 2:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-4">
                <Upload className="w-20 h-20 text-gray-400" />
                <p className="text-gray-600 text-center">{t.dashboard.uploadMessage}</p>
              </div>
            </div>
          </div>

          {!isLoggedIn && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 rounded-2xl">
              <div className="text-center space-y-6">
                <Lock className="w-16 h-16 text-black mx-auto" />
                <div>
                  <h3 className="text-2xl font-bold font-serif text-black mb-2">
                    {t.dashboard.loginRequired}
                  </h3>
                  <p className="text-gray-700 mb-6">{t.dashboard.loginMessage}</p>
                  <button
                    onClick={handleLogin}
                    className="bg-black text-white px-8 py-3 rounded-lg font-sans font-medium hover:scale-105 transition-all"
                  >
                    {t.dashboard.loginButton}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;