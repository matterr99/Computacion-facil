import React, { useState } from 'react';
import { 
  Laptop, 
  Calculator, 
  FileText, 
  Image as ImageIcon, 
  Globe, 
  Palette, 
  X, 
  Plus, 
  Minus, 
  Equal, 
  Trash2, 
  Save, 
  ArrowLeft, 
  Sparkles,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  onBackToHome: () => void;
}

export const Module7FreePlayground: React.FC<Props> = ({ onBackToHome }) => {
  const { playClickSound, playSuccessSound, theme } = useAccessibility();
  const isDark = theme === 'dark';

  // Desktop background selection
  const [wallpaper, setWallpaper] = useState<'lake' | 'forest' | 'classic'>('lake');

  // Open windows state
  const [openCalc, setOpenCalc] = useState(false);
  const [openNotepad, setOpenNotepad] = useState(false);
  const [openPhotos, setOpenPhotos] = useState(false);
  const [openBrowser, setOpenBrowser] = useState(false);

  // Calculator state
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [prevCalc, setPrevCalc] = useState<number | null>(null);
  const [calcOp, setCalcOp] = useState<string | null>(null);

  // Notepad state
  const [noteContent, setNoteContent] = useState('¡Hola! Esta es mi primera nota escrita por mí mismo en la computadora.');
  const [savedNoteMsg, setSavedNoteMsg] = useState(false);

  // Photos state
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const photos = [
    { title: 'Jardín de Rosas en Primavera', url: '🌹 Flores del jardín' },
    { title: 'Almuerzo Familiar de Domingo', url: '🥘 Paella con los nietos' },
    { title: 'Paseo en la Montaña', url: '⛰️ Vista panorámica de los montes' }
  ];

  // Browser state
  const [browserQuery, setBrowserQuery] = useState('');
  const [browserResults, setBrowserResults] = useState<string[]>([]);

  const handleCalcNum = (num: string) => {
    playClickSound();
    setCalcDisplay(prev => (prev === '0' ? num : prev + num));
  };

  const handleCalcOp = (op: string) => {
    playClickSound();
    setPrevCalc(parseFloat(calcDisplay));
    setCalcOp(op);
    setCalcDisplay('0');
  };

  const handleCalcEquals = () => {
    playSuccessSound();
    if (prevCalc !== null && calcOp) {
      const current = parseFloat(calcDisplay);
      let res = 0;
      if (calcOp === '+') res = prevCalc + current;
      if (calcOp === '-') res = prevCalc - current;
      setCalcDisplay(String(res));
      setPrevCalc(null);
      setCalcOp(null);
    }
  };

  const handleSaveNote = () => {
    playSuccessSound();
    setSavedNoteMsg(true);
    setTimeout(() => setSavedNoteMsg(false), 3000);
  };

  const handleBrowserSearch = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    if (browserQuery.trim()) {
      setBrowserResults([
        `Información y fotos sobre "${browserQuery}"`,
        `Guía paso a paso para aprender sobre "${browserQuery}"`,
        `Artículos y curiosidades sobre "${browserQuery}"`
      ]);
    }
  };

  const getWallpaperClass = () => {
    switch (wallpaper) {
      case 'forest':
        return 'bg-gradient-to-b from-emerald-600 via-teal-700 to-slate-900';
      case 'classic':
        return 'bg-gradient-to-b from-blue-600 via-indigo-700 to-slate-950';
      case 'lake':
      default:
        return 'bg-gradient-to-b from-sky-400 via-indigo-600 to-slate-900';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => {
            playClickSound();
            onBackToHome();
          }}
          className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border-2 font-bold text-xs sm:text-base shadow-xs cursor-pointer active:scale-95 w-fit ${
            isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-100' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Volver a las lecciones</span>
        </button>

        {/* Wallpaper Picker */}
        <div className={`flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border-2 ${
          isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
        }`}>
          <Palette className="w-4 h-4 text-indigo-500 ml-1.5 hidden sm:inline" />
          <span className="text-xs font-bold mr-1">Fondo:</span>
          <button
            onClick={() => setWallpaper('lake')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] sm:text-xs cursor-pointer ${
              wallpaper === 'lake' ? 'bg-sky-600 text-white' : 'bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Cielo
          </button>
          <button
            onClick={() => setWallpaper('forest')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] sm:text-xs cursor-pointer ${
              wallpaper === 'forest' ? 'bg-emerald-600 text-white' : 'bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Bosque
          </button>
          <button
            onClick={() => setWallpaper('classic')}
            className={`px-2.5 py-1 rounded-lg font-bold text-[11px] sm:text-xs cursor-pointer ${
              wallpaper === 'classic' ? 'bg-blue-600 text-white' : 'bg-slate-200/60 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            Clásico
          </button>
        </div>
      </div>

      {/* Main Virtual Desktop Area */}
      <div className={`rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-slate-800 shadow-2xl p-4 sm:p-6 min-h-[520px] sm:min-h-[600px] flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${getWallpaperClass()}`}>
        
        {/* Desktop Icons Grid - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl z-10">
          <button
            onClick={() => {
              playClickSound();
              setOpenCalc(true);
            }}
            className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/30 flex flex-col items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          >
            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-amber-300" />
            <span className="font-extrabold text-xs sm:text-sm drop-shadow-md">Calculadora</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setOpenNotepad(true);
            }}
            className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/30 flex flex-col items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          >
            <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300" />
            <span className="font-extrabold text-xs sm:text-sm drop-shadow-md">Bloc de Notas</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setOpenPhotos(true);
            }}
            className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/30 flex flex-col items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          >
            <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-pink-300" />
            <span className="font-extrabold text-xs sm:text-sm drop-shadow-md">Mis Fotos</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setOpenBrowser(true);
            }}
            className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/30 flex flex-col items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          >
            <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-sky-300" />
            <span className="font-extrabold text-xs sm:text-sm drop-shadow-md">Navegador</span>
          </button>
        </div>

        {/* Windows opened in the center */}
        <div className="flex-1 my-4 flex items-center justify-center z-20 w-full">
          
          {/* CALCULATOR WINDOW */}
          {openCalc && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-3 border-amber-400 p-4 sm:p-6 shadow-2xl max-w-xs sm:max-w-sm w-full animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200 dark:border-slate-700">
                <span className="font-black text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-1.5">
                  <Calculator className="w-5 h-5 text-amber-500" />
                  Calculadora
                </span>
                <button
                  onClick={() => setOpenCalc(false)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-900 text-white rounded-xl p-3 text-right mb-3 font-mono text-2xl sm:text-3xl font-black">
                {calcDisplay}
              </div>

              <div className="grid grid-cols-4 gap-1.5">
                {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3'].map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      if (['+', '-'].includes(b)) handleCalcOp(b);
                      else handleCalcNum(b);
                    }}
                    className={`p-2.5 sm:p-3 rounded-lg font-black text-lg cursor-pointer ${
                      ['+', '-'].includes(b)
                        ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-slate-100'
                    }`}
                  >
                    {b}
                  </button>
                ))}
                <button
                  onClick={handleCalcEquals}
                  className="p-2.5 sm:p-3 bg-emerald-600 text-white font-black text-lg rounded-lg cursor-pointer"
                >
                  =
                </button>
                <button
                  onClick={() => handleCalcNum('0')}
                  className="p-2.5 sm:p-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-900 dark:text-slate-100 font-black text-lg rounded-lg col-span-2 cursor-pointer"
                >
                  0
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setCalcDisplay('0');
                    setPrevCalc(null);
                    setCalcOp(null);
                  }}
                  className="p-2.5 sm:p-3 bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 font-bold text-xs rounded-lg col-span-2 cursor-pointer"
                >
                  Borrar
                </button>
              </div>
            </div>
          )}

          {/* NOTEPAD WINDOW */}
          {openNotepad && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-3 border-emerald-400 p-4 sm:p-6 shadow-2xl max-w-lg w-full animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200 dark:border-slate-700">
                <span className="font-black text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-1.5">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  Bloc de Notas Seguro
                </span>
                <button
                  onClick={() => setOpenNotepad(false)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={4}
                className="w-full p-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white font-semibold text-base sm:text-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-300 mb-2.5"
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handleSaveNote}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Nota</span>
                </button>
                {savedNoteMsg && (
                  <span className="text-emerald-500 font-bold text-xs animate-pulse">
                    ✓ ¡Nota guardada!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* PHOTOS VIEWER WINDOW */}
          {openPhotos && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-3 border-pink-400 p-4 sm:p-6 shadow-2xl max-w-md w-full animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200 dark:border-slate-700">
                <span className="font-black text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-1.5">
                  <ImageIcon className="w-5 h-5 text-pink-600" />
                  Álbum de Recuerdos
                </span>
                <button
                  onClick={() => setOpenPhotos(false)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-pink-50 dark:bg-pink-950/30 p-6 rounded-2xl border-2 border-pink-200 dark:border-pink-800 text-center mb-3 min-h-[140px] flex flex-col items-center justify-center">
                <span className="text-3xl mb-1.5">{photos[selectedPhoto].url}</span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">{photos[selectedPhoto].title}</h4>
              </div>

              <div className="flex items-center justify-center gap-1.5">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playClickSound();
                      setSelectedPhoto(idx);
                    }}
                    className={`px-3 py-1 rounded-lg font-bold text-xs cursor-pointer ${
                      selectedPhoto === idx ? 'bg-pink-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Foto {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* BROWSER WINDOW */}
          {openBrowser && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border-3 border-sky-400 p-4 sm:p-6 shadow-2xl max-w-lg w-full animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200 dark:border-slate-700">
                <span className="font-black text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-1.5">
                  <Globe className="w-5 h-5 text-sky-600" />
                  Navegador Seguro
                </span>
                <button
                  onClick={() => setOpenBrowser(false)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleBrowserSearch} className="flex gap-1.5 mb-3">
                <input
                  type="text"
                  value={browserQuery}
                  onChange={(e) => setBrowserQuery(e.target.value)}
                  placeholder="Ej: Jardinería, Música..."
                  className="flex-1 px-3 py-2 rounded-xl border-2 border-sky-300 dark:border-sky-700 dark:bg-slate-800 dark:text-white font-bold text-sm focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs sm:text-sm cursor-pointer"
                >
                  Buscar
                </button>
              </form>

              <div className="space-y-1.5">
                {browserResults.length > 0 ? (
                  browserResults.map((r, i) => (
                    <div key={i} className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 text-sky-950 dark:text-sky-200 font-bold text-xs">
                      🔍 {r}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-xs text-center py-3">
                    Escribe lo que quieras buscar y presiona "Buscar".
                  </p>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Safe Taskbar */}
        <div className="bg-slate-900/95 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between border border-slate-700 text-white z-10 shadow-xl">
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 bg-emerald-600 px-2 py-0.5 rounded-lg text-[10px] font-black">
              <ShieldCheck className="w-3 h-3" />
              100% Protegido
            </span>
          </div>

          <button
            onClick={() => {
              setOpenCalc(false);
              setOpenNotepad(false);
              setOpenPhotos(false);
              setOpenBrowser(false);
            }}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[11px] font-bold rounded-lg cursor-pointer"
          >
            Cerrar ventanas
          </button>
        </div>

      </div>
    </div>
  );
};
