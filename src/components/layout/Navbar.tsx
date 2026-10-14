'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMitraa } from '@/context/MitraaContext';
import { mockChildren, mockCampuses } from '@/data/mockData';
import { roleThemes } from '@/data/roleThemes';
import { Button, Avatar, AvatarImage, AvatarFallback, Kbd } from '@heroui/react';
import {
  School,
  Search,
  Bell,
  Globe,
  Eye,
  HelpCircle,
  LogOut,
  ChevronDown,
  Layers,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const {
    currentRole,
    currentUser,
    activeChild,
    setActiveChild,
    activeCampus,
    setActiveCampus,
    setIsSearchOpen,
    setIsNotificationsOpen,
    setIsAccessibilityOpen,
    setIsHelpOpen,
    language,
    setLanguage,
    logout,
    notices,
  } = useMitraa();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isChildMenuOpen, setIsChildMenuOpen] = useState(false);
  const [isCampusMenuOpen, setIsCampusMenuOpen] = useState(false);

  const theme = roleThemes[currentRole];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white backdrop-blur-md border-b border-gray-200 px-4 lg:px-6 py-2.5">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & RBAC Scope Hierarchy */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-md flex items-center justify-center">
            <School className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base tracking-tight">MiTRAA–Edu</span>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${theme.chartPillColor} ${theme.chartPillTextColor} shadow-sm`}
              >
                {theme.label}
              </span>
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
              <span>{currentUser.tenantName}</span>
              <span>•</span>
              <span className="text-slate-300 font-medium">
                {currentRole === 'management' ? activeCampus.campusName : currentUser.campusName}
              </span>
              {currentUser.className && (
                <>
                  <span>•</span>
                  <span className={theme.accentText}>{currentUser.className}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Context Selectors */}
        <div className="hidden md:flex items-center gap-3">
          {/* Parent Context: Child Selector */}
          {currentRole === 'parent' && (
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                className="border-pink-500/40 hover:border-pink-500 text-xs text-white h-9 px-3"
                onPress={() => setIsChildMenuOpen(!isChildMenuOpen)}
              >
                <Avatar className="w-5 h-5 text-[10px]">
                  <AvatarImage src={activeChild.avatar} />
                  <AvatarFallback>{activeChild.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-left ml-2">
                  <span className="text-[9px] text-pink-300 block font-semibold leading-none">Active Ward</span>
                  <span className="font-semibold text-xs leading-tight">{activeChild.name} ({activeChild.grade})</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              </Button>

              {isChildMenuOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400">Select Child Context</div>
                  {mockChildren.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => {
                        setActiveChild(child);
                        setIsChildMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg flex items-center justify-between text-xs transition ${
                        activeChild.id === child.id ? 'bg-pink-600/20 text-pink-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div>
                        <div>{child.name}</div>
                        <span className="text-[10px] text-slate-400">{child.grade} - {child.section}</span>
                      </div>
                      {activeChild.id === child.id && <span className="text-pink-400 text-xs">● Active</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Management / Principal Campus Selector */}
          {(currentRole === 'management' || currentRole === 'principal') && (
            <div className="relative">
              <Button
                size="sm"
                variant="outline"
                className="border-slate-700 hover:border-amber-500/50 text-xs text-white h-9 px-3"
                onPress={() => setIsCampusMenuOpen(!isCampusMenuOpen)}
              >
                <Layers className="w-3.5 h-3.5 text-amber-400 mr-1.5" />
                <div className="text-left">
                  <span className="text-[9px] text-amber-300 block font-semibold leading-none">Campus Scope</span>
                  <span className="font-medium text-xs leading-tight">{activeCampus.campusName.split(' ')[1] || 'Campus'}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              </Button>

              {isCampusMenuOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50">
                  <div className="px-2 py-1 text-[10px] uppercase font-bold text-slate-400">Switch Campus Scope</div>
                  {mockCampuses.map((camp) => (
                    <button
                      key={camp.campusId}
                      onClick={() => {
                        setActiveCampus(camp);
                        setIsCampusMenuOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition ${
                        activeCampus.campusId === camp.campusId ? 'bg-amber-600/20 text-amber-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-medium">{camp.campusName}</div>
                      <div className="text-[10px] text-slate-400">{camp.location} • {camp.totalStudents} Students</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Global Common Action Tools */}
        <div className="flex items-center gap-2">
          {/* Global Search Button */}
          <Button
            size="sm"
            variant="ghost"
            className="bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 text-xs h-9 px-3"
            onPress={() => setIsSearchOpen(true)}
          >
            <Search className="w-3.5 h-3.5 text-sky-400 mr-1.5" />
            <span className="hidden sm:inline">Search...</span>
            <Kbd className="hidden lg:inline text-[9px] ml-2">⌘K</Kbd>
          </Button>

          {/* Notifications Bell */}
          <Button
            size="sm"
            variant="ghost"
            className="relative bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 h-9 w-9 p-0 min-w-9"
            onPress={() => setIsNotificationsOpen(true)}
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {notices.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center animate-pulse">
                {notices.length}
              </span>
            )}
          </Button>

          {/* Language Selector */}
          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 h-9 w-9 p-0 min-w-9"
              onPress={() => setIsLangOpen(!isLangOpen)}
              aria-label="Language selection"
            >
              <Globe className="w-4 h-4 text-slate-400" />
            </Button>
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1 z-50">
                {['English', 'Hindi', 'Spanish', 'French'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition ${
                      language === lang ? 'bg-indigo-600/20 text-indigo-300 font-semibold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accessibility (WCAG 2.2) */}
          <Button
            size="sm"
            variant="ghost"
            className="bg-slate-800 hover:bg-slate-750 text-teal-400 hover:text-teal-300 border border-slate-700/60 h-9 w-9 p-0 min-w-9"
            onPress={() => setIsAccessibilityOpen(true)}
            aria-label="Accessibility settings"
          >
            <Eye className="w-4 h-4" />
          </Button>

          {/* Help & Support */}
          <Button
            size="sm"
            variant="ghost"
            className="bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 h-9 w-9 p-0 min-w-9"
            onPress={() => setIsHelpOpen(true)}
            aria-label="Help desk"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>

          {/* User Profile Pill & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <Avatar className="w-8 h-8 border border-slate-700 shrink-0">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-semibold text-white truncate max-w-[120px]">{currentUser.name}</div>
              <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{currentUser.email}</div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="text-slate-400 hover:text-rose-400 h-8 w-8 p-0 min-w-8"
              onPress={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
