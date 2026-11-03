import React from 'react';
import { Sparkles, ShieldCheck, Zap, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActivePage, theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`border-t py-12 mt-20 transition-colors duration-200 ${
        isDark ? 'border-slate-800 bg-slate-950 text-slate-300' : 'border-slate-200 bg-white text-slate-700 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span
                className={`font-black text-xl tracking-tight ${
                  isDark ? 'text-white' : 'text-slate-950'
                }`}
              >
                JOB FIT AI
              </span>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-md ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              단순한 채용 공고 검색을 넘어, 사용자의 기술 스택과 프로젝트 경험을 분석하여
              직무 적합도, 예상 합격 가능성, 구체적인 역량 개선 로드맵을 제공하는 AI 취업 분석 플랫폼입니다.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <span className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-300">
                <Zap className="w-4 h-4 text-amber-500" />
                Gemini AI 정밀 추론 엔진 탑재
              </span>
              <span className="flex items-center gap-1.5 font-semibold text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                개인정보 브라우저 로컬 안전 보관
              </span>
            </div>
          </div>

          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-wider mb-3.5 ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}
            >
              주요 기능
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => setActivePage('profile')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  내 스펙 등록 & 역량 진단
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('job-input')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  채용 공고 직무 적합도 분석
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('history')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  분석 기록 및 리포트 열람
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePage('compare')}
                  className="hover:text-indigo-600 transition-colors"
                >
                  2개 기업 공고 핏 비교 분석
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-wider mb-3.5 ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}
            >
              분석 기준 & 안내
            </h4>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              본 서비스는 무작정 지원하는 비효율적인 구직 활동을 방지하고, 데이터에 기반하여 자신의 경쟁력을 파악할 수 있도록 돕는 커리어 멘토링 도구입니다.
            </p>
          </div>
        </div>

        {/* Disclaimer Notice Box */}
        <div
          className={`border rounded-xl p-4 flex items-start gap-3 text-xs leading-relaxed mb-8 ${
            isDark
              ? 'border-slate-800 bg-slate-900/60 text-slate-400'
              : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}
        >
          <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            <strong className={isDark ? 'text-slate-200 font-bold' : 'text-slate-800 font-bold'}>
              분석 결과 안내 및 유의사항:
            </strong>{' '}
            JOB FIT AI가 제공하는 직무 적합도 점수 및 예상 합격 가능성 지표는 사용자가 입력한 역량 정보와 채용 공고의 요구사항을 기반으로 한 AI 추론 참고 지표입니다. 실제 기업의 서류 및 면접 전형 결과는 경쟁률, 인성 평가, 비공개 인사 기준 등에 따라 달라질 수 있습니다.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row items-center justify-between text-xs pt-6 border-t ${
            isDark ? 'border-slate-800 text-slate-500' : 'border-slate-200 text-slate-500'
          }`}
        >
          <p>© 2026 JOB FIT AI. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-medium">지원하기 전에, 나의 경쟁력을 먼저 확인하세요.</p>
        </div>
      </div>
    </footer>
  );
};
