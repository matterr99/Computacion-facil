import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  nextStepLabel?: string;
  onNext: () => void;
  onClose?: () => void;
  isModuleCompleted?: boolean;
}

export const SuccessModal: React.FC<Props> = ({
  isOpen,
  title,
  message,
  nextStepLabel = 'Continuar al siguiente paso',
  onNext,
  isModuleCompleted = false
}) => {
  const { playSuccessSound } = useAccessibility();

  useEffect(() => {
    if (isOpen) {
      playSuccessSound();
      try {
        confetti({
          particleCount: isModuleCompleted ? 120 : 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback if confetti context is missing
      }
    }
  }, [isOpen, isModuleCompleted, playSuccessSound]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center border-4 border-emerald-400 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-100 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-emerald-100 rounded-full blur-xl pointer-events-none" />

        <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 shadow-inner border-2 border-emerald-300 animate-gentle-pulse">
          {isModuleCompleted ? (
            <Award className="w-12 h-12 text-amber-600" />
          ) : (
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          )}
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-sm font-bold border border-emerald-200 mb-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>¡Objetivo cumplido!</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
          {title}
        </h3>

        <p className="text-slate-700 text-lg sm:text-xl font-medium leading-relaxed mb-6">
          {message}
        </p>

        <button
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-98 border-2 border-white"
        >
          <span>{nextStepLabel}</span>
          <ArrowRight className="w-6 h-6 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
