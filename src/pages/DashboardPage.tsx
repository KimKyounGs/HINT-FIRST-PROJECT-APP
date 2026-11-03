import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  Briefcase,
  History,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Layers,
  Award,
  Zap,
  Target,
} from 'lucide-react';
import { ScoreGauge } from '../components/ScoreGauge';
import { SAMPLE_JOB_POSTINGS } from '../mock/samples';

export const DashboardPage: React.FC = () => {
  const {
    setActivePage,
    profile,
    profileCompletionPercentage,
    analysisResults,
    setCurrentResult,
    runAnalysis,
    theme,
  } = useApp();

  const isDark = theme === 'dark';
  const recentAnalyses = analysisResults.slice(0, 3);
  const latestResult = analysisResults[0] || null;

  const handleQuickRun = (jobIndex: number) => {
    const job = SAMPLE_JOB_POSTINGS[jobIndex];
    runAnalysis(job);
  };

  const cardBase = `rounded-2xl border transition-all ${
    isDark ? 'border-slate-800 bg-slate-900/70' : 'border-slate-200 bg-white shadow-xs'
  }`;

  return (
    <div className="space-y-10 py-4">
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 md:p-12 transition-all ${
          isDark
            ? 'border-slate-800 bg-slate-900/90 shadow-lg'
            : 'border-slate-200 bg-white shadow-sm'
        }`}
      >
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold ${
                isDark
                  ? 'border border-indigo-700 bg-indigo-950/80 text-indigo-300'
                  : 'border border-indigo-200 bg-indigo-50 text-indigo-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>AI 기반 정밀 채용 공고 & 내 스펙 교차 검증</span>
            </span>
          </div>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            지원하기 전에, <br />
            <span className="text-indigo-600 dark:text-indigo-400">
              나의 실제 합격 경쟁력을 확인하세요.
            </span>
          </h1>

          <p
            className={`text-base sm:text-lg leading-relaxed ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            AI가 당신의 기술 스택, 프로젝트 경험과 기업의 필수/우대 역량을 1:1 대조 분석합니다.
            단순 검색을 넘어 0~100점 직무 적합도 점수, 예상 합격 지표, 부족한 역량 개선 로드맵까지 한눈에 확인하세요.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActivePage('job-input')}
              className="px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-2.5 transition-all active:scale-95"
            >
              <Briefcase className="w-4 h-4" />
              <span>직무 적합도 분석 시작</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActivePage('profile')}
              className={`px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base border flex items-center gap-2 transition-all ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300 shadow-xs'
              }`}
            >
              <UserCheck className="w-4 h-4 text-indigo-600" />
              <span>내 스펙 관리 & 수정</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid: Spec Status & Recent Job Fit Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: User Spec Registered Status */}
        <div className={`${cardBase} p-6 flex flex-col justify-between space-y-5`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" />
                내 스펙 등록 상태
              </span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded font-bold ${
                  isDark
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}
              >
                작성 완료
              </span>
            </div>

            <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-950'}`}>
              <span>{profile.name}</span>
              <span className={`text-sm font-medium ml-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                지원자
              </span>
            </h3>
            <p className={`text-xs sm:text-sm mt-1 font-medium line-clamp-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              희망 직무: {profile.targetJob}
            </p>

            {/* Spec completion bar */}
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className={`font-semibold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  스펙 완성도
                </span>
                <span className="font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
                  {profileCompletionPercentage}%
                </span>
              </div>
              <div
                className={`w-full h-2 rounded-full overflow-hidden ${
                  isDark ? 'bg-slate-800' : 'bg-slate-200'
                }`}
              >
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-700"
                  style={{ width: `${profileCompletionPercentage}%` }}
                />
              </div>
            </div>

            {/* Quick Spec Metrics */}
            <div className="grid grid-cols-3 gap-2.5 mt-5 text-center">
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className={`text-xl font-black font-mono ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {profile.skills.length}
                </p>
                <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  보유 기술
                </p>
              </div>
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className={`text-xl font-black font-mono ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {profile.projects.length}
                </p>
                <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  프로젝트
                </p>
              </div>
              <div
                className={`p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <p className={`text-xl font-black font-mono ${isDark ? 'text-white' : 'text-slate-950'}`}>
                  {profile.certificates.length + profile.activities.length}
                </p>
                <p className={`text-xs font-semibold mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  자격/활동
                </p>
              </div>
            </div>
          </div>

          <div
            className={`pt-4 border-t flex items-center justify-between text-xs sm:text-sm ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
            }`}
          >
            <span>최종 업데이트: {new Date(profile.updatedAt).toLocaleDateString()}</span>
            <button
              onClick={() => setActivePage('profile')}
              className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold flex items-center gap-1"
            >
              스펙 상세 보기
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Latest Analysis Job Fit Score */}
        <div className={`${cardBase} p-6 flex flex-col justify-between space-y-5`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                최근 분석한 직무 적합도
              </span>
              {latestResult && (
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {new Date(latestResult.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>

            {latestResult ? (
              <div className="flex flex-col items-center">
                <ScoreGauge score={latestResult.jobFitScore} size={150} strokeWidth={11} />
                <div className="text-center mt-3">
                  <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {latestResult.jobPosting.company}
                  </h4>
                  <p className={`text-xs sm:text-sm mt-0.5 font-medium line-clamp-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {latestResult.jobPosting.role}
                  </p>
                  <p className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 mt-1 font-bold">
                    예상 합격 경쟁력: {latestResult.estimatedCompetitiveness.level}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div
                  className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center ${
                    isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Target className="w-6 h-6" />
                </div>
                <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  아직 분석 내역이 없습니다
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed max-w-xs mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  공고를 입력하고 내 역량이 얼마나 부합하는지 10초 만에 AI로 확인해보세요.
                </p>
              </div>
            )}
          </div>

          <div className={`pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            {latestResult ? (
              <button
                onClick={() => {
                  setCurrentResult(latestResult);
                  setActivePage('result');
                }}
                className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold border flex items-center justify-center gap-1.5 transition-all ${
                  isDark
                    ? 'bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 border-indigo-800'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
                }`}
              >
                <span>최근 분석 리포트 열람</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => handleQuickRun(0)}
                className="w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>샘플 공고로 첫 분석 실행</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Card 3: Employment Readiness Status */}
        <div className={`${cardBase} p-6 flex flex-col justify-between space-y-5`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                취업 준비 핵심 현황
              </span>
            </div>

            <h3 className={`text-sm font-bold mb-3 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
              대표 보유 기술 스택
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {profile.skills.slice(0, 6).map((skill) => (
                <span
                  key={skill.id}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold border flex items-center gap-1.5 ${
                    isDark
                      ? 'bg-slate-800 text-slate-200 border-slate-700'
                      : 'bg-slate-100 text-slate-800 border-slate-300'
                  }`}
                >
                  <span>{skill.name}</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold font-mono text-[11px]">
                    {skill.level}
                  </span>
                </span>
              ))}
              {profile.skills.length > 6 && (
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
                    isDark
                      ? 'bg-slate-900 text-slate-400 border-slate-800'
                      : 'bg-slate-50 text-slate-600 border-slate-300'
                  }`}
                >
                  +{profile.skills.length - 6}개
                </span>
              )}
            </div>

            <div className="mt-5 space-y-2">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                대표 프로젝트
              </h4>
              {profile.projects[0] ? (
                <div
                  className={`p-3.5 rounded-xl border text-xs sm:text-sm ${
                    isDark
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <p className={`font-bold line-clamp-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {profile.projects[0].title}
                  </p>
                  <p className={`text-xs mt-0.5 line-clamp-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    역할: {profile.projects[0].role}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-500">등록된 프로젝트가 없습니다.</p>
              )}
            </div>
          </div>

          <div className={`pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <button
              onClick={() => setActivePage('profile')}
              className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              <span>스펙 정보 업데이트</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Test Presets: 4 Realistic Tech Job Postings */}
      <section className="space-y-4">
        <div>
          <h2
            className={`text-xl sm:text-2xl font-extrabold flex items-center gap-2 ${
              isDark ? 'text-white' : 'text-slate-950'
            }`}
          >
            <Zap className="w-5 h-5 text-amber-500" />
            <span>원클릭 추천 공고로 10초 만에 분석 체험</span>
          </h2>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            실제 테크 기업의 채용 공고 프리셋을 선택하여 내 스펙과의 직무 적합도를 즉시 확인해보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SAMPLE_JOB_POSTINGS.map((job, idx) => (
            <div
              key={job.id}
              className={`rounded-2xl border p-5 transition-all flex flex-col justify-between group ${
                isDark
                  ? 'border-slate-800 bg-slate-900/70 hover:border-indigo-500'
                  : 'border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded border ${
                      isDark
                        ? 'text-indigo-300 bg-indigo-950 border-indigo-800'
                        : 'text-indigo-800 bg-indigo-50 border-indigo-200'
                    }`}
                  >
                    {job.company.split('/')[0]}
                  </span>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {job.experienceRequirement}
                  </span>
                </div>
                <h3
                  className={`font-bold text-base transition-colors line-clamp-2 ${
                    isDark
                      ? 'text-white group-hover:text-indigo-300'
                      : 'text-slate-950 group-hover:text-indigo-600'
                  }`}
                >
                  {job.role}
                </h3>
                <p
                  className={`text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {job.summary}
                </p>

                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {job.mandatorySkills.slice(0, 3).map((s, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-slate-800 text-slate-300 border-slate-700'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {s.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`mt-5 pt-3.5 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <button
                  onClick={() => handleQuickRun(idx)}
                  className={`w-full py-2.5 rounded-xl text-xs sm:text-sm font-bold border flex items-center justify-center gap-1.5 transition-all ${
                    isDark
                      ? 'bg-indigo-950/60 group-hover:bg-indigo-600 text-indigo-300 group-hover:text-white border-indigo-800 group-hover:border-indigo-600'
                      : 'bg-indigo-50 group-hover:bg-indigo-600 text-indigo-800 group-hover:text-white border-indigo-200 group-hover:border-indigo-600'
                  }`}
                >
                  <span>이 공고로 적합도 분석</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Analyses List */}
      {recentAnalyses.length > 0 && (
        <section className={`rounded-2xl border p-6 space-y-4 ${cardBase}`}>
          <div className="flex items-center justify-between">
            <h2 className={`text-lg sm:text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              <History className="w-5 h-5 text-indigo-600" />
              <span>최근 분석 내역</span>
            </h2>
            <button
              onClick={() => setActivePage('history')}
              className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              전체 기록 보기 ({analysisResults.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-200'}`}>
            {recentAnalyses.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setCurrentResult(item);
                  setActivePage('result');
                }}
                className={`py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-3 rounded-xl cursor-pointer transition-colors ${
                  isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-extrabold text-sm shrink-0 border ${
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
                    <span className="text-[10px] font-normal text-slate-400 -mt-0.5">점</span>
                  </div>
                  <div>
                    <h4
                      className={`font-bold text-base transition-colors ${
                        isDark ? 'text-white' : 'text-slate-950'
                      }`}
                    >
                      {item.jobPosting.company} - {item.jobPosting.role}
                    </h4>
                    <p className={`text-xs sm:text-sm mt-0.5 line-clamp-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {item.scoreRationale}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-md font-bold border ${
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
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Feature Highlights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className={`p-6 ${cardBase} space-y-2.5`}>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' : 'bg-indigo-50 text-indigo-600'
            }`}
          >
            <Layers className="w-5 h-5" />
          </div>
          <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-950'}`}>
            보유 기술 & 프로젝트 정밀 대조
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            단순 키워드 일치가 아닌 프로젝트 기여도, 담당 역할, 구현 깊이를 채용 요건과 교차 분석합니다.
          </p>
        </div>

        <div className={`p-6 ${cardBase} space-y-2.5`}>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-purple-950 text-purple-400 border border-purple-800' : 'bg-purple-50 text-purple-600'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-950'}`}>
            객관적인 0~100점 적합도 산출
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            필수 요건, 우대 사항, 도메인 연관성을 분리하여 신뢰도 높은 예상 경쟁력 지표를 제공합니다.
          </p>
        </div>

        <div className={`p-6 ${cardBase} space-y-2.5`}>
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-emerald-50 text-emerald-600'
            }`}
          >
            <Award className="w-5 h-5" />
          </div>
          <h3 className={`font-bold text-base ${isDark ? 'text-white' : 'text-slate-950'}`}>
            실전 맞춤 역량 개선 로드맵
          </h3>
          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            부족한 역량을 단기간에 증명할 수 있는 학습 방향과 포트폴리오 프로젝트 아이디어를 함께 제시합니다.
          </p>
        </div>
      </section>
    </div>
  );
};
