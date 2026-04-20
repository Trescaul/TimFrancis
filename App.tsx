
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Messages from './components/Messages';
import CreatorDashboard from './components/CreatorDashboard';
import AICompanion from './components/AICompanion';
import { AppView } from './types';
import { 
  Search, 
  Bell, 
  Plus, 
  Sparkles, 
  Menu,
  ShieldCheck,
  Globe,
  Database,
  Smartphone
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('Home');
  const [isAISidebarOpen, setIsAISidebarOpen] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'Home':
        return <Feed />;
      case 'Messages':
        return <Messages />;
      case 'Creator':
        return <CreatorDashboard />;
      case 'Explore':
        return (
          <div className="p-8 text-center mt-20">
            <h2 className="text-3xl font-bold mb-4">Discover Trends</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden relative group">
                  <img src={`https://picsum.photos/seed/explore${i}/400/400`} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="font-bold">Trending #{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'Reels':
        return (
          <div className="h-[calc(100vh-64px)] overflow-y-auto reel-container">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-full w-full flex items-center justify-center reel-item bg-zinc-900 border-b border-zinc-800 relative">
                <img src={`https://picsum.photos/seed/reel${i}/600/1000`} className="h-full w-auto object-cover shadow-2xl" />
                <div className="absolute bottom-10 right-10 flex flex-col gap-6 text-white">
                  <button className="flex flex-col items-center gap-1"><div className="p-3 bg-zinc-800/50 rounded-full backdrop-blur-md">❤️</div><span>{2.1 + i}k</span></button>
                  <button className="flex flex-col items-center gap-1"><div className="p-3 bg-zinc-800/50 rounded-full backdrop-blur-md">💬</div><span>{12 + i}</span></button>
                  <button className="flex flex-col items-center gap-1"><div className="p-3 bg-zinc-800/50 rounded-full backdrop-blur-md">↗️</div><span>Share</span></button>
                </div>
                <div className="absolute bottom-10 left-10 max-w-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`https://picsum.photos/seed/user${i}/50/50`} className="w-10 h-10 rounded-full border-2 border-white" />
                    <span className="font-bold">@creator_{i+1}</span>
                    <button className="bg-white text-black px-4 py-1 rounded-full text-xs font-bold">Follow</button>
                  </div>
                  <p className="text-sm text-zinc-200">Exploring the new TimFrancis ecosystem features! #viral #tech</p>
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-zinc-500">
            {currentView} view coming soon
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 ml-64 min-h-screen">
        {/* Top Navbar */}
        <header className="h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1">
            <div className="relative max-w-md w-full">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search TimFrancis..." 
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
              <button onClick={() => setShowArchitecture(true)} className="hover:text-zinc-100 transition-colors">Architecture</button>
              <button className="hover:text-zinc-100 transition-colors">Live</button>
              <button className="hover:text-zinc-100 transition-colors">Events</button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsAISidebarOpen(true)}
              className="p-2 hover:bg-zinc-900 rounded-full text-blue-500 transition-colors relative"
            >
              <Sparkles size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-zinc-900 rounded-full text-zinc-400 transition-colors">
              <Bell size={22} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 cursor-pointer overflow-hidden border border-zinc-800">
              <img src="https://picsum.photos/seed/me/100/100" />
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="pb-20">
          {renderContent()}
        </div>
      </main>

      <AICompanion 
        isOpen={isAISidebarOpen} 
        onClose={() => setIsAISidebarOpen(false)} 
      />

      {/* Tech Architecture Modal */}
      {showArchitecture && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-6" onClick={() => setShowArchitecture(false)}>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-4xl w-full p-8 overflow-y-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Technical Architecture</h2>
                <p className="text-zinc-400">TimFrancis Global Scaling Framework</p>
              </div>
              <button onClick={() => setShowArchitecture(false)} className="p-2 hover:bg-zinc-800 rounded-full">
                <Menu size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-2xl h-fit">
                    <Database className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Distributed Databases</h3>
                    <p className="text-sm text-zinc-400">PostgreSQL with Citus for relational data, ScyllaDB for high-throughput messaging feeds, and Redis for real-time state.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-green-500/10 rounded-2xl h-fit">
                    <ShieldCheck className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Security & Privacy</h3>
                    <p className="text-sm text-zinc-400">End-to-End Encryption (E2EE) for all private messages using the Signal Protocol. OAuth2.0 and WebAuthn for biometric logins.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-2xl h-fit">
                    <Globe className="text-purple-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Global Delivery</h3>
                    <p className="text-sm text-zinc-400">Multi-region Edge computing via Cloudflare Workers and AWS CloudFront for low-latency media delivery globally.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-2xl h-fit">
                    <Smartphone className="text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Cross-Platform Stack</h3>
                    <p className="text-sm text-zinc-400">Core backend in Go and Rust for performance. Frontend using React and Flutter for seamless native experiences on iOS/Android.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-blue-600 rounded-2xl text-center">
              <h4 className="font-bold mb-2">Ready to Scale to 1 Billion Users</h4>
              <p className="text-blue-100 text-sm mb-4">Our modular microservices architecture allows independent scaling of Feed, Messenger, and AI services.</p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold">Download Tech Specs</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation (Floating Bottom Bar) */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-full px-6 py-3 flex md:hidden items-center gap-8 z-50">
        <button onClick={() => setCurrentView('Home')} className={currentView === 'Home' ? 'text-blue-500' : 'text-zinc-500'}>
          <Globe size={24} />
        </button>
        <button onClick={() => setCurrentView('Reels')} className={currentView === 'Reels' ? 'text-blue-500' : 'text-zinc-500'}>
          <Plus size={24} className="bg-blue-600 text-white rounded-full p-0.5" />
        </button>
        <button onClick={() => setCurrentView('Messages')} className={currentView === 'Messages' ? 'text-blue-500' : 'text-zinc-500'}>
          <Menu size={24} />
        </button>
      </nav>
    </div>
  );
};

export default App;
