import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  User,
  FileSearch,
  History,
  GitCompare,
  LayoutDashboard,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    profile,
    profileCompletionPercentage,
    analysisResults,
    compareIds,
    theme,
    toggleTheme,
  } = useApp();

  const isDark = theme === 'dark';

  const navItems = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'profile', label: '내 스펙 관리', icon: User },
    { id: 'job-input', label: '채용 공고 분석', icon: FileSearch },
    {
      id: 'history',
      label: '분석 기록',
      icon: History,
      badge: analysisResults.length > 0 ? analysisResults.length : undefined,
    },
    {
      id: 'compare',
      label: '공고 비교 분석',
      icon: GitCompare,
      badge: compareIds.length > 0 ? `${compareIds.length}/2` : undefined,
    },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-200 ${
        isDark
          ? 'border-slate-800 bg-slate-950/90'
          : 'border-slate-200 bg-white/95 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-black text-xl tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
                JOB FIT
              </span>
              <span className="text-[11px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-600 text-white tracking-wider uppercase">
                AI
              </span>
            </div>
            <p
              className={`text-[11px] tracking-tight hidden sm:block font-medium ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              AI 직무 적합도 & 취업 분석 플랫폼
            </p>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id as any)}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? isDark
                      ? 'text-white bg-slate-800 border border-slate-700'
                      : 'text-indigo-700 bg-indigo-50 border border-indigo-200'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? isDark
                        ? 'text-indigo-400'
                        : 'text-indigo-600'
                      : isDark
                      ? 'text-slate-400'
                      : 'text-slate-500'
                  }`}
                />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 border border-slate-700'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            className={`p-2 rounded-xl border transition-all ${
              isDark
                ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800 hover:text-amber-300'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Spec Status Pill */}
          <button
            onClick={() => setActivePage('profile')}
            title="내 스펙 확인 및 수정"
            className={`hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border transition-all text-xs ${
              isDark
                ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200'
                : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800 shadow-xs'
            }`}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="text-left font-medium">
              <span>{profile.name}</span>
              <span className="text-slate-500 ml-1 font-mono font-semibold">({profileCompletionPercentage}%)</span>
            </div>
          </button>

          {/* Quick CTA Button */}
          <button
            onClick={() => setActivePage('job-input')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all active:scale-95"
          >
            <span>분석 시작</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div
        className={`md:hidden flex items-center justify-around border-t px-2 py-2.5 transition-colors ${
          isDark ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'
        }`}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as any)}
              className={`flex flex-col items-center gap-1 py-1 px-2 text-[11px] font-semibold rounded-lg ${
                isActive
                  ? isDark
                    ? 'text-indigo-400 font-bold'
                    : 'text-indigo-600 font-bold'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-slate-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
