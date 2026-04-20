
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Eye, 
  Award,
  Zap
} from 'lucide-react';

const DATA = [
  { name: 'Mon', reach: 4000, earnings: 240 },
  { name: 'Tue', reach: 3000, earnings: 139 },
  { name: 'Wed', reach: 2000, earnings: 980 },
  { name: 'Thu', reach: 2780, earnings: 390 },
  { name: 'Fri', reach: 1890, earnings: 480 },
  { name: 'Sat', reach: 2390, earnings: 380 },
  { name: 'Sun', reach: 3490, earnings: 430 },
];

const CreatorDashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Creator Hub</h1>
          <p className="text-zinc-400">Track your performance and monetization</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-blue-700 transition-all">
          <Zap size={18} />
          Boost Content
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Earnings', value: '$2,480.00', change: '+12.5%', icon: DollarSign, color: 'text-green-500' },
          { label: 'Total Followers', value: '18.2K', change: '+240', icon: Users, color: 'text-blue-500' },
          { label: 'Engagement Rate', value: '5.2%', change: '+0.4%', icon: TrendingUp, color: 'text-purple-500' },
          { label: 'Profile Views', value: '42.1K', change: '+18%', icon: Eye, color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl">
            <div className="flex justify-between mb-4">
              <div className={`p-2 rounded-lg bg-zinc-800 ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs font-semibold text-green-500">{stat.change}</span>
            </div>
            <p className="text-zinc-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6">Reach Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DATA}>
                <defs>
                  <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="reach" stroke="#3b82f6" fillOpacity={1} fill="url(#colorReach)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold mb-6">Top Monetization Sources</h3>
          <div className="flex-1 space-y-6">
            {[
              { label: 'Direct Sponsorships', value: '$1,200', progress: 75, color: 'bg-blue-500' },
              { label: 'Ad Revenue', value: '$840', progress: 50, color: 'bg-green-500' },
              { label: 'Fan Tips', value: '$440', progress: 30, color: 'bg-purple-500' },
            ].map((source, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">{source.label}</span>
                  <span className="font-semibold">{source.value}</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${source.color} transition-all duration-1000`} 
                    style={{ width: `${source.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 bg-zinc-800 text-zinc-300 rounded-xl font-medium hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2">
            <Award size={18} />
            View Creator Perks
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
