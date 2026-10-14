'use client';

import React from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notices, setActiveTab } = useMitraa();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-white text-base">Institutional Notifications</h3>
            </div>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 space-y-3 max-h-[80vh] overflow-y-auto">
            {notices.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  setActiveTab('notices');
                  setIsNotificationsOpen(false);
                }}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-850 hover:bg-slate-800 cursor-pointer transition relative group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    {n.category}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {n.date}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-200 group-hover:text-indigo-300 transition">
                  {n.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{n.content}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Audience: {n.targetAudience.join(', ')}</span>
                  <span className="text-indigo-400 font-medium">View notice →</span>
                </div>
              </div>
            ))}

            <div className="p-3.5 rounded-xl border border-indigo-900/40 bg-indigo-950/20 text-xs text-indigo-300 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-indigo-200">System Notification Sync</p>
                <p className="text-[11px] text-indigo-300/80 mt-0.5">
                  High-priority broadcast messages are delivered directly via real-time WebSocket channels with WCAG notification alerts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveTab('notices');
              setIsNotificationsOpen(false);
            }}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Go to Full Notice Board
          </button>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="text-xs text-slate-400 hover:text-white"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
