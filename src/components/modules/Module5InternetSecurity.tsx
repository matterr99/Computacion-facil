import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  AlertOctagon, 
  Gift, 
  Building2, 
  CheckCircle2, 
  X, 
  Sparkles, 
  Printer, 
  AlertTriangle,
  Lock,
  Check
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { StepItem, SecurityQuizCase } from '../../types';
import { SECURITY_QUIZ_CASES, SAFETY_CHECKLIST } from '../../data/modulesData';
import { SpeechReaderButton } from '../common/SpeechReaderButton';
import { ConfidencePill } from '../common/ConfidencePill';
import { WindowsWindow } from '../common/WindowsWindow';

interface Props {
  step: StepItem;
  stepIndex: number;
  onCompleteStep: () => void;
  isCompleted: boolean;
}

export const Module5InternetSecurity: React.FC<Props> = ({
  step,
  stepIndex,
  onCompleteStep,
  isCompleted
}) => {
  const { playClickSound, playSuccessSound, playErrorSound } = useAccessibility();

  // Step 2 Quiz state
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<'safe' | 'scam' | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [inspectedSender, setInspectedSender] = useState(false);
  const [completedCases, setCompletedCases] = useState<number[]>([]);

  // Step 3 Pop-up closer state
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [popupAttempts, setPopupAttempts] = useState(0);
  const [popupSuccess, setPopupSuccess] = useState(false);

  const activeCase = SECURITY_QUIZ_CASES[currentCaseIndex];

  // Quiz evaluation
  const handleAnswer = (choice: 'safe' | 'scam') => {
    setUserAnswer(choice);
    setShowExplanation(true);
    const isCorrect = (choice === 'scam' && activeCase.isScam) || (choice === 'safe' && !activeCase.isScam);

    if (isCorrect) {
      playSuccessSound();
    } else {
      playErrorSound();
    }

    if (!completedCases.includes(currentCaseIndex)) {
      const updated = [...completedCases, currentCaseIndex];
      setCompletedCases(updated);
      if (updated.length >= SECURITY_QUIZ_CASES.length) {
        onCompleteStep();
      }
    }
  };

  const handleNextCase = () => {
    playClickSound();
    if (currentCaseIndex < SECURITY_QUIZ_CASES.length - 1) {
      setCurrentCaseIndex(prev => prev + 1);
      setUserAnswer(null);
      setShowExplanation(false);
      setInspectedSender(false);
    }
  };

  // Pop-up interaction
  const handleFakeButtonClick = () => {
    playErrorSound();
    setPopupAttempts(prev => prev + 1);
  };

  const handleSafeXClick = () => {
    playSuccessSound();
    setIsPopupVisible(false);
    setPopupSuccess(true);
    onCompleteStep();
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header Card with Windows Style */}
      <WindowsWindow
        title="Seguridad de Windows (Windows Defender) — Guía para Papá"
        subtitle={`Paso ${stepIndex + 1}: ${step.title}`}
        icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-emerald-700 bg-emerald-50 text-xs sm:text-sm font-black px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider">
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
          <ConfidencePill text={step.reassuranceNote} type="safety" className="mt-4" />
        )}
      </WindowsWindow>

      {/* Interactive Activity Section inside Windows Defender Environment */}
      <WindowsWindow
        title="Centro de Seguridad de Windows"
        subtitle="Protección y Detección de Amenazas"
        icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
        className="border-3 border-emerald-400/60"
      >
        {/* STEP 1: Golden Rules visual guide */}
        {step.componentKey === 'security-golden-rules' && (
          <div className="space-y-6 max-w-3xl mx-auto py-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Rule 1 */}
              <div className="bg-rose-50 border-3 border-rose-300 p-6 rounded-3xl text-center space-y-3 shadow-md">
                <div className="w-16 h-16 bg-rose-200 text-rose-800 rounded-2xl mx-auto flex items-center justify-center">
                  <AlertOctagon className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-rose-950">1. ¿Hay Prisa? ¡Desconfía!</h4>
                <p className="text-sm font-semibold text-slate-700">
                  Si un mensaje dice que se acaba el tiempo o te asusta con multas, es falso.
                </p>
              </div>

              {/* Rule 2 */}
              <div className="bg-amber-50 border-3 border-amber-300 p-6 rounded-3xl text-center space-y-3 shadow-md">
                <div className="w-16 h-16 bg-amber-200 text-amber-800 rounded-2xl mx-auto flex items-center justify-center">
                  <Gift className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-amber-950">2. Nadie Regala Nada</h4>
                <p className="text-sm font-semibold text-slate-700">
                  Si te prometen premios o teléfonos de sorteos en los que no participaste, ignóralo.
                </p>
              </div>

              {/* Rule 3 */}
              <div className="bg-emerald-50 border-3 border-emerald-300 p-6 rounded-3xl text-center space-y-3 shadow-md">
                <div className="w-16 h-16 bg-emerald-200 text-emerald-800 rounded-2xl mx-auto flex items-center justify-center">
                  <Building2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black text-emerald-950">3. Tu Clave es Tuya</h4>
                <p className="text-sm font-semibold text-slate-700">
                  Tu banco o el médico NUNCA te pedirán tus contraseñas por correo ni por mensaje.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => {
                  playSuccessSound();
                  onCompleteStep();
                }}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xl shadow-lg cursor-pointer active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <span>¡Reglas aprendidas! Vamos al Juego del Detective</span>
                <Sparkles className="w-6 h-6 text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Security Inspector Quiz in Windows */}
        {step.componentKey === 'security-quiz-simulator' && (
          <div className="max-w-3xl mx-auto space-y-6 py-2">
            
            {/* Quiz Progress header */}
            <div className="flex items-center justify-between bg-slate-100 p-4 rounded-2xl border-2 border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Caso {currentCaseIndex + 1} de {SECURITY_QUIZ_CASES.length}:</span>
                <span className="font-extrabold text-blue-900">{activeCase.scenarioTitle}</span>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                {completedCases.length} de {SECURITY_QUIZ_CASES.length} resueltos
              </span>
            </div>

            {/* Email scenario to analyze */}
            <div className="bg-white rounded-3xl border-3 border-slate-300 shadow-xl overflow-hidden">
              <div className="bg-slate-800 text-white p-5 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Nombre visible:</span>
                    <h4 className="text-xl font-black text-white">{activeCase.fromName}</h4>
                  </div>

                  {/* Inspector Magnifying Glass */}
                  <button
                    onClick={() => {
                      playClickSound();
                      setInspectedSender(!inspectedSender);
                    }}
                    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl font-black text-sm flex items-center gap-2 cursor-pointer shadow-xs"
                    title="Ver la dirección de correo real"
                  >
                    <Search className="w-4 h-4" />
                    <span>{inspectedSender ? 'Ocultar lupa' : '🔍 Inspeccionar remitente real'}</span>
                  </button>
                </div>

                {/* Inspected Real Address */}
                {inspectedSender && (
                  <div className="bg-slate-950 p-3 rounded-xl border-2 border-amber-400 text-amber-300 font-mono text-sm sm:text-base animate-in zoom-in-95">
                    <strong>Dirección real que envía:</strong> {activeCase.fromEmail}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-700">
                  <span className="text-xs font-bold text-slate-400 uppercase">Asunto:</span>
                  <p className="text-lg font-bold text-amber-300">{activeCase.subject}</p>
                </div>
              </div>

              {/* Message content */}
              <div className="p-6 sm:p-8 space-y-4 bg-slate-50">
                <p className="text-slate-800 text-lg font-medium leading-relaxed whitespace-pre-line bg-white p-5 rounded-2xl border border-slate-200">
                  {activeCase.body}
                </p>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-300 text-amber-950 text-sm font-semibold">
                  <strong>Petición del mensaje:</strong> {activeCase.actionText}
                </div>
              </div>

              {/* Decision Action Buttons */}
              {!showExplanation ? (
                <div className="p-6 bg-white border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleAnswer('safe')}
                    className="py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95"
                  >
                    <CheckCircle2 className="w-7 h-7" />
                    <span>✓ Es Seguro y Confiable</span>
                  </button>

                  <button
                    onClick={() => handleAnswer('scam')}
                    className="py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 cursor-pointer shadow-lg active:scale-95"
                  >
                    <ShieldAlert className="w-7 h-7" />
                    <span>🚨 Es una Trampa / Engaño</span>
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-white border-t-2 border-slate-200 space-y-4 animate-in fade-in">
                  <div className={`p-5 rounded-2xl border-3 flex items-start gap-4 ${
                    (userAnswer === 'scam' && activeCase.isScam) || (userAnswer === 'safe' && !activeCase.isScam)
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                      : 'bg-amber-50 border-amber-400 text-amber-950'
                  }`}>
                    {activeCase.isScam ? (
                      <ShieldAlert className="w-8 h-8 text-rose-600 flex-shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
                    )}
                    <div className="space-y-2">
                      <h5 className="text-xl font-black">
                        {activeCase.isScam ? '¡Correcto! Es un intento de engaño.' : '¡Correcto! Es un correo legítimo.'}
                      </h5>
                      <p className="text-base font-medium">{activeCase.explanationWhy}</p>
                      <p className="text-sm font-bold bg-white/70 p-3 rounded-xl border border-current">
                        {activeCase.goldenRule}
                      </p>
                    </div>
                  </div>

                  {currentCaseIndex < SECURITY_QUIZ_CASES.length - 1 ? (
                    <button
                      onClick={handleNextCase}
                      className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-2xl shadow-md cursor-pointer transition-all active:scale-95"
                    >
                      Analizar el siguiente caso →
                    </button>
                  ) : (
                    <div className="p-4 bg-emerald-100 rounded-2xl text-center text-emerald-950 font-bold text-lg">
                      🎉 ¡Has completado todos los casos del inspector de seguridad!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: Windows Pop-up closer practice */}
        {step.componentKey === 'security-popup-closer-practice' && (
          <div className="max-w-2xl mx-auto space-y-6 text-center py-2">
            <div className="inline-flex items-center gap-2 bg-slate-100 px-5 py-2.5 rounded-2xl border-2 border-indigo-200 text-slate-800 font-bold text-lg shadow-xs">
              <span>{step.instructionPrompt}</span>
            </div>

            {isPopupVisible ? (
              <div className="relative bg-rose-600 text-white p-8 rounded-3xl border-4 border-rose-800 shadow-2xl animate-gentle-pulse max-w-lg mx-auto">
                {/* The REAL safe close button with Windows style */}
                <button
                  onClick={handleSafeXClick}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white text-rose-700 hover:bg-rose-100 flex items-center justify-center font-black text-2xl shadow-md cursor-pointer ring-4 ring-white/50"
                  title="Cerrar ventana de forma segura"
                >
                  <X className="w-8 h-8 stroke-[3]" />
                </button>

                <div className="w-16 h-16 bg-white text-rose-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-inner">
                  <AlertTriangle className="w-10 h-10" />
                </div>

                <h4 className="text-2xl sm:text-3xl font-black mb-2">
                  ¡ALERTA FALSA DEL SISTEMA!
                </h4>

                <p className="text-lg font-bold mb-6 text-rose-100">
                  "Se detectaron 5 virus críticos. Pulse el botón para desinfectar ahora."
                </p>

                {/* Trappy fake buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleFakeButtonClick}
                    className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-lg rounded-2xl shadow-lg cursor-pointer"
                  >
                    ⚠️ LIMPIAR EQUIPO AHORA (¡No toques aquí!)
                  </button>

                  <button
                    onClick={handleFakeButtonClick}
                    className="w-full py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-sm rounded-xl"
                  >
                    Descargar antivirus gratis (¡Tampoco aquí!)
                  </button>
                </div>

                {popupAttempts > 0 && (
                  <p className="mt-4 p-2 bg-white text-rose-900 rounded-xl font-bold text-sm">
                    💡 ¡Cuidado! Esos botones de colores son falsos. Busca la <strong>X blanca</strong> arriba a la derecha.
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-emerald-100 border-3 border-emerald-400 p-8 rounded-3xl text-emerald-950 max-w-lg mx-auto animate-in zoom-in-95 space-y-3">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h4 className="text-2xl font-black">
                  ¡Excelente maniobra!
                </h4>
                <p className="text-lg font-medium">
                  Cerraste el aviso falso con la <strong>X</strong> sin caer en la trampa.
                </p>
                <button
                  onClick={() => setIsPopupVisible(true)}
                  className="text-xs font-bold text-slate-600 hover:underline cursor-pointer"
                >
                  Probar a cerrar de nuevo
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 4: Safety Checklist Summary */}
        {step.componentKey === 'security-checklist-summary' && (
          <div className="max-w-3xl mx-auto space-y-6 py-2">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-3 border-emerald-300 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b-2 border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-10 h-10 text-emerald-600" />
                  <div>
                    <h4 className="text-2xl font-black text-slate-900">
                      Decálogo de Seguridad para Papá
                    </h4>
                    <p className="text-slate-500 text-sm">Las 6 reglas de oro para tener siempre a mano</p>
                  </div>
                </div>

                <button
                  onClick={() => window.print()}
                  className="p-3 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-2xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xs"
                  title="Imprimir resumen"
                >
                  <Printer className="w-5 h-5 text-amber-700" />
                  <span className="hidden sm:inline">Imprimir</span>
                </button>
              </div>

              <div className="space-y-3">
                {SAFETY_CHECKLIST.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 text-slate-800 text-base sm:text-lg font-bold flex items-start gap-3"
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 text-emerald-950 text-center font-bold text-lg">
                🎉 ¡Has completado todas las lecciones de seguridad digital en Windows!
              </div>
            </div>
          </div>
        )}

      </WindowsWindow>
    </div>
  );
};
