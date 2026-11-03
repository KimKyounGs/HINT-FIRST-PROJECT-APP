import React from 'react';
import { useApp } from '../context/AppContext';
import {
  GitCompare,
  Award,
  Briefcase,
  X,
  ArrowRight,
} from 'lucide-react';
import { ScoreGauge } from '../components/ScoreGauge';

export const ComparePage: React.FC = () => {
  const {
    analysisResults,
    compareIds,
    toggleCompareId,
    clearCompareIds,
    setActivePage,
    setCurrentResult,
    theme,
  } = useApp();
  const isDark = theme === 'dark';

  const comparedItems = analysisResults.filter((item) => compareIds.includes(item.id));

  const cardBase = `rounded-2xl border transition-all ${
    isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white shadow-xs'
  }`;

  if (comparedItems.length < 2) {
    return (
      <div className="py-16 max-w-2xl mx-auto text-center space-y-6">
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border ${
            isDark
              ? 'bg-purple-950 text-purple-300 border-purple-800'
              : 'bg-purple-50 text-purple-700 border-purple-200'
          }`}
        >
          <GitCompare className="w-8 h-8" />
        </div>
        <h2 className={`text-2xl sm:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
          비교할 공고를 2개 선택해주세요
        </h2>
        <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          동일한 내 스펙을 기준으로 서로 다른 기업의 직무 적합도를 나란히 비교하여 어느 곳에 지원하는 것이 더 유리한지 한눈에 확인할 수 있습니다.
        </p>

        {analysisResults.length >= 2 ? (
          <div className={`p-6 ${cardBase} text-left space-y-4`}>
            <h4 className={`text-sm font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              비교함에 담을 공고를 선택하세요 ({compareIds.length}/2 선택됨):
            </h4>
            <div className="space-y-2.5">
              {analysisResults.slice(0, 6).map((item) => {
                const isSelected = compareIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCompareId(item.id)}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? isDark
                          ? 'bg-purple-950/80 border-purple-600 text-white'
                          : 'bg-purple-50 border-purple-400 text-purple-950 shadow-xs'
                        : isDark
                        ? 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm sm:text-base">{item.jobPosting.company}</span>
                      <span className={`text-xs sm:text-sm ml-2.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {item.jobPosting.role}
                      </span>
                    </div>
                    <span className="font-mono text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                      {item.jobFitScore}점
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setActivePage('job-input')}
            className="px-6 py-3.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 mx-auto shadow-sm"
          >
            <Briefcase className="w-4 h-4" />
            <span>채용 공고 추가 분석하러 가기</span>
          </button>
        )}
      </div>
    );
  }

  const [itemA, itemB] = comparedItems;
  const scoreDiff = itemA.jobFitScore - itemB.jobFitScore;
  const higherItem = scoreDiff >= 0 ? itemA : itemB;

  return (
    <div className="space-y-8 py-4 max-w-6xl mx-auto">
      {/* Header */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                isDark
                  ? 'bg-purple-950/80 text-purple-300 border border-purple-800'
                  : 'bg-purple-50 text-purple-800 border border-purple-200'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>기업별 직무 적합도 비교</span>
            </span>
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            {itemA.jobPosting.company} vs {itemB.jobPosting.company}
          </h1>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            동일한 지원자 스펙 기준 두 기업 간 적합도 점수와 요구역량 충족도를 비교 분석합니다.
          </p>
        </div>

        <button
          onClick={clearCompareIds}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1.5 self-start md:self-auto transition-all ${
            isDark
              ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
              : 'border-slate-300 bg-white text-slate-700 hover:text-slate-950 shadow-xs'
          }`}
        >
          <X className="w-4 h-4" />
          <span>비교 초기화</span>
        </button>
      </div>

      {/* AI Comparative Verdict Banner */}
      <div
        className={`p-6 sm:p-7 rounded-2xl border space-y-2.5 ${
          isDark
            ? 'border-purple-800 bg-purple-950/20'
            : 'border-purple-200 bg-purple-50/70 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-purple-600" />
          <h3
            className={`font-black text-base sm:text-lg ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            AI 종합 비교 판정: 현재 스펙에서는{' '}
            <span className="text-purple-600 dark:text-purple-400 underline underline-offset-4">
              {higherItem.jobPosting.company} ({higherItem.jobPosting.role})
            </span>
            의 적합도가 {Math.abs(scoreDiff)}점 더 높습니다.
          </h3>
        </div>
        <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          {scoreDiff !== 0
            ? `${higherItem.jobPosting.company}은(는) 현재 지원자가 보유한 핵심 기술 스택과 프로젝트 성과가 요구사항에 직접 부합하는 반면, 상대 기업은 인프라 또는 추가 우대 사항에서의 보완이 요구됩니다.`
            : `두 기업 모두 유사한 적합도 점수를 보이고 있으며, 개인의 선호 도메인 및 성장 방향성에 따라 선택하는 것을 권장합니다.`}
        </p>
      </div>

      {/* Side by Side Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Item A */}
        <div className={`${cardBase} p-6 sm:p-7 space-y-6`}>
          <div
            className={`flex items-center justify-between border-b pb-4 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded border ${
                  isDark
                    ? 'text-indigo-300 bg-indigo-950 border-indigo-800'
                    : 'text-indigo-800 bg-indigo-50 border-indigo-200'
                }`}
              >
                {itemA.jobPosting.company}
              </span>
              <h3 className={`text-lg sm:text-xl font-bold mt-1.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {itemA.jobPosting.role}
              </h3>
            </div>
            <button
              onClick={() => {
                setCurrentResult(itemA);
                setActivePage('result');
              }}
              className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
            >
              상세보기
            </button>
          </div>

          <div className="flex justify-center py-2">
            <ScoreGauge score={itemA.jobFitScore} size={170} strokeWidth={12} />
          </div>

          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="font-bold text-indigo-600 dark:text-indigo-400">예상 경쟁력</span>
            <p className={isDark ? 'text-slate-200 font-medium' : 'text-slate-800 font-medium'}>
              {itemA.estimatedCompetitiveness.level}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              항목별 점수
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>기술 스택 일치</span>
                <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  {itemA.matchBreakdown.techStackMatch?.score ?? 0}점
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>프로젝트 일치</span>
                <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  {itemA.matchBreakdown.projectExperienceMatch?.score ?? 0}점
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>필수 요건 충족</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {itemA.matchBreakdown.mandatoryRequirements?.satisfied ? '충족' : '일부 미충족'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400">주요 강점</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {itemA.strengths.slice(0, 3).map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Item B */}
        <div className={`${cardBase} p-6 sm:p-7 space-y-6`}>
          <div
            className={`flex items-center justify-between border-b pb-4 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded border ${
                  isDark
                    ? 'text-purple-300 bg-purple-950 border-purple-800'
                    : 'text-purple-800 bg-purple-50 border-purple-200'
                }`}
              >
                {itemB.jobPosting.company}
              </span>
              <h3 className={`text-lg sm:text-xl font-bold mt-1.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                {itemB.jobPosting.role}
              </h3>
            </div>
            <button
              onClick={() => {
                setCurrentResult(itemB);
                setActivePage('result');
              }}
              className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:underline font-bold"
            >
              상세보기
            </button>
          </div>

          <div className="flex justify-center py-2">
            <ScoreGauge score={itemB.jobFitScore} size={170} strokeWidth={12} />
          </div>

          <div
            className={`p-4 rounded-xl border text-xs sm:text-sm space-y-1 ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <span className="font-bold text-purple-600 dark:text-purple-400">예상 경쟁력</span>
            <p className={isDark ? 'text-slate-200 font-medium' : 'text-slate-800 font-medium'}>
              {itemB.estimatedCompetitiveness.level}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              항목별 점수
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>기술 스택 일치</span>
                <span className="font-bold font-mono text-purple-600 dark:text-purple-400">
                  {itemB.matchBreakdown.techStackMatch?.score ?? 0}점
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>프로젝트 일치</span>
                <span className="font-bold font-mono text-purple-600 dark:text-purple-400">
                  {itemB.matchBreakdown.projectExperienceMatch?.score ?? 0}점
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>필수 요건 충족</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {itemB.matchBreakdown.mandatoryRequirements?.satisfied ? '충족' : '일부 미충족'}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400">주요 강점</h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              {itemB.strengths.slice(0, 3).map((s, idx) => (
                <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span className={isDark ? 'text-slate-200' : 'text-slate-800'}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
