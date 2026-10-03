import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Reply, 
  Paperclip, 
  User, 
  CheckCircle2, 
  Sparkles, 
  Heart, 
  Image as ImageIcon, 
  Trash2, 
  Archive, 
  Star,
  Check,
  Inbox,
  PenSquare
} from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';
import { StepItem, EmailMessage } from '../../types';
import { SIMULATED_EMAILS } from '../../data/modulesData';
import { SpeechReaderButton } from '../common/SpeechReaderButton';
import { ConfidencePill } from '../common/ConfidencePill';
import { WindowsWindow } from '../common/WindowsWindow';

interface Props {
  step: StepItem;
  stepIndex: number;
  onCompleteStep: () => void;
  isCompleted: boolean;
}

export const Module4EmailBasics: React.FC<Props> = ({
  step,
  stepIndex,
  onCompleteStep,
  isCompleted
}) => {
  const { playClickSound, playSuccessSound } = useAccessibility();

  // Email service skin: Outlook vs Gmail
  const [emailSkin, setEmailSkin] = useState<'outlook' | 'gmail'>('outlook');

  // Email simulation states
  const [emails, setEmails] = useState<EmailMessage[]>(SIMULATED_EMAILS);
  const [openedEmailId, setOpenedEmailId] = useState<string | null>('mail-1');
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSent, setIsSent] = useState(false);

  const activeEmail = emails.find(e => e.id === openedEmailId) || emails[0];

  const handleOpenEmail = (id: string) => {
    playClickSound();
    setOpenedEmailId(id);
    setIsReplying(false);
    setIsSent(false);

    // Mark as read
    setEmails(prev => prev.map(e => e.id === id ? { ...e, isRead: true } : e));

    if (step.componentKey === 'email-inbox-simulator') {
      playSuccessSound();
      onCompleteStep();
    }
  };

  const handleStartReply = () => {
    playClickSound();
    setIsReplying(true);
  };

  const handleQuickPhrase = (phrase: string) => {
    playClickSound();
    setReplyText(prev => (prev ? `${prev} ${phrase}` : phrase));
  };

  const handleSendEmail = () => {
    if (!replyText.trim()) return;
    playSuccessSound();
    setIsSent(true);
    setIsReplying(false);
    onCompleteStep();
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header Card with Windows Style */}
      <WindowsWindow
        title="Guía de Correo Electrónico: Outlook y Gmail"
        subtitle={`Paso ${stepIndex + 1}: ${step.title}`}
        icon={<Mail className="w-5 h-5 text-blue-600" />}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <span className="text-blue-700 bg-blue-50 text-xs sm:text-sm font-black px-3 py-1 rounded-full border border-blue-200 uppercase tracking-wider">
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
          <ConfidencePill text={step.reassuranceNote} type="tip" className="mt-4" />
        )}
      </WindowsWindow>

      {/* Interactive Activity Section */}
      <WindowsWindow
        title={emailSkin === 'outlook' ? 'Microsoft Outlook (Correo de Windows)' : 'Gmail de Google'}
        subtitle="Simulador de Correo Electrónico"
        icon={<Mail className={`w-5 h-5 ${emailSkin === 'outlook' ? 'text-blue-600' : 'text-rose-600'}`} />}
        className={`border-3 ${emailSkin === 'outlook' ? 'border-blue-400/60' : 'border-rose-400/60'}`}
      >
        {/* STEP 1: Email Address Breakdown and Outlook vs Gmail Comparison */}
        {step.componentKey === 'email-intro' && (
          <div className="max-w-3xl mx-auto space-y-6 text-center py-2">
            <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border-4 border-slate-700 shadow-2xl space-y-4">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl mx-auto flex items-center justify-center shadow-md">
                <Mail className="w-10 h-10" />
              </div>
              
              <h4 className="text-2xl sm:text-3xl font-black">
                Gmail y Outlook: Los dos reyes del correo
              </h4>

              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                No te preocupes si alguien te dice "mándamelo a mi Gmail" o "a mi Hotmail/Outlook". Ambos funcionan como buzones postales universales: puedes enviar y recibir mensajes entre ellos al instante.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="bg-blue-50 border-3 border-blue-400 p-5 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black">
                    O
                  </div>
                  <h5 className="font-black text-xl text-blue-950">Outlook / Hotmail</h5>
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  Creado por Microsoft. Tu dirección suele terminar en <code className="text-blue-700">@outlook.com</code> o <code className="text-blue-700">@hotmail.com</code>.
                </p>
              </div>

              <div className="bg-rose-50 border-3 border-rose-400 p-5 rounded-2xl space-y-2 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-rose-600 text-white rounded-lg flex items-center justify-center font-black">
                    M
                  </div>
                  <h5 className="font-black text-xl text-rose-950">Gmail (Google)</h5>
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  Creado por Google. Tu dirección termina en <code className="text-rose-700">@gmail.com</code>.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  playSuccessSound();
                  onCompleteStep();
                }}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xl shadow-lg cursor-pointer active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <span>¡Entendido! Vamos al Simulador de Correo</span>
                <Sparkles className="w-6 h-6 text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Inbox simulator with Outlook vs Gmail Skin Selector */}
        {step.componentKey === 'email-inbox-simulator' && (
          <div className="space-y-4 max-w-4xl mx-auto py-2">
            
            {/* Skin Toggle Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 p-3 rounded-2xl border-2 border-slate-300">
              <span className="text-sm font-bold text-slate-700">
                Elige qué diseño quieres probar:
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setEmailSkin('outlook');
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-sm cursor-pointer transition-all ${
                    emailSkin === 'outlook'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  🔵 Vista Outlook (Microsoft)
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setEmailSkin('gmail');
                  }}
                  className={`px-4 py-2 rounded-xl font-bold text-sm cursor-pointer transition-all ${
                    emailSkin === 'gmail'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  🔴 Vista Gmail (Google)
                </button>
              </div>
            </div>

            {/* Email Client Layout */}
            <div className="bg-white rounded-2xl border-3 border-slate-300 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-4">
              
              {/* Left Sidebar */}
              <div className="md:col-span-1 bg-slate-100/90 p-3 border-r border-slate-200 space-y-2">
                <button
                  className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl font-bold text-sm shadow-xs ${
                    emailSkin === 'outlook' ? 'bg-blue-600 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  <PenSquare className="w-4 h-4" />
                  <span>Mensaje Nuevo</span>
                </button>

                <div className="pt-2 space-y-1">
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 bg-slate-200 text-slate-900 rounded-xl text-left font-bold text-sm"
                  >
                    <Inbox className="w-4 h-4 text-blue-600" />
                    <span>Recibidos (1)</span>
                  </button>

                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-200 rounded-xl text-left font-semibold text-sm"
                  >
                    <Send className="w-4 h-4 text-slate-500" />
                    <span>Enviados</span>
                  </button>

                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 hover:bg-slate-200 rounded-xl text-left font-semibold text-sm"
                  >
                    <Trash2 className="w-4 h-4 text-slate-500" />
                    <span>Papelera</span>
                  </button>
                </div>
              </div>

              {/* Right Email List */}
              <div className="md:col-span-3 divide-y-2 divide-slate-100 bg-white">
                {emails.map((mail) => (
                  <div
                    key={mail.id}
                    onClick={() => handleOpenEmail(mail.id)}
                    className={`p-4 sm:p-5 flex items-start gap-4 transition-all cursor-pointer hover:bg-blue-50 ${
                      !mail.isRead ? 'bg-blue-50/50 font-bold' : 'bg-white'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl ${mail.avatarColor} text-white flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-xs`}>
                      <User className="w-6 h-6" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className={`text-base sm:text-lg ${!mail.isRead ? 'font-black text-slate-900' : 'font-semibold text-slate-700'}`}>
                          {mail.sender}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-400 whitespace-nowrap">
                          {mail.date}
                        </span>
                      </div>

                      <h5 className={`text-base sm:text-lg truncate mb-1 ${!mail.isRead ? 'font-bold text-blue-900' : 'text-slate-800'}`}>
                        {mail.subject}
                      </h5>

                      <p className="text-sm text-slate-500 truncate">
                        {mail.preview}
                      </p>

                      {mail.hasAttachment && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-xs font-bold text-slate-700">
                          <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
                          <span>Adjunto: {mail.attachmentName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: Reading and Replying */}
        {step.componentKey === 'email-reply-simulator' && (
          <div className="max-w-3xl mx-auto space-y-6 py-2">
            <div className="bg-white rounded-2xl border-3 border-slate-300 shadow-xl overflow-hidden">
              
              {/* Toolbar */}
              <div className="bg-slate-100 p-3 border-b border-slate-200 flex items-center gap-3 select-none">
                <button
                  onClick={handleStartReply}
                  className={`px-4 py-2 text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xs ${
                    emailSkin === 'outlook' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'
                  }`}
                >
                  <Reply className="w-4 h-4" />
                  <span>Responder</span>
                </button>
                <button className="px-3 py-2 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm flex items-center gap-1.5 cursor-pointer">
                  <Trash2 className="w-4 h-4 text-slate-500" />
                  <span>Eliminar</span>
                </button>
                <button className="px-3 py-2 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm flex items-center gap-1.5 cursor-pointer">
                  <Archive className="w-4 h-4 text-slate-500" />
                  <span>Archivar</span>
                </button>
              </div>

              {/* Message Header */}
              <div className="bg-slate-50 p-6 border-b border-slate-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl ${emailSkin === 'outlook' ? 'bg-blue-600' : 'bg-rose-600'} text-white flex items-center justify-center font-black text-xl shadow-xs`}>
                      TC
                    </div>
                    <div>
                      <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                        {activeEmail.sender}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500">
                        De: <span className="font-mono">{activeEmail.senderEmail}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
                    {activeEmail.date}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-4">
                  {activeEmail.subject}
                </h3>
              </div>

              {/* Message Body */}
              <div className="p-6 sm:p-8 space-y-6 bg-white">
                <p className="text-slate-800 text-lg sm:text-xl font-medium leading-relaxed whitespace-pre-line">
                  {activeEmail.body}
                </p>

                {activeEmail.hasAttachment && (
                  <div className="bg-amber-50 p-4 sm:p-5 rounded-2xl border-2 border-amber-300 flex items-center gap-4">
                    <div className="w-16 h-16 bg-amber-200 text-amber-800 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="font-black text-slate-900 text-lg block">
                        Fotos_Almuerzo_Familiar.jpg
                      </span>
                      <span className="text-sm font-semibold text-slate-600">
                        🖼️ Foto adjunta • Todos los nietos sonrientes en el jardín
                      </span>
                    </div>
                  </div>
                )}

                {/* Reply Button */}
                {!isReplying && !isSent && (
                  <div className="pt-4 border-t border-slate-200">
                    <button
                      onClick={handleStartReply}
                      className={`px-8 py-4 text-white font-black text-xl rounded-2xl shadow-lg cursor-pointer transition-all active:scale-95 flex items-center gap-3 ${
                        emailSkin === 'outlook' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'
                      }`}
                    >
                      <Reply className="w-6 h-6 stroke-[3]" />
                      <span>↩️ Responder a este correo</span>
                    </button>
                  </div>
                )}

                {/* Reply Editor */}
                {isReplying && !isSent && (
                  <div className="pt-4 border-t-2 border-slate-200 space-y-4 animate-in fade-in">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-base">
                      <Reply className="w-5 h-5 text-blue-600" />
                      <span>Escribiendo respuesta para {activeEmail.sender}:</span>
                    </div>

                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe tu mensaje con calma aquí..."
                      rows={4}
                      className="w-full p-4 rounded-2xl border-3 border-blue-400 font-semibold text-lg text-slate-900 focus:outline-hidden focus:ring-4 focus:ring-blue-200 bg-blue-50/30"
                    />

                    {/* Quick Suggestions */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        💡 Toca una frase rápida para agregarla a tu mensaje:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickPhrase('¡Muchas gracias por las fotos!')}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-amber-100 text-slate-800 rounded-xl font-bold text-sm border border-slate-300 cursor-pointer"
                        >
                          "¡Muchas gracias por las fotos!"
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickPhrase('Están preciosos todos.')}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-amber-100 text-slate-800 rounded-xl font-bold text-sm border border-slate-300 cursor-pointer"
                        >
                          "Están preciosos todos."
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickPhrase('Les mando un abrazo muy fuerte.')}
                          className="px-3.5 py-2 bg-slate-100 hover:bg-amber-100 text-slate-800 rounded-xl font-bold text-sm border border-slate-300 cursor-pointer"
                        >
                          "Les mando un abrazo muy fuerte."
                        </button>
                      </div>
                    </div>

                    {/* Send Controls */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        onClick={handleSendEmail}
                        disabled={!replyText.trim()}
                        className={`px-8 py-4 rounded-2xl font-black text-xl flex items-center gap-3 transition-all cursor-pointer shadow-lg ${
                          replyText.trim()
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        <Send className="w-6 h-6 stroke-[3]" />
                        <span>✉️ Enviar Correo</span>
                      </button>

                      <button
                        onClick={() => setIsReplying(false)}
                        className="px-4 py-3 text-slate-500 font-bold hover:text-slate-800 cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}

                {/* Sent Confirmation */}
                {isSent && (
                  <div className="bg-emerald-100 border-3 border-emerald-400 p-6 rounded-3xl text-emerald-950 text-center animate-in zoom-in-95 space-y-3">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl mx-auto flex items-center justify-center">
                      <Check className="w-8 h-8 stroke-[3]" />
                    </div>
                    <h4 className="text-2xl font-black">
                      ¡Correo enviado correctamente!
                    </h4>
                    <p className="text-lg font-semibold text-emerald-900">
                      Tu hijo recibirá tu mensaje de inmediato en su bandeja de entrada.
                    </p>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

      </WindowsWindow>
    </div>
  );
};
