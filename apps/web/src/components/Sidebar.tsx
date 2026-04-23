import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlayCircle, 
  BookOpen, 
  Trophy, 
  Settings, 
  User,
  LogOut
} from 'lucide-react';
import { clsx } from 'clsx';
import { useAuthStore } from '../store/authStore';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: PlayCircle, label: 'Play Game', path: '/play' },
  { icon: BookOpen, label: 'Learn', path: '/learn' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export const Sidebar = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="w-64 h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col p-6 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <PlayCircle className="text-primary-foreground" />
        </div>
        <span className="text-xl font-black tracking-tighter text-primary">CHESS.AI</span>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => clsx(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold",
              isActive 
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
          >
            <item.icon size={20} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-2">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center">
            <span className="text-[10px] font-black">{user?.username?.[0].toUpperCase()}</span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs font-bold truncate">{user?.username}</span>
            <span className="text-[10px] text-primary">1240 ELO</span>
          </div>
        </div>
        
        <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors">
          <Settings size={20} />
          Settings
        </button>

        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors font-bold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};
