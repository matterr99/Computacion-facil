import React from 'react';
import { Check } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  totalSteps: number;
  currentStepIndex: number;
  completedStepIndices: number[];
  onStepSelect?: (index: number) => void;
  moduleTitle: string;
}

export const ProgressBar: React.FC<Props> = ({
  totalSteps,
  currentStepIndex,
  completedStepIndices,
  onStepSelect,
  moduleTitle
}) => {
  const { theme } = useAccessibility();
  const isDark = theme === 'dark';

  return (
    <div className={`w-full rounded-2xl p-3 sm:p-5 border-2 shadow-xs transition-colors duration-300 ${
      isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 mb-3">
        <div className="min-w-0">
          <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
            isDark ? 'bg-blue-900/40 text-blue-400 border-blue-700' : 'bg-blue-50 text-blue-700 border-blue-200'
          }`}>
            Paso {currentStepIndex + 1} de {totalSteps}
          </span>
          <h2 className={`text-lg sm:text-2xl font-black mt-1 truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {moduleTitle}
          </h2>
        </div>
        <div className={`text-left sm:text-right font-bold text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          Progreso: {Math.round(((currentStepIndex + 1) / totalSteps) * 100)}%
        </div>
      </div>

      {/* Visual step dots bar with auto responsive columns */}
      <div className={`grid gap-1.5 sm:gap-2.5 mt-2 ${
        totalSteps <= 3 
          ? 'grid-cols-3' 
          : totalSteps === 4 
          ? 'grid-cols-2 sm:grid-cols-4' 
          : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'
      }`}>
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const isCurrent = idx === currentStepIndex;
          const isDone = completedStepIndices.includes(idx);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onStepSelect && onStepSelect(idx)}
              className={`flex items-center justify-center gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all border-2 cursor-pointer ${
                isCurrent
                  ? 'bg-blue-600 text-white border-blue-700 ring-2 sm:ring-4 ring-blue-500/40 shadow-sm'
                  : isDone
                  ? isDark
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-700 hover:bg-emerald-900/80'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                  : isDark
                  ? 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
              }`}
              title={`Ir al paso ${idx + 1}`}
            >
              {isDone && !isCurrent ? (
                <Check className={`w-4 h-4 stroke-[3] ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
              ) : (
                <span>Paso {idx + 1}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
