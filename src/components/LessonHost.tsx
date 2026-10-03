import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, CheckCircle2, RotateCcw } from 'lucide-react';
import { MODULES } from '../data/modulesData';
import { ModuleProgress } from '../types';
import { ProgressBar } from './common/ProgressBar';
import { SuccessModal } from './common/SuccessModal';
import { useAccessibility } from '../context/AccessibilityContext';

// Import modules
import { Module0ComputerHardware } from './modules/Module0ComputerHardware';
import { Module1FirstSteps } from './modules/Module1FirstSteps';
import { Module2SearchAndFiles } from './modules/Module2SearchAndFiles';
import { Module3WebBrowsing } from './modules/Module3WebBrowsing';
import { Module4EmailBasics } from './modules/Module4EmailBasics';
import { Module5InternetSecurity } from './modules/Module5InternetSecurity';

interface Props {
  moduleId: string;
  onBackToHome: () => void;
  onCompleteModule: (moduleId: string) => void;
  modulesProgress: Record<string, ModuleProgress>;
  onStepCompleted: (moduleId: string, stepIndex: number) => void;
  onNavigateToModule: (nextModuleId: string) => void;
}

export const LessonHost: React.FC<Props> = ({
  moduleId,
  onBackToHome,
  onCompleteModule,
  modulesProgress,
  onStepCompleted,
  onNavigateToModule
}) => {
  const { playClickSound, theme } = useAccessibility();
  const isDark = theme === 'dark';

  const currentModule = MODULES.find(m => m.id === moduleId) || MODULES[0];
  
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '', isModuleCompleted: false });

  const progress = modulesProgress[currentModule.id] || {
    moduleId: currentModule.id,
    completedSteps: [],
    isCompleted: false
  };

  const isCurrentStepDone = progress.completedSteps.includes(activeStepIndex);

  const handleStepComplete = () => {
    onStepCompleted(currentModule.id, activeStepIndex);

    const isLastStep = activeStepIndex === currentModule.steps.length - 1;

    if (isLastStep) {
      onCompleteModule(currentModule.id);
      setModalData({
        title: `¡Felicidades, papá! Has completado el Módulo ${currentModule.number}`,
        message: `Has aprendido todas las lecciones de "${currentModule.title}". ¡Estás haciendo un progreso extraordinario!`,
        isModuleCompleted: true
      });
      setShowSuccessModal(true);
    } else {
      setModalData({
        title: '¡Paso completado con éxito!',
        message: `Has terminado el paso ${activeStepIndex + 1}: "${currentModule.steps[activeStepIndex].title}".`,
        isModuleCompleted: false
      });
      setShowSuccessModal(true);
    }
  };

  const handleModalNext = () => {
    setShowSuccessModal(false);
    if (modalData.isModuleCompleted) {
      const currentIndex = MODULES.findIndex(m => m.id === currentModule.id);
      if (currentIndex < MODULES.length - 1) {
        onNavigateToModule(MODULES[currentIndex + 1].id);
        setActiveStepIndex(0);
      } else {
        onBackToHome();
      }
    } else {
      if (activeStepIndex < currentModule.steps.length - 1) {
        setActiveStepIndex(prev => prev + 1);
      }
    }
  };

  const handleGoPrevStep = () => {
    playClickSound();
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  const handleGoNextStep = () => {
    playClickSound();
    if (activeStepIndex < currentModule.steps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const currentStep = currentModule.steps[activeStepIndex] || currentModule.steps[0];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6 pb-20">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => {
            playClickSound();
            onBackToHome();
          }}
          className={`inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border-2 font-bold text-xs sm:text-base shadow-xs cursor-pointer active:scale-95 transition-all ${
            isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-100' : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
          }`}
        >
          <Home className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Volver al menú</span>
        </button>

        <span className={`text-xs sm:text-sm font-extrabold px-3 py-1.5 rounded-xl border ${
          isDark ? 'bg-blue-950/60 text-blue-300 border-blue-800' : 'bg-blue-50 text-blue-900 border-blue-200'
        }`}>
          Módulo {currentModule.number} de {MODULES.length}
        </span>
      </div>

      {/* Progress Stepper Bar */}
      <ProgressBar
        totalSteps={currentModule.steps.length}
        currentStepIndex={activeStepIndex}
        completedStepIndices={progress.completedSteps}
        onStepSelect={(idx) => {
          playClickSound();
          setActiveStepIndex(idx);
        }}
        moduleTitle={currentModule.title}
      />

      {/* Dynamic Module Component Render */}
      <div className="pt-1">
        {currentModule.id === 'componentes-y-sistema' && (
          <Module0ComputerHardware
            step={currentStep}
            stepIndex={activeStepIndex}
            onCompleteStep={handleStepComplete}
            isCompleted={isCurrentStepDone}
          />
        )}

        {currentModule.id === 'primeros-pasos' && (
          <Module1FirstSteps
            step={currentStep}
            stepIndex={activeStepIndex}
            onCompleteStep={handleStepComplete}
            isCompleted={isCurrentStepDone}
          />
        )}

        {currentModule.id === 'buscar-programas' && (
          <Module2SearchAndFiles
            step={currentStep}
            stepIndex={activeStepIndex}
            onCompleteStep={handleStepComplete}
            isCompleted={isCurrentStepDone}
          />
        )}

        {currentModule.id === 'navegar-internet' && (
          <Module3WebBrowsing
            step={currentStep}
            stepIndex={activeStepIndex}
            onCompleteStep={handleStepComplete}
            isCompleted={isCurrentStepDone}
          />
        )}

        {currentModule.id === 'correo-electronico' && (
          <Module4EmailBasics
            step={currentStep}
            stepIndex={activeStepIndex}
            onCompleteStep={handleStepComplete}
            isCompleted={isCurrentStepDone}
          />
        )}

        {currentModule.id === 'seguridad-digital' && (
          <Module5InternetSecurity
            step={currentStep}
            stepIndex={activeStepIndex}
            onCompleteStep={handleStepComplete}
            isCompleted={isCurrentStepDone}
          />
        )}
      </div>

      {/* Bottom Step Navigation Control Bar - Responsive Layout */}
      <div className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 transition-colors ${
        isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <button
          onClick={handleGoPrevStep}
          disabled={activeStepIndex === 0}
          className={`w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
            activeStepIndex > 0
              ? isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 active:scale-95'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 active:scale-95'
              : 'bg-slate-100/50 text-slate-400 border-slate-200/50 cursor-not-allowed opacity-50'
          }`}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
          <span>Paso Anterior</span>
        </button>

        <div className={`text-center font-bold text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          Paso {activeStepIndex + 1} de {currentModule.steps.length}
        </div>

        <button
          onClick={handleGoNextStep}
          disabled={activeStepIndex === currentModule.steps.length - 1}
          className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-black text-sm sm:text-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
            activeStepIndex < currentModule.steps.length - 1
              ? 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
          }`}
        >
          <span>Siguiente Paso</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
        </button>
      </div>

      {/* Celebration Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        title={modalData.title}
        message={modalData.message}
        isModuleCompleted={modalData.isModuleCompleted}
        nextStepLabel={modalData.isModuleCompleted ? 'Continuar al siguiente tema' : 'Ir al siguiente paso'}
        onNext={handleModalNext}
      />
    </div>
  );
};
