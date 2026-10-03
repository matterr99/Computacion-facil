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
  Gamepad2
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
  const { playClickSound } = useAccessibility();
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [taskbarSearchText, setTaskbarSearchText] = useState('');

  const now = new Date();
  const timeString = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const dateString = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

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
      {/* Windows 11 Start Menu Popup */}
      {isStartOpen && (
        <div 
          className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg bg-slate-900/95 backdrop-blur-xl border-2 border-slate-700 text-white rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-5 duration-200"
          role="dialog"
          aria-label="Menú Inicio de Windows"
        >
          {/* Start Menu Header Search */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={taskbarSearchText}
              onChange={(e) => setTaskbarSearchText(e.target.value)}
              placeholder="Buscar aplicaciones, lecciones o archivos..."
              className="w-full pl-12 pr-4 py-3 bg-slate-800 text-white rounded-2xl border border-slate-600 text-base font-medium focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          {/* Pinned Windows Learning Modules */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Lecciones de Windows para Papá</span>
              <span className="text-blue-400">Paso a paso</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => handleStartAppClick('primeros-pasos', true)}
                className="p-3 bg-slate-800/80 hover:bg-blue-600/60 rounded-2xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                    <div className="bg-white rounded-xs"></div>
                  </div>
                </div>
                <span className="text-xs font-bold leading-tight">1. El Ratón y Escritorio</span>
              </button>

              <button
                onClick={() => handleStartAppClick('buscar-programas', true)}
                className="p-3 bg-slate-800/80 hover:bg-blue-600/60 rounded-2xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight">2. Buscar y Archivos</span>
              </button>

              <button
                onClick={() => handleStartAppClick('navegar-internet', true)}
                className="p-3 bg-slate-800/80 hover:bg-blue-600/60 rounded-2xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight">3. Navegar en Edge</span>
              </button>

              <button
                onClick={() => handleStartAppClick('correo-electronico', true)}
                className="p-3 bg-slate-800/80 hover:bg-blue-600/60 rounded-2xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight">4. Correo Outlook</span>
              </button>

              <button
                onClick={() => handleStartAppClick('seguridad-digital', true)}
                className="p-3 bg-slate-800/80 hover:bg-blue-600/60 rounded-2xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight">5. Windows Defender</span>
              </button>

              <button
                onClick={() => handleStartAppClick('playground')}
                className="p-3 bg-slate-800/80 hover:bg-blue-600/60 rounded-2xl border border-slate-700 hover:border-blue-400 text-center transition-all cursor-pointer flex flex-col items-center gap-2 group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Gamepad2 className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold leading-tight">Escritorio Libre</span>
              </button>
            </div>
          </div>

          {/* Start Menu Footer User Profile */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center border-2 border-white/40">
                P
              </div>
              <div>
                <p className="font-bold text-sm">Papá (Administrador)</p>
                <p className="text-xs text-emerald-400 font-semibold">● Sesión Segura y Protegida</p>
              </div>
            </div>

            <button
              onClick={() => setIsStartOpen(false)}
              className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              title="Cerrar Menú Inicio"
            >
              <Power className="w-5 h-5 text-amber-400" />
            </button>
          </div>
        </div>
      )}

      {/* Backdrop to close start menu */}
      {isStartOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20"
          onClick={() => setIsStartOpen(false)}
        />
      )}

      {/* Fixed Windows 11 Taskbar at bottom */}
      <div className="sticky bottom-0 z-40 w-full bg-slate-900/95 backdrop-blur-xl border-t-2 border-slate-700/80 text-white px-3 sm:px-6 py-2 shadow-2xl flex items-center justify-between">
        
        {/* Left spacer / Windows Weather Widget */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Windows 11 para Papá • Sistema Activo</span>
        </div>

        {/* Center: Windows 11 Centered Taskbar Icons */}
        <div className="flex items-center gap-2 mx-auto">
          {/* Windows Start Button (Blue 4 tiles) */}
          <button
            onClick={toggleStartMenu}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              isStartOpen 
                ? 'bg-blue-600 text-white ring-4 ring-blue-400/40 shadow-md' 
                : 'hover:bg-slate-800 active:scale-95'
            }`}
            title="Abrir Menú Inicio de Windows"
          >
            <div className="w-6 h-6 grid grid-cols-2 gap-0.5">
              <div className="bg-sky-400 rounded-xs"></div>
              <div className="bg-sky-400 rounded-xs"></div>
              <div className="bg-sky-400 rounded-xs"></div>
              <div className="bg-sky-400 rounded-xs"></div>
            </div>
            <span className="hidden sm:inline font-bold text-sm">Inicio</span>
          </button>

          {/* Quick Search on Taskbar */}
          <button
            onClick={toggleStartMenu}
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Buscar en Windows...</span>
          </button>

          {/* Pinned Windows App Icons */}
          <button
            onClick={() => handleStartAppClick('home')}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              currentView === 'home' ? 'bg-slate-800 ring-2 ring-blue-400' : 'hover:bg-slate-800'
            }`}
            title="Inicio / Todas las Lecciones"
          >
            <BookOpen className="w-5 h-5 text-blue-400" />
          </button>

          <button
            onClick={() => handleStartAppClick('playground')}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              currentView === 'playground' ? 'bg-slate-800 ring-2 ring-purple-400' : 'hover:bg-slate-800'
            }`}
            title="Escritorio Libre de Windows"
          >
            <Folder className="w-5 h-5 text-amber-400" />
          </button>

          <button
            onClick={() => handleStartAppClick('glossary')}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              currentView === 'glossary' ? 'bg-slate-800 ring-2 ring-indigo-400' : 'hover:bg-slate-800'
            }`}
            title="Glosario de Términos"
          >
            <HelpCircle className="w-5 h-5 text-indigo-400" />
          </button>

          <button
            onClick={() => handleStartAppClick('certificate')}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              currentView === 'certificate' ? 'bg-slate-800 ring-2 ring-amber-400' : 'hover:bg-slate-800'
            }`}
            title="Mi Diploma de Windows"
          >
            <Award className="w-5 h-5 text-amber-400" />
          </button>
        </div>

        {/* Right System Tray (Clock, WiFi, Sound) */}
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
          <div className="flex items-center gap-2 text-slate-300">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <Volume2 className="w-4 h-4 text-slate-300" />
          </div>

          <div className="h-4 w-px bg-slate-700 mx-1"></div>

          <div className="text-right text-xs">
            <div className="font-bold text-white">{timeString}</div>
            <div className="text-[10px] text-slate-400 hidden sm:block">{dateString}</div>
          </div>
        </div>

      </div>
    </>
  );
};
