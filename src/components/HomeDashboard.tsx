import React from 'react';
import { 
  MousePointerClick, 
  Search, 
  Globe, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Award, 
  BookOpen, 
  Gamepad2, 
  Clock, 
  Laptop
} from 'lucide-react';
import { MODULES } from '../data/modulesData';
import { ModuleProgress } from '../types';
import { SpeechReaderButton } from './common/SpeechReaderButton';
import { ConfidencePill } from './common/ConfidencePill';
import { WindowsWindow } from './common/WindowsWindow';
import { useAccessibility } from '../context/AccessibilityContext';

interface Props {
  modulesProgress: Record<string, ModuleProgress>;
  onSelectModule: (moduleId: string) => void;
  onNavigate: (view: string) => void;
  userName: string;
}

export const HomeDashboard: React.FC<Props> = ({
  modulesProgress,
  onSelectModule,
  onNavigate,
  userName
}) => {
  const { playClickSound, theme } = useAccessibility();
  const isDark = theme === 'dark';

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop':
        return <Laptop className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" />;
      case 'MousePointerClick':
        return (
          <div className="w-8 h-8 sm:w-10 sm:h-10 grid grid-cols-2 gap-0.5">
            <div className="bg-sky-500 rounded-xs"></div>
            <div className="bg-sky-500 rounded-xs"></div>
            <div className="bg-sky-500 rounded-xs"></div>
            <div className="bg-sky-500 rounded-xs"></div>
          </div>
        );
      case 'Search':
        return <Search className="w-8 h-8 sm:w-10 sm:h-10 text-amber-500" />;
      case 'Globe':
        return <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-sky-500" />;
      case 'Mail':
        return <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />;
      default:
        return <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />;
    }
  };

  const completedModulesCount = Object.values(modulesProgress).filter(m => m.isCompleted).length;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
      
      {/* Windows 11 Desktop Style Banner - Fully Responsive */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden border-2 sm:border-4 border-blue-400/40">
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5">
              <div className="bg-sky-300 rounded-xs"></div>
              <div className="bg-sky-300 rounded-xs"></div>
              <div className="bg-sky-300 rounded-xs"></div>
              <div className="bg-sky-300 rounded-xs"></div>
            </div>
            <span>Aprende Windows 11 para Papá</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            ¡Hola, {userName || 'Papá'}! 👋
          </h1>

          <p className="text-blue-100 text-base sm:text-xl lg:text-2xl font-medium leading-relaxed">
            Tu curso interactivo de computación con el diseño real de Windows. Aprende a tu ritmo, sin prisas y con total seguridad.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <SpeechReaderButton
              textToRead={`¡Hola! Bienvenido a tu curso de computación con estilo Windows. Aquí aprenderás a usar la computadora, el ratón, el menú inicio, el explorador de archivos, los navegadores Edge y Chrome, el correo y la seguridad digital. Selecciona la primera lección para comenzar.`}
              label="Escuchar bienvenida"
              size="large"
              className="bg-amber-400 text-slate-950 hover:bg-amber-300 border-none text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Safety Reassurance Pill */}
      <ConfidencePill
        text="🛡️ Recuerda nuestra regla de oro: No puedes romper nada aquí. Todo en Windows se puede cerrar y volver a abrir."
        type="safety"
      />

      {/* Modules List Section */}
      <WindowsWindow
        title="Centro de Aprendizaje de Windows — Módulos Paso a Paso"
        subtitle={`${completedModulesCount} de ${MODULES.length} lecciones completadas`}
        icon={
          <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
            <div className="bg-blue-600 rounded-xs"></div>
            <div className="bg-blue-600 rounded-xs"></div>
            <div className="bg-blue-600 rounded-xs"></div>
            <div className="bg-blue-600 rounded-xs"></div>
          </div>
        }
      >
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-200 dark:border-slate-700 pb-3 sm:pb-4">
            <div>
              <h2 className={`text-xl sm:text-2xl lg:text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Tus Lecciones de Windows
              </h2>
              <p className={`text-xs sm:text-base font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Aprende las funciones esenciales del sistema con simuladores interactivos.
              </p>
            </div>

            <div className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm w-fit border ${
              isDark ? 'bg-blue-950/60 text-blue-300 border-blue-800' : 'bg-blue-50 text-blue-950 border-blue-200'
            }`}>
              🏆 {completedModulesCount} de {MODULES.length} lecciones listas
            </div>
          </div>

          {/* Modules Grid - Responsive Stack */}
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {MODULES.map((module) => {
              const progress = modulesProgress[module.id];
              const isDone = progress?.isCompleted;
              const completedStepsCount = progress?.completedSteps?.length || 0;

              return (
                <div
                  key={module.id}
                  className={`rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 border-2 sm:border-3 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 ${
                    isDone
                      ? isDark
                        ? 'border-emerald-700 bg-emerald-950/20'
                        : 'border-emerald-400 bg-emerald-50/20'
                      : isDark
                      ? 'border-slate-700 bg-slate-800/60 hover:border-blue-500'
                      : 'border-slate-200 bg-white hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-5 min-w-0">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner border-2 ${
                      isDone
                        ? isDark ? 'bg-emerald-900/60 border-emerald-600' : 'bg-emerald-100 border-emerald-300'
                        : isDark ? 'bg-slate-700/60 border-slate-600' : 'bg-blue-50 border-blue-200'
                    }`}>
                      {getModuleIcon(module.iconName)}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className={`text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full border ${
                          isDark ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-300'
                        }`}>
                          Módulo {module.number}
                        </span>
                        <span className="text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-500 border border-amber-400/40">
                          {module.badge}
                        </span>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {module.estimatedMinutes} min
                        </span>
                      </div>

                      <h3 className={`text-lg sm:text-2xl lg:text-3xl font-black truncate leading-snug ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {module.title}
                      </h3>

                      <p className={`text-xs sm:text-base font-medium leading-relaxed line-clamp-2 sm:line-clamp-none ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {module.shortDescription}
                      </p>

                      <div className="pt-1 text-xs sm:text-sm font-bold">
                        {isDone ? (
                          <span className="text-emerald-500 flex items-center gap-1 font-extrabold">
                            <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                            ¡Lección completada!
                          </span>
                        ) : (
                          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
                            {completedStepsCount > 0
                              ? `Paso ${completedStepsCount} de ${module.steps.length} completado`
                              : `${module.steps.length} pasos sencillos`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex-shrink-0">
                    <button
                      onClick={() => {
                        playClickSound();
                        onSelectModule(module.id);
                      }}
                      className={`w-full md:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 ${
                        isDone
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <span>{isDone ? 'Repasar' : completedStepsCount > 0 ? 'Continuar' : 'Empezar'}</span>
                      <ArrowRight className="w-5 h-5 stroke-[3]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </WindowsWindow>

      {/* Windows Quick Tools Cards - Responsive 1 to 3 cols */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
        {/* Glossary */}
        <div
          onClick={() => {
            playClickSound();
            onNavigate('glossary');
          }}
          className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all cursor-pointer group shadow-xs hover:shadow-md ${
            isDark ? 'bg-slate-900 border-slate-700 hover:border-indigo-500' : 'bg-white border-slate-200 hover:border-indigo-400'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <h4 className={`text-lg sm:text-xl font-extrabold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Glosario de Windows
          </h4>
          <p className={`text-xs sm:text-sm font-medium mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Palabras técnicas explicadas con cosas cotidianas de la vida.
          </p>
          <span className="text-indigo-500 font-bold text-xs sm:text-sm group-hover:underline">
            Ver diccionario fácil →
          </span>
        </div>

        {/* Free Playground */}
        <div
          onClick={() => {
            playClickSound();
            onNavigate('playground');
          }}
          className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all cursor-pointer group shadow-xs hover:shadow-md ${
            isDark ? 'bg-slate-900 border-slate-700 hover:border-purple-500' : 'bg-white border-slate-200 hover:border-purple-400'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <h4 className={`text-lg sm:text-xl font-extrabold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Escritorio Libre
          </h4>
          <p className={`text-xs sm:text-sm font-medium mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Calculadora, bloc de notas y navegador simulado sin límites.
          </p>
          <span className="text-purple-500 font-bold text-xs sm:text-sm group-hover:underline">
            Abrir escritorio virtual →
          </span>
        </div>

        {/* Certificate */}
        <div
          onClick={() => {
            playClickSound();
            onNavigate('certificate');
          }}
          className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all cursor-pointer group shadow-xs hover:shadow-md sm:col-span-2 md:col-span-1 ${
            isDark 
              ? 'bg-slate-900 border-amber-500/40 hover:border-amber-400' 
              : 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-300 hover:border-amber-500'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-500 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6 text-amber-500" />
          </div>
          <h4 className={`text-lg sm:text-xl font-extrabold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Diploma Oficial
          </h4>
          <p className={`text-xs sm:text-sm font-medium mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
            Revisa e imprime tu diploma conmemorativo para celebrar tu logro.
          </p>
          <span className="text-amber-500 font-black text-xs sm:text-sm group-hover:underline">
            Ver mi diploma →
          </span>
        </div>
      </div>

    </div>
  );
};
