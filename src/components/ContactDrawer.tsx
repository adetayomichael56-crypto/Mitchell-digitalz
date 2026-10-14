import React, { useState, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw, 
  MessageSquare,
  Lock,
  Mail,
  AlertCircle
} from 'lucide-react';
import { ClientInquiry, InquirySubmissionPayload } from '../types/inquiry';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  onInquirySubmitted?: (inquiry: ClientInquiry) => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({
  isOpen,
  onClose,
  preselectedService = '',
  onInquirySubmitted,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: preselectedService || 'WordPress & Elementor',
    budget: '$3,000 - $5,000',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [renderTime, setRenderTime] = useState<number>(Date.now());
  const [mathN1, setMathN1] = useState(3);
  const [mathN2, setMathN2] = useState(5);
  const [securityAnswer, setSecurityAnswer] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<ClientInquiry | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const refreshChallenge = () => {
    const a = Math.floor(Math.random() * 7) + 2;
    const b = Math.floor(Math.random() * 8) + 1;
    setMathN1(a);
    setMathN2(b);
    setSecurityAnswer('');
  };

  useEffect(() => {
    if (isOpen) {
      setRenderTime(Date.now());
      refreshChallenge();
      setErrorMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setErrorMessage('Please enter your name.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMessage('Please enter a brief message about your project.');
      return;
    }

    const expected = mathN1 + mathN2;
    if (parseInt(securityAnswer.trim(), 10) !== expected) {
      setErrorMessage(`Please solve the human verification check: ${mathN1} + ${mathN2} = ?`);
      return;
    }

    setIsSubmitting(true);

    const payload: InquirySubmissionPayload = {
      fullName: formData.name.trim(),
      email: formData.email.trim(),
      projectType: formData.service,
      budgetRange: formData.budget,
      timeline: 'Standard (2-4 weeks)',
      message: formData.message.trim(),
      preferredContact: 'email',
      _hp_company: honeypot,
      _formRenderTime: renderTime,
      securityAnswer: parseInt(securityAnswer.trim(), 10),
      securityExpected: expected,
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry.');
      }

      if (data.inquiry) {
        setSubmittedInquiry(data.inquiry);
        if (onInquirySubmitted) {
          onInquirySubmitted(data.inquiry);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error transmitting inquiry. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDone = () => {
    setSubmittedInquiry(null);
    setFormData({
      name: '',
      email: '',
      service: 'WordPress & Elementor',
      budget: '$3,000 - $5,000',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer transition-opacity"
      />

      {/* Drawer Container */}
      <div className="relative z-10 w-full max-w-lg bg-[#0a081a] text-white h-full shadow-2xl border-l border-[#261d56] flex flex-col justify-between overflow-y-auto animate-slide-in-right">
        
        {/* Header */}
        <div className="p-6 md:p-8 bg-[#120e2e] text-white flex items-center justify-between border-b border-[#261d56] shrink-0">
          <div>
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
              Mikky Digitalz
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white mt-0.5">
              Book a Discovery Call
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#0a081a] hover:bg-[#1a143b] text-slate-300 transition-colors cursor-pointer border border-[#261d56]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 md:p-8 flex-1">
          {submittedInquiry ? (
            /* Success confirmation card */
            <div className="py-8 flex flex-col items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Sparkles className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Ref: {submittedInquiry.id}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-2">
                  Inquiry Received!
                </h3>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
                Thank you <strong className="text-white">{submittedInquiry.fullName}</strong>. Your inquiry details for <strong className="text-purple-400">{submittedInquiry.projectType}</strong> have been securely recorded in Mitchell's queue.
              </p>

              <div className="w-full bg-[#130f2e] p-4 rounded-xl text-left border border-[#261d56] space-y-2 text-xs">
                <div>
                  <span className="text-slate-400">Service Requested:</span>{' '}
                  <span className="font-semibold text-white">{submittedInquiry.projectType}</span>
                </div>
                <div>
                  <span className="text-slate-400">Budget Tier:</span>{' '}
                  <span className="font-semibold text-white">{submittedInquiry.budgetRange}</span>
                </div>
                <div>
                  <span className="text-slate-400">Direct Email:</span>{' '}
                  <span className="font-semibold text-purple-400">{submittedInquiry.email}</span>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                Mitchell will personally review your brief and reply within 4 to 24 business hours.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 w-full">
                <a
                  href={`https://wa.me/2349024877275?text=Hi%20Mitchell,%20I%20just%20submitted%20project%20inquiry%20${submittedInquiry.id}%20on%20MikkyDigitalz.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={handleDone}
                  className="px-6 py-3 rounded-full bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors cursor-pointer shadow-lg shadow-purple-600/30"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Contact / Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="text-sm text-slate-300 leading-relaxed">
                Tell Mitchell Adetayo (Mikky Digitalz) about your project goals. I'll review your details and respond within 24 hours with custom scope options.
              </p>

              {/* Honeypot hidden input */}
              <div className="opacity-0 absolute -top-96 left-0 pointer-events-none h-0 w-0" aria-hidden="true">
                <label htmlFor="_hp_company_drawer">Company</label>
                <input
                  type="text"
                  id="_hp_company_drawer"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-700/50 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase text-purple-400 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Lin"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#130f2e] border border-[#261d56] text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase text-purple-400 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. sarah@example.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#130f2e] border border-[#261d56] text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Service Select */}
              <div>
                <label className="block text-xs font-semibold uppercase text-purple-400 mb-1.5">
                  Project Type / Service *
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#130f2e] border border-[#261d56] text-white text-sm focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
                >
                  <option value="WordPress & Elementor">WordPress & Elementor</option>
                  <option value="Squarespace Custom Build">Squarespace Custom Build</option>
                  <option value="Figma to WordPress">Figma to WordPress / Code</option>
                  <option value="Shopify Storefront">Shopify Storefront</option>
                  <option value="Rescue & Rebuild">Rescue & Rebuild Services</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-semibold uppercase text-purple-400 mb-1.5">
                  Estimated Budget Tier
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    '$1,000 - $3,000',
                    '$3,000 - $5,000',
                    '$5,000 - $10,000',
                    '$10,000+',
                  ].map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`p-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        formData.budget === b
                          ? 'bg-purple-600 text-white border-purple-500 font-bold shadow-md shadow-purple-600/30'
                          : 'bg-[#130f2e] text-slate-300 border-[#261d56] hover:bg-[#1a143b] hover:border-purple-500/50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase text-purple-400 mb-1.5">
                  Project Brief & Requirements *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share a short summary of your project goals, deadlines, or websites you like..."
                  className="w-full px-4 py-2.5 rounded-lg bg-[#130f2e] border border-[#261d56] text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder:text-slate-500"
                />
              </div>

              {/* Anti-spam Human Verification */}
              <div className="p-3.5 rounded-xl bg-[#130f2e] border border-[#261d56] flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-slate-300">
                    Human check: <strong className="text-purple-300 font-mono">{mathN1} + {mathN2} = ?</strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    required
                    placeholder="Ans"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="w-16 px-2 py-1 rounded bg-[#0a081a] border border-[#261d56] text-center text-xs text-white focus:outline-none focus:border-purple-500"
                  />
                  <button
                    type="button"
                    onClick={refreshChallenge}
                    className="p-1 rounded bg-[#0a081a] border border-[#261d56] text-slate-400 hover:text-white"
                    title="Refresh calculation"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Transmitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Discovery Inquiry</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1.5 pt-1">
                <Lock className="w-3 h-3 text-purple-400" />
                <span>256-bit encrypted transmission • Zero spam guarantee</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
