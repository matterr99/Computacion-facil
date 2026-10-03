import React from 'react';
import { ShieldCheck, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

interface Props {
  text?: string;
  type?: 'safety' | 'encouragement' | 'tip' | 'success';
  className?: string;
}

export const ConfidencePill: React.FC<Props> = ({
  text = 'No te preocupes, no puedes romper nada aquí. Tómate todo el tiempo que necesites.',
  type = 'safety',
  className = ''
}) => {
  const { theme } = useAccessibility();
  const isDark = theme === 'dark';

  const getIcon = () => {
    switch (type) {
      case 'encouragement':
        return <Heart className="w-6 h-6 text-rose-500 flex-shrink-0" />;
      case 'tip':
        return <Sparkles className="w-6 h-6 text-amber-500 flex-shrink-0" />;
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />;
      case 'safety':
      default:
        return <ShieldCheck className="w-6 h-6 text-emerald-500 flex-shrink-0" />;
    }
  };

  const getStyle = () => {
    if (isDark) {
      switch (type) {
        case 'encouragement':
          return 'bg-rose-950/40 border-rose-800 text-rose-200';
        case 'tip':
          return 'bg-amber-950/40 border-amber-800 text-amber-200';
        case 'success':
          return 'bg-emerald-950/40 border-emerald-800 text-emerald-200';
        case 'safety':
        default:
          return 'bg-emerald-950/40 border-emerald-800 text-emerald-200';
      }
    } else {
      switch (type) {
        case 'encouragement':
          return 'bg-rose-50 border-rose-200 text-rose-950';
        case 'tip':
          return 'bg-amber-50 border-amber-200 text-amber-950';
        case 'success':
          return 'bg-emerald-50 border-emerald-200 text-emerald-950';
        case 'safety':
        default:
          return 'bg-emerald-50 border-emerald-200 text-emerald-950';
      }
    }
  };

  return (
    <div
      role="status"
      className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl border-2 shadow-xs transition-all ${getStyle()} ${className}`}
    >
      {getIcon()}
      <p className="font-semibold text-base sm:text-lg leading-snug">
        {text}
      </p>
    </div>
  );
};
