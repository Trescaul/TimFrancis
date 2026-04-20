
import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, Wand2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface AICompanionProps {
  isOpen: boolean;
  onClose: () => void;
}

const AICompanion: React.FC<AICompanionProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result = await geminiService.getPostSuggestions(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: result || "Sorry, I couldn't help with that." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Service temporarily unavailable." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-96 bg-zinc-950 border-l border-zinc-800 z-[100] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-500" size={20} />
          <h2 className="font-bold">TF Assistant</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-100">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 text-zinc-500">
            <Bot size={48} className="mb-4 opacity-20" />
            <p className="text-sm">I'm your AI content strategist. Ask me to help with post ideas, hashtags, or engagement tips!</p>
            <div className="mt-6 w-full space-y-2">
              <button 
                onClick={() => setInput("Suggest a post about a new product launch")}
                className="w-full text-left p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs hover:border-blue-500 transition-all"
              >
                "Help me write a product launch post"
              </button>
              <button 
                onClick={() => setInput("How can I increase my followers?")}
                className="w-full text-left p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs hover:border-blue-500 transition-all"
              >
                "Tips for follower growth"
              </button>
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl text-xs max-w-[90%] whitespace-pre-wrap ${
              m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 p-3 rounded-2xl animate-pulse">
              <div className="w-4 h-4 rounded-full border-2 border-t-blue-500 border-zinc-700 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-zinc-800">
        <div className="relative">
          <input 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI assistant..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm focus:border-blue-500 outline-none transition-all"
          />
          <button 
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AICompanion;
