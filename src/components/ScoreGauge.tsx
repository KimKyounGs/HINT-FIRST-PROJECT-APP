import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';

interface ScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  showGrade?: boolean;
  sublabel?: string;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  size = 200,
  strokeWidth = 14,
  showGrade = true,
  sublabel = '직무 적합도 점수',
}) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(easedProgress * score));

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedScore(score);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcDegree = 260;
  const arcLength = (arcDegree / 360) * circumference;
  const strokeDashoffset = arcLength - (animatedScore / 100) * arcLength;

  // Grade and color determination with high WCAG contrast
  let colorFrom = '#4f46e5';
  let colorTo = '#3b82f6';
  let gradeText = '경쟁력 양호';
  let gradeBg = isDark
    ? 'bg-blue-950/70 text-blue-200 border-blue-800'
    : 'bg-blue-50 text-blue-800 border-blue-200';

  if (score >= 85) {
    colorFrom = '#059669';
    colorTo = '#0d9488';
    gradeText = '합격 유력권';
    gradeBg = isDark
      ? 'bg-emerald-950/70 text-emerald-200 border-emerald-800'
      : 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (score >= 70) {
    colorFrom = '#4338ca';
    colorTo = '#6366f1';
    gradeText = '경쟁력 우수';
    gradeBg = isDark
      ? 'bg-indigo-950/70 text-indigo-200 border-indigo-800'
      : 'bg-indigo-50 text-indigo-800 border-indigo-200';
  } else if (score >= 55) {
    colorFrom = '#d97706';
    colorTo = '#f59e0b';
    gradeText = '보완 권장';
    gradeBg = isDark
      ? 'bg-amber-950/70 text-amber-200 border-amber-800'
      : 'bg-amber-50 text-amber-800 border-amber-200';
  } else {
    colorFrom = '#dc2626';
    colorTo = '#ef4444';
    gradeText = '집중 보완 필요';
    gradeBg = isDark
      ? 'bg-rose-950/70 text-rose-200 border-rose-800'
      : 'bg-rose-50 text-rose-800 border-rose-200';
  }

  const rotationOffset = 140;

  return (
    <div className="flex flex-col items-center justify-center select-none">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform rotate-0">
          <defs>
            <linearGradient id={`gauge-grad-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colorFrom} />
              <stop offset="100%" stopColor={colorTo} />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={colorTo} floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            className={isDark ? 'text-slate-800' : 'text-slate-200'}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            transform={`rotate(${rotationOffset} ${size / 2} ${size / 2})`}
          />

          {/* Active Gradient Meter */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={`url(#gauge-grad-${score})`}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(${rotationOffset} ${size / 2} ${size / 2})`}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            filter="url(#glow)"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="flex items-baseline justify-center">
            <span
              className={`text-5xl font-black tracking-tight font-mono ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              {animatedScore}
            </span>
            <span
              className={`text-sm font-bold ml-1 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              / 100
            </span>
          </div>
          <span
            className={`text-xs mt-1 font-semibold tracking-tight ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {sublabel}
          </span>
        </div>
      </div>

      {showGrade && (
        <div className={`mt-2 px-3.5 py-1 rounded-full text-xs font-bold border tracking-tight ${gradeBg}`}>
          {gradeText}
        </div>
      )}
    </div>
  );
};
