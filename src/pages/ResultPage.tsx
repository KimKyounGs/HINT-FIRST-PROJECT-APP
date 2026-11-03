import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScoreGauge } from '../components/ScoreGauge';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Printer,
  Copy,
  GitCompare,
  TrendingUp,
  Target,
  Sparkles,
  Award,
  Layers,
  HelpCircle,
  AlertCircle,
  Building2,
  Briefcase,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ResultPage: React.FC = () => {
  const { currentResult, setActivePage, toggleCompareId, compareIds, theme } = useApp();
  const isDark = theme === 'dark';

  const [copiedNotice, setCopiedNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'guide' | 'interview'>('overview');

  useEffect(() => {
    if (currentResult && currentResult.jobFitScore >= 75) {
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch (e) {
        // Safe fail
      }
    }
  }, [currentResult]);

  if (!currentResult) {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
          분석된 결과가 없습니다
        </h2>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          채용 공고를 입력하여 새로운 직무 적합도 분석을 시작해주세요.
        </p>
        <button
          onClick={() => setActivePage('job-input')}
          className="px-5 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
        >
          공고 분석하러 가기
        </button>
      </div>
    );
  }

  const { jobPosting, jobFitScore, matchBreakdown, estimatedCompetitiveness, skillsGapAnalysis } =
    currentResult;

  const isCompared = compareIds.includes(currentResult.id);

  const handleCopyReport = () => {
    const text = `[JOB FIT AI 직무 적합도 분석 리포트]
- 지원 기업: ${jobPosting.company}
- 지원 직무: ${jobPosting.role}
- 종합 적합도: ${jobFitScore}점 / 100점
- 예상 합격 경쟁력: ${estimatedCompetitiveness.level}
- 평가 총평: ${currentResult.scoreRationale}

[5대 항목별 세부 분석]
• 기술 스택 일치도: ${matchBreakdown.techStackMatch?.score ?? 0}점 (${matchBreakdown.techStackMatch?.details ?? ''})
• 프로젝트 일치도: ${matchBreakdown.projectExperienceMatch?.score ?? 0}점 (${matchBreakdown.projectExperienceMatch?.details ?? ''})
• 직무 관련 경험: ${matchBreakdown.jobRelevance?.score ?? 0}점 (${matchBreakdown.jobRelevance?.details ?? ''})
• 필수 요건: ${matchBreakdown.mandatoryRequirements?.score ?? 0}점 (${matchBreakdown.mandatoryRequirements?.satisfied ? '충족' : '일부 미충족'})
• 우대 사항: ${matchBreakdown.preferredRequirements?.score ?? 0}점 (${matchBreakdown.preferredRequirements?.satisfiedRatio ?? ''})

[JOB FIT AI 플랫폼에서 확인하기]`;

    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const cardBase = `rounded-2xl border transition-all ${
    isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white shadow-xs'
  }`;

  return (
    <div className="space-y-8 py-4 max-w-5xl mx-auto print:bg-white print:text-black">
      {/* Top Banner / Actions Bar */}
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 print:hidden ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${
                isDark
                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>AI 직무 적합도 분석 완료</span>
            </span>
            <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              · {new Date(currentResult.createdAt).toLocaleDateString()} 분석
            </span>
          </div>

          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            {jobPosting.company} <span className="font-medium text-slate-400">·</span> {jobPosting.role}
          </h1>

          <p className={`text-xs sm:text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            <span>분석 모델: {currentResult.source}</span>
            <span className="mx-2">·</span>
            <span>경력 조건: {jobPosting.experienceRequirement || '경력무관'}</span>
            <span className="mx-2">·</span>
            <span>학력 조건: {jobPosting.educationRequirement || '학력무관'}</span>
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap pt-2 md:pt-0">
          <button
            onClick={handleCopyReport}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1.5 transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
            }`}
          >
            {copiedNotice ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedNotice ? '복사 완료' : '결과 복사'}</span>
          </button>

          <button
            onClick={handlePrint}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-1.5 transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
            }`}
          >
            <Printer className="w-4 h-4" />
            <span>리포트 인쇄</span>
          </button>

          <button
            onClick={() => {
              toggleCompareId(currentResult.id);
              setActivePage('compare');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              isCompared
                ? 'bg-purple-600 text-white'
                : isDark
                ? 'bg-purple-950/60 text-purple-200 border border-purple-800 hover:bg-purple-900'
                : 'bg-purple-50 text-purple-800 border border-purple-200 hover:bg-purple-100'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            <span>{isCompared ? '비교함 담김' : '공고 비교함'}</span>
          </button>

          <button
            onClick={() => setActivePage('job-input')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-all shadow-sm"
          >
            <span>새 공고 분석</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* SECTION 1: Top Score & Competitiveness Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Score Gauge */}
        <div
          className={`lg:col-span-5 rounded-2xl border p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all ${
            isDark
              ? 'border-slate-800 bg-slate-900/80 shadow-md'
              : 'border-slate-200 bg-white shadow-sm'
          }`}
        >
          <ScoreGauge score={jobFitScore} size={210} strokeWidth={14} />

          <div className="mt-5 space-y-1.5 max-w-xs">
            <h3 className={`font-extrabold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
              직무 적합도 종합 평가
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {jobFitScore >= 80
                ? '지원자의 핵심 역량이 공고의 요구조건과 매우 높은 일치도를 보입니다.'
                : jobFitScore >= 65
                ? '핵심 요구역량을 갖추고 있으며, 일부 우대 사항을 보완하면 서류 통과 가능성이 높습니다.'
                : '보유 역량과 공고 간 일부 차이가 존재하며, 집중적인 프로젝트 보완이 권장됩니다.'}
            </p>
          </div>
        </div>

        {/* Right: Estimated Competitiveness */}
        <div className={`lg:col-span-7 ${cardBase} p-6 sm:p-8 flex flex-col justify-between space-y-5`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                예상 합격 경쟁력 지표
              </span>
              <span
                className={`text-xs px-3 py-1 rounded-full font-extrabold border ${
                  isDark
                    ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700'
                    : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                }`}
              >
                {estimatedCompetitiveness.level}
              </span>
            </div>

            <p
              className={`text-sm sm:text-base leading-relaxed font-normal ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}
            >
              {currentResult.scoreRationale}
            </p>
          </div>

          {/* Positive vs Limiting Factors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isDark
                  ? 'bg-emerald-950/30 border-emerald-800/80 text-slate-200'
                  : 'bg-emerald-50/70 border-emerald-200 text-slate-900'
              }`}
            >
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                긍정적인 평가 요소
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm">
                {estimatedCompetitiveness.positiveFactors.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-2 ${
                isDark
                  ? 'bg-amber-950/30 border-amber-800/80 text-slate-200'
                  : 'bg-amber-50/70 border-amber-200 text-slate-900'
              }`}
            >
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                부족한 평가 요소 (보완 권장)
              </span>
              <ul className="space-y-1.5 text-xs sm:text-sm">
                {estimatedCompetitiveness.limitingFactors.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                    <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Disclaimer Note */}
          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
              isDark
                ? 'bg-slate-950 border-slate-800 text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
          >
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{estimatedCompetitiveness.disclaimer}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div
        className={`flex border-b gap-6 text-sm font-bold print:hidden overflow-x-auto ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}
      >
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3.5 px-1 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? isDark
                ? 'border-indigo-400 text-white'
                : 'border-indigo-600 text-indigo-700'
              : isDark
              ? 'border-transparent text-slate-400 hover:text-slate-200'
              : 'border-transparent text-slate-600 hover:text-slate-950'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>항목별 상세 분석 & 강약점</span>
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`pb-3.5 px-1 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'skills'
              ? isDark
                ? 'border-indigo-400 text-white'
                : 'border-indigo-600 text-indigo-700'
              : isDark
              ? 'border-transparent text-slate-400 hover:text-slate-200'
              : 'border-transparent text-slate-600 hover:text-slate-950'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>역량 갭(Skills Gap) 매트릭스 ({skillsGapAnalysis.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('guide')}
          className={`pb-3.5 px-1 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'guide'
              ? isDark
                ? 'border-indigo-400 text-white'
                : 'border-indigo-600 text-indigo-700'
              : isDark
              ? 'border-transparent text-slate-400 hover:text-slate-200'
              : 'border-transparent text-slate-600 hover:text-slate-950'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>AI 추천 취업 전략 로드맵</span>
        </button>

        <button
          onClick={() => setActiveTab('interview')}
          className={`pb-3.5 px-1 border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'interview'
              ? isDark
                ? 'border-indigo-400 text-white'
                : 'border-indigo-600 text-indigo-700'
              : isDark
              ? 'border-transparent text-slate-400 hover:text-slate-200'
              : 'border-transparent text-slate-600 hover:text-slate-950'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>면접관 예상 기술 검증 질문</span>
        </button>
      </div>

      {/* TAB 1: Detailed Breakdown & Strengths / Weaknesses */}
      {(activeTab === 'overview' || typeof window !== 'undefined' && window.matchMedia?.('print')?.matches) && (
        <div className="space-y-6">
          {/* 5 Criteria Detailed Breakdown */}
          <section className={`p-6 sm:p-8 ${cardBase} space-y-6`}>
            <div>
              <h3
                className={`text-base sm:text-lg font-bold flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                <Layers className="w-5 h-5 text-indigo-600" />
                <span>5대 핵심 항목별 정밀 평가 지표</span>
              </h3>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                공고의 필수 요건, 우대 사항, 실무 프로젝트 적합성을 5개 영역으로 나누어 정밀 평가한 결과입니다.
              </p>
            </div>

            <div className="space-y-5">
              {/* Metric 1: Tech Stack */}
              {matchBreakdown.techStackMatch && (
                <div className="space-y-2 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="flex justify-between items-center text-sm">
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {matchBreakdown.techStackMatch.label}
                    </span>
                    <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400 text-base">
                      {matchBreakdown.techStackMatch.score}점
                    </span>
                  </div>
                  <div
                    className={`w-full h-2.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                      style={{ width: `${matchBreakdown.techStackMatch.score}%` }}
                    />
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {matchBreakdown.techStackMatch.details}
                  </p>
                </div>
              )}

              {/* Metric 2: Project Experience */}
              {matchBreakdown.projectExperienceMatch && (
                <div className="space-y-2 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="flex justify-between items-center text-sm">
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {matchBreakdown.projectExperienceMatch.label}
                    </span>
                    <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400 text-base">
                      {matchBreakdown.projectExperienceMatch.score}점
                    </span>
                  </div>
                  <div
                    className={`w-full h-2.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                      style={{ width: `${matchBreakdown.projectExperienceMatch.score}%` }}
                    />
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {matchBreakdown.projectExperienceMatch.details}
                  </p>
                </div>
              )}

              {/* Metric 3: Job Relevance */}
              {matchBreakdown.jobRelevance && (
                <div className="space-y-2 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="flex justify-between items-center text-sm">
                    <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {matchBreakdown.jobRelevance.label}
                    </span>
                    <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400 text-base">
                      {matchBreakdown.jobRelevance.score}점
                    </span>
                  </div>
                  <div
                    className={`w-full h-2.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                      style={{ width: `${matchBreakdown.jobRelevance.score}%` }}
                    />
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {matchBreakdown.jobRelevance.details}
                  </p>
                </div>
              )}

              {/* Metric 4: Mandatory Requirements */}
              {matchBreakdown.mandatoryRequirements && (
                <div className="space-y-2 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {matchBreakdown.mandatoryRequirements.label}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-extrabold ${
                          matchBreakdown.mandatoryRequirements.satisfied
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200'
                        }`}
                      >
                        {matchBreakdown.mandatoryRequirements.satisfied ? '충족' : '일부 미충족'}
                      </span>
                    </div>
                    <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400 text-base">
                      {matchBreakdown.mandatoryRequirements.score}점
                    </span>
                  </div>
                  <div
                    className={`w-full h-2.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-all duration-700"
                      style={{ width: `${matchBreakdown.mandatoryRequirements.score}%` }}
                    />
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {matchBreakdown.mandatoryRequirements.details}
                  </p>
                </div>
              )}

              {/* Metric 5: Preferred Requirements */}
              {matchBreakdown.preferredRequirements && (
                <div className="space-y-2 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {matchBreakdown.preferredRequirements.label}
                      </span>
                      {matchBreakdown.preferredRequirements.satisfiedRatio && (
                        <span className="text-xs px-2 py-0.5 rounded font-extrabold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-200">
                          {matchBreakdown.preferredRequirements.satisfiedRatio}
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400 text-base">
                      {matchBreakdown.preferredRequirements.score}점
                    </span>
                  </div>
                  <div
                    className={`w-full h-2.5 rounded-full overflow-hidden ${
                      isDark ? 'bg-slate-800' : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className="h-full bg-purple-600 rounded-full transition-all duration-700"
                      style={{ width: `${matchBreakdown.preferredRequirements.score}%` }}
                    />
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed mt-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {matchBreakdown.preferredRequirements.details}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Strengths & Weaknesses Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strengths */}
            <div className={`p-6 sm:p-7 ${cardBase} space-y-4`}>
              <h3 className="text-sm sm:text-base font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <span>강점 분석 (해당 직무 지원 시 유리한 핵심 요소)</span>
              </h3>
              <ul className="space-y-3">
                {currentResult.strengths.map((st, i) => (
                  <li
                    key={i}
                    className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                      isDark
                        ? 'bg-emerald-950/20 border-emerald-900/60 text-slate-200'
                        : 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{st}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className={`p-6 sm:p-7 ${cardBase} space-y-4`}>
              <h3 className="text-sm sm:text-base font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>약점 분석 (부족한 기술 및 보완 필요 사항)</span>
              </h3>
              <ul className="space-y-3">
                {currentResult.weaknesses.map((wk, i) => (
                  <li
                    key={i}
                    className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                      isDark
                        ? 'bg-amber-950/20 border-amber-900/60 text-slate-200'
                        : 'bg-amber-50/50 border-amber-200 text-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      !
                    </span>
                    <span className="leading-relaxed">{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Skills Gap Matrix */}
      {activeTab === 'skills' && (
        <section className="space-y-5">
          <div className={`p-6 ${cardBase}`}>
            <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Target className="w-5 h-5 text-indigo-600" />
              <span>요구 기술별 충족 여부 및 맞춤형 역량 보완 가이드</span>
            </h3>
            <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              공고에서 요구하는 각 기술 스택별 현재 보유 수준을 진단하고, 단기간에 역량을 입증할 수 있는 학습 방향 및 프로젝트 아이디어를 제시합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {skillsGapAnalysis.map((item, idx) => {
              const isFulfilled = item.status === '충족';
              const isNeedsWork = item.status === '보완 필요';

              return (
                <div key={idx} className={`p-6 sm:p-7 ${cardBase} space-y-4`}>
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`font-extrabold text-base sm:text-lg ${isDark ? 'text-white' : 'text-slate-950'}`}>
                        {item.skillName}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-md font-semibold border ${
                          isDark
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        {item.category}
                      </span>
                      {item.requiredLevel && (
                        <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          요구 수준: {item.requiredLevel}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                          isFulfilled
                            ? isDark
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : isNeedsWork
                            ? isDark
                              ? 'bg-amber-950/80 text-amber-300 border-amber-700'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                            : isDark
                            ? 'bg-purple-950/80 text-purple-300 border-purple-700'
                            : 'bg-purple-50 text-purple-800 border-purple-300'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs sm:text-sm">
                    {/* Learning Direction */}
                    <div
                      className={`p-4 rounded-xl border space-y-1.5 ${
                        isDark
                          ? 'bg-indigo-950/20 border-indigo-900/60 text-slate-200'
                          : 'bg-indigo-50/70 border-indigo-200 text-slate-800'
                      }`}
                    >
                      <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" />
                        구체적 실무 학습 방향
                      </span>
                      <p className="leading-relaxed">{item.learningDirection}</p>
                    </div>

                    {/* Portfolio Project Idea */}
                    <div
                      className={`p-4 rounded-xl border space-y-1.5 ${
                        isDark
                          ? 'bg-amber-950/20 border-amber-900/60 text-slate-200'
                          : 'bg-amber-50/70 border-amber-200 text-slate-800'
                      }`}
                    >
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        역량 증빙 프로젝트 제안
                      </span>
                      <p className="leading-relaxed">{item.projectIdea}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 3: Strategic Recommendations */}
      {activeTab === 'guide' && (
        <section className="space-y-5">
          <div className={`p-6 ${cardBase}`}>
            <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Lightbulb className="w-5 h-5 text-indigo-600" />
              <span>AI 추천: 합격 경쟁력을 높이기 위한 구체적 행동 제안</span>
            </h3>
            <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              단순히 자격증을 취득하거나 이론을 공부하는 것이 아닌, 실제 서류 검토관과 면접관의 시선을 사로잡을 수 있는 즉시 실행 과제입니다.
            </p>
          </div>

          <div className="space-y-4">
            {currentResult.strategicRecommendations.map((rec, idx) => (
              <div key={idx} className={`p-6 sm:p-7 ${cardBase} space-y-3.5`}>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-0.5 rounded-md uppercase border ${
                        rec.priority === 'HIGH'
                          ? 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/80 dark:text-rose-200 dark:border-rose-800'
                          : 'bg-indigo-50 text-indigo-800 border-indigo-300 dark:bg-indigo-950/80 dark:text-indigo-200 dark:border-indigo-800'
                      }`}
                    >
                      우선순위: {rec.priority}
                    </span>
                    <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {rec.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Step 0{idx + 1}</span>
                </div>

                <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {rec.description}
                </p>

                <div
                  className={`p-4 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
                    isDark
                      ? 'bg-indigo-950/40 border-indigo-800/80 text-indigo-200'
                      : 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
                  }`}
                >
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 shrink-0">실행 과제:</span>
                  <span className="font-medium leading-relaxed">{rec.actionItem}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 4: Interview Prep Questions */}
      {activeTab === 'interview' && (
        <section className="space-y-5">
          <div className={`p-6 ${cardBase}`}>
            <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <HelpCircle className="w-5 h-5 text-indigo-600" />
              <span>면접관 예상 기술 검증 & 압박 질문 대비</span>
            </h3>
            <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              지원자의 현재 이력서와 이 채용 공고를 대조했을 때, 면접관이 가장 파고들 확률이 높은 질문들입니다.
            </p>
          </div>

          <div className="space-y-4">
            {currentResult.interviewPrepQuestions.map((q, idx) => (
              <div key={idx} className={`p-6 sm:p-7 ${cardBase} space-y-3`}>
                <div className="flex items-start gap-3.5">
                  <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    Q{idx + 1}
                  </span>
                  <div className="space-y-2 flex-1">
                    <h4 className={`font-bold text-base sm:text-lg leading-relaxed ${isDark ? 'text-white' : 'text-slate-950'}`}>
                      {q}
                    </h4>
                    <div
                      className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                        isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <strong className="text-indigo-600 dark:text-indigo-400">💡 모범 대응 팁:</strong>{' '}
                      변명보다는 왜 그 기술을 선택했는지의 트레이드오프(Trade-off)와 문제 해결 후 얻은 정량적 결과를 중심으로 차분하게 설명하세요.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Action Footer */}
      <div
        className={`p-6 sm:p-7 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden ${
          isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white shadow-xs'
        }`}
      >
        <div>
          <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-950'}`}>
            다른 채용 공고도 분석해보시겠어요?
          </h4>
          <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            동일한 스펙으로 여러 공고를 비교하면 나에게 가장 유리한 기업을 찾을 수 있습니다.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => {
              toggleCompareId(currentResult.id);
              setActivePage('compare');
            }}
            className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center justify-center gap-1.5 transition-all ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
            }`}
          >
            <GitCompare className="w-4 h-4 text-purple-600" />
            <span>비교 분석 페이지로</span>
          </button>
          <button
            onClick={() => setActivePage('job-input')}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <span>새 공고 입력</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
