import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface FloatingChatProps {
  t: any;
  showToast?: (message: string) => void;
  userType?: 'main' | 'user' | 'admin' | 'lawyer';
}

const FloatingChat: React.FC<FloatingChatProps> = ({ t, showToast, userType = 'main' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState(() => {
    // Different welcome messages based on user type
    let welcomeMessage = t.chat.welcome;
    
    if (userType === 'user') {
      welcomeMessage += "\n\n🤝 I understand your complete legal history and documents. I can also fetch your documents from DigiLocker.";
    } else if (userType === 'lawyer') {
      welcomeMessage += "\n\n🤝 As a lawyer, I can help you with case and client management. Legal documents and templates are also available.";
    } else if (userType === 'admin') {
      welcomeMessage += "\n\n🤝 As an admin, I can help you with platform management, user data, and system updates.";
    } else {
      welcomeMessage += "\n\n🤝 I can provide you with legal advice and guidance. Login for more features.";
    }
    
    return [{ role: 'assistant', content: welcomeMessage }];
  });

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to chat
      const newUserMessage = { role: 'user', content: message };
      setChatHistory(prev => [...prev, newUserMessage]);
      
      // Simulate AI response based on user type
      setTimeout(() => {
        let aiResponse;
        
        // Different responses based on user type
        if (userType === 'user') {
          // Simulate intelligent case analysis for regular users
          const isStrongCase = message.toLowerCase().includes('court') || 
                             message.toLowerCase().includes('lawyer') || 
                             message.toLowerCase().includes('case');
          
          if (isStrongCase) {
            aiResponse = {
              role: 'assistant',
              content: `${t.chat.aiResponse} "${message}". 
              
              🔍 **Case Analysis**: Your case appears to be strong. 
              
              📋 **My Advice**: 
              1. First, I'll give you basic guidance
              2. If the case is complex, it would be better to talk to a verified lawyer
              
              💡 **Next Steps**: Would you like me to connect you with a lawyer?
              
              🔒 **Privacy**: All your information is secure.`
            };
          } else {
            aiResponse = {
              role: 'assistant',
              content: `${t.chat.aiHelp} 
              
              📝 **Understood**: "${message}"
              
              🎯 **My analysis**: This is a general legal query. I can guide you step-by-step.
              
              📚 **Available Acts**: I have complete information about Indian legal acts.
              
              💬 **Keep talking**: If you have any doubts, please ask, I'm here!`
            };
          }
        } else if (userType === 'lawyer') {
          // Lawyer-specific responses
          aiResponse = {
            role: 'assistant',
            content: `Thank you for your question "${message}".
            
            👨‍⚖️ **Lawyer Specific Information**: 
            - You have ${Math.floor(Math.random() * 5) + 1} new case updates
            - ${Math.floor(Math.random() * 3) + 2} clients have requested consultation with you
            
            📄 **Available Templates**: ${Math.floor(Math.random() * 10) + 5} new templates related to your field have been added
            
            📊 **Case Statistics**: Your success rate is ${Math.floor(Math.random() * 20) + 80}%`
          };
        } else if (userType === 'admin') {
          // Admin-specific responses
          aiResponse = {
            role: 'assistant',
            content: `Thank you for your question "${message}", Admin.
            
            👨‍💼 **Platform Statistics**: 
            - ${Math.floor(Math.random() * 50) + 100} new users this week
            - ${Math.floor(Math.random() * 200) + 300} new case queries
            - ${Math.floor(Math.random() * 20) + 30} new lawyer registrations
            
            🔧 **System Status**: All systems are functioning normally
            
            📈 **Analytics**: User engagement has increased by ${Math.floor(Math.random() * 20) + 5}% since last month`
          };
        } else {
          // Default response for non-logged in users
          aiResponse = {
            role: 'assistant',
            content: `Thank you for your question "${message}".
            
            ℹ️ **Information**: I can provide you with basic legal information.
            
            🔐 **More Features**: For more features like personalized legal assistance and DigiLocker integration, please login or sign up.
            
            💡 **Suggestion**: Could you provide more details about your legal question?`
          };
        }
        
        setChatHistory(prev => [...prev, aiResponse]);
        if (showToast) {
          showToast(t.chat.responseReceived);
        }
      }, 1000);
      
      setMessage('');
    }
  };

  return (
    <>
      <button
        id="floating-chat"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all z-50 animate-pulse"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
              🧠
            </span>
          </>
        )}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 animate-fade-in-up">
          <div className="bg-black text-white p-4 rounded-t-lg">
            <h3 className="font-bold font-serif">{t.chat.title}</h3>
            <p className="text-sm opacity-90">{t.chat.subtitle}</p>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto bg-gray-50 space-y-3">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
                  msg.role === 'user'
                    ? 'bg-black text-white ml-auto'
                    : 'bg-white text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <div className="mb-3 flex flex-wrap gap-2">
              {t.chat.quickQuestions.map((question: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setMessage(question)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={t.chat.placeholder}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={handleSendMessage}
                className="bg-black text-white p-2 rounded-lg hover:scale-105 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { FloatingChat };
export default FloatingChat;