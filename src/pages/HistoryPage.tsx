import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  History,
  Trash2,
  GitCompare,
  ArrowRight,
  Search,
  FileSearch,
} from 'lucide-react';
import { AnalysisResult } from '../types';

export const HistoryPage: React.FC = () => {
  const {
    analysisResults,
    setCurrentResult,
    deleteHistoryItem,
    clearHistory,
    setActivePage,
    compareIds,
    toggleCompareId,
    theme,
  } = useApp();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');

  const filtered = analysisResults.filter(
    (item) =>
      item.jobPosting.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.jobPosting.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenResult = (item: AnalysisResult) => {
    setCurrentResult(item);
    setActivePage('result');
  };

  const cardBase = `rounded-2xl border transition-all ${
    isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white shadow-xs'
  }`;

  return (
    <div className="space-y-6 py-4 max-w-5xl mx-auto">
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
                  ? 'bg-indigo-950/80 text-indigo-300 border border-indigo-800'
                  : 'bg-indigo-50 text-indigo-800 border border-indigo-200'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>분석 이력 보관함</span>
            </span>
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            직무 적합도 분석 기록 ({analysisResults.length}건)
          </h1>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            지금까지 AI로 분석한 채용 공고와 적합도 결과를 다시 확인하고, 2개 공고를 선택하여 비교할 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {compareIds.length > 0 && (
            <button
              onClick={() => setActivePage('compare')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1.5 transition-all shadow-sm"
            >
              <GitCompare className="w-4 h-4" />
              <span>선택 공고 비교 ({compareIds.length}/2)</span>
            </button>
          )}

          {analysisResults.length > 0 && (
            <button
              onClick={() => {
                if (window.confirm('모든 분석 기록을 삭제하시겠습니까?')) {
                  clearHistory();
                }
              }}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                isDark
                  ? 'text-slate-400 hover:text-red-400 hover:bg-red-950/40 border-slate-800'
                  : 'text-slate-600 hover:text-red-600 hover:bg-red-50 border-slate-300'
              }`}
            >
              전체 삭제
            </button>
          )}
        </div>
      </div>

      {/* Search Input */}
      {analysisResults.length > 0 && (
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="기업명 또는 직무명으로 검색..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none focus:border-indigo-500 shadow-2xs ${
              isDark
                ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-500'
                : 'bg-white border border-slate-300 text-slate-950 placeholder-slate-400'
            }`}
          />
        </div>
      )}

      {/* History List or Empty */}
      {filtered.length === 0 ? (
        <div className={`p-12 text-center ${cardBase} space-y-4`}>
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto ${
              isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <History className="w-7 h-7" />
          </div>
          <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-slate-950'}`}>
            {searchQuery ? '검색 결과와 일치하는 분석 기록이 없습니다.' : '아직 저장된 분석 기록이 없습니다.'}
          </h3>
          <p className={`text-xs sm:text-sm max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            채용 공고를 입력하여 첫 직무 적합도 분석을 실행해보세요. 분석된 모든 결과는 이곳에 안전하게 보관됩니다.
          </p>
          <button
            onClick={() => setActivePage('job-input')}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 mx-auto transition-all shadow-sm"
          >
            <FileSearch className="w-4 h-4" />
            <span>채용 공고 분석 시작</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => {
            const isCompared = compareIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
                    : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  {/* Score badge */}
                  <div
                    className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center font-mono font-black text-lg shrink-0 border ${
                      item.jobFitScore >= 80
                        ? isDark
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : item.jobFitScore >= 65
                        ? isDark
                          ? 'bg-indigo-950 text-indigo-300 border-indigo-800'
                          : 'bg-indigo-50 text-indigo-800 border-indigo-300'
                        : isDark
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-amber-50 text-amber-800 border-amber-300'
                    }`}
                  >
                    <span>{item.jobFitScore}</span>
                    <span className="text-[10px] font-normal text-slate-400 -mt-1">점</span>
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded border ${
                          isDark
                            ? 'text-indigo-300 bg-indigo-950 border-indigo-800'
                            : 'text-indigo-800 bg-indigo-50 border-indigo-200'
                        }`}
                      >
                        {item.jobPosting.company}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-md font-bold border ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        {item.estimatedCompetitiveness.level}
                      </span>
                      <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3
                      onClick={() => handleOpenResult(item)}
                      className={`font-bold text-base transition-colors cursor-pointer line-clamp-1 ${
                        isDark ? 'text-white hover:text-indigo-400' : 'text-slate-950 hover:text-indigo-600'
                      }`}
                    >
                      {item.jobPosting.role}
                    </h3>

                    <p className={`text-xs sm:text-sm line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {item.scoreRationale}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className={`flex items-center gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 justify-between md:justify-end ${
                    isDark ? 'border-slate-800' : 'border-slate-100'
                  }`}
                >
                  <button
                    onClick={() => toggleCompareId(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isCompared
                        ? 'bg-purple-600 text-white'
                        : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-purple-900 border border-slate-700'
                        : 'bg-purple-50 text-purple-800 hover:bg-purple-600 hover:text-white border border-purple-200'
                    }`}
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                    <span>{isCompared ? '비교함 담김' : '비교 선택'}</span>
                  </button>

                  <button
                    onClick={() => handleOpenResult(item)}
                    className="px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1 transition-all shadow-2xs"
                  >
                    <span>상세 리포트</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark
                        ? 'text-slate-500 hover:text-red-400 hover:bg-red-950/40'
                        : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                    }`}
                    title="기록 삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
