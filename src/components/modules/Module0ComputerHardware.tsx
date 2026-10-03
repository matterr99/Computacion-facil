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
  ShieldCheck, 
  ChevronRight,
  RotateCw,
  Globe
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

  // Step 2: OS comparison state
  const [selectedOS, setSelectedOS] = useState<'windows' | 'android' | 'mac'>('windows');

  // Step 3: Myths revealed state
  const [revealedMyths, setRevealedMyths] = useState<string[]>([]);

  const handleSelectHardware = (id: string) => {
    playClickSound();
    setSelectedHardware(id);
    if (!exploredParts.includes(id)) {
      const updated = [...exploredParts, id];
      setExploredParts(updated);
      if (updated.length >= 4) {
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
      if (updated.length >= 3) {
        playSuccessSound();
        onCompleteStep();
      }
    }
  };

  const activePart = HARDWARE_PARTS.find(p => p.id === selectedHardware) || HARDWARE_PARTS[0];

  const getHardwareIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-10 h-10 text-blue-600" />;
      case 'MousePointer': return <MousePointer className="w-10 h-10 text-amber-600" />;
      case 'Keyboard': return <Keyboard className="w-10 h-10 text-emerald-600" />;
      case 'HardDrive': return <HardDrive className="w-10 h-10 text-indigo-600" />;
      case 'Wifi': return <Wifi className="w-10 h-10 text-sky-600" />;
      default: return <Laptop className="w-10 h-10 text-blue-600" />;
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
            <span className="text-blue-700 bg-blue-50 text-xs sm:text-sm font-black px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
              {step.subtitle}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {step.title}
            </h3>
          </div>
          <SpeechReaderButton textToRead={step.audioText || step.explanation} />
        </div>

        <p className="text-slate-700 text-lg sm:text-xl font-medium leading-relaxed mb-4 whitespace-pre-line">
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
              <div className="inline-flex items-center gap-2 bg-slate-100 px-5 py-2.5 rounded-2xl border-2 border-blue-200 text-slate-800 font-bold text-base sm:text-lg shadow-xs">
                <span>Toca cada una de las 5 partes de la computadora para ver cómo funciona ({exploredParts.length}/5 exploradas)</span>
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
                        ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/20' : 'bg-slate-100'}`}>
                      {getHardwareIcon(part.icon)}
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-center line-clamp-2">
                      {part.name}
                    </span>
                    {isExplored && !isSelected && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        ✓ Visto
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Detailed Selected Part Callout Box */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 sm:p-8 rounded-3xl border-3 border-blue-300 shadow-lg max-w-3xl mx-auto space-y-4 animate-in zoom-in-95">
              <div className="flex items-center gap-4 border-b border-blue-200 pb-4">
                <div className="w-16 h-16 bg-white rounded-2xl p-2 border-2 border-blue-300 shadow-xs flex items-center justify-center">
                  {getHardwareIcon(activePart.icon)}
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-blue-700">Parte Física (Hardware)</span>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900">{activePart.name}</h4>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base sm:text-lg">
                <div className="p-4 bg-white rounded-2xl border border-blue-200">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">💡 En la vida cotidiana:</span>
                  <p className="font-bold text-slate-800">{activePart.analogy}</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-blue-200">
                  <span className="text-xs font-bold text-slate-500 uppercase block mb-1">⚙️ ¿Qué función cumple?</span>
                  <p className="font-bold text-slate-800">{activePart.whatItDoes}</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-100 rounded-2xl border border-emerald-300 text-emerald-950 font-bold flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-700 flex-shrink-0" />
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
                Los componentes físicos (la pantalla, el ratón) no sabrían qué hacer sin un **Sistema Operativo**. Windows es el programa que traduce los movimientos de tu mano para que la pantalla te muestre tus fotos, recetas y vídeos.
              </p>
            </div>

            {/* Operating systems comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border-3 border-blue-400 p-5 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-10 h-10 mx-auto grid grid-cols-2 gap-0.5">
                  <div className="bg-blue-600 rounded-xs"></div>
                  <div className="bg-blue-600 rounded-xs"></div>
                  <div className="bg-blue-600 rounded-xs"></div>
                  <div className="bg-blue-600 rounded-xs"></div>
                </div>
                <h5 className="font-black text-xl text-blue-950">Windows (Microsoft)</h5>
                <p className="text-xs font-semibold text-slate-600">
                  Es el sistema de tu computadora. Organiza todo en "ventanas" rectangulares.
                </p>
              </div>

              <div className="bg-emerald-50 border-2 border-emerald-300 p-5 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-10 h-10 mx-auto bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold">
                  📱
                </div>
                <h5 className="font-black text-xl text-emerald-950">Android (Google)</h5>
                <p className="text-xs font-semibold text-slate-600">
                  El sistema que llevan la mayoría de teléfonos móviles y tabletas táctiles.
                </p>
              </div>

              <div className="bg-slate-100 border-2 border-slate-300 p-5 rounded-2xl text-center space-y-2 shadow-xs">
                <div className="w-10 h-10 mx-auto bg-slate-700 text-white rounded-xl flex items-center justify-center font-bold">
                  🍎
                </div>
                <h5 className="font-black text-xl text-slate-900">macOS / iOS (Apple)</h5>
                <p className="text-xs font-semibold text-slate-600">
                  El sistema exclusivo que llevan los teléfonos iPhone y computadoras Mac.
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
              <div className="inline-flex items-center gap-2 bg-slate-100 px-5 py-2.5 rounded-2xl border-2 border-blue-200 text-slate-800 font-bold text-lg shadow-xs">
                <span>Toca las tarjetas para descubrir la verdad ({revealedMyths.length}/{MYTHS_LIST.length} descubiertos)</span>
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
                        ? 'bg-emerald-50/70 border-emerald-400'
                        : 'bg-white hover:bg-amber-50/50 border-slate-300 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h5 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                        <span>❓</span>
                        <span>{m.myth}</span>
                      </h5>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        isRevealed ? 'bg-emerald-200 text-emerald-950' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {isRevealed ? '✓ Aclarado' : 'Toca para ver la verdad'}
                      </span>
                    </div>

                    {isRevealed && (
                      <div className="mt-3 p-4 bg-white rounded-2xl border border-emerald-300 space-y-2 animate-in fade-in">
                        <p className="text-emerald-950 font-black text-base sm:text-lg">
                          {m.truth}
                        </p>
                        <p className="text-slate-700 text-sm font-medium">
                          {m.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {revealedMyths.length >= 3 && (
              <div className="p-4 bg-emerald-100 rounded-2xl border-2 border-emerald-300 text-emerald-950 text-center font-bold text-lg">
                🎉 ¡Excelente! Ahora tienes muy claros los conceptos fundamentales de la computación.
              </div>
            )}
          </div>
        )}

      </WindowsWindow>
    </div>
  );
};
