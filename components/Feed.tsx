
import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  CheckCircle2
} from 'lucide-react';
import { Post } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'tim1',
    userName: 'Tim Francis',
    userAvatar: 'https://picsum.photos/seed/tim/100/100',
    content: "Just launched the first professional social ecosystem. This is the future of connectivity. Join the movement! 🚀 #TimFrancis #NextGenSocial",
    mediaUrl: 'https://picsum.photos/seed/tech/800/450',
    type: 'image',
    likes: 1240,
    comments: 89,
    timestamp: '2h ago'
  },
  {
    id: '2',
    userId: 'sarah',
    userName: 'Sarah Jenkins',
    userAvatar: 'https://picsum.photos/seed/sarah/100/100',
    content: "The real-time collaboration tools on this platform are insane. Never going back to old social apps.",
    type: 'text',
    likes: 452,
    comments: 12,
    timestamp: '4h ago'
  }
];

const Feed: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Stories */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer">
            <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600">
              <img 
                src={`https://picsum.photos/seed/user${i}/100/100`} 
                className="w-full h-full rounded-full border-2 border-zinc-950 object-cover"
                alt="Story"
              />
            </div>
            <span className="text-xs text-zinc-400">User {i + 1}</span>
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {MOCK_POSTS.map((post) => (
          <div key={post.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={post.userAvatar} className="w-10 h-10 rounded-full object-cover" alt={post.userName} />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{post.userName}</span>
                    <CheckCircle2 size={14} className="text-blue-500 fill-current" />
                  </div>
                  <span className="text-xs text-zinc-500">{post.timestamp}</span>
                </div>
              </div>
              <button className="text-zinc-500 hover:text-zinc-100">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <div className="px-4 pb-3">
              <p className="text-zinc-200 leading-relaxed whitespace-pre-wrap">{post.content}</p>
            </div>

            {post.mediaUrl && (
              <img src={post.mediaUrl} className="w-full object-cover max-h-[500px]" alt="Post content" />
            )}

            <div className="p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-red-500 transition-colors">
                    <Heart size={22} />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-blue-500 transition-colors">
                    <MessageCircle size={22} />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-zinc-400 hover:text-green-500 transition-colors">
                    <Share2 size={22} />
                  </button>
                </div>
                <button className="text-zinc-400 hover:text-zinc-100 transition-colors">
                  <Bookmark size={22} />
                </button>
              </div>
              
              <div className="border-t border-zinc-800 pt-3 flex items-center gap-2">
                <img src="https://picsum.photos/seed/me/100/100" className="w-7 h-7 rounded-full" />
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="bg-transparent text-sm w-full outline-none text-zinc-300 placeholder:text-zinc-600"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
