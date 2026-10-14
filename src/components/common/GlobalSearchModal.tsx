'use client';

import React, { useState } from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  Search,
  X,
  BookOpen,
  Calendar,
  FileText,
  User,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, setActiveTab, currentRole } = useMitraa();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const searchableItems = [
    { title: 'Mathematics (Calculus) Timetable', type: 'Timetable', tab: 'timetable', icon: <Calendar className="w-4 h-4 text-indigo-400" /> },
    { title: 'Differential Equations and Rate of Change', type: 'Assignment', tab: 'assignments', icon: <FileText className="w-4 h-4 text-emerald-400" /> },
    { title: 'Electromagnetic Induction & Faraday’s Laws', type: 'Assignment', tab: 'assignments', icon: <FileText className="w-4 h-4 text-emerald-400" /> },
    { title: 'Term 1 Mid-Semester Comprehensive Mathematics', type: 'Examination', tab: 'examinations', icon: <BookOpen className="w-4 h-4 text-purple-400" /> },
    { title: 'PracticePod Calculus Integration Booster', type: 'Practice', tab: 'practice_pod', icon: <GraduationCap className="w-4 h-4 text-amber-400" /> },
    { title: 'Aarav Sharma - Student Record', type: 'Student', tab: 'home', icon: <User className="w-4 h-4 text-cyan-400" /> },
    { title: 'Prof. Ananya Sen (Mathematics Faculty)', type: 'Teacher', tab: 'communication', icon: <User className="w-4 h-4 text-rose-400" /> },
  ];

  const filtered = searchableItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.type.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (tab: string) => {
    setActiveTab(tab);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across students, classes, exams, assignments & content..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-2 max-h-96 overflow-y-auto">
          <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Quick Results ({filtered.length})
          </div>
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No results found for "{query}". Try searching for 'calculus', 'exam', or 'assignment'.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item.tab)}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 cursor-pointer transition group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-200 group-hover:text-white">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400">{item.type}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition" />
              </div>
            ))
          )}
        </div>

        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Global tenant index: Apex Education Group</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
