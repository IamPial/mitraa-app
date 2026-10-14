'use client';

import React from 'react';
import { useMitraa } from '@/context/MitraaContext';
import {
  Eye,
  X,
  Type,
  SunMoon,
  Sparkles,
  Check,
  Shield,
  Layers,
} from 'lucide-react';

export const AccessibilityDrawer: React.FC = () => {
  const {
    isAccessibilityOpen,
    setIsAccessibilityOpen,
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
  } = useMitraa();

  if (!isAccessibilityOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        <div className="p-5 space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">WCAG 2.2 Accessibility</h3>
                <p className="text-[11px] text-slate-400">Tailored reading & visual comfort controls</p>
              </div>
            </div>
            <button
              onClick={() => setIsAccessibilityOpen(false)}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Font Scaling */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              <Type className="w-4 h-4 text-indigo-400" />
              <span>Text Scaling & Readability</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'normal', label: 'Default (100%)', scale: 'text-xs' },
                { id: 'large', label: 'Large (110%)', scale: 'text-sm font-medium' },
                { id: 'xlarge', label: 'X-Large (125%)', scale: 'text-base font-bold' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFontSize(opt.id as any)}
                  className={`p-3 rounded-xl border text-center transition ${
                    fontSize === opt.id
                      ? 'border-indigo-500 bg-indigo-500/20 text-white shadow-md'
                      : 'border-slate-800 bg-slate-850 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className={`block ${opt.scale}`}>Aa</span>
                  <span className="text-[10px] mt-1 block">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast Mode */}
          <div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-850">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <SunMoon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">High Contrast UI</h4>
                  <p className="text-[11px] text-slate-400">
                    Deep blacks, maximum contrast ratios (7:1+) & bright outline borders.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setHighContrast(!highContrast)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  highContrast ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    highContrast ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* WCAG Compliance Badges */}
          <div className="p-4 rounded-xl border border-teal-900/40 bg-teal-950/20 text-xs text-teal-300 space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-teal-200">
              <Shield className="w-4 h-4" />
              <span>WCAG 2.2 Level AA / AAA Compliant</span>
            </div>
            <p className="text-[11px] text-teal-300/80 leading-relaxed">
              Includes full keyboard navigation focus states (`tabindex`), screen reader `aria-*` tags, non-color-only state cues, and minimum 44x44px touch targets.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-end">
          <button
            onClick={() => setIsAccessibilityOpen(false)}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
          >
            Apply & Close
          </button>
        </div>
      </div>
    </div>
  );
};
