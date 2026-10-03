import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { TextSize } from '../types';

export type ThemeMode = 'light' | 'dark';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  cycleTextSize: () => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  toggleHighContrast: () => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  isSpeaking: boolean;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  playSuccessSound: () => void;
  playClickSound: () => void;
  playErrorSound: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSizeState] = useState<TextSize>(() => {
    const saved = localStorage.getItem('app_text_size');
    return (saved as TextSize) || 'large'; // Default to 'large' for seniors!
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('app_theme');
    return (saved as ThemeMode) || 'light';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    return localStorage.getItem('app_high_contrast') === 'true';
  });

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const setTextSize = (size: TextSize) => {
    setTextSizeState(size);
    localStorage.setItem('app_text_size', size);
  };

  const cycleTextSize = () => {
    if (textSize === 'normal') setTextSize('large');
    else if (textSize === 'large') setTextSize('xlarge');
    else setTextSize('normal');
  };

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem('app_theme', t);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const setHighContrast = (val: boolean) => {
    setHighContrastState(val);
    localStorage.setItem('app_high_contrast', val ? 'true' : 'false');
  };

  const toggleHighContrast = () => {
    setHighContrast(!highContrast);
  };

  // Web Speech API for reading content aloud
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown/symbols
    const cleanText = text
      .replace(/[#*_`]/g, '')
      .replace(/https?:\/\/\S+/g, 'enlace web')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9; // Slightly slower, calm pace for seniors
    utterance.pitch = 1.0;

    // Pick best Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find(v => v.lang.startsWith('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Web Audio synth for gentle UI audio feedback
  const playTone = (freq: number, type: OscillatorType, duration: number, delay = 0) => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      }, delay);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  const playClickSound = () => {
    playTone(520, 'sine', 0.1);
  };

  const playSuccessSound = () => {
    playTone(523.25, 'sine', 0.15, 0);   // C5
    playTone(659.25, 'sine', 0.15, 120); // E5
    playTone(783.99, 'sine', 0.25, 240); // G5
  };

  const playErrorSound = () => {
    playTone(280, 'triangle', 0.2, 0);
    playTone(240, 'triangle', 0.25, 120);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <AccessibilityContext.Provider
      value={{
        textSize,
        setTextSize,
        cycleTextSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        theme,
        setTheme,
        toggleTheme,
        isSpeaking,
        speak,
        stopSpeaking,
        playSuccessSound,
        playClickSound,
        playErrorSound,
      }}
    >
      <div className={`${theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} ${highContrast ? 'contrast-mode' : ''} min-h-screen transition-colors duration-300`}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
