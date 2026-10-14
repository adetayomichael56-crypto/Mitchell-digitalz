import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export const WhatsAppChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);

  const waLink = 'https://wa.link/3qcm8j';
  const waPhone = '+234 9024877275';

  const quickPrompts = [
    '👋 Hi Mitchell, I need a new website quote!',
    '🎨 I need a UI/UX & Website Redesign.',
    '⚡ I want to clone or rebuild my existing site.',
    '💼 Interested in hiring you on Upwork/Fiverr.',
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (unreadCount > 0) setUnreadCount(0);
  };

  const handleQuickPrompt = (prompt: string) => {
    const encoded = encodeURIComponent(prompt);
    window.open(`https://wa.me/2349024877275?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      window.open(waLink, '_blank', 'noopener,noreferrer');
      return;
    }
    const encoded = encodeURIComponent(message.trim());
    window.open(`https://wa.me/2349024877275?text=${encoded}`, '_blank', 'noopener,noreferrer');
    setMessage('');
  };

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end pointer-events-auto select-none">
      
      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[340px] sm:w-[380px] bg-[#070612] rounded-3xl border border-[#261d56] shadow-2xl overflow-hidden flex flex-col max-h-[520px] animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#181145] via-[#211559] to-[#2e1966] p-4 text-white flex items-center justify-between shadow-md border-b border-[#261d56]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#130f2e] border-2 border-purple-400/40 p-0.5 overflow-hidden flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png"
                    alt="Mitchell Adetayo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#181145] rounded-full" />
              </div>

              <div>
                <h4 className="text-sm font-bold leading-tight">Mitchell Adetayo</h4>
                <p className="text-[11px] text-purple-200/90 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Direct WhatsApp Assistant</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Chatbot"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-4 overflow-y-auto space-y-3 bg-[#070612] flex-1 text-xs">
            <div className="text-center my-1">
              <span className="px-3 py-1 rounded-full bg-[#130f2e] border border-[#261d56] text-[10px] text-purple-300 font-semibold uppercase tracking-wider">
                WhatsApp Direct Chat ({waPhone})
              </span>
            </div>

            <div className="flex items-start gap-2">
              <div className="max-w-[85%] bg-[#130f2e] border border-[#261d56] text-slate-200 p-3 rounded-2xl rounded-tl-xs shadow-xs space-y-1">
                <p className="leading-relaxed">
                  Hi there! 👋 I am Mitchell Adetayo. Ready to discuss your high-converting website build? Pick a shortcut below or send a custom question!
                </p>
                <span className="text-[9px] text-slate-400 block text-right">Just now</span>
              </div>
            </div>

            {/* Quick Prompt Buttons */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">
                Suggested Inquiries:
              </span>
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-[#0e0b24] hover:bg-[#1a143b] border border-[#261d56] hover:border-purple-500/70 text-slate-300 hover:text-white transition-all text-xs cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSubmit} className="p-3 bg-[#0a081a] border-t border-[#261d56] flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your WhatsApp message..."
              className="flex-1 px-3 py-2 rounded-xl bg-[#130f2e] border border-[#261d56] text-white text-xs focus:outline-none focus:border-purple-500 placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors cursor-pointer shadow-md shadow-purple-600/30"
              title="Send to WhatsApp"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={handleToggle}
        className="relative p-3.5 sm:p-4 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white shadow-2xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
        aria-label="Open WhatsApp chat"
      >
        <MessageSquare className="w-6 h-6" />
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[#090a15] animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

    </div>
  );
};
