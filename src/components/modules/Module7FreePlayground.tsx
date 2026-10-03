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
  const { playClickSound, playSuccessSound } = useAccessibility();

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
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => {
            playClickSound();
            onBackToHome();
          }}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-300 font-bold text-slate-800 text-lg shadow-xs cursor-pointer active:scale-95 w-fit"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver a las lecciones</span>
        </button>

        {/* Wallpaper Picker */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 border-slate-200">
          <Palette className="w-5 h-5 text-indigo-600 ml-2" />
          <span className="text-sm font-bold text-slate-700 mr-2">Fondo:</span>
          <button
            onClick={() => setWallpaper('lake')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
              wallpaper === 'lake' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Cielo & Lago
          </button>
          <button
            onClick={() => setWallpaper('forest')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
              wallpaper === 'forest' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Bosque Verde
          </button>
          <button
            onClick={() => setWallpaper('classic')}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
              wallpaper === 'classic' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Azul Clásico
          </button>
        </div>
      </div>

      {/* Main Virtual Desktop Area */}
      <div className={`rounded-3xl border-4 border-slate-800 shadow-2xl p-6 min-h-[620px] flex flex-col justify-between relative overflow-hidden transition-all duration-500 ${getWallpaperClass()}`}>
        
        {/* Desktop Icons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-6 max-w-2xl z-10">
          <button
            onClick={() => {
              playClickSound();
              setOpenCalc(true);
            }}
            className="p-4 rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/30 flex flex-col items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          >
            <Calculator className="w-12 h-12 text-amber-300" />
            <span className="font-extrabold text-base drop-shadow-md">Calculadora</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setOpenNotepad(true);
            }}
            className="p-4 rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/30 flex flex-col items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          >
            <FileText className="w-12 h-12 text-emerald-300" />
            <span className="font-extrabold text-base drop-shadow-md">Bloc de Notas</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setOpenPhotos(true);
            }}
            className="p-4 rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/30 flex flex-col items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          >
            <ImageIcon className="w-12 h-12 text-pink-300" />
            <span className="font-extrabold text-base drop-shadow-md">Mis Fotos</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setOpenBrowser(true);
            }}
            className="p-4 rounded-3xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-2 border-white/30 flex flex-col items-center gap-2 transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-lg"
          >
            <Globe className="w-12 h-12 text-sky-300" />
            <span className="font-extrabold text-base drop-shadow-md">Navegador</span>
          </button>
        </div>

        {/* Windows opened in the center */}
        <div className="flex-1 my-6 flex items-center justify-center z-20">
          
          {/* CALCULATOR WINDOW */}
          {openCalc && (
            <div className="bg-white rounded-3xl border-4 border-amber-400 p-6 shadow-2xl max-w-sm w-full animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-slate-100">
                <span className="font-black text-slate-900 text-lg flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-amber-500" />
                  Calculadora
                </span>
                <button
                  onClick={() => setOpenCalc(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-4 text-right mb-4 font-mono text-3xl font-black">
                {calcDisplay}
              </div>

              <div className="grid grid-cols-4 gap-2">
                {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3'].map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      if (['+', '-'].includes(b)) handleCalcOp(b);
                      else handleCalcNum(b);
                    }}
                    className={`p-3.5 rounded-xl font-black text-xl cursor-pointer ${
                      ['+', '-'].includes(b)
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    {b}
                  </button>
                ))}
                <button
                  onClick={handleCalcEquals}
                  className="p-3.5 bg-emerald-600 text-white font-black text-xl rounded-xl cursor-pointer"
                >
                  =
                </button>
                <button
                  onClick={() => handleCalcNum('0')}
                  className="p-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black text-xl rounded-xl col-span-2 cursor-pointer"
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
                  className="p-3.5 bg-rose-100 text-rose-900 font-bold text-sm rounded-xl col-span-2 cursor-pointer"
                >
                  Borrar
                </button>
              </div>
            </div>
          )}

          {/* NOTEPAD WINDOW */}
          {openNotepad && (
            <div className="bg-white rounded-3xl border-4 border-emerald-400 p-6 shadow-2xl max-w-lg w-full animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-slate-100">
                <span className="font-black text-slate-900 text-lg flex items-center gap-2">
                  <FileText className="w-6 h-6 text-emerald-600" />
                  Bloc de Notas Seguro
                </span>
                <button
                  onClick={() => setOpenNotepad(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                rows={5}
                className="w-full p-4 rounded-2xl border-2 border-slate-300 font-semibold text-lg text-slate-900 focus:outline-hidden focus:ring-4 focus:ring-emerald-200 mb-3"
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={handleSaveNote}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-5 h-5" />
                  <span>Guardar Nota</span>
                </button>
                {savedNoteMsg && (
                  <span className="text-emerald-700 font-bold text-sm animate-pulse">
                    ✓ ¡Nota guardada con éxito!
                  </span>
                )}
              </div>
            </div>
          )}

          {/* PHOTOS VIEWER WINDOW */}
          {openPhotos && (
            <div className="bg-white rounded-3xl border-4 border-pink-400 p-6 shadow-2xl max-w-lg w-full animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-slate-100">
                <span className="font-black text-slate-900 text-lg flex items-center gap-2">
                  <ImageIcon className="w-6 h-6 text-pink-600" />
                  Álbum de Recuerdos
                </span>
                <button
                  onClick={() => setOpenPhotos(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-pink-50 p-8 rounded-2xl border-2 border-pink-200 text-center mb-4 min-h-[160px] flex flex-col items-center justify-center">
                <span className="text-4xl mb-2">{photos[selectedPhoto].url}</span>
                <h4 className="text-xl font-black text-slate-900">{photos[selectedPhoto].title}</h4>
              </div>

              <div className="flex items-center justify-center gap-2">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playClickSound();
                      setSelectedPhoto(idx);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${
                      selectedPhoto === idx ? 'bg-pink-600 text-white' : 'bg-slate-100 text-slate-700'
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
            <div className="bg-white rounded-3xl border-4 border-sky-400 p-6 shadow-2xl max-w-xl w-full animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-slate-100">
                <span className="font-black text-slate-900 text-lg flex items-center gap-2">
                  <Globe className="w-6 h-6 text-sky-600" />
                  Navegador Seguro de Práctica
                </span>
                <button
                  onClick={() => setOpenBrowser(false)}
                  className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleBrowserSearch} className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={browserQuery}
                  onChange={(e) => setBrowserQuery(e.target.value)}
                  placeholder="Ej: Jardinería, Música clásica, Viajes..."
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-sky-300 font-bold text-base focus:outline-hidden focus:ring-2 focus:ring-sky-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  Buscar
                </button>
              </form>

              <div className="space-y-2">
                {browserResults.length > 0 ? (
                  browserResults.map((r, i) => (
                    <div key={i} className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-sky-950 font-bold text-sm">
                      🔍 {r}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm text-center py-4">
                    Escribe lo que tengas curiosidad de buscar y presiona "Buscar".
                  </p>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Safe Taskbar */}
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between border-2 border-slate-700 text-white z-10 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 bg-emerald-600 px-3 py-1 rounded-xl text-xs font-black">
              <ShieldCheck className="w-4 h-4" />
              100% Protegido
            </span>
            <span className="hidden sm:inline text-xs font-semibold text-slate-400">
              Haz clic en los iconos para abrir programas
            </span>
          </div>

          <button
            onClick={() => {
              setOpenCalc(false);
              setOpenNotepad(false);
              setOpenPhotos(false);
              setOpenBrowser(false);
            }}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg cursor-pointer"
          >
            Cerrar todo
          </button>
        </div>

      </div>
    </div>
  );
};
