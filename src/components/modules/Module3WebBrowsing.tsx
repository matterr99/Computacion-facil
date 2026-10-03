import React, { useState } from 'react';
import { 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Plus, 
  X, 
  Search, 
  ShieldCheck, 
  Sparkles, 
  Newspaper, 
  CloudSun, 
  Utensils, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Star, 
  Home,
  Compass
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

export const Module3WebBrowsing: React.FC<Props> = ({
  step,
  stepIndex,
  onCompleteStep,
  isCompleted
}) => {
  const { playClickSound, playSuccessSound, playErrorSound } = useAccessibility();

  // Selected browser skin: Edge vs Chrome
  const [browserSkin, setBrowserSkin] = useState<'edge' | 'chrome'>('edge');

  // Step 2 state: Nav buttons test
  const [currentPageIndex, setCurrentPageIndex] = useState(1);
  const [pagesVisited, setPagesVisited] = useState<string[]>(['Página de Inicio', 'El Periódico de Noticias']);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [testedBack, setTestedBack] = useState(false);

  // Step 3 state: Tabs practice
  const [tabs, setTabs] = useState([
    { id: 'tab1', title: 'Noticias del Día', icon: 'news' },
    { id: 'tab2', title: 'El Tiempo y Clima', icon: 'weather' }
  ]);
  const [activeTabId, setActiveTabId] = useState('tab1');
  const [tabActionsCount, setTabActionsCount] = useState(0);

  // Step 4 state: Google search simulation
  const [googleQuery, setGoogleQuery] = useState('Pronóstico del tiempo para hoy');
  const [selectedResult, setSelectedResult] = useState<string | null>(null);

  // Nav actions
  const handleGoBack = () => {
    playClickSound();
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      setTestedBack(true);
      playSuccessSound();
      onCompleteStep();
    }
  };

  const handleGoForward = () => {
    playClickSound();
    if (currentPageIndex < pagesVisited.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handleRefresh = () => {
    playClickSound();
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Add new tab
  const handleAddNewTab = () => {
    playClickSound();
    if (tabs.length < 3) {
      setTabs([...tabs, { id: 'tab3', title: 'Recetas Tradicionales', icon: 'recipes' }]);
      setActiveTabId('tab3');
      setTabActionsCount(prev => prev + 1);
      playSuccessSound();
      onCompleteStep();
    }
  };

  // Close tab
  const handleCloseTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playClickSound();
    if (tabs.length > 1) {
      const remaining = tabs.filter(t => t.id !== tabId);
      setTabs(remaining);
      setActiveTabId(remaining[0].id);
      setTabActionsCount(prev => prev + 1);
      onCompleteStep();
    }
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header Card with Windows Style */}
      <WindowsWindow
        title="Guía de Navegadores Web: Microsoft Edge y Google Chrome"
        subtitle={`Paso ${stepIndex + 1}: ${step.title}`}
        icon={<Globe className="w-5 h-5 text-sky-500" />}
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
        title={browserSkin === 'edge' ? 'Microsoft Edge (Navegador de Windows)' : 'Google Chrome (Navegador de Google)'}
        subtitle="Simulador de Navegador Web"
        icon={<Globe className="w-5 h-5 text-sky-500" />}
        className="border-3 border-sky-400/60"
      >
        
        {/* STEP 1: Browser Types Comparison & Concept Clarity */}
        {step.componentKey === 'browser-types-comparison' && (
          <div className="max-w-3xl mx-auto space-y-6 text-center py-2">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border-4 border-slate-700 shadow-2xl space-y-4">
              <div className="w-16 h-16 bg-sky-500 text-white rounded-2xl mx-auto flex items-center justify-center shadow-md">
                <Compass className="w-10 h-10" />
              </div>

              <h4 className="text-2xl sm:text-3xl font-black">
                ¿Qué es un Navegador y cuántos tipos hay?
              </h4>

              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                El **Navegador** es el coche que usas para viajar por Internet. No importa qué marca de coche uses, todos viajan por las mismas carreteras y te muestran las mismas páginas web.
              </p>
            </div>

            {/* 4 Major Browsers Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {/* Microsoft Edge */}
              <div className="bg-sky-50 border-3 border-sky-400 p-4 rounded-2xl space-y-2 shadow-xs">
                <div className="w-10 h-10 bg-sky-600 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                  🌊
                </div>
                <h5 className="font-black text-lg text-sky-950">Microsoft Edge</h5>
                <p className="text-xs text-slate-600 font-medium">
                  Viene instalado por defecto en Windows. Rápido y seguro.
                </p>
              </div>

              {/* Google Chrome */}
              <div className="bg-amber-50 border-3 border-amber-400 p-4 rounded-2xl space-y-2 shadow-xs">
                <div className="w-10 h-10 bg-amber-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                  🔴
                </div>
                <h5 className="font-black text-lg text-amber-950">Google Chrome</h5>
                <p className="text-xs text-slate-600 font-medium">
                  El navegador más popular creado por Google.
                </p>
              </div>

              {/* Mozilla Firefox */}
              <div className="bg-orange-50 border-2 border-orange-300 p-4 rounded-2xl space-y-2 shadow-xs">
                <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                  🦊
                </div>
                <h5 className="font-black text-lg text-orange-950">Mozilla Firefox</h5>
                <p className="text-xs text-slate-600 font-medium">
                  Conocido por el zorrito de fuego y su privacidad.
                </p>
              </div>

              {/* Apple Safari */}
              <div className="bg-blue-50 border-2 border-blue-300 p-4 rounded-2xl space-y-2 shadow-xs">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                  🧭
                </div>
                <h5 className="font-black text-lg text-blue-950">Apple Safari</h5>
                <p className="text-xs text-slate-600 font-medium">
                  El navegador que usan los iPhone, iPad y Mac.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  playSuccessSound();
                  onCompleteStep();
                }}
                className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-black text-xl shadow-lg cursor-pointer active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <span>¡Excelente! Vamos al Simulador de Navegador</span>
                <Sparkles className="w-6 h-6 text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Browser Navigation Practice with Edge / Chrome Switcher */}
        {step.componentKey === 'browser-navigation-practice' && (
          <div className="space-y-6 py-2">
            
            {/* Edge vs Chrome Skin Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 p-3 rounded-2xl border-2 border-slate-300 max-w-3xl mx-auto">
              <span className="text-sm font-bold text-slate-700">
                Cambiar apariencia del simulador:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setBrowserSkin('edge');
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-sm cursor-pointer transition-all ${
                    browserSkin === 'edge'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  🌊 Vista Microsoft Edge
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setBrowserSkin('chrome');
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-sm cursor-pointer transition-all ${
                    browserSkin === 'chrome'
                      ? 'bg-amber-500 text-slate-950 font-black shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  🔴 Vista Google Chrome
                </button>
              </div>
            </div>

            {/* Simulated Browser Frame */}
            <div className="bg-white rounded-3xl border-4 border-slate-300 shadow-2xl overflow-hidden max-w-3xl mx-auto">
              
              {/* Browser Toolbar */}
              <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center gap-3">
                {/* Back Button */}
                <button
                  onClick={handleGoBack}
                  disabled={currentPageIndex === 0}
                  className={`p-3 rounded-2xl font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    currentPageIndex > 0
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md ring-4 ring-blue-200 animate-gentle-pulse'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                  title="Volver a la página anterior"
                >
                  <ArrowLeft className="w-6 h-6 stroke-[3]" />
                  <span className="font-extrabold text-sm sm:text-base">Atrás</span>
                </button>

                {/* Forward Button */}
                <button
                  onClick={handleGoForward}
                  disabled={currentPageIndex >= pagesVisited.length - 1}
                  className={`p-3 rounded-2xl transition-all ${
                    currentPageIndex < pagesVisited.length - 1
                      ? 'bg-slate-200 text-slate-800 hover:bg-slate-300 cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                  }`}
                  title="Ir hacia adelante"
                >
                  <ArrowRight className="w-6 h-6 stroke-[3]" />
                </button>

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  className={`p-3 bg-slate-200 hover:bg-slate-300 rounded-2xl text-slate-800 transition-all cursor-pointer ${
                    isRefreshing ? 'rotate-180 duration-500' : ''
                  }`}
                  title="Recargar página"
                >
                  <RotateCw className="w-6 h-6 stroke-[2.5]" />
                </button>

                {/* Address Bar */}
                <div className="flex-1 bg-white px-4 py-2.5 rounded-2xl border-2 border-slate-300 text-slate-700 font-bold text-sm sm:text-base truncate flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-2 truncate">
                    <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span className="truncate">
                      {currentPageIndex === 0 ? 'https://www.google.com' : 'https://www.periodico-noticias.es'}
                    </span>
                  </div>
                  <Star className="w-4 h-4 text-slate-400 hover:text-amber-500 cursor-pointer" />
                </div>
              </div>

              {/* Web Page Viewport */}
              <div className="p-6 sm:p-10 min-h-[260px] bg-slate-50 flex flex-col items-center justify-center text-center">
                {currentPageIndex === 1 ? (
                  <div className="space-y-4 max-w-lg animate-in fade-in">
                    <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl mx-auto flex items-center justify-center">
                      <Newspaper className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-900">
                      El Periódico Digital en {browserSkin === 'edge' ? 'Microsoft Edge' : 'Google Chrome'}
                    </h4>
                    <p className="text-slate-600 text-lg">
                      Imagina que entraste a esta página pero quieres regresar a la anterior. Pulsa el botón grande azul <strong>⬅️ Atrás</strong> arriba a la izquierda.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-lg animate-in zoom-in-95">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl mx-auto flex items-center justify-center">
                      <ShieldCheck className="w-10 h-10" />
                    </div>
                    <h4 className="text-2xl font-black text-emerald-900">
                      ¡Regresaste a la página principal!
                    </h4>
                    <p className="text-slate-700 text-lg font-medium">
                      Ya sea en Edge o en Chrome, la flecha <strong>Atrás</strong> siempre te rescata.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Browser Tabs */}
        {step.componentKey === 'browser-tabs-practice' && (
          <div className="space-y-6 py-2">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-slate-100 px-5 py-2.5 rounded-2xl border-2 border-indigo-200 text-slate-800 font-bold text-lg shadow-xs">
                <span>Haz clic en las pestañas para cambiar de página o pulsa (+) para abrir una nueva</span>
              </div>
            </div>

            {/* Browser Tabs Frame */}
            <div className="bg-white rounded-3xl border-4 border-slate-300 shadow-2xl overflow-hidden max-w-3xl mx-auto">
              <div className="bg-slate-200 px-3 pt-3 flex items-center gap-2 overflow-x-auto">
                {tabs.map(tab => {
                  const isActive = tab.id === activeTabId;
                  return (
                    <div
                      key={tab.id}
                      onClick={() => {
                        playClickSound();
                        setActiveTabId(tab.id);
                        setTabActionsCount(prev => prev + 1);
                        if (tabActionsCount >= 1) onCompleteStep();
                      }}
                      className={`group flex items-center gap-2 px-4 py-2.5 rounded-t-2xl font-bold text-base cursor-pointer transition-all border-t-2 border-x-2 ${
                        isActive
                          ? 'bg-white text-blue-700 border-slate-300 shadow-xs'
                          : 'bg-slate-300/70 text-slate-600 border-transparent hover:bg-slate-300'
                      }`}
                    >
                      {tab.icon === 'news' && <Newspaper className="w-4 h-4 text-blue-600" />}
                      {tab.icon === 'weather' && <CloudSun className="w-4 h-4 text-amber-500" />}
                      {tab.icon === 'recipes' && <Utensils className="w-4 h-4 text-emerald-600" />}
                      <span className="truncate max-w-[150px]">{tab.title}</span>
                      {tabs.length > 1 && (
                        <button
                          onClick={(e) => handleCloseTab(tab.id, e)}
                          className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-700 cursor-pointer ml-1"
                          title="Cerrar esta pestaña"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  );
                })}

                {tabs.length < 3 && (
                  <button
                    onClick={handleAddNewTab}
                    className="p-2 rounded-xl bg-slate-300 hover:bg-blue-600 hover:text-white text-slate-700 font-bold transition-all cursor-pointer mb-1 shadow-xs"
                    title="Abrir una nueva pestaña (+)"
                  >
                    <Plus className="w-5 h-5 stroke-[3]" />
                  </button>
                )}
              </div>

              <div className="p-8 min-h-[240px] bg-white">
                {activeTabId === 'tab1' && (
                  <div className="space-y-3 animate-in fade-in">
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full uppercase">
                      Pestaña 1: Noticias
                    </span>
                    <h4 className="text-2xl font-black text-slate-900">
                      Noticias del Día: "Descubren nuevas plantas en el botánico"
                    </h4>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Esta es la página de noticias. Puedes hacer clic en la pestaña "El Tiempo y Clima" para cambiar sin cerrar esta lectura.
                    </p>
                  </div>
                )}

                {activeTabId === 'tab2' && (
                  <div className="space-y-3 animate-in fade-in">
                    <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full uppercase">
                      Pestaña 2: El Tiempo
                    </span>
                    <h4 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <CloudSun className="w-8 h-8 text-amber-500" />
                      <span>Soleado con 24°C y brisa suave</span>
                    </h4>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Aquí estás viendo el tiempo en una pestaña independiente.
                    </p>
                  </div>
                )}

                {activeTabId === 'tab3' && (
                  <div className="space-y-3 animate-in fade-in">
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full uppercase">
                      Pestaña 3: Nueva pestaña abierta
                    </span>
                    <h4 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                      <Utensils className="w-8 h-8 text-emerald-600" />
                      <span>Recetas Tradicionales de la Abuela</span>
                    </h4>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      ¡Muy bien hecho! Has abierto una pestaña nueva usando el botón (+).
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Google Search Simulator */}
        {step.componentKey === 'google-search-simulator' && (
          <div className="space-y-6 max-w-3xl mx-auto py-2">
            <div className="bg-white p-6 rounded-3xl border-3 border-slate-300 shadow-md">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-3xl font-black text-blue-500">G</span>
                <span className="text-3xl font-black text-rose-500">o</span>
                <span className="text-3xl font-black text-amber-500">o</span>
                <span className="text-3xl font-black text-blue-500">g</span>
                <span className="text-3xl font-black text-emerald-500">l</span>
                <span className="text-3xl font-black text-rose-500">e</span>
              </div>

              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-6 h-6 text-slate-400" />
                <input
                  type="text"
                  value={googleQuery}
                  onChange={(e) => setGoogleQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 text-slate-900 rounded-full text-lg font-bold border-2 border-slate-300"
                  readOnly
                />
              </div>

              <p className="text-center text-sm font-bold text-slate-500 mt-2">
                Búsqueda: "¿Cuál de estos resultados elegirías para consultar el tiempo?"
              </p>
            </div>

            <div className="space-y-3">
              {/* Option A: Misleading Ad */}
              <div
                onClick={() => {
                  playErrorSound();
                  setSelectedResult('ad');
                }}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                  selectedResult === 'ad'
                    ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-300'
                    : 'bg-white border-slate-200 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black bg-amber-200 text-amber-950 px-2 py-0.5 rounded-sm">
                    Patrocinado (Publicidad)
                  </span>
                  <span className="text-xs text-slate-400">www.compra-termometros-online.shop</span>
                </div>
                <h5 className="text-xl font-bold text-blue-700 hover:underline">
                  Oferta de Estaciones Meteorológicas con 50% de Descuento
                </h5>
                <p className="text-sm text-slate-600">
                  Compre su termómetro digital para el hogar hoy mismo...
                </p>

                {selectedResult === 'ad' && (
                  <div className="mt-3 p-3 bg-rose-100 rounded-xl border border-rose-300 text-rose-900 text-sm font-bold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 text-rose-700" />
                    <span>¡Ojo! Este es un anuncio comercial que intenta venderte algo, no es el pronóstico gratuito.</span>
                  </div>
                )}
              </div>

              {/* Option B: Legitimate Result */}
              <div
                onClick={() => {
                  playSuccessSound();
                  setSelectedResult('real');
                  onCompleteStep();
                }}
                className={`p-5 rounded-2xl border-3 transition-all cursor-pointer ${
                  selectedResult === 'real'
                    ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-200'
                    : 'bg-white border-blue-400 hover:bg-blue-50 shadow-md'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-sm">
                    ✓ Resultado Oficial y Gratuito
                  </span>
                  <span className="text-xs text-slate-500">www.aemet.es / El Tiempo Oficial</span>
                </div>
                <h5 className="text-xl font-bold text-blue-800 hover:underline flex items-center gap-2">
                  <span>Pronóstico Meteorológico Oficial para los Próximos 7 Días</span>
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                </h5>
                <p className="text-sm text-slate-700 font-medium">
                  Consulta de temperaturas máximas y mínimas, probabilidad de lluvia y vientos sin costo alguno.
                </p>

                {selectedResult === 'real' && (
                  <div className="mt-3 p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-950 text-base font-bold flex items-center gap-2 animate-in zoom-in-95">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-700" />
                    <span>¡Perfecto! Este es el resultado limpio, informativo y oficial.</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </WindowsWindow>
    </div>
  );
};
