import React, { useState } from 'react';
import { 
  Search, 
  Calculator, 
  FileText, 
  Folder, 
  Image as ImageIcon, 
  Download, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  X, 
  Plus, 
  Minus, 
  Equal,
  HardDrive,
  ChevronRight,
  Home,
  Monitor
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

export const Module2SearchAndFiles: React.FC<Props> = ({
  step,
  stepIndex,
  onCompleteStep,
  isCompleted
}) => {
  const { playClickSound, playSuccessSound } = useAccessibility();

  // Step 2 state: Search & Calculator simulator
  const [searchTerm, setSearchTerm] = useState('');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [prevCalcValue, setPrevCalcValue] = useState<number | null>(null);
  const [calcOp, setCalcOp] = useState<string | null>(null);

  // Step 3 state: Folder explorer
  const [activeFolder, setActiveFolder] = useState<'documentos' | 'imagenes' | 'descargas'>('documentos');
  const [exploredFolders, setExploredFolders] = useState<string[]>(['documentos']);

  // Step 4 state: Find Paella recipe
  const [recipeOpened, setRecipeOpened] = useState(false);

  // Calculator interaction
  const handleCalcNumber = (num: string) => {
    playClickSound();
    setCalcDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleCalcOp = (op: string) => {
    playClickSound();
    setPrevCalcValue(parseFloat(calcDisplay));
    setCalcOp(op);
    setCalcDisplay('0');
  };

  const handleCalcEquals = () => {
    playSuccessSound();
    if (prevCalcValue !== null && calcOp) {
      const current = parseFloat(calcDisplay);
      let res = 0;
      if (calcOp === '+') res = prevCalcValue + current;
      if (calcOp === '-') res = prevCalcValue - current;
      setCalcDisplay(String(res));
      setPrevCalcValue(null);
      setCalcOp(null);
    }
  };

  const handleCalcClear = () => {
    playClickSound();
    setCalcDisplay('0');
    setPrevCalcValue(null);
    setCalcOp(null);
  };

  // Folder selection
  const handleSelectFolder = (folderKey: 'documentos' | 'imagenes' | 'descargas') => {
    playClickSound();
    setActiveFolder(folderKey);
    if (!exploredFolders.includes(folderKey)) {
      const updated = [...exploredFolders, folderKey];
      setExploredFolders(updated);
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
        title="Guía de Windows: Búsqueda y Explorador de Archivos"
        subtitle={`Paso ${stepIndex + 1}: ${step.title}`}
        icon={<Search className="w-5 h-5 text-amber-500" />}
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
        title="Windows 11: Búsqueda y Carpetas"
        subtitle="Entorno de Práctica"
        icon={<Folder className="w-5 h-5 text-amber-500 fill-amber-300" />}
      >
        {/* STEP 1: Search Intro Demonstration */}
        {step.componentKey === 'search-intro' && (
          <div className="max-w-2xl mx-auto space-y-6 text-center py-4">
            <div className="bg-slate-100 p-6 sm:p-8 rounded-3xl border-2 border-slate-300 shadow-md">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-md">
                <Search className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-2">
                ¿Para qué sirve la barra de búsqueda de Windows?
              </h4>
              <p className="text-slate-600 text-lg leading-relaxed">
                En Windows no tienes que memorizar dónde guardaste cada cosa. Simplemente haces clic en la lupa de la barra de tareas, escribes el nombre del programa o documento y Windows te lo muestra enseguida.
              </p>
            </div>

            <button
              onClick={() => {
                playSuccessSound();
                onCompleteStep();
              }}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl shadow-lg cursor-pointer active:scale-95 flex items-center justify-center gap-2 mx-auto"
            >
              <span>¡Entendido! Vamos a probar el buscador de Windows</span>
              <Sparkles className="w-6 h-6 text-amber-300" />
            </button>
          </div>
        )}

        {/* STEP 2: Windows 11 Start Search Flyout & Calculator */}
        {step.componentKey === 'search-program-simulator' && (
          <div className="max-w-2xl mx-auto space-y-6 py-2">
            
            {/* Windows 11 Start Search Flyout Window */}
            <div className="bg-slate-900 p-6 rounded-3xl border-4 border-slate-700 shadow-2xl text-white">
              {/* Search categories tabs in Windows 11 */}
              <div className="flex items-center gap-3 text-xs font-bold text-slate-400 mb-4 border-b border-slate-800 pb-2">
                <span className="text-blue-400 border-b-2 border-blue-400 pb-1">Todas</span>
                <span>Aplicaciones</span>
                <span>Documentos</span>
                <span>Configuración</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-3.5 w-6 h-6 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Escribe: Calculadora"
                    className="w-full pl-12 pr-4 py-3 bg-slate-800 text-white rounded-2xl text-xl font-bold border-2 border-blue-400 focus:outline-hidden focus:ring-4 focus:ring-blue-500"
                  />
                </div>

                <button
                  onClick={() => {
                    playClickSound();
                    setSearchTerm('Calculadora');
                  }}
                  className="px-4 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-2xl text-sm cursor-pointer whitespace-nowrap"
                  title="Escribir automáticamente 'Calculadora'"
                >
                  ⚡ Escribir por mí
                </button>
              </div>

              {/* Search match in Windows menu */}
              {searchTerm.toLowerCase().includes('calc') && (
                <div className="mt-4 bg-slate-800/90 rounded-2xl p-3 border-2 border-blue-500 animate-in fade-in slide-in-from-top-2">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Mejor coincidencia:</p>
                  <button
                    onClick={() => {
                      playSuccessSound();
                      setIsCalculatorOpen(true);
                      onCompleteStep();
                    }}
                    className="w-full flex items-center gap-3 p-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-left transition-all cursor-pointer group ring-2 ring-blue-300 shadow-md"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white text-blue-700 flex items-center justify-center font-bold shadow-inner">
                      <Calculator className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xl font-black text-white block group-hover:underline">
                        Calculadora
                      </span>
                      <span className="text-xs text-blue-200">Aplicación del sistema Windows • Haz clic para abrir</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Windows 11 Native Calculator Application Window */}
            {isCalculatorOpen && (
              <WindowsWindow
                title="Calculadora de Windows"
                subtitle="Modo Estándar"
                icon={<Calculator className="w-5 h-5 text-blue-600" />}
                className="border-3 border-emerald-400 max-w-md mx-auto animate-in zoom-in-95"
                onClose={() => setIsCalculatorOpen(false)}
              >
                {/* Display */}
                <div className="bg-slate-900 text-white rounded-2xl p-4 text-right mb-4 font-mono text-3xl sm:text-4xl font-black tracking-wider shadow-inner">
                  {calcDisplay}
                </div>

                {/* Calculator Keypad */}
                <div className="grid grid-cols-4 gap-2.5">
                  {['7', '8', '9'].map(n => (
                    <button
                      key={n}
                      onClick={() => handleCalcNumber(n)}
                      className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-2xl rounded-2xl cursor-pointer"
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => handleCalcOp('+')}
                    className="p-4 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-2xl rounded-2xl cursor-pointer"
                  >
                    <Plus className="w-6 h-6 mx-auto" />
                  </button>

                  {['4', '5', '6'].map(n => (
                    <button
                      key={n}
                      onClick={() => handleCalcNumber(n)}
                      className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-2xl rounded-2xl cursor-pointer"
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => handleCalcOp('-')}
                    className="p-4 bg-amber-100 hover:bg-amber-200 text-amber-900 font-extrabold text-2xl rounded-2xl cursor-pointer"
                  >
                    <Minus className="w-6 h-6 mx-auto" />
                  </button>

                  {['1', '2', '3'].map(n => (
                    <button
                      key={n}
                      onClick={() => handleCalcNumber(n)}
                      className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-2xl rounded-2xl cursor-pointer"
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={handleCalcEquals}
                    className="p-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-2xl rounded-2xl cursor-pointer row-span-2 flex items-center justify-center shadow-md"
                  >
                    <Equal className="w-8 h-8 stroke-[3]" />
                  </button>

                  <button
                    onClick={() => handleCalcNumber('0')}
                    className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-2xl rounded-2xl cursor-pointer col-span-2"
                  >
                    0
                  </button>
                  <button
                    onClick={handleCalcClear}
                    className="p-4 bg-rose-100 hover:bg-rose-200 text-rose-900 font-extrabold text-xl rounded-2xl cursor-pointer"
                  >
                    Borrar
                  </button>
                </div>

                <div className="mt-4 p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 text-center font-bold">
                  ✓ ¡Excelente! Has abierto y usado la Calculadora en Windows.
                </div>
              </WindowsWindow>
            )}
          </div>
        )}

        {/* STEP 3: Authentic Windows File Explorer */}
        {step.componentKey === 'file-explorer-simulator' && (
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-slate-100 px-5 py-2 rounded-2xl border-2 border-blue-200 text-slate-800 font-bold text-base sm:text-lg shadow-xs">
                <span>Haz clic en las carpetas del panel izquierdo para explorarlas ({exploredFolders.length}/3 vistas)</span>
              </div>
            </div>

            {/* Windows File Explorer App Frame */}
            <div className="bg-white rounded-2xl border-3 border-slate-300 shadow-xl overflow-hidden">
              
              {/* Windows File Explorer Ribbon Toolbar */}
              <div className="bg-slate-100 p-2.5 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium select-none">
                <div className="flex items-center gap-4">
                  <span className="font-bold text-blue-600 border-b-2 border-blue-600 pb-0.5">Inicio</span>
                  <span>Compartir</span>
                  <span>Vista</span>
                  <span>Herramientas de disco</span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-slate-400" />
                  <span>Disco Local (C:)</span>
                </div>
              </div>

              {/* Windows Breadcrumbs Address Bar */}
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-2 text-sm">
                <Home className="w-4 h-4 text-slate-500" />
                <span className="text-slate-400">&gt;</span>
                <span className="font-semibold text-slate-700">Este equipo</span>
                <span className="text-slate-400">&gt;</span>
                <span className="font-bold text-blue-700 capitalize">{activeFolder}</span>
              </div>

              {/* Two-Column Explorer: Left Tree Navigation & Right Content View */}
              <div className="grid grid-cols-1 md:grid-cols-4 min-h-[260px]">
                
                {/* Left Navigation Tree */}
                <div className="md:col-span-1 bg-slate-100/80 p-3 border-r border-slate-200 space-y-1">
                  <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider px-2 mb-2">
                    Acceso rápido
                  </p>

                  <button
                    onClick={() => handleSelectFolder('documentos')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-bold text-sm transition-all cursor-pointer ${
                      activeFolder === 'documentos'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <FileText className={`w-4 h-4 ${activeFolder === 'documentos' ? 'text-white' : 'text-blue-600'}`} />
                    <span>Documentos</span>
                  </button>

                  <button
                    onClick={() => handleSelectFolder('imagenes')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-bold text-sm transition-all cursor-pointer ${
                      activeFolder === 'imagenes'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <ImageIcon className={`w-4 h-4 ${activeFolder === 'imagenes' ? 'text-white' : 'text-emerald-600'}`} />
                    <span>Imágenes</span>
                  </button>

                  <button
                    onClick={() => handleSelectFolder('descargas')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left font-bold text-sm transition-all cursor-pointer ${
                      activeFolder === 'descargas'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Download className={`w-4 h-4 ${activeFolder === 'descargas' ? 'text-white' : 'text-purple-600'}`} />
                    <span>Descargas</span>
                  </button>
                </div>

                {/* Right Folder Content */}
                <div className="md:col-span-3 p-6 bg-white">
                  {activeFolder === 'documentos' && (
                    <div className="space-y-4 animate-in fade-in">
                      <p className="text-slate-600 text-sm font-semibold">
                        📁 Carpeta <strong>Documentos</strong> en Windows: Cartas, recibos y escritos personales.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 bg-slate-50 border-2 border-slate-200 hover:border-blue-400 rounded-2xl flex items-center gap-3 transition-colors">
                          <FileText className="w-8 h-8 text-blue-600" />
                          <div>
                            <p className="font-bold text-slate-900">Receta Paella Familiar.txt</p>
                            <p className="text-xs text-slate-400">Documento de texto • 12 KB</p>
                          </div>
                        </div>
                        <div className="p-4 bg-slate-50 border-2 border-slate-200 hover:border-blue-400 rounded-2xl flex items-center gap-3 transition-colors">
                          <FileText className="w-8 h-8 text-blue-600" />
                          <div>
                            <p className="font-bold text-slate-900">Carta_Ayuntamiento.docx</p>
                            <p className="text-xs text-slate-400">Documento de Word • 45 KB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFolder === 'imagenes' && (
                    <div className="space-y-4 animate-in fade-in">
                      <p className="text-slate-600 text-sm font-semibold">
                        🖼️ Carpeta <strong>Imágenes</strong> en Windows: Fotografías familiares y recuerdos.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 bg-slate-50 border-2 border-slate-200 hover:border-emerald-400 rounded-2xl flex items-center gap-3 transition-colors">
                          <ImageIcon className="w-8 h-8 text-emerald-600" />
                          <div>
                            <p className="font-bold text-slate-900">Cumpleaños_Nieto.jpg</p>
                            <p className="text-xs text-slate-400">Imagen JPEG • 2.4 MB</p>
                          </div>
                        </div>
                        <div className="p-4 bg-slate-50 border-2 border-slate-200 hover:border-emerald-400 rounded-2xl flex items-center gap-3 transition-colors">
                          <ImageIcon className="w-8 h-8 text-emerald-600" />
                          <div>
                            <p className="font-bold text-slate-900">Vacaciones_Playa.png</p>
                            <p className="text-xs text-slate-400">Imagen PNG • 3.1 MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeFolder === 'descargas' && (
                    <div className="space-y-4 animate-in fade-in">
                      <p className="text-slate-600 text-sm font-semibold">
                        📥 Carpeta <strong>Descargas</strong> en Windows: Archivos guardados de Internet.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-4 bg-slate-50 border-2 border-slate-200 hover:border-purple-400 rounded-2xl flex items-center gap-3 transition-colors">
                          <Download className="w-8 h-8 text-purple-600" />
                          <div>
                            <p className="font-bold text-slate-900">Manual_Televisor.pdf</p>
                            <p className="text-xs text-slate-400">Documento PDF • 1.2 MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Status Bar */}
              <div className="bg-slate-100 px-4 py-1.5 border-t border-slate-200 text-xs text-slate-500 font-medium flex items-center justify-between">
                <span>2 elementos en esta carpeta</span>
                <span>Estado: Listo</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Open Recipe Document Challenge */}
        {step.componentKey === 'find-document-challenge' && (
          <div className="max-w-2xl mx-auto space-y-6 py-2">
            <div className="bg-slate-100 p-6 rounded-3xl border-2 border-slate-300 shadow-md">
              <h4 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
                <span>Misión: Abre el documento "Receta Familiar de Paella"</span>
              </h4>

              <p className="text-slate-600 mb-4">
                Haz clic sobre el archivo en el explorador para abrir el Bloc de Notas de Windows:
              </p>

              <button
                onClick={() => {
                  playSuccessSound();
                  setRecipeOpened(true);
                  onCompleteStep();
                }}
                className="w-full p-4 bg-white hover:bg-blue-50 border-3 border-blue-400 rounded-2xl flex items-center justify-between cursor-pointer transition-all active:scale-98 group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-xs">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <span className="font-black text-xl text-slate-900 group-hover:text-blue-700 block">
                      Receta Familiar de Paella.txt
                    </span>
                    <span className="text-xs font-semibold text-slate-500">Documento de texto de Windows</span>
                  </div>
                </div>
                <span className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm">
                  Abrir Archivo
                </span>
              </button>
            </div>

            {/* Windows Notepad App Viewer */}
            {recipeOpened && (
              <WindowsWindow
                title="Receta Familiar de Paella.txt — Bloc de notas de Windows"
                subtitle="Archivo de texto"
                icon={<FileText className="w-5 h-5 text-blue-600" />}
                className="border-3 border-emerald-400 shadow-2xl animate-in zoom-in-95"
              >
                {/* Notepad Menu Bar */}
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 border-b border-slate-200 pb-2 mb-3 select-none">
                  <span>Archivo</span>
                  <span>Edición</span>
                  <span>Formato</span>
                  <span>Ver</span>
                  <span>Ayuda</span>
                </div>

                <div className="space-y-3 text-slate-900 text-lg font-mono leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
                  <p className="font-bold text-blue-900">🥘 RECETA FAMILIAR DE PAELLA</p>
                  <p>----------------------------------</p>
                  <p>• Arroz bomba: 400 gramos</p>
                  <p>• Pollo y conejo troceado</p>
                  <p>• Judías verdes y garrofó</p>
                  <p>• Azafrán en hebra, tomate y aceite de oliva</p>
                  <p className="pt-2 text-slate-600 italic">"Cocinar a fuego lento y disfrutar en familia."</p>
                </div>

                <div className="mt-3 text-xs text-slate-400 font-mono text-right">
                  Lín 10, Col 1 | 100% | Windows (CRLF) | UTF-8
                </div>
              </WindowsWindow>
            )}
          </div>
        )}

      </WindowsWindow>
    </div>
  );
};
