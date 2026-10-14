'use client';

import React from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  Home,
  Calendar,
  FileText,
  BookOpen,
  Menu,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsSearchOpen } = useMitraa();

  return (
    <div className="md:hidden fixed bottom-14 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-4 py-2 flex items-center justify-around">
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center gap-1 text-[10px] ${
          activeTab === 'home' ? 'text-indigo-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setActiveTab('timetable')}
        className={`flex flex-col items-center gap-1 text-[10px] ${
          activeTab === 'timetable' ? 'text-indigo-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span>Timetable</span>
      </button>

      <button
        onClick={() => setActiveTab('assignments')}
        className={`flex flex-col items-center gap-1 text-[10px] ${
          activeTab === 'assignments' ? 'text-indigo-400 font-bold' : 'text-slate-400'
        }`}
      >
        <FileText className="w-5 h-5" />
        <span>Tasks</span>
      </button>

      <button
        onClick={() => setActiveTab('examinations')}
        className={`flex flex-col items-center gap-1 text-[10px] ${
          activeTab === 'examinations' ? 'text-indigo-400 font-bold' : 'text-slate-400'
        }`}
      >
        <BookOpen className="w-5 h-5" />
        <span>Exams</span>
      </button>

      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center gap-1 text-[10px] text-slate-400"
      >
        <Menu className="w-5 h-5" />
        <span>Search</span>
      </button>
    </div>
  );
};
