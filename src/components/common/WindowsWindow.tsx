import React from 'react';
import { Minus, Square, X, ShieldCheck } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  accentColor?: string;
  showSafeBadge?: boolean;
}

export const WindowsWindow: React.FC<Props> = ({
  title,
  subtitle,
  icon,
  children,
  className = '',
  onClose,
  isMaximized = false,
  onToggleMaximize,
  showSafeBadge = true
}) => {
  const { playClickSound, theme } = useAccessibility();
  const isDark = theme === 'dark';

  return (
    <div className={`rounded-2xl border-2 shadow-2xl overflow-hidden backdrop-blur-md transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-900/95 border-slate-700 text-slate-100' 
        : 'bg-slate-50/95 border-slate-300 text-slate-900'
    } ${className}`}>
      {/* Windows 11 Style Titlebar */}
      <div className={`border-b px-4 py-2.5 flex items-center justify-between select-none transition-colors ${
        isDark 
          ? 'bg-slate-800/90 border-slate-700 hover:bg-slate-800' 
          : 'bg-slate-200/90 border-slate-300 hover:bg-slate-200'
      }`}>
        {/* Left: Window Icon and Title */}
        <div className="flex items-center gap-3 min-w-0">
          {icon ? (
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
          ) : (
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5 flex-shrink-0">
              <div className="bg-blue-500 rounded-xs"></div>
              <div className="bg-blue-500 rounded-xs"></div>
              <div className="bg-blue-500 rounded-xs"></div>
              <div className="bg-blue-500 rounded-xs"></div>
            </div>
          )}
          <div className="flex items-center gap-2 truncate">
            <span className={`font-bold text-sm sm:text-base tracking-tight truncate ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {title}
            </span>
            {subtitle && (
              <span className={`hidden md:inline text-xs font-semibold truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                — {subtitle}
              </span>
            )}
          </div>
        </div>

        {/* Right: Windows Safe Badge & Window Control Buttons */}
        <div className="flex items-center gap-2">
          {showSafeBadge && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold border border-emerald-500/40">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Modo Seguro Windows</span>
            </div>
          )}

          <div className="flex items-center -mr-1">
            {/* Minimize */}
            <button
              onClick={() => playClickSound()}
              className={`w-9 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-300/80 text-slate-700'
              }`}
              title="Minimizar ventana"
              aria-label="Minimizar"
            >
              <Minus className="w-4 h-4" />
            </button>

            {/* Maximize */}
            <button
              onClick={() => {
                playClickSound();
                if (onToggleMaximize) onToggleMaximize();
              }}
              className={`w-9 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-300/80 text-slate-700'
              }`}
              title="Maximizar ventana"
              aria-label="Maximizar"
            >
              <Square className="w-3.5 h-3.5" />
            </button>

            {/* Close */}
            <button
              onClick={() => {
                playClickSound();
                if (onClose) onClose();
              }}
              className="w-9 h-8 rounded-lg hover:bg-red-600 hover:text-white text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
              title="Cerrar ventana"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Window Body Content */}
      <div className={`p-4 sm:p-6 transition-colors ${
        isDark ? 'bg-slate-900/90' : 'bg-white/90'
      }`}>
        {children}
      </div>
    </div>
  );
};
