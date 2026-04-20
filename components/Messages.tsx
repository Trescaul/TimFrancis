
import React, { useState } from 'react';
import { 
  Search, 
  Settings, 
  Edit, 
  Send, 
  Image, 
  Paperclip, 
  Mic, 
  Video, 
  Phone,
  MessageSquare 
} from 'lucide-react';
import { Chat, Message } from '../types';

const MOCK_CHATS: Chat[] = [
  {
    id: 'c1',
    user: { id: 'u1', name: 'Alex Rivera', username: 'arivera', avatar: 'https://picsum.photos/seed/alex/100/100', isVerified: true, bio: '', followers: 0, following: 0 },
    lastMessage: 'Let\'s catch up later tonight.',
    unread: 2
  },
  {
    id: 'c2',
    user: { id: 'u2', name: 'Dev Team', username: 'devs', avatar: 'https://picsum.photos/seed/dev/100/100', isVerified: false, bio: '', followers: 0, following: 0 },
    lastMessage: 'The build is ready for testing.',
    unread: 0
  }
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'u1', text: 'Hey, did you see the new feature update?', timestamp: '10:30 AM', isMine: false },
  { id: 'm2', senderId: 'me', text: 'Yeah! The AI assistant is a game changer.', timestamp: '10:32 AM', isMine: true },
  { id: 'm3', senderId: 'u1', text: 'Exactly. We should integrate it into the business tools too.', timestamp: '10:33 AM', isMine: false },
];

const Messages: React.FC = () => {
  const [activeChat, setActiveChat] = useState<Chat | null>(MOCK_CHATS[0]);
  const [inputText, setInputText] = useState('');

  return (
    <div className="h-[calc(100vh-2rem)] flex bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden mt-4 mx-4">
      {/* Chat List */}
      <div className="w-80 border-r border-zinc-800 flex flex-col">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-xl font-bold">Messages</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
              <Edit size={18} />
            </button>
            <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
              <Settings size={18} />
            </button>
          </div>
        </div>
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CHATS.map(chat => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`w-full p-4 flex items-center gap-3 transition-colors hover:bg-zinc-800/50 ${activeChat?.id === chat.id ? 'bg-zinc-800' : ''}`}
            >
              <div className="relative">
                <img src={chat.user.avatar} className="w-12 h-12 rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-zinc-900 rounded-full"></div>
              </div>
              <div className="flex-1 text-left">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm">{chat.user.name}</span>
                  <span className="text-[10px] text-zinc-500">12:30 PM</span>
                </div>
                <p className="text-xs text-zinc-400 truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <div className="bg-blue-600 text-[10px] font-bold text-white min-w-[18px] h-[18px] rounded-full flex items-center justify-center">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      {activeChat ? (
        <div className="flex-1 flex flex-col bg-zinc-950/20">
          <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={activeChat.user.avatar} className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="font-semibold text-sm">{activeChat.user.name}</h3>
                <span className="text-xs text-green-500">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <button className="hover:text-zinc-100"><Phone size={20} /></button>
              <button className="hover:text-zinc-100"><Video size={20} /></button>
              <button className="hover:text-zinc-100"><Search size={20} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {MOCK_MESSAGES.map(msg => (
              <div key={msg.id} className={`flex ${msg.isMine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                  msg.isMine ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-200 rounded-tl-none'
                }`}>
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.isMine ? 'text-blue-100 text-right' : 'text-zinc-500'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-zinc-800">
            <div className="bg-zinc-900 rounded-2xl flex items-center p-2 gap-2">
              <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors">
                <Paperclip size={20} />
              </button>
              <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors">
                <Image size={20} />
              </button>
              <input 
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 bg-transparent py-2 px-2 outline-none text-sm text-zinc-200"
              />
              <button className="p-2 text-zinc-500 hover:text-zinc-100 transition-colors">
                <Mic size={20} />
              </button>
              <button className="p-2.5 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
          {/* Fix: Added missing MessageSquare component and import */}
          <MessageSquare size={48} className="mb-4 opacity-20" />
          <p>Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
