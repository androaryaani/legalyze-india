import React, { useState } from 'react';
import { Brain, User, FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react';

interface IntelligentAIProps {
  t: any;
  isLoggedIn: boolean;
  userType?: 'main' | 'user' | 'admin' | 'lawyer';
}

const IntelligentAI: React.FC<IntelligentAIProps> = ({ t, isLoggedIn, userType = 'user' }) => {
  const [userProfile] = useState({
    name: "राहुल शर्मा",
    location: "जयपुर, राजस्थान",
    cases: [
      { id: 1, type: "Property Dispute", status: "ongoing", court: "Jaipur District Court", strength: "medium" },
      { id: 2, type: "Consumer Complaint", status: "resolved", court: "Consumer Forum", strength: "strong" }
    ],
    documents: ["Aadhaar", "PAN", "Property Papers", "Income Certificate"],
    legalHistory: "2 cases filed, 1 resolved successfully"
  });

  const [aiAnalysis] = useState({
    currentState: "आपकी legal position अच्छी है। Property dispute में आपके पास strong documents हैं।",
    riskLevel: "Low",
    recommendations: [
      "Property case के लिए additional witness statements collect करें",
      "Court hearing के लिए सभी original documents ready रखें",
      "Lawyer consultation recommended नहीं है अभी के लिए"
    ],
    nextSteps: [
      "Next hearing: 15 Feb 2025",
      "Document submission deadline: 10 Feb 2025",
      "Witness preparation: This week"
    ]
  });

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-serif text-black mb-4">
            Intelligent AI Legal Assistant
          </h2>
          <p className="text-lg text-gray-700 font-sans max-w-2xl mx-auto">
            AI जो आपकी पूरी legal history जानता है और personalized advice देता है
          </p>
        </div>

        {!isLoggedIn ? (
          <div className="bg-white rounded-lg p-12 shadow-lg text-center">
            <Brain className="w-20 h-20 text-purple-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold font-serif text-black mb-4">
              Login करें AI Assistant के लिए
            </h3>
            <p className="text-gray-600 mb-6">
              आपकी complete legal profile और personalized assistance के लिए login करना जरूरी है
            </p>
            <button className="bg-black text-white px-8 py-3 rounded-lg font-sans font-medium hover:scale-105 transition-all">
              Login Now
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* User Profile & AI Knowledge */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <User className="w-12 h-12 text-blue-600" />
                <div>
                  <h3 className="text-2xl font-bold font-serif text-black">
                    आपकी Legal Profile
                  </h3>
                  <p className="text-gray-600">AI को यह सब पता है</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-black mb-2">Personal Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Name:</strong> {userProfile.name}</p>
                    <p><strong>Location:</strong> {userProfile.location}</p>
                    <p><strong>Legal History:</strong> {userProfile.legalHistory}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-2">Active Cases</h4>
                  <div className="space-y-3">
                    {userProfile.cases.map((case_item) => (
                      <div key={case_item.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{case_item.type}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            case_item.strength === 'strong' ? 'bg-green-100 text-green-800' :
                            case_item.strength === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {case_item.strength} case
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          <strong>Court:</strong> {case_item.court}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Status:</strong> {case_item.status}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-2">Available Documents</h4>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.documents.map((doc, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis & Recommendations */}
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="flex items-center space-x-4 mb-6">
                <Brain className="w-12 h-12 text-purple-600" />
                <div>
                  <h3 className="text-2xl font-bold font-serif text-black">
                    AI Analysis & Advice
                  </h3>
                  <p className="text-gray-600">Personalized recommendations</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-black mb-2 flex items-center">
                    <Scale className="w-5 h-5 mr-2" />
                    Current Legal State
                  </h4>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-green-800">{aiAnalysis.currentState}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-2 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Risk Assessment
                  </h4>
                  <div className={`p-4 rounded-lg ${
                    aiAnalysis.riskLevel === 'Low' ? 'bg-green-50 border border-green-200' :
                    aiAnalysis.riskLevel === 'Medium' ? 'bg-yellow-50 border border-yellow-200' :
                    'bg-red-50 border border-red-200'
                  }`}>
                    <span className={`font-bold ${
                      aiAnalysis.riskLevel === 'Low' ? 'text-green-800' :
                      aiAnalysis.riskLevel === 'Medium' ? 'text-yellow-800' :
                      'text-red-800'
                    }`}>
                      Risk Level: {aiAnalysis.riskLevel}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-2 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    AI Recommendations
                  </h4>
                  <div className="space-y-2">
                    {aiAnalysis.recommendations.map((rec, index) => (
                      <div key={index} className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-blue-800 text-sm">• {rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-black mb-2 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Next Steps
                  </h4>
                  <div className="space-y-2">
                    {aiAnalysis.nextSteps.map((step, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-800 text-sm">📅 {step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-purple-800 text-sm">
                  <strong>💡 Smart Tip:</strong> आपका case strong है, इसलिए अभी lawyer की जरूरत नहीं। 
                  AI guidance से आप अपना case handle कर सकते हैं। अगर कोई complication आए तो मैं आपको बताऊंगा।
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export { IntelligentAI };