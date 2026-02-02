'use client';

import { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { FiSend, FiPaperclip, FiImage, FiSmile, FiMoreVertical, FiPhone, FiVideo, FiSearch } from 'react-icons/fi';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  time: string;
  read: boolean;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

const conversations: Conversation[] = [
  {
    id: 1,
    name: 'Customer Support',
    avatar: 'CS',
    lastMessage: 'Your order has been picked up!',
    time: '2 min ago',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Delivery Agent - John',
    avatar: 'JD',
    lastMessage: 'I\'m on my way to your location',
    time: '1 hour ago',
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: 'Billing Support',
    avatar: 'BS',
    lastMessage: 'Your refund has been processed',
    time: 'Yesterday',
    unread: 0,
    online: false,
  },
];

const initialMessages: Message[] = [
  {
    id: 1,
    text: 'Hello! How can I help you today?',
    sender: 'support',
    time: '10:00 AM',
    read: true,
  },
  {
    id: 2,
    text: 'Hi! I have a question about my recent order #12345',
    sender: 'user',
    time: '10:02 AM',
    read: true,
  },
  {
    id: 3,
    text: 'Of course! I can see your order. It\'s currently being processed and will be delivered tomorrow between 2-4 PM.',
    sender: 'support',
    time: '10:03 AM',
    read: true,
  },
  {
    id: 4,
    text: 'Can I change the delivery time?',
    sender: 'user',
    time: '10:05 AM',
    read: true,
  },
  {
    id: 5,
    text: 'Yes, you can! I\'ve updated your delivery window to 4-6 PM. Is there anything else I can help with?',
    sender: 'support',
    time: '10:06 AM',
    read: true,
  },
];

const ChatPage = () => {
  const [activeConversation, setActiveConversation] = useState(1);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate support response
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        text: 'Thanks for your message! Our team will get back to you shortly.',
        sender: 'support',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const activeChat = conversations.find(c => c.id === activeConversation);

  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-[calc(100vh-200px)] min-h-[500px]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className={`w-full md:w-80 border-e border-gray-100 dark:border-gray-700 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            {/* Search Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-lg font-bold text-[#0F2744] dark:text-white mb-3">Messages</h2>
              <div className="relative">
                <FiSearch className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-[#0F7BA0]"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations
                .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => {
                    setActiveConversation(conversation.id);
                    setShowMobileChat(true);
                  }}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-start rtl:text-right ${
                    activeConversation === conversation.id ? 'bg-[#0F7BA0]/10' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#0F2744] dark:bg-[#0F7BA0] flex items-center justify-center text-white font-semibold">
                      {conversation.avatar}
                    </div>
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 rtl:left-0 rtl:right-auto w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-[#0F2744] dark:text-white truncate">
                        {conversation.name}
                      </p>
                      <span className="text-xs text-gray-400">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="w-5 h-5 flex items-center justify-center bg-[#0F7BA0] text-white text-xs rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${!showMobileChat ? 'hidden md:flex' : 'flex'}`}>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowMobileChat(false)}
                  className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  ←
                </button>
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#0F2744] dark:bg-[#0F7BA0] flex items-center justify-center text-white font-semibold text-sm">
                    {activeChat?.avatar}
                  </div>
                  {activeChat?.online && (
                    <span className="absolute bottom-0 right-0 rtl:left-0 rtl:right-auto w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                  )}
                </div>
                <div>
                  <p className="font-medium text-[#0F2744] dark:text-white">{activeChat?.name}</p>
                  <p className="text-xs text-green-500">{activeChat?.online ? 'Online' : 'Offline'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                  <FiPhone className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                  <FiVideo className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                  <FiMoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-[#0F7BA0] text-white rounded-br-md rtl:rounded-br-2xl rtl:rounded-bl-md'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm rounded-bl-md rtl:rounded-bl-2xl rtl:rounded-br-md'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/70' : 'text-gray-400'
                    }`}>
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                  <FiPaperclip className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                  <FiImage className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:border-[#0F7BA0] pr-10 rtl:pr-4 rtl:pl-10"
                  />
                  <button className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <FiSmile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-3 bg-[#0F7BA0] text-white rounded-full hover:bg-[#0d6a8c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ChatPage;
