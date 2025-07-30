import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../utils/AuthContext';
import {
  getMessagesByCaseId,
  createConversationMessage,
  getLegalCaseById
} from '../models/services';
import { ConversationMessageModel, LegalCaseModel } from '../models/index';
import { Send, Paperclip, Clock } from 'lucide-react';

interface ConversationManagerProps {
  t: any;
  showToast: (message: string) => void;
  caseId: string;
}

export const ConversationManager: React.FC<ConversationManagerProps> = ({ t, showToast, caseId }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ConversationMessageModel[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [caseDetails, setCaseDetails] = useState<LegalCaseModel | null>(null);
  const [otherPartyId, setOtherPartyId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (caseId && user) {
      fetchCaseDetails();
      fetchMessages();
    }
  }, [caseId, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchCaseDetails = async () => {
    try {
      const fetchedCase = await getLegalCaseById(caseId);
      setCaseDetails(fetchedCase);
      
      // Determine the other party ID based on user role
      if (user?.role === 'user') {
        setOtherPartyId(fetchedCase.lawyerId || '');
      } else if (user?.role === 'lawyer') {
        setOtherPartyId(fetchedCase.clientId);
      }
    } catch (error) {
      console.error('Error fetching case details:', error);
      showToast(t.conversationManager.errorFetchingCaseDetails);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const fetchedMessages = await getMessagesByCaseId(caseId);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      showToast(t.conversationManager.errorFetchingMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !otherPartyId) return;

    try {
      const messageData = {
        content: newMessage.trim(),
        caseId: caseId,
        senderId: user.id,
        receiverId: otherPartyId,
        isRead: false
      };

      await addConversationMessage(messageData);
      setNewMessage('');
      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error('Error sending message:', error);
      showToast(t.conversationManager.errorSendingMessage);
    }
  };

  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return '';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return new Intl.DateTimeFormat('default', {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'short'
    }).format(date);
  };

  if (loading && messages.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="p-4 bg-gray-100 border-b">
        <h3 className="font-semibold text-gray-800">
          {caseDetails?.title ? t.conversationManager.conversationAbout + caseDetails.title : t.conversationManager.conversation}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ maxHeight: '400px' }}>
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">{t.conversationManager.noMessages}</p>
            <p className="text-gray-500 text-sm mt-1">{t.conversationManager.startConversation}</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3/4 rounded-lg p-3 ${message.senderId === user?.id ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'}`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs text-gray-500 mt-1 flex items-center">
                  {formatTimestamp(message.sentAt)}
                  {message.senderId === user?.id && (
                    <span className="ml-2 flex items-center">
                      {message.isRead ? (
                        <span className="text-blue-600">{t.conversationManager.read}</span>
                      ) : (
                        <span>{t.conversationManager.sent}</span>
                      )}
                    </span>
                  )}
                </div>
                {message.attachmentUrl && (
                  <div className="mt-2">
                    <a
                      href={message.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <Paperclip className="w-3 h-3 mr-1" />
                      {t.conversationManager.attachment}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t.conversationManager.typeMessage}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors disabled:bg-blue-300"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConversationManager;