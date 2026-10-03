import React from 'react';
import { Heart, RotateCcw, ShieldCheck, Sparkles, PhoneCall } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  onResetProgress: () => void;
}

export const Footer: React.FC<Props> = ({ onResetProgress }) => {
  const { playClickSound } = useAccessibility();

  const handleReset = () => {
    playClickSound();
    if (window.confirm('¿Quieres reiniciar el progreso de las lecciones para practicar desde el principio?')) {
      onResetProgress();
    }
  };

  return (
    <footer className="mt-16 bg-slate-900 text-slate-200 border-t-4 border-amber-400 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Safe Banner */}
        <div className="inline-flex items-center gap-2.5 bg-slate-800 border border-slate-700 px-5 py-3 rounded-2xl text-amber-300 font-bold text-base sm:text-lg shadow-inner">
          <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          <span>¡Lo estás haciendo de maravilla! Cada día aprenderás algo nuevo.</span>
        </div>

        <p className="text-slate-300 max-w-2xl text-base sm:text-lg leading-relaxed">
          Diseñado con todo el cariño para aprender computación sin miedos, sin prisas y con letras grandes y claras.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-600 text-sm font-semibold transition-all cursor-pointer"
            title="Reiniciar las lecciones para empezar de nuevo"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reiniciar progreso para practicar de nuevo</span>
          </button>
        </div>

        <div className="text-xs sm:text-sm text-slate-500 pt-4 border-t border-slate-800 w-full flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Hecho con amor para Papá ❤️</span>
          <span>100% interactivo • Sin publicidad • Privado y Seguro</span>
        </div>
      </div>
    </footer>
  );
};
