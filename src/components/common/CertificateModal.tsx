import React, { useState } from 'react';
import { Award, Printer, CheckCircle, Sparkles, Heart, Trophy, ArrowLeft } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { MODULES } from '../../data/modulesData';
import { ModuleProgress } from '../../types';

interface Props {
  userName: string;
  onUpdateUserName: (name: string) => void;
  modulesProgress: Record<string, ModuleProgress>;
  onBackToHome: () => void;
}

export const CertificateModal: React.FC<Props> = ({
  userName,
  onUpdateUserName,
  modulesProgress,
  onBackToHome
}) => {
  const [isEditingName, setIsEditingName] = useState(!userName);
  const [tempName, setTempName] = useState(userName || 'Papá Campeón');
  const { playClickSound, theme } = useAccessibility();
  const isDark = theme === 'dark';

  const completedCount = Object.values(modulesProgress).filter(m => m.isCompleted).length;
  const todayDate = new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateUserName(tempName.trim());
      setIsEditingName(false);
      playClickSound();
    }
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-6 flex items-center justify-between no-print">
        <button
          onClick={onBackToHome}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl border-2 font-bold text-lg shadow-xs cursor-pointer active:scale-95 ${
            isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-100' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Volver a las lecciones</span>
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-lg shadow-md cursor-pointer active:scale-95 border-2 border-amber-600"
        >
          <Printer className="w-6 h-6" />
          <span>Imprimir o Guardar Diploma</span>
        </button>
      </div>

      {/* Name Input Bar */}
      <div className={`p-4 sm:p-5 rounded-2xl border-2 mb-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 no-print ${
        isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-amber-500 flex-shrink-0" />
          <div>
            <p className="font-bold text-lg">Nombre en el Diploma:</p>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Personaliza el diploma con el nombre de papá</p>
          </div>
        </div>

        {isEditingName ? (
          <form onSubmit={handleSaveName} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Ej: Francisco González"
              className={`px-4 py-2.5 rounded-xl border-2 font-bold text-lg focus:outline-hidden focus:ring-2 w-full sm:w-64 ${
                isDark ? 'bg-slate-800 text-white border-blue-500' : 'bg-white text-slate-900 border-blue-400'
              }`}
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 cursor-pointer"
            >
              Guardar
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-3">
            <span className={`text-xl font-extrabold px-4 py-1.5 rounded-xl border ${
              isDark ? 'bg-indigo-950/60 text-indigo-300 border-indigo-700' : 'bg-indigo-50 text-indigo-900 border-indigo-200'
            }`}>
              {userName || tempName}
            </span>
            <button
              onClick={() => setIsEditingName(true)}
              className="text-sm font-bold text-blue-500 hover:text-blue-400 underline cursor-pointer"
            >
              Cambiar nombre
            </button>
          </div>
        )}
      </div>

      {/* The Printable Certificate (Kept bright and prestigious for printing) */}
      <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 text-slate-900 rounded-3xl p-8 sm:p-14 border-8 border-double border-amber-600 shadow-2xl relative text-center print:border-amber-600 print:shadow-none print:m-0 print:p-8">
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-amber-700" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-amber-700" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-amber-700" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-amber-700" />

        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-sm uppercase tracking-widest mb-4">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span>Certificado de Honor Digital Windows</span>
          <Sparkles className="w-5 h-5 text-amber-600" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-serif tracking-wide mb-3">
          DIPLOMA DE NAVEGANTE DIGITAL
        </h1>

        <p className="text-xl text-slate-600 font-medium mb-6">
          Se otorga con admiración y orgullo este reconocimiento oficial a:
        </p>

        {/* Recipient Name */}
        <div className="my-6 py-4 px-8 inline-block border-b-4 border-amber-600 bg-amber-50/50 rounded-2xl">
          <span className="text-3xl sm:text-5xl font-black text-indigo-950 tracking-tight font-serif">
            {userName || 'Papá'}
          </span>
        </div>

        <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto leading-relaxed mb-8">
          Por haber demostrado perseverancia, curiosidad y valentía al dominar las herramientas básicas de Windows, el navegador, el correo electrónico y la seguridad digital.
        </p>

        {/* Completed Modules Checklist */}
        <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-6 border-2 border-amber-200 max-w-2xl mx-auto text-left mb-8 shadow-xs">
          <h4 className="font-extrabold text-slate-900 text-lg mb-3 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>Habilidades adquiridas:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {MODULES.map((mod) => {
              const isDone = modulesProgress[mod.id]?.isCompleted;
              return (
                <div
                  key={mod.id}
                  className={`flex items-center gap-2.5 p-2 rounded-xl text-sm font-bold ${
                    isDone
                      ? 'bg-emerald-50 text-emerald-950 border border-emerald-300'
                      : 'bg-slate-50 text-slate-500 border border-slate-200'
                  }`}
                >
                  <CheckCircle className={`w-4 h-4 flex-shrink-0 ${isDone ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span className="truncate">{mod.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6 border-t-2 border-amber-200 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="font-serif italic text-xl font-bold text-slate-800 mb-1">
              Tu Familia
            </div>
            <div className="border-t-2 border-slate-400 pt-1 text-sm font-semibold text-slate-600 flex items-center justify-center gap-1">
              <span>Otorgado con cariño</span>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            </div>
          </div>

          {/* Golden Seal */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 p-1 shadow-lg flex items-center justify-center text-slate-950 border-4 border-amber-600 rotate-6">
              <div className="w-full h-full rounded-full border-2 border-dashed border-amber-900 flex flex-col items-center justify-center p-2 text-center">
                <Award className="w-8 h-8 text-amber-950" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Graduado 100%</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="font-bold text-lg text-slate-800 mb-1">
              {todayDate}
            </div>
            <div className="border-t-2 border-slate-400 pt-1 text-sm font-semibold text-slate-600">
              Fecha de emisión
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
