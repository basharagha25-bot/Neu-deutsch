import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Home, Settings, Bookmark, MessageCircle } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass-panel sticky top-0 z-50 px-6 py-4 mb-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
          N
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Neu A2
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <NavLink to="/" icon={<Home size={20} />} text="Home" />
        <NavLink to="/dashboard" icon={<BookOpen size={20} />} text="Kurs" />
        <NavLink to="/vocabulary" icon={<Bookmark size={20} />} text="Wortschatz" />
        <NavLink to="/conversations" icon={<MessageCircle size={20} />} text="Gespräche" />
        <NavLink to="/settings" icon={<Settings size={20} />} text="Settings" />
      </div>
    </nav>
  );
}

function NavLink({ to, icon, text }) {
  return (
    <Link 
      to={to} 
      className="flex items-center gap-2 text-slate-600 hover:text-blue-500 transition-colors font-medium"
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
