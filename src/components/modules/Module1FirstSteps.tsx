import React, { useState } from 'react';
import { 
  MousePointer, 
  Folder, 
  FolderOpen, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Trash2, 
  Music, 
  ShieldCheck, 
  Image as ImageIcon,
  Sun,
  Laptop,
  Monitor,
  HardDrive
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { StepItem } from '../../types';
import { SpeechReaderButton } from '../common/SpeechReaderButton';
import { ConfidencePill } from '../common/ConfidencePill';
import { WindowsWindow } from '../common/WindowsWindow';

interface Props {
  step: StepItem;
  stepIndex: number;
  onCompleteStep: () => void;
  isCompleted: boolean;
}

export const Module1FirstSteps: React.FC<Props> = ({
  step,
  stepIndex,
  onCompleteStep,
  isCompleted
}) => {
  const { playClickSound, playSuccessSound } = useAccessibility();

  // Step 1 state: Screen turned on
  const [screenTurnedOn, setScreenTurnedOn] = useState(false);

  // Step 2 state: Click practice on 3 colored circles
  const [clickedButtons, setClickedButtons] = useState<{ red: boolean; green: boolean; blue: boolean }>({
    red: false,
    green: false,
    blue: false
  });

  // Step 3 state: Double click practice
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  // Step 4 state: Desktop explored elements
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [exploredItems, setExploredItems] = useState<string[]>([]);

  // Step 2 Click handler
  const handleClickTarget = (color: 'red' | 'green' | 'blue') => {
    playClickSound();
    const updated = { ...clickedButtons, [color]: true };
    setClickedButtons(updated);

    if (updated.red && updated.green && updated.blue) {
      playSuccessSound();
      onCompleteStep();
    }
  };

  // Step 3 Double click handler
  const handleFolderClick = () => {
    const now = Date.now();
    playClickSound();
    if (now - lastClickTime < 900) {
      setIsFolderOpen(true);
      playSuccessSound();
      onCompleteStep();
      setClickCount(0);
    } else {
      setClickCount(prev => prev + 1);
      setLastClickTime(now);
    }
  };

  // Step 4 Desktop exploration
  const handleExplore = (item: string) => {
    playClickSound();
    setHoveredItem(item);
    if (!exploredItems.includes(item)) {
      const updated = [...exploredItems, item];
      setExploredItems(updated);
      if (updated.length >= 3) {
        playSuccessSound();
        onCompleteStep();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header Card with Windows Style */}
      <WindowsWindow
        title="Guía de Aprendizaje de Windows"
        subtitle={`Paso ${stepIndex + 1}: ${step.title}`}
        icon={
          <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
            <div className="bg-blue-600 rounded-xs"></div>
            <div className="bg-blue-600 rounded-xs"></div>
            <div className="bg-blue-600 rounded-xs"></div>
            <div className="bg-blue-600 rounded-xs"></div>
          </div>
        }
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

      {/* Interactive Activity Section inside Windows Simulated App */}
      <WindowsWindow
        title="Simulador de Escritorio Windows 11"
        subtitle="Área de Práctica Interactiva"
        icon={<Monitor className="w-5 h-5 text-blue-600" />}
        className="border-3 border-blue-400/50"
      >
        {/* STEP 1: Peace of Mind & Turn On Screen */}
        {step.componentKey === 'intro-peace-of-mind' && (
          <div className="text-center max-w-2xl mx-auto space-y-6 py-4">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 rounded-3xl border-2 border-blue-200 shadow-md">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-md">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-2">
                ¡Tu entorno seguro de Windows!
              </h4>
              <p className="text-slate-600 text-lg leading-relaxed">
                En Windows no hay nada que puedas estropear por equivocarte. Todos los programas tienen botón de cerrar y todo se puede volver a abrir con tranquilidad.
              </p>
            </div>

            <div className="pt-2">
              {!screenTurnedOn ? (
                <button
                  onClick={() => {
                    playSuccessSound();
                    setScreenTurnedOn(true);
                    onCompleteStep();
                  }}
                  className="px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-black text-xl shadow-lg cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-3 mx-auto border-2 border-white animate-gentle-pulse"
                >
                  <Sun className="w-8 h-8 text-amber-300" />
                  <span>Haz clic aquí para iniciar Windows</span>
                </button>
              ) : (
                <div className="bg-emerald-50 border-2 border-emerald-400 p-6 rounded-3xl text-emerald-950 text-center animate-in fade-in">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-7 h-7 text-emerald-600" />
                    <span className="text-2xl font-black">¡Windows Iniciado con Éxito!</span>
                  </div>
                  <p className="text-lg font-semibold text-slate-700">
                    ¡Excelente trabajo, papá! Has dado tu primer clic en el sistema.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: Single Click Practice */}
        {step.componentKey === 'mouse-single-click-practice' && (
          <div className="space-y-6 text-center py-2">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-5 py-2.5 rounded-2xl border-2 border-blue-200 text-slate-800 font-bold text-lg shadow-xs">
              <MousePointer className="w-6 h-6 text-blue-600 animate-bounce" />
              <span>{step.instructionPrompt}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-2">
              {/* Red Target */}
              <button
                onClick={() => handleClickTarget('red')}
                className={`p-6 sm:p-8 rounded-3xl border-4 transition-all duration-200 flex flex-col items-center justify-center gap-3 cursor-pointer shadow-md ${
                  clickedButtons.red
                    ? 'bg-rose-100 border-rose-500 text-rose-950 scale-98'
                    : 'bg-rose-500 hover:bg-rose-600 border-rose-600 text-white hover:scale-105 active:scale-95'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  {clickedButtons.red ? (
                    <CheckCircle2 className="w-10 h-10 text-rose-700" />
                  ) : (
                    <span className="text-2xl font-black">1</span>
                  )}
                </div>
                <span className="text-xl sm:text-2xl font-extrabold">
                  {clickedButtons.red ? '¡Tocado!' : 'Botón Rojo'}
                </span>
                <span className="text-sm font-semibold opacity-90">
                  {clickedButtons.red ? '✓ Clic registrado' : 'Haz un clic'}
                </span>
              </button>

              {/* Green Target */}
              <button
                onClick={() => handleClickTarget('green')}
                className={`p-6 sm:p-8 rounded-3xl border-4 transition-all duration-200 flex flex-col items-center justify-center gap-3 cursor-pointer shadow-md ${
                  clickedButtons.green
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-950 scale-98'
                    : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-700 text-white hover:scale-105 active:scale-95'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  {clickedButtons.green ? (
                    <CheckCircle2 className="w-10 h-10 text-emerald-700" />
                  ) : (
                    <span className="text-2xl font-black">2</span>
                  )}
                </div>
                <span className="text-xl sm:text-2xl font-extrabold">
                  {clickedButtons.green ? '¡Tocado!' : 'Botón Verde'}
                </span>
                <span className="text-sm font-semibold opacity-90">
                  {clickedButtons.green ? '✓ Clic registrado' : 'Haz un clic'}
                </span>
              </button>

              {/* Blue Target */}
              <button
                onClick={() => handleClickTarget('blue')}
                className={`p-6 sm:p-8 rounded-3xl border-4 transition-all duration-200 flex flex-col items-center justify-center gap-3 cursor-pointer shadow-md ${
                  clickedButtons.blue
                    ? 'bg-blue-100 border-blue-500 text-blue-950 scale-98'
                    : 'bg-blue-600 hover:bg-blue-700 border-blue-700 text-white hover:scale-105 active:scale-95'
                }`}
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                  {clickedButtons.blue ? (
                    <CheckCircle2 className="w-10 h-10 text-blue-700" />
                  ) : (
                    <span className="text-2xl font-black">3</span>
                  )}
                </div>
                <span className="text-xl sm:text-2xl font-extrabold">
                  {clickedButtons.blue ? '¡Tocado!' : 'Botón Azul'}
                </span>
                <span className="text-sm font-semibold opacity-90">
                  {clickedButtons.blue ? '✓ Clic registrado' : 'Haz un clic'}
                </span>
              </button>
            </div>

            {clickedButtons.red && clickedButtons.green && clickedButtons.blue && (
              <div className="bg-emerald-100 border-2 border-emerald-400 p-4 rounded-2xl max-w-md mx-auto text-emerald-950 font-bold text-lg flex items-center justify-center gap-2 animate-in zoom-in-95 mt-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                <span>¡Excelente! Ya dominas el clic en Windows.</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 3: Double Click Practice (Windows Folder) */}
        {step.componentKey === 'mouse-double-click-practice' && (
          <div className="space-y-6 text-center max-w-2xl mx-auto py-2">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-5 py-2.5 rounded-2xl border-2 border-amber-200 text-slate-800 font-bold text-lg shadow-xs">
              <span>{step.instructionPrompt}</span>
            </div>

            <div className="bg-gradient-to-b from-sky-100 to-indigo-50 p-8 rounded-3xl border-3 border-slate-300 shadow-md">
              {!isFolderOpen ? (
                <div className="space-y-4">
                  <button
                    onClick={handleFolderClick}
                    className="group mx-auto p-6 sm:p-8 rounded-3xl bg-white/80 hover:bg-white border-4 border-amber-400 hover:border-amber-500 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95"
                    title="Haz doble clic rápido para abrir la carpeta de Windows"
                  >
                    <Folder className="w-24 h-24 text-amber-500 group-hover:scale-110 transition-transform fill-amber-300" />
                    <span className="text-2xl font-black text-slate-900">
                      Mis Recuerdos de Windows
                    </span>
                    <span className="text-base font-bold text-amber-900 bg-amber-200 px-4 py-1.5 rounded-full border border-amber-300">
                      Doble clic rápido (toc-toc) 👆👆
                    </span>
                  </button>

                  {clickCount === 1 && (
                    <p className="text-blue-700 font-bold text-lg animate-pulse">
                      ¡Diste 1 clic! Haz el segundo clic enseguida para abrir la carpeta.
                    </p>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsFolderOpen(true);
                        playSuccessSound();
                        onCompleteStep();
                      }}
                      className="text-sm font-bold text-slate-600 hover:text-blue-800 underline cursor-pointer"
                    >
                      (¿Te cuesta el doble clic? Pulsa aquí para abrirla con ayuda)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-in zoom-in-95 bg-white p-6 rounded-2xl border-2 border-slate-300 shadow-sm">
                  {/* Windows File Explorer Header */}
                  <div className="flex items-center justify-between pb-3 border-b-2 border-slate-200 text-left">
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-7 h-7 text-amber-500 fill-amber-300" />
                      <span className="font-bold text-slate-900 text-lg">Este equipo &gt; Mis Recuerdos</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                      ✓ Carpeta Abierta
                    </span>
                  </div>

                  <p className="text-slate-600 text-base font-medium text-left">
                    Contenido de la carpeta en el Explorador de Windows:
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 flex flex-col items-center">
                      <ImageIcon className="w-12 h-12 text-blue-600 mb-2" />
                      <span className="font-bold text-slate-800 text-sm">Cumpleaños_Nietos.jpg</span>
                      <span className="text-xs text-slate-500">Imagen JPEG</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 flex flex-col items-center">
                      <ImageIcon className="w-12 h-12 text-emerald-600 mb-2" />
                      <span className="font-bold text-slate-800 text-sm">Paseo_Domingo.jpg</span>
                      <span className="text-xs text-slate-500">Imagen JPEG</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsFolderOpen(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm cursor-pointer"
                    >
                      Cerrar carpeta para practicar de nuevo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 4: Windows 11 Desktop Anatomy Simulator */}
        {step.componentKey === 'desktop-anatomy-practice' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-slate-100 px-5 py-2.5 rounded-2xl border-2 border-blue-200 text-slate-800 font-bold text-lg shadow-xs">
                <span>Toca los elementos de Windows para descubrir para qué sirven ({exploredItems.length}/3 explorados)</span>
              </div>
            </div>

            {/* Simulated Windows 11 Desktop */}
            <div className="bg-gradient-to-b from-blue-600 via-indigo-700 to-slate-900 rounded-3xl p-6 border-4 border-slate-700 shadow-2xl relative min-h-[360px] flex flex-col justify-between overflow-hidden">
              {/* Desktop Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => handleExplore('equipo')}
                  className={`p-3 rounded-2xl text-white flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    exploredItems.includes('equipo') ? 'bg-white/30 ring-2 ring-white' : 'hover:bg-white/20'
                  }`}
                >
                  <HardDrive className="w-10 h-10 text-sky-200" />
                  <span className="text-sm font-bold drop-shadow-md">Este Equipo</span>
                  {exploredItems.includes('equipo') && (
                    <span className="text-[10px] bg-emerald-500 px-2 py-0.5 rounded-full font-bold">✓ Visto</span>
                  )}
                </button>

                <button
                  onClick={() => handleExplore('basura')}
                  className={`p-3 rounded-2xl text-white flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    exploredItems.includes('basura') ? 'bg-white/30 ring-2 ring-white' : 'hover:bg-white/20'
                  }`}
                >
                  <Trash2 className="w-10 h-10 text-amber-200" />
                  <span className="text-sm font-bold drop-shadow-md">Papelera</span>
                  {exploredItems.includes('basura') && (
                    <span className="text-[10px] bg-emerald-500 px-2 py-0.5 rounded-full font-bold">✓ Visto</span>
                  )}
                </button>

                <button
                  onClick={() => handleExplore('musica')}
                  className={`p-3 rounded-2xl text-white flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    exploredItems.includes('musica') ? 'bg-white/30 ring-2 ring-white' : 'hover:bg-white/20'
                  }`}
                >
                  <Music className="w-10 h-10 text-teal-200" />
                  <span className="text-sm font-bold drop-shadow-md">Música</span>
                  {exploredItems.includes('musica') && (
                    <span className="text-[10px] bg-emerald-500 px-2 py-0.5 rounded-full font-bold">✓ Visto</span>
                  )}
                </button>
              </div>

              {/* Explanatory callout dialog */}
              {hoveredItem && (
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border-2 border-slate-800 text-slate-900 max-w-lg mx-auto shadow-2xl animate-in zoom-in-95 my-4">
                  {hoveredItem === 'inicio' && (
                    <p className="text-base sm:text-lg font-bold">
                      🪟 <strong>Botón Inicio de Windows:</strong> El menú central donde encuentras todos tus programas, fotos y herramientas.
                    </p>
                  )}
                  {hoveredItem === 'reloj' && (
                    <p className="text-base sm:text-lg font-bold">
                      🕒 <strong>Área de Notificaciones y Reloj:</strong> Muestra la hora exacta, fecha, volumen del audio y señal de WiFi.
                    </p>
                  )}
                  {hoveredItem === 'equipo' && (
                    <p className="text-base sm:text-lg font-bold">
                      💻 <strong>Este Equipo:</strong> Te da acceso a todos los discos y carpetas principales de tu computadora.
                    </p>
                  )}
                  {hoveredItem === 'basura' && (
                    <p className="text-base sm:text-lg font-bold">
                      🗑️ <strong>Papelera de Reciclaje:</strong> Guarda temporalmente los archivos que borras por si quieres recuperarlos.
                    </p>
                  )}
                  {hoveredItem === 'musica' && (
                    <p className="text-base sm:text-lg font-bold">
                      🎵 <strong>Carpeta de Música:</strong> Donde se guardan tus canciones y discos digitales en Windows.
                    </p>
                  )}
                </div>
              )}

              {/* Windows 11 Bottom Taskbar */}
              <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl p-2.5 flex items-center justify-between border-2 border-slate-700">
                <button
                  onClick={() => handleExplore('inicio')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-black text-sm text-white transition-all cursor-pointer ${
                    exploredItems.includes('inicio') ? 'bg-blue-600 ring-2 ring-blue-300' : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-sky-400 rounded-xs"></div>
                    <div className="bg-sky-400 rounded-xs"></div>
                    <div className="bg-sky-400 rounded-xs"></div>
                    <div className="bg-sky-400 rounded-xs"></div>
                  </div>
                  <span>Inicio</span>
                </button>

                <button
                  onClick={() => handleExplore('reloj')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-200 transition-all cursor-pointer ${
                    exploredItems.includes('reloj') ? 'bg-blue-600 ring-2 ring-blue-300 text-white' : 'hover:bg-slate-800'
                  }`}
                >
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>10:30 AM • 3 de Octubre</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </WindowsWindow>
    </div>
  );
};
