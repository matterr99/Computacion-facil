import React, { useState } from 'react';
import { 
  Monitor, 
  MousePointer, 
  Keyboard, 
  HardDrive, 
  Wifi, 
  Laptop, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck 
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { StepItem } from '../../types';
import { HARDWARE_PARTS, MYTHS_LIST } from '../../data/modulesData';
import { SpeechReaderButton } from '../common/SpeechReaderButton';
import { ConfidencePill } from '../common/ConfidencePill';
import { WindowsWindow } from '../common/WindowsWindow';

interface Props {
  step: StepItem;
  stepIndex: number;
  onCompleteStep: () => void;
  isCompleted: boolean;
}

export const Module0ComputerHardware: React.FC<Props> = ({
  step,
  stepIndex,
  onCompleteStep,
  isCompleted
}) => {
  const { playClickSound, playSuccessSound } = useAccessibility();

  // Step 1: Hardware explored parts
  const [selectedHardware, setSelectedHardware] = useState<string>('pantalla');
  const [exploredParts, setExploredParts] = useState<string[]>(['pantalla']);

  // Step 3: Myths revealed state
  const [revealedMyths, setRevealedMyths] = useState<string[]>([]);

  const handleSelectHardware = (id: string) => {
    playClickSound();
    setSelectedHardware(id);
    if (!exploredParts.includes(id)) {
      const updated = [...exploredParts, id];
      setExploredParts(updated);
      if (updated.length >= HARDWARE_PARTS.length) {
        playSuccessSound();
        onCompleteStep();
      }
    }
  };

  const handleRevealMyth = (id: string) => {
    playClickSound();
    if (!revealedMyths.includes(id)) {
      const updated = [...revealedMyths, id];
      setRevealedMyths(updated);
      if (updated.length >= MYTHS_LIST.length) {
        playSuccessSound();
        onCompleteStep();
      }
    }
  };

  const activePart = HARDWARE_PARTS.find(p => p.id === selectedHardware) || HARDWARE_PARTS[0];

  const getHardwareIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-10 h-10 text-blue-600 dark:text-blue-400" />;
      case 'MousePointer': return <MousePointer className="w-10 h-10 text-amber-600 dark:text-amber-400" />;
      case 'Keyboard': return <Keyboard className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />;
      case 'HardDrive': return <HardDrive className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />;
      case 'Wifi': return <Wifi className="w-10 h-10 text-sky-600 dark:text-sky-400" />;
      default: return <Laptop className="w-10 h-10 text-blue-600 dark:text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header Card with Windows Style */}
      <WindowsWindow
        title="Fundamentos de la Computadora y Windows"
        subtitle={`Paso ${stepIndex + 1}: ${step.title}`}
        icon={<Laptop className="w-5 h-5 text-blue-600" />}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-blue-700 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 text-xs sm:text-sm font-black px-3 py-1 rounded-full border border-blue-200 dark:border-blue-700 uppercase tracking-wider">
              {step.subtitle}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              {step.title}
            </h3>
          </div>
          <SpeechReaderButton textToRead={step.audioText || step.explanation} />
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-lg sm:text-xl font-medium leading-relaxed mb-4 whitespace-pre-line">
          {step.explanation}
        </p>

        {step.reassuranceNote && (
          <ConfidencePill text={step.reassuranceNote} type="tip" className="mt-4" />
        )}
      </WindowsWindow>

      {/* Interactive Activity Section */}
      <WindowsWindow
        title="Explorador Interactivo de Conceptos"
        subtitle="Conocimiento Fácil y Seguro"
        icon={<HelpCircle className="w-5 h-5 text-indigo-600" />}
        className="border-3 border-indigo-400/50"
      >
        {/* STEP 1: Interactive Hardware Anatomy */}
        {step.componentKey === 'computer-hardware-anatomy' && (
          <div className="space-y-6 py-2">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-2xl border-2 border-blue-200 dark:border-blue-700 text-slate-800 dark:text-slate-200 font-bold text-base sm:text-lg shadow-xs">
                <span>Toca las 5 partes de la computadora para explorarlas ({exploredParts.length}/{HARDWARE_PARTS.length} vistas)</span>
              </div>
            </div>

            {/* Hardware Components Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {HARDWARE_PARTS.map((part) => {
                const isSelected = part.id === selectedHardware;
                const isExplored = exploredParts.includes(part.id);

                return (
                  <button
                    key={part.id}
                    onClick={() => handleSelectHardware(part.id)}
                    className={`p-4 rounded-2xl border-3 flex flex-col items-center gap-2 transition-all cursor-pointer shadow-sm ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-700 ring-4 ring-blue-300 scale-102'
                        : isExplored
                        ? 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                        : 'bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700'}`}>
                      {getHardwareIcon(part.icon)}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-center line-clamp-2">
                      {part.name}
                    </span>
                    {isExplored && !isSelected && (
                      <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                        ✓ Vista
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Detailed Selected Part Callout Box */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-850 dark:to-slate-800 p-6 sm:p-8 rounded-3xl border-3 border-blue-300 dark:border-blue-700 shadow-lg max-w-3xl mx-auto space-y-4 animate-in zoom-in-95">
              <div className="flex items-center gap-4 border-b border-blue-200 dark:border-blue-700 pb-4">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl p-2 border-2 border-blue-300 dark:border-blue-600 shadow-xs flex items-center justify-center">
                  {getHardwareIcon(activePart.icon)}
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-400">Parte Física (Hardware)</span>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{activePart.name}</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-blue-700">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">💡 En la vida cotidiana:</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{activePart.analogy}</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-blue-200 dark:border-blue-700">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">⚙️ ¿Qué función cumple?</span>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{activePart.whatItDoes}</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-100 dark:bg-emerald-950/60 rounded-2xl border border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
                <span>Tranquilidad: {activePart.safeTip}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: What is an Operating System & Windows */}
        {step.componentKey === 'os-explanation-visual' && (
          <div className="max-w-3xl mx-auto space-y-6 py-2">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border-4 border-slate-700 shadow-2xl text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
                <div className="w-8 h-8 grid grid-cols-2 gap-1">
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                  <div className="bg-white rounded-xs"></div>
                </div>
              </div>

              <h4 className="text-2xl sm:text-3xl font-black">
                Windows: El Idioma de tu Computadora
              </h4>

              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                Los componentes físicos no sabrían qué hacer sin un **Sistema Operativo**. Windows traduce los movimientos de tu mano para que la pantalla te muestre tus fotos, recetas y vídeos.
              </p>
            </div>

            {/* Operating systems comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-950/40 border-3 border-blue-400 dark:border-blue-700 p-5 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-10 h-10 mx-auto grid grid-cols-2 gap-0.5">
                  <div className="bg-blue-600 rounded-xs"></div>
                  <div className="bg-blue-600 rounded-xs"></div>
                  <div className="bg-blue-600 rounded-xs"></div>
                  <div className="bg-blue-600 rounded-xs"></div>
                </div>
                <h5 className="font-black text-xl text-blue-950 dark:text-blue-200">Windows (Microsoft)</h5>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  El sistema de tu computadora. Organiza todo en "ventanas" rectangulares.
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-700 p-5 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-10 h-10 mx-auto bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold">
                  📱
                </div>
                <h5 className="font-black text-xl text-emerald-950 dark:text-emerald-200">Android (Google)</h5>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  El sistema que llevan la mayoría de teléfonos móviles y tabletas táctiles.
                </p>
              </div>

              <div className="bg-slate-100 dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-700 p-5 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-10 h-10 mx-auto bg-slate-700 text-white rounded-xl flex items-center justify-center font-bold">
                  🍎
                </div>
                <h5 className="font-black text-xl text-slate-900 dark:text-white">macOS / iOS (Apple)</h5>
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  El sistema exclusivo de los teléfonos iPhone y computadoras Mac.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => {
                  playSuccessSound();
                  onCompleteStep();
                }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl shadow-lg cursor-pointer active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <span>¡Entendido! Vamos a aclarar dudas y mitos</span>
                <Sparkles className="w-6 h-6 text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Myths vs Reality Interactive Revealer */}
        {step.componentKey === 'myths-vs-reality-quiz' && (
          <div className="max-w-3xl mx-auto space-y-6 py-2">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-5 py-2.5 rounded-2xl border-2 border-blue-200 dark:border-blue-700 text-slate-800 dark:text-slate-200 font-bold text-lg shadow-xs">
                <span>Toca las 5 tarjetas para descubrir la verdad ({revealedMyths.length}/{MYTHS_LIST.length} descubiertas)</span>
              </div>
            </div>

            <div className="space-y-4">
              {MYTHS_LIST.map((m) => {
                const isRevealed = revealedMyths.includes(m.id);

                return (
                  <div
                    key={m.id}
                    onClick={() => handleRevealMyth(m.id)}
                    className={`p-5 rounded-3xl border-3 transition-all cursor-pointer shadow-sm ${
                      isRevealed
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700'
                        : 'bg-white dark:bg-slate-800 hover:bg-amber-50/50 dark:hover:bg-slate-750 border-slate-300 dark:border-slate-700 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h5 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <span>❓</span>
                        <span>{m.myth}</span>
                      </h5>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isRevealed ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-200' : 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200'
                      }`}>
                        {isRevealed ? '✓ Aclarado' : 'Toca para ver la verdad'}
                      </span>
                    </div>

                    {isRevealed && (
                      <div className="mt-3 p-4 bg-white dark:bg-slate-850 rounded-2xl border border-emerald-300 dark:border-emerald-700 space-y-2 animate-in fade-in">
                        <p className="text-emerald-950 dark:text-emerald-300 font-black text-base sm:text-lg">
                          {m.truth}
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                          {m.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {revealedMyths.length >= MYTHS_LIST.length && (
              <div className="p-4 bg-emerald-100 dark:bg-emerald-950/60 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 text-center font-bold text-lg">
                🎉 ¡Excelente! Has despejado los 5 mitos más comunes de la computación.
              </div>
            )}
          </div>
        )}

      </WindowsWindow>
    </div>
  );
};
