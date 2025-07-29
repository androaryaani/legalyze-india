import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface FloatingChatProps {
  t: any;
  showToast: (message: string) => void;
}

const FloatingChat: React.FC<FloatingChatProps> = ({ t, showToast }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { 
      role: 'assistant', 
      content: t.chat.welcome + "\n\n🤝 मैं आपकी पूरी legal history और documents को समझता हूं। DigiLocker से आपके documents भी fetch कर सकता हूं।" 
    }
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Add user message to chat
      const newUserMessage = { role: 'user', content: message };
      setChatHistory(prev => [...prev, newUserMessage]);
      
      // Simulate AI response
      setTimeout(() => {
        // Simulate intelligent case analysis
        const isStrongCase = message.toLowerCase().includes('court') || 
                           message.toLowerCase().includes('lawyer') || 
                           message.toLowerCase().includes('case');
        
        let aiResponse;
        if (isStrongCase) {
          aiResponse = {
            role: 'assistant',
            content: `${t.chat.aiResponse} "${message}". 
            
            🔍 **Case Analysis**: आपका case strong लग रहा है। 
            
            📋 **मेरी सलाह**: 
            1. पहले मैं आपको basic guidance दूंगा
            2. अगर case complex है तो verified lawyer से बात करना बेहतर होगा
            
            💡 **Next Steps**: क्या आप चाहते हैं कि मैं आपको lawyer connect करूं?
            
            🔒 **Privacy**: आपकी सारी जानकारी secure है।`
          };
        } else {
          aiResponse = {
            role: 'assistant',
            content: `${t.chat.aiHelp} 
            
            📝 **समझ गया**: "${message}"
            
            🎯 **मेरा analysis**: यह एक सामान्य legal query है। मैं आपको step-by-step guide कर सकता हूं।
            
            📚 **Available Acts**: मेरे पास Indian legal acts की पूरी जानकारी है।
            
            💬 **बात करते रहिए**: कोई भी doubt हो तो पूछिए, मैं यहीं हूं!`
          };
        }
        
        // Simulate intelligent case analysis
        const isStrongCase = message.toLowerCase().includes('court') || 
                           message.toLowerCase().includes('lawyer') || 
                           message.toLowerCase().includes('case');
        
        let aiResponse;
        if (isStrongCase) {
          aiResponse = {
            role: 'assistant',
            content: `${t.chat.aiResponse} "${message}". 
            
            🔍 **Case Analysis**: आपका case strong लग रहा है। 
            
            📋 **मेरी सलाह**: 
            1. पहले मैं आपको basic guidance दूंगा
            2. अगर case complex है तो verified lawyer से बात करना बेहतर होगा
            
            💡 **Next Steps**: क्या आप चाहते हैं कि मैं आपको lawyer connect करूं?
            
            🔒 **Privacy**: आपकी सारी जानकारी secure है।`
          };
        } else {
          aiResponse = {
            role: 'assistant',
            content: `${t.chat.aiHelp} 
            
            📝 **समझ गया**: "${message}"
            
            🎯 **मेरा analysis**: यह एक सामान्य legal query है। मैं आपको step-by-step guide कर सकता हूं।
            
            📚 **Available Acts**: मेरे पास Indian legal acts की पूरी जानकारी है।
            
            💬 **बात करते रहिए**: कोई भी doubt हो तो पूछिए, मैं यहीं हूं!`
          };
        }
        
        setChatHistory(prev => [...prev, aiResponse]);
        showToast(t.chat.responseReceived);
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

export default FloatingChat;