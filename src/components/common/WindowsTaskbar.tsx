import React, { useState } from 'react';
import { 
  Search, 
  Wifi, 
  Volume2, 
  Calculator, 
  FileText, 
  Globe, 
  Mail, 
  ShieldCheck, 
  Folder, 
  Power, 
  Settings, 
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen,
  Award,
  Gamepad2,
  X,
  Laptop
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  onNavigate: (view: string) => void;
  onSelectModule?: (moduleId: string) => void;
  currentView: string;
}

export const WindowsTaskbar: React.FC<Props> = ({
  onNavigate,
  onSelectModule,
  currentView
}) => {
  const { playClickSound, theme } = useAccessibility();
  const isDark = theme === 'dark';

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [taskbarSearchText, setTaskbarSearchText] = useState('');

  const now = new Date();
  const timeString = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });

  const toggleStartMenu = () => {
    playClickSound();
    setIsStartOpen(!isStartOpen);
  };

  const handleStartAppClick = (viewOrModule: string, isModule = false) => {
    playClickSound();
    setIsStartOpen(false);
    if (isModule && onSelectModule) {
      onSelectModule(viewOrModule);
    } else {
      onNavigate(viewOrModule);
    }
  };

  return (
    <>
      {/* Windows 11 Start Menu Popup - Responsive for all monitor sizes */}
      {isStartOpen && (
        <div 
          className="fixed bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 z-50 w-[95vw] sm:w-full max-w-lg max-h-[85vh] overflow-y-auto bg-slate-900/98 backdrop-blur-xl border-2 border-slate-700 text-white rounded-3xl p-4 sm:p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-200"
          role="dialog"
          aria-label="Menú Inicio de Windows"
        >
          {/* Start Menu Header Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={taskbarSearchText}
              onChange={(e) => setTaskbarSearchText(e.target.value)}
              placeholder="Buscar aplicaciones o lecciones..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 text-white rounded-xl border border-slate-600 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {/* Pinned Windows Learning Modules */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Lecciones de Windows para Papá</span>
              <span className="text-blue-400">Paso a paso</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                onClick={() => handleStartAppClick('componentes-y-sistema', true)}
                className="p-2.5 bg-slate-800/80 hover:bg-blue-600/60 rounded-xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Laptop className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold leading-tight">1. ¿Qué es la Computadora?</span>
              </button>

              <button
                onClick={() => handleStartAppClick('primeros-pasos', true)}
                className="p-2.5 bg-slate-800/80 hover:bg-blue-600/60 rounded-xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                  </div>
                </div>
                <span className="text-[11px] font-bold leading-tight">2. El Ratón y Escritorio</span>
              </button>

              <button
                onClick={() => handleStartAppClick('buscar-programas', true)}
                className="p-2.5 bg-slate-800/80 hover:bg-blue-600/60 rounded-xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Search className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold leading-tight">3. Buscar y Archivos</span>
              </button>

              <button
                onClick={() => handleStartAppClick('navegar-internet', true)}
                className="p-2.5 bg-slate-800/80 hover:bg-blue-600/60 rounded-xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold leading-tight">4. Edge y Chrome</span>
              </button>

              <button
                onClick={() => handleStartAppClick('correo-electronico', true)}
                className="p-2.5 bg-slate-800/80 hover:bg-blue-600/60 rounded-xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold leading-tight">5. Outlook y Gmail</span>
              </button>

              <button
                onClick={() => handleStartAppClick('seguridad-digital', true)}
                className="p-2.5 bg-slate-800/80 hover:bg-blue-600/60 rounded-xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 group"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold leading-tight">6. Seguridad Digital</span>
              </button>
            </div>
          </div>

          {/* Start Menu Footer User Profile */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center border border-white/40">
                P
              </div>
              <div>
                <p className="font-bold text-xs">Papá (Administrador)</p>
                <p className="text-[10px] text-emerald-400 font-semibold">● Modo Seguro Activo</p>
              </div>
            </div>

            <button
              onClick={() => setIsStartOpen(false)}
              className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              title="Cerrar Menú Inicio"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close start menu */}
      {isStartOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs"
          onClick={() => setIsStartOpen(false)}
        />
      )}

      {/* Fixed Windows 11 Taskbar at bottom - Optimized for Mobile & Desktop */}
      <div className="fixed bottom-0 left-0 right-0 z-40 w-full bg-slate-900/98 backdrop-blur-xl border-t-2 border-slate-700 text-white px-2 sm:px-6 py-1.5 shadow-2xl flex items-center justify-between">
        
        {/* Left widget (Desktop only) */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Windows 11 Activo</span>
        </div>

        {/* Center: Windows 11 Taskbar Icons */}
        <div className="flex items-center gap-1 sm:gap-2 mx-auto sm:mx-auto">
          {/* Windows Start Button */}
          <button
            onClick={toggleStartMenu}
            className={`p-1.5 sm:px-3 sm:py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
              isStartOpen 
                ? 'bg-blue-600 text-white ring-2 sm:ring-4 ring-blue-400/40 shadow-md' 
                : 'hover:bg-slate-800 active:scale-95'
            }`}
            title="Abrir Menú Inicio de Windows"
          >
            <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
              <div className="bg-sky-400 rounded-xs"></div>
              <div className="bg-sky-400 rounded-xs"></div>
              <div className="bg-sky-400 rounded-xs"></div>
              <div className="bg-sky-400 rounded-xs"></div>
            </div>
            <span className="hidden sm:inline font-bold text-xs sm:text-sm">Inicio</span>
          </button>

          {/* Quick Search on Taskbar */}
          <button
            onClick={toggleStartMenu}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
          >
            <Search className="w-3 h-3 text-slate-400" />
            <span>Buscar...</span>
          </button>

          {/* Pinned Windows App Icons */}
          <button
            onClick={() => handleStartAppClick('home')}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              currentView === 'home' ? 'bg-slate-800 ring-2 ring-blue-400' : 'hover:bg-slate-800'
            }`}
            title="Lecciones"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
          </button>

          <button
            onClick={() => handleStartAppClick('playground')}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              currentView === 'playground' ? 'bg-slate-800 ring-2 ring-purple-400' : 'hover:bg-slate-800'
            }`}
            title="Escritorio Libre"
          >
            <Folder className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={() => handleStartAppClick('glossary')}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              currentView === 'glossary' ? 'bg-slate-800 ring-2 ring-indigo-400' : 'hover:bg-slate-800'
            }`}
            title="Glosario"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
          </button>

          <button
            onClick={() => handleStartAppClick('certificate')}
            className={`p-2 rounded-lg transition-all cursor-pointer ${
              currentView === 'certificate' ? 'bg-slate-800 ring-2 ring-amber-400' : 'hover:bg-slate-800'
            }`}
            title="Mi Diploma"
          >
            <Award className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Right System Tray (Clock, WiFi, Sound) */}
        <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-800/80 px-2 sm:px-3 py-1 rounded-lg border border-slate-700">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Wifi className="w-3.5 h-3.5 text-emerald-400" />
            <Volume2 className="w-3.5 h-3.5 text-slate-300 hidden sm:block" />
          </div>

          <div className="h-3 w-px bg-slate-700 mx-0.5"></div>

          <div className="text-right text-[11px] sm:text-xs">
            <div className="font-bold text-white leading-none">{timeString}</div>
            <div className="text-[9px] text-slate-400 hidden sm:block leading-none mt-0.5">{dateString}</div>
          </div>
        </div>

      </div>
    </>
  );
};
