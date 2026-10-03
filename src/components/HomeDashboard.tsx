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
  Heart,
  Clock,
  HardDrive,
  Monitor
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
  const { playClickSound } = useAccessibility();

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'MousePointerClick':
        return (
          <div className="w-10 h-10 grid grid-cols-2 gap-0.5">
            <div className="bg-sky-500 rounded-xs"></div>
            <div className="bg-sky-500 rounded-xs"></div>
            <div className="bg-sky-500 rounded-xs"></div>
            <div className="bg-sky-500 rounded-xs"></div>
          </div>
        );
      case 'Search':
        return <Search className="w-9 h-9 text-amber-500" />;
      case 'Globe':
        return <Globe className="w-9 h-9 text-sky-500" />;
      case 'Mail':
        return <Mail className="w-9 h-9 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-9 h-9 text-emerald-600" />;
      default:
        return <Sparkles className="w-9 h-9 text-indigo-600" />;
    }
  };

  const completedModulesCount = Object.values(modulesProgress).filter(m => m.isCompleted).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      
      {/* Windows 11 Desktop Style Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border-4 border-blue-400/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-wider">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              <div className="bg-sky-300 rounded-xs"></div>
              <div className="bg-sky-300 rounded-xs"></div>
              <div className="bg-sky-300 rounded-xs"></div>
              <div className="bg-sky-300 rounded-xs"></div>
            </div>
            <span>Aprende Windows 11 para Papá</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            ¡Hola, {userName || 'Papá'}! 👋
          </h1>

          <p className="text-blue-100 text-lg sm:text-2xl font-medium leading-relaxed">
            Tu curso interactivo de computación con el diseño real de Windows. Aprende a tu ritmo, sin prisas y con total seguridad.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <SpeechReaderButton
              textToRead={`¡Hola! Bienvenido a tu curso de computación con estilo Windows. Aquí aprenderás a usar el ratón, el menú inicio, el explorador de archivos, el navegador Edge, el correo y la seguridad de Windows. Selecciona la primera lección para comenzar.`}
              label="Escuchar bienvenida en voz alta"
              size="large"
              className="bg-amber-400 text-slate-950 hover:bg-amber-300 border-none"
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
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Tus Lecciones de Windows
              </h2>
              <p className="text-slate-600 text-base sm:text-lg font-medium">
                Aprende las funciones esenciales del sistema operativo con simuladores reales.
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 px-4 py-2 rounded-2xl text-blue-950 font-bold text-sm sm:text-base">
              🏆 {completedModulesCount} de {MODULES.length} lecciones listas
            </div>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 gap-6">
            {MODULES.map((module) => {
              const progress = modulesProgress[module.id];
              const isDone = progress?.isCompleted;
              const completedStepsCount = progress?.completedSteps?.length || 0;

              return (
                <div
                  key={module.id}
                  className={`bg-white rounded-3xl p-6 sm:p-8 border-3 transition-all duration-200 shadow-sm hover:shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                    isDone
                      ? 'border-emerald-400 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-blue-400'
                  }`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner border-2 ${
                      isDone
                        ? 'bg-emerald-100 border-emerald-300'
                        : 'bg-blue-50 border-blue-200'
                    }`}>
                      {getModuleIcon(module.iconName)}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-300">
                          Módulo {module.number}
                        </span>
                        <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                          {module.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {module.estimatedMinutes} min
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                        {module.title}
                      </h3>

                      <p className="text-slate-600 text-base sm:text-lg font-medium max-w-2xl leading-relaxed">
                        {module.shortDescription}
                      </p>

                      <div className="pt-2 text-sm font-bold text-slate-500">
                        {isDone ? (
                          <span className="text-emerald-700 flex items-center gap-1 font-extrabold">
                            <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                            ¡Lección completada en Windows!
                          </span>
                        ) : (
                          <span>
                            {completedStepsCount > 0
                              ? `Paso ${completedStepsCount} de ${module.steps.length} completado`
                              : `${module.steps.length} pasos sencillos`}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        playClickSound();
                        onSelectModule(module.id);
                      }}
                      className={`w-full md:w-auto px-8 py-4 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md active:scale-95 ${
                        isDone
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-blue-600 hover:bg-blue-700 text-white'
                      }`}
                    >
                      <span>{isDone ? 'Repasar lección' : completedStepsCount > 0 ? 'Continuar' : 'Empezar'}</span>
                      <ArrowRight className="w-6 h-6 stroke-[3]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </WindowsWindow>

      {/* Windows Quick Tools Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {/* Glossary */}
        <div
          onClick={() => {
            playClickSound();
            onNavigate('glossary');
          }}
          className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <BookOpen className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-extrabold text-slate-900 mb-1">
            Glosario de Windows
          </h4>
          <p className="text-slate-600 text-sm font-medium mb-3">
            Consulta palabras técnicas explicadas con cosas cotidianas de la vida.
          </p>
          <span className="text-indigo-600 font-bold text-sm group-hover:underline">
            Ver diccionario fácil →
          </span>
        </div>

        {/* Free Playground */}
        <div
          onClick={() => {
            playClickSound();
            onNavigate('playground');
          }}
          className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-purple-400 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <h4 className="text-xl font-extrabold text-slate-900 mb-1">
            Escritorio Libre de Windows
          </h4>
          <p className="text-slate-600 text-sm font-medium mb-3">
            Abre la calculadora, escribe en el bloc de notas y busca en el navegador sin límites.
          </p>
          <span className="text-purple-600 font-bold text-sm group-hover:underline">
            Abrir escritorio virtual →
          </span>
        </div>

        {/* Certificate */}
        <div
          onClick={() => {
            playClickSound();
            onNavigate('certificate');
          }}
          className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-3xl border-2 border-amber-300 hover:border-amber-500 shadow-xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
            <Award className="w-8 h-8 text-amber-700" />
          </div>
          <h4 className="text-xl font-extrabold text-slate-900 mb-1">
            Diploma Oficial de Windows
          </h4>
          <p className="text-slate-700 text-sm font-medium mb-3">
            Revisa e imprime tu diploma conmemorativo para celebrar tu logro.
          </p>
          <span className="text-amber-900 font-black text-sm group-hover:underline">
            Ver mi diploma →
          </span>
        </div>
      </div>

    </div>
  );
};
