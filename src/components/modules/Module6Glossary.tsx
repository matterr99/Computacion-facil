import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  MousePointer, 
  MousePointerClick, 
  Link, 
  Globe, 
  Layers, 
  Download, 
  Wifi, 
  Key, 
  ShieldAlert, 
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Laptop
} from 'lucide-react';
import { GLOSSARY_TERMS } from '../../data/modulesData';
import { SpeechReaderButton } from '../common/SpeechReaderButton';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  onBackToHome: () => void;
}

export const Module6Glossary: React.FC<Props> = ({ onBackToHome }) => {
  const [filterText, setFilterText] = useState('');
  const { playClickSound, theme } = useAccessibility();
  const isDark = theme === 'dark';

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MousePointer': return <MousePointer className="w-8 h-8 text-blue-500" />;
      case 'MousePointerClick': return <MousePointerClick className="w-8 h-8 text-indigo-500" />;
      case 'Link': return <Link className="w-8 h-8 text-emerald-500" />;
      case 'Globe': return <Globe className="w-8 h-8 text-sky-500" />;
      case 'Layers': return <Layers className="w-8 h-8 text-amber-500" />;
      case 'Download': return <Download className="w-8 h-8 text-purple-500" />;
      case 'Wifi': return <Wifi className="w-8 h-8 text-teal-500" />;
      case 'Key': return <Key className="w-8 h-8 text-amber-400" />;
      case 'ShieldAlert': return <ShieldAlert className="w-8 h-8 text-rose-500" />;
      case 'RotateCcw': return <RotateCcw className="w-8 h-8 text-blue-400" />;
      case 'Laptop': return <Laptop className="w-8 h-8 text-sky-500" />;
      default: return <Sparkles className="w-8 h-8 text-amber-400" />;
    }
  };

  const filtered = GLOSSARY_TERMS.filter(item => 
    item.term.toLowerCase().includes(filterText.toLowerCase()) ||
    item.simpleMeaning.toLowerCase().includes(filterText.toLowerCase()) ||
    item.realWorldAnalogy.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => {
            playClickSound();
            onBackToHome();
          }}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 font-bold text-lg shadow-xs cursor-pointer active:scale-95 w-fit ${
            isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-100' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver a las lecciones</span>
        </button>

        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-3.5 w-6 h-6 text-slate-400" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Buscar palabra..."
            className={`w-full pl-12 pr-4 py-3 rounded-2xl text-lg font-bold border-2 focus:outline-hidden focus:ring-4 ${
              isDark
                ? 'bg-slate-800 text-white border-slate-700 focus:ring-indigo-500/40'
                : 'bg-white text-slate-900 border-slate-300 focus:ring-indigo-200'
            }`}
          />
        </div>
      </div>

      {/* Header card */}
      <div className="bg-gradient-to-r from-indigo-800 to-blue-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-4 border-indigo-400/30">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-full text-sm font-black text-amber-200">
            <BookOpen className="w-4 h-4" />
            <span>Diccionario de Palabras Raras Hecho Fácil</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black">
            Glosario de Computación Fácil
          </h2>
          <p className="text-indigo-100 text-lg max-w-2xl">
            Aquí explicamos las palabras técnicas comparándolas con cosas cotidianas de toda la vida.
          </p>
        </div>

        <SpeechReaderButton
          textToRead="Bienvenido al glosario de términos. Aquí puedes consultar el significado de palabras como enlace, wifi, descargar o contraseña explicadas con ejemplos sencillos."
          label="Escuchar introducción"
          className="bg-white text-indigo-950 hover:bg-amber-100 border-none flex-shrink-0"
        />
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 sm:p-7 rounded-3xl border-2 shadow-sm transition-all space-y-4 ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-slate-100'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl border shadow-inner ${
                  isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'
                }`}>
                  {getIcon(item.icon)}
                </div>
                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.term}
                </h3>
              </div>

              <SpeechReaderButton
                textToRead={`${item.term}. ${item.simpleMeaning}. En la vida real: ${item.realWorldAnalogy}`}
                label="Oír"
                className="px-3 py-1.5 text-xs rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <p className={`text-lg font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {item.simpleMeaning}
              </p>

              <div className={`p-3.5 rounded-2xl border text-base font-semibold ${
                isDark ? 'bg-amber-950/40 border-amber-800 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}>
                <strong>💡 En la vida real:</strong> {item.realWorldAnalogy}
              </div>

              <div className="text-xs font-semibold text-slate-500 italic pl-1">
                Ejemplo: "{item.example}"
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
