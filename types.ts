
export type AppView = 'Home' | 'Explore' | 'Reels' | 'Messages' | 'Notifications' | 'Profile' | 'Creator' | 'Settings';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified: boolean;
  bio: string;
  followers: number;
  following: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  mediaUrl?: string;
  type: 'text' | 'image' | 'video';
  likes: number;
  comments: number;
  timestamp: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMine: boolean;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  unread: number;
}
