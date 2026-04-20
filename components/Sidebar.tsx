
import React from 'react';
import { 
  Home, 
  Search, 
  Video, 
  MessageSquare, 
  Bell, 
  User, 
  BarChart3, 
  Settings,
  PlusCircle,
  Zap
} from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { name: 'Home' as AppView, icon: Home },
    { name: 'Explore' as AppView, icon: Search },
    { name: 'Reels' as AppView, icon: Video },
    { name: 'Messages' as AppView, icon: MessageSquare },
    { name: 'Notifications' as AppView, icon: Bell },
    { name: 'Creator' as AppView, icon: BarChart3 },
    { name: 'Profile' as AppView, icon: User },
    { name: 'Settings' as AppView, icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen border-r border-zinc-800 p-4 flex flex-col fixed left-0 top-0 bg-zinc-950 z-50">
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <Zap size={24} className="text-white fill-current" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">TimFrancis</h1>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setView(item.name)}
            className={`w-full flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all ${
              currentView === item.name 
              ? 'bg-zinc-900 text-blue-500 font-semibold' 
              : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
            }`}
          >
            <item.icon size={22} />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <button className="mt-auto flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:opacity-90 transition-opacity">
        <PlusCircle size={20} />
        <span>Create Post</span>
      </button>
    </aside>
  );
};

export default Sidebar;
