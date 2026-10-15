import React from 'react';
import { X, Calendar } from 'lucide-react';

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity"
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-[#0a081a] border border-[#261d56] text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[90vh] max-h-[820px]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#120e2e] text-white flex items-center justify-between border-b border-[#261d56] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-tight">
                Schedule a Consultation — Michael Adetayo
              </h3>
              <p className="text-xs text-purple-300 font-medium">
                Book a live video meeting directly on Calendly
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#0a081a] hover:bg-[#1a143b] text-slate-300 transition-colors cursor-pointer border border-[#261d56]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Iframe */}
        <div className="flex-1 w-full bg-white relative">
          <iframe
            src="https://calendly.com/mitchelladetayo/meeting"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Select a Date & Time - Calendly"
            className="w-full h-full min-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};
