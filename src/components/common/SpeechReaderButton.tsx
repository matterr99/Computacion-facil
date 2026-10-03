import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  textToRead: string;
  label?: string;
  className?: string;
  size?: 'default' | 'large';
}

export const SpeechReaderButton: React.FC<Props> = ({
  textToRead,
  label = 'Escuchar esta lección en voz alta',
  className = '',
  size = 'default'
}) => {
  const { isSpeaking, speak, stopSpeaking, playClickSound } = useAccessibility();

  const handleToggle = () => {
    playClickSound();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(textToRead);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`inline-flex items-center gap-2.5 rounded-2xl font-bold transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${
        isSpeaking
          ? 'bg-amber-500 text-white hover:bg-amber-600 ring-4 ring-amber-200 animate-pulse'
          : 'bg-amber-100 text-amber-950 hover:bg-amber-200 border-2 border-amber-300'
      } ${size === 'large' ? 'px-5 py-3 text-lg' : 'px-4 py-2.5 text-base'} ${className}`}
      title={isSpeaking ? 'Detener lectura en voz alta' : 'Escuchar explicación en voz alta'}
      aria-label={label}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-6 h-6 flex-shrink-0 animate-bounce" />
          <span>Detener voz</span>
        </>
      ) : (
        <>
          <Volume2 className="w-6 h-6 flex-shrink-0 text-amber-700" />
          <span>{label}</span>
          <Sparkles className="w-4 h-4 text-amber-600 opacity-75" />
        </>
      )}
    </button>
  );
};
