'use client';

import React from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  HelpCircle,
  X,
  FileQuestion,
  PhoneCall,
  Mail,
  ShieldCheck,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';

export const HelpSupportModal: React.FC = () => {
  const { isHelpOpen, setIsHelpOpen, currentRole } = useMitraa();

  if (!isHelpOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Help & Support Desk</h3>
              <p className="text-xs text-slate-400">Assistance for {currentRole.toUpperCase()} workflow</p>
            </div>
          </div>
          <button
            onClick={() => setIsHelpOpen(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-850 flex items-start gap-3">
            <FileQuestion className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Interactive User Guide & FAQs</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Learn how to submit assignments, attempt timed exams, book PTM appointments, and review learning gaps.
              </p>
              <button
                onClick={() => alert('Accessing MiTRAA-Edu interactive documentation repository.')}
                className="mt-2 text-xs text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Read documentation</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-850 flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-white">Campus IT Helpdesk</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Issues with login, 2FA recovery, or permission boundaries? Open an institutional ticket with SLA tracking.
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">Toll-free: 1800-MITRAA-EDU • it-support@apex.mitraa.edu</span>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => setIsHelpOpen(false)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
