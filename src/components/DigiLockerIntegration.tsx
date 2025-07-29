import React, { useState } from 'react';
import { Database, Shield, FileText, Download, CheckCircle, AlertCircle } from 'lucide-react';

interface DigiLockerIntegrationProps {
  t: any;
  isLoggedIn: boolean;
}

const DigiLockerIntegration: React.FC<DigiLockerIntegrationProps> = ({ t, isLoggedIn }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [documents, setDocuments] = useState([
    { id: 1, name: "Aadhaar Card", type: "Identity", status: "verified", icon: "🆔" },
    { id: 2, name: "PAN Card", type: "Identity", status: "verified", icon: "💳" },
    { id: 3, name: "Driving License", type: "License", status: "verified", icon: "🚗" },
    { id: 4, name: "Voter ID", type: "Identity", status: "pending", icon: "🗳️" },
    { id: 5, name: "Property Documents", type: "Property", status: "verified", icon: "🏠" },
    { id: 6, name: "Income Certificate", type: "Financial", status: "verified", icon: "💰" }
  ]);

  const handleConnect = () => {
    setIsConnected(true);
    // Simulate DigiLocker connection
    setTimeout(() => {
      alert("DigiLocker connected successfully! Your documents are now accessible to AI for better legal assistance.");
    }, 1000);
  };

  const handleDocumentFetch = (docId: number) => {
    alert("Document fetched successfully! AI can now use this for your legal queries.");
  };

  return (
    <section className="py-20 px-4 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            DigiLocker Integration
          </h2>
          <p className="text-lg text-gray-700 font-sans max-w-2xl mx-auto">
            Connect your DigiLocker to automatically fetch government documents for better legal assistance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Connection Status */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="flex items-center space-x-4 mb-6">
              <Database className="w-12 h-12 text-blue-600" />
              <div>
                <h3 className="text-2xl font-bold font-serif text-black">
                  DigiLocker Status
                </h3>
                <p className="text-gray-600">
                  {isConnected ? "Connected & Secure" : "Not Connected"}
                </p>
              </div>
            </div>

            {!isConnected ? (
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <p className="text-yellow-800 font-medium">
                      Connect DigiLocker for enhanced AI assistance
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleConnect}
                  disabled={!isLoggedIn}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-sans font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggedIn ? "Connect DigiLocker" : "Login Required"}
                </button>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>256-bit SSL encryption ensures your data security</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">
                      DigiLocker connected successfully!
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <p>✅ AI can now access your documents for better legal advice</p>
                  <p>✅ Automatic document verification for legal processes</p>
                  <p>✅ Faster case analysis with your personal information</p>
                </div>
              </div>
            )}
          </div>

          {/* Available Documents */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold font-serif text-black mb-6">
              Available Documents
            </h3>
            
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{doc.icon}</span>
                    <div>
                      <h4 className="font-medium text-black">{doc.name}</h4>
                      <p className="text-sm text-gray-600">{doc.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'verified' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {doc.status}
                    </span>
                    
                    {isConnected && (
                      <button
                        onClick={() => handleDocumentFetch(doc.id)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Fetch Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {!isConnected && (
              <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                  Connect DigiLocker to access your documents
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold font-serif text-black mb-8 text-center">
            How DigiLocker Integration Helps
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-black mb-2">Automatic Document Verification</h4>
              <p className="text-gray-600 text-sm">
                AI verifies your documents automatically for legal processes
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-bold text-black mb-2">Enhanced Security</h4>
              <p className="text-gray-600 text-sm">
                Government-grade security with encrypted data transmission
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-black mb-2">Personalized AI Assistance</h4>
              <p className="text-gray-600 text-sm">
                AI provides better advice knowing your complete profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigiLockerIntegration;