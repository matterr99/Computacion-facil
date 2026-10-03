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
  Moon
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
    if (textSize === 'normal') return 'Letra: Normal';
    if (textSize === 'large') return 'Letra: Grande (A+)';
    return 'Letra: Extra Grande (A++)';
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md border-b-2 transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-900/95 border-slate-700 text-slate-100 shadow-xl' 
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
    }`}>
      {/* Top Banner Reassurance */}
      <div className="bg-emerald-600 text-white px-4 py-2 text-center text-sm sm:text-base font-semibold flex items-center justify-center gap-2">
        <ShieldCheck className="w-5 h-5 flex-shrink-0" />
        <span>Zona 100% Segura: Aquí puedes tocar todo y equivocarte sin miedo. ¡Estás aprendiendo!</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and Brand */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 group text-left cursor-pointer transition-transform active:scale-98"
          title="Ir a la pantalla principal"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform border-2 border-white">
            <div className="w-7 h-7 grid grid-cols-2 gap-0.5">
              <div className="bg-white rounded-xs"></div>
              <div className="bg-white rounded-xs"></div>
              <div className="bg-white rounded-xs"></div>
              <div className="bg-white rounded-xs"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xl sm:text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Computación Fácil
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/20 text-amber-500 border border-amber-400/40">
                Windows para Papá
              </span>
            </div>
            <p className={`text-xs sm:text-sm font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Paso a paso, a tu ritmo y sin complicaciones
            </p>
          </div>
        </button>

        {/* Navigation buttons */}
        <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 w-full md:w-auto" aria-label="Navegación principal">
          <button
            onClick={() => handleNav('home')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-base flex items-center gap-2 transition-all cursor-pointer border-2 ${
              currentView === 'home'
                ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Lecciones</span>
          </button>

          <button
            onClick={() => handleNav('glossary')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-base flex items-center gap-2 transition-all cursor-pointer border-2 ${
              currentView === 'glossary'
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span>Glosario</span>
          </button>

          <button
            onClick={() => handleNav('playground')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-base flex items-center gap-2 transition-all cursor-pointer border-2 ${
              currentView === 'playground'
                ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <Gamepad2 className="w-5 h-5" />
            <span className="hidden sm:inline">Escritorio Libre</span>
            <span className="sm:hidden">Práctica</span>
          </button>

          <button
            onClick={() => handleNav('certificate')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl font-bold text-base flex items-center gap-2 transition-all cursor-pointer border-2 ${
              currentView === 'certificate'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                : totalCompletedModules > 0
                ? 'bg-amber-400/20 text-amber-400 border-amber-400/40 hover:bg-amber-400/30'
                : isDark
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title="Ver tu diploma de graduación"
          >
            <Award className="w-5 h-5 text-amber-500" />
            <span className="font-extrabold">Mi Diploma</span>
            {totalCompletedModules > 0 && (
              <span className="bg-amber-400 text-slate-950 text-xs px-1.5 py-0.5 rounded-full font-black">
                {totalCompletedModules}
              </span>
            )}
          </button>
        </nav>

        {/* Accessibility & Theme controls */}
        <div className="flex items-center gap-2">
          {/* Dark / Light Mode Toggle Button */}
          <button
            onClick={() => {
              playClickSound();
              toggleTheme();
            }}
            className={`px-3 py-2 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all cursor-pointer active:scale-95 border-2 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 shadow-sm'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-300 shadow-xs'
            }`}
            title={isDark ? 'Cambiar a Modo Claro (Día)' : 'Cambiar a Modo Oscuro (Noche)'}
            aria-label={isDark ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          >
            {isDark ? (
              <>
                <Sun className="w-5 h-5 text-amber-300" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 text-indigo-700" />
                <span>Modo Oscuro</span>
              </>
            )}
          </button>

          {/* Text Size Cycler */}
          <button
            onClick={() => {
              playClickSound();
              cycleTextSize();
            }}
            className={`px-3 py-2 rounded-xl font-bold text-sm sm:text-base flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 border-2 ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
            title="Cambiar el tamaño de la letra para leer mejor"
          >
            <ZoomIn className="w-5 h-5 text-blue-500" />
            <span className="hidden sm:inline">{getTextSizeLabel()}</span>
            <span className="sm:hidden">{textSize === 'normal' ? 'A' : textSize === 'large' ? 'A+' : 'A++'}</span>
          </button>

          {/* High Contrast */}
          <button
            onClick={() => {
              playClickSound();
              toggleHighContrast();
            }}
            className={`p-2 rounded-xl border-2 transition-all cursor-pointer active:scale-95 ${
              highContrast
                ? 'bg-black text-yellow-300 border-yellow-400 ring-2 ring-yellow-400'
                : isDark
                ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
            }`}
            title={highContrast ? 'Desactivar modo alto contraste' : 'Activar modo alto contraste'}
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
