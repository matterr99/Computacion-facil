import React from 'react';
import { 
  Laptop, 
  Home, 
  BookOpen, 
  Gamepad2, 
  Award, 
  ZoomIn, 
  Eye, 
  ShieldCheck, 
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  currentView: string;
  onNavigate: (view: string) => void;
  userName?: string;
  totalCompletedModules: number;
}

export const Header: React.FC<Props> = ({
  currentView,
  onNavigate,
  totalCompletedModules
}) => {
  const { 
    textSize, 
    cycleTextSize, 
    highContrast, 
    toggleHighContrast, 
    theme, 
    toggleTheme, 
    playClickSound 
  } = useAccessibility();

  const handleNav = (view: string) => {
    playClickSound();
    onNavigate(view);
  };

  const getTextSizeLabel = () => {
    if (textSize === 'normal') return 'A';
    if (textSize === 'large') return 'A+';
    return 'A++';
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b-2 transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-xl' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
    }`}>
      {/* Top Banner Reassurance - Responsive */}
      <div className="bg-emerald-600 text-white px-3 py-1.5 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 leading-tight">
        <ShieldCheck className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">Zona 100% Segura: Puedes tocar todo y equivocarte sin miedo</span>
      </div>

      <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6 py-2 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo & Title */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer transition-transform active:scale-95 flex-shrink-0"
          title="Ir a la pantalla principal"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform border-2 border-white flex-shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 grid grid-cols-2 gap-0.5">
              <div className="bg-white rounded-xs"></div>
              <div className="bg-white rounded-xs"></div>
              <div className="bg-white rounded-xs"></div>
              <div className="bg-white rounded-xs"></div>
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className={`text-base sm:text-xl lg:text-2xl font-black tracking-tight leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Computación Fácil
              </span>
              <span className="hidden md:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-500 border border-amber-400/40 uppercase">
                Windows
              </span>
            </div>
            <p className={`text-[11px] sm:text-xs font-semibold leading-tight hidden xs:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Paso a paso para Papá
            </p>
          </div>
        </button>

        {/* Center: Responsive Navigation Buttons */}
        <nav className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap" aria-label="Navegación principal">
          <button
            onClick={() => handleNav('home')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              currentView === 'home'
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Ver lecciones"
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Lecciones</span>
          </button>

          <button
            onClick={() => handleNav('glossary')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              currentView === 'glossary'
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Ver diccionario de términos"
          >
            <BookOpen className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">Glosario</span>
          </button>

          <button
            onClick={() => handleNav('playground')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              currentView === 'playground'
                ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Escritorio de práctica libre"
          >
            <Gamepad2 className="w-4 h-4 flex-shrink-0" />
            <span className="hidden md:inline">Escritorio</span>
            <span className="md:hidden hidden sm:inline">Práctica</span>
          </button>

          <button
            onClick={() => handleNav('certificate')}
            className={`px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer border-2 ${
              currentView === 'certificate'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                : totalCompletedModules > 0
                ? 'bg-amber-400/20 text-amber-400 border-amber-400/40 hover:bg-amber-400/30'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Ver tu diploma oficial"
          >
            <Award className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span className="hidden sm:inline font-extrabold">Diploma</span>
            {totalCompletedModules > 0 && (
              <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
                {totalCompletedModules}
              </span>
            )}
          </button>
        </nav>

        {/* Right: Accessibility & Theme Controls */}
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {/* Dark / Light Toggle */}
          <button
            onClick={() => {
              playClickSound();
              toggleTheme();
            }}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer active:scale-95 border-2 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300'
            }`}
            title={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
            aria-label={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-amber-300" />
                <span className="hidden lg:inline">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-700" />
                <span className="hidden lg:inline">Oscuro</span>
              </>
            )}
          </button>

          {/* Text Size Cycler */}
          <button
            onClick={() => {
              playClickSound();
              cycleTextSize();
            }}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all shadow-xs cursor-pointer active:scale-95 border-2 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
            title="Cambiar tamaño de letra (A / A+ / A++)"
            aria-label="Cambiar tamaño de texto"
          >
            <ZoomIn className="w-4 h-4 text-blue-500" />
            <span className="font-mono font-extrabold">{getTextSizeLabel()}</span>
          </button>

          {/* High Contrast */}
          <button
            onClick={() => {
              playClickSound();
              toggleHighContrast();
            }}
            className={`p-1.5 sm:p-2 rounded-xl border-2 transition-all cursor-pointer active:scale-95 ${
              highContrast
                ? 'bg-black text-yellow-300 border-yellow-400 ring-2 ring-yellow-400'
                : isDark
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title={highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'}
            aria-label="Alternar modo alto contraste"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
