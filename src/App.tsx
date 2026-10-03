import React, { useState, useEffect } from 'react';
import { AccessibilityProvider, useAccessibility } from './context/AccessibilityContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WindowsTaskbar } from './components/common/WindowsTaskbar';
import { HomeDashboard } from './components/HomeDashboard';
import { LessonHost } from './components/LessonHost';
import { Module6Glossary } from './components/modules/Module6Glossary';
import { Module7FreePlayground } from './components/modules/Module7FreePlayground';
import { CertificateModal } from './components/common/CertificateModal';
import { MODULES } from './data/modulesData';
import { ModuleProgress } from './types';

const AppContent: React.FC = () => {
  const { textSize } = useAccessibility();

  // Navigation view state
  const [currentView, setCurrentView] = useState<'home' | 'lesson' | 'glossary' | 'playground' | 'certificate'>('home');
  const [activeModuleId, setActiveModuleId] = useState<string>('primeros-pasos');

  // User details
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('app_user_name') || 'Papá';
  });

  // Progress tracking in LocalStorage
  const [modulesProgress, setModulesProgress] = useState<Record<string, ModuleProgress>>(() => {
    const saved = localStorage.getItem('app_modules_progress');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore parse error
      }
    }
    // Default initial progress
    const initial: Record<string, ModuleProgress> = {};
    MODULES.forEach(m => {
      initial[m.id] = {
        moduleId: m.id,
        completedSteps: [],
        isCompleted: false
      };
    });
    return initial;
  });

  useEffect(() => {
    localStorage.setItem('app_modules_progress', JSON.stringify(modulesProgress));
  }, [modulesProgress]);

  const handleUpdateUserName = (name: string) => {
    setUserName(name);
    localStorage.setItem('app_user_name', name);
  };

  const handleSelectModule = (moduleId: string) => {
    setActiveModuleId(moduleId);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepCompleted = (moduleId: string, stepIndex: number) => {
    setModulesProgress(prev => {
      const current = prev[moduleId] || {
        moduleId,
        completedSteps: [],
        isCompleted: false
      };

      if (!current.completedSteps.includes(stepIndex)) {
        return {
          ...prev,
          [moduleId]: {
            ...current,
            completedSteps: [...current.completedSteps, stepIndex]
          }
        };
      }
      return prev;
    });
  };

  const handleCompleteModule = (moduleId: string) => {
    setModulesProgress(prev => {
      const current = prev[moduleId] || {
        moduleId,
        completedSteps: [],
        isCompleted: false
      };
      return {
        ...prev,
        [moduleId]: {
          ...current,
          isCompleted: true
        }
      };
    });
  };

  const handleResetProgress = () => {
    const reset: Record<string, ModuleProgress> = {};
    MODULES.forEach(m => {
      reset[m.id] = {
        moduleId: m.id,
        completedSteps: [],
        isCompleted: false
      };
    });
    setModulesProgress(reset);
    localStorage.removeItem('app_modules_progress');
    setCurrentView('home');
  };

  const completedModulesCount = Object.values(modulesProgress).filter(m => m.isCompleted).length;

  const getTextScaleClass = () => {
    if (textSize === 'normal') return 'text-scale-normal';
    if (textSize === 'large') return 'text-scale-large';
    return 'text-scale-xl';
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-100/70 text-slate-900 transition-all pb-12 ${getTextScaleClass()}`}>
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view as 'home' | 'lesson' | 'glossary' | 'playground' | 'certificate');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userName={userName}
        totalCompletedModules={completedModulesCount}
      />

      <main className="flex-1 pb-8">
        {currentView === 'home' && (
          <HomeDashboard
            modulesProgress={modulesProgress}
            onSelectModule={handleSelectModule}
            onNavigate={(view) => {
              setCurrentView(view as 'home' | 'lesson' | 'glossary' | 'playground' | 'certificate');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            userName={userName}
          />
        )}

        {currentView === 'lesson' && (
          <LessonHost
            moduleId={activeModuleId}
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCompleteModule={handleCompleteModule}
            modulesProgress={modulesProgress}
            onStepCompleted={handleStepCompleted}
            onNavigateToModule={(nextModId) => {
              setActiveModuleId(nextModId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'glossary' && (
          <Module6Glossary
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'playground' && (
          <Module7FreePlayground
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'certificate' && (
          <CertificateModal
            userName={userName}
            onUpdateUserName={handleUpdateUserName}
            modulesProgress={modulesProgress}
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      <Footer onResetProgress={handleResetProgress} />

      {/* Windows 11 Taskbar with Start Menu and System Tray */}
      <WindowsTaskbar
        onNavigate={(view) => {
          setCurrentView(view as 'home' | 'lesson' | 'glossary' | 'playground' | 'certificate');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectModule={handleSelectModule}
        currentView={currentView}
      />
    </div>
  );
};

export default function App() {
  return (
    <AccessibilityProvider>
      <AppContent />
    </AccessibilityProvider>
  );
}
