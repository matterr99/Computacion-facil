export type TextSize = 'normal' | 'large' | 'xlarge';

export interface ModuleProgress {
  moduleId: string;
  completedSteps: number[];
  isCompleted: boolean;
  score?: number;
}

export interface UserProgressState {
  userName: string;
  activeModuleId: string;
  activeStepIndex: number;
  modulesProgress: Record<string, ModuleProgress>;
  textSize: TextSize;
  highContrast: boolean;
  soundEnabled: boolean;
}

export interface StepItem {
  id: number;
  title: string;
  subtitle: string;
  explanation: string;
  audioText?: string;
  instructionPrompt?: string;
  reassuranceNote?: string;
  componentKey: string;
}

export interface ModuleItem {
  id: string;
  number: number;
  title: string;
  shortDescription: string;
  iconName: string;
  badge: string;
  estimatedMinutes: number;
  steps: StepItem[];
}

export interface EmailMessage {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  date: string;
  preview: string;
  body: string;
  avatarColor: string;
  isRead: boolean;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentType?: 'photo' | 'document';
}

export interface SecurityQuizCase {
  id: string;
  scenarioTitle: string;
  fromName: string;
  fromEmail: string;
  subject: string;
  body: string;
  actionText: string;
  isScam: boolean;
  clues: string[];
  explanationWhy: string;
  goldenRule: string;
}

export interface GlossaryTerm {
  term: string;
  simpleMeaning: string;
  realWorldAnalogy: string;
  example: string;
  icon: string;
}
