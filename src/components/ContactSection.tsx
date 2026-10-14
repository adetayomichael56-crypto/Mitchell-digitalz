import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Send, 
  Lock, 
  CheckCircle2, 
  RefreshCw, 
  MessageSquare, 
  Mail, 
  Phone, 
  Sparkles, 
  AlertCircle,
  Copy,
  Check,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { ClientInquiry, InquirySubmissionPayload } from '../types/inquiry';

interface ContactSectionProps {
  initialProjectType?: string;
  onInquirySubmitted?: (inquiry: ClientInquiry) => void;
  onOpenInbox: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialProjectType = 'WordPress & Elementor',
  onInquirySubmitted,
  onOpenInbox,
}) => {
  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [projectType, setProjectType] = useState(initialProjectType);
  const [budgetRange, setBudgetRange] = useState('$1,000 - $2,500');
  const [timeline, setTimeline] = useState('Standard (2-4 weeks)');
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState<'email' | 'whatsapp' | 'call'>('email');
  const [referralSource, setReferralSource] = useState('Direct Website');

  // Anti-spam security state
  const [honeypot, setHoneypot] = useState('');
  const [formRenderTime, setFormRenderTime] = useState<number>(Date.now());
  const [mathNum1, setMathNum1] = useState(4);
  const [mathNum2, setMathNum2] = useState(5);
  const [securityAnswer, setSecurityAnswer] = useState('');

  // Status & Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedInquiry, setSubmittedInquiry] = useState<ClientInquiry | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Sync external project type changes (e.g. from service or portfolio click)
  useEffect(() => {
    if (initialProjectType) {
      setProjectType(initialProjectType);
    }
  }, [initialProjectType]);

  // Generate random human challenge on mount
  const generateNewChallenge = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setMathNum1(n1);
    setMathNum2(n2);
    setSecurityAnswer('');
  };

  useEffect(() => {
    setFormRenderTime(Date.now());
    generateNewChallenge();
  }, []);

  const projectTypeOptions = [
    'WordPress & Elementor',
    'Squarespace Custom Build',
    'Figma to Code',
    'Shopify Storefront',
    'Custom Web Engineering',
    'Site Redesign & Speed Optimization',
  ];

  const budgetOptions = [
    '<$1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000+',
  ];

  const timelineOptions = [
    'Urgent (< 2 weeks)',
    'Standard (2-4 weeks)',
    'Flexible (1-2 months)',
    'Just exploring / Consultation',
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('adetayomichael56@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic client checks
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (minimum 2 characters).');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address so I can send your proposal.');
      return;
    }

    if (!message.trim() || message.trim().length < 10) {
      setErrorMessage('Please provide a brief project summary (at least 10 characters).');
      return;
    }

    const expectedAnswer = mathNum1 + mathNum2;
    if (parseInt(securityAnswer.trim(), 10) !== expectedAnswer) {
      setErrorMessage(`Security challenge calculation is incorrect. Please verify: ${mathNum1} + ${mathNum2} = ?`);
      return;
    }

    setIsSubmitting(true);

    const payload: InquirySubmissionPayload = {
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      businessName: businessName.trim() || undefined,
      projectType,
      budgetRange,
      timeline,
      message: message.trim(),
      preferredContact,
      referralSource,
      _hp_company: honeypot,
      _formRenderTime: formRenderTime,
      securityAnswer: parseInt(securityAnswer.trim(), 10),
      securityExpected: expectedAnswer,
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry. Please try again.');
      }

      if (data.inquiry) {
        setSubmittedInquiry(data.inquiry);
        if (onInquirySubmitted) {
          onInquirySubmitted(data.inquiry);
        }
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setErrorMessage(err.message || 'Network error while transmitting inquiry. Please retry or message on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedInquiry(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setBusinessName('');
    setMessage('');
    setSecurityAnswer('');
    generateNewChallenge();
    setFormRenderTime(Date.now());
  };

  return (
    <section id="contact" className="py-24 relative bg-[#090d14] border-t border-slate-900">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Inquiry Transmission</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Start Your Project Inquiry
          </h2>
          <p className="text-base text-slate-300">
            Tell me about your business goals and vision. Your message is encrypted, protected by anti-spam verification, and answered personally within 4 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Security Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Contact Card */}
            <div className="p-7 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-heading font-black text-xl">
                  M
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    Mitchell Adetayo
                  </h3>
                  <p className="text-xs text-slate-400">Founder & Principal Web Architect</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Email with copy */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-center gap-2.5 text-slate-300">
                    <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-mono text-[11px] sm:text-xs">adetayomichael56@gmail.com</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/2349024877275?text=Hi%20Mitchell,%20I%20have%20a%20website%20inquiry%20via%20MikkyDigitalz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 hover:border-emerald-500/40 transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp: +234 9024877275</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </a>

                {/* Turnaround Guarantee */}
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Avg. Turnaround: 14 Days or Less</span>
                </div>
              </div>

              {/* View Inquiries Inbox button for admin/tester */}
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={onOpenInbox}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 border border-slate-700/80"
                >
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Open Client Inquiries Inbox (Admin Portal)</span>
                </button>
              </div>
            </div>

            {/* Security Architecture Guarantee */}
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/70 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Form Security & Privacy Standards</span>
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Zero-Spam Honeypot:</strong> Automated scrapers and bot submissions are filtered before touching storage.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Time-Delay Challenge:</strong> Protects against sub-second robotic injection scripts.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Strict Confidentiality:</strong> Your brief, project ideas, and business details are never shared.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Secure Form or Success Confirmation (7 Cols) */}
          <div className="lg:col-span-7">
            
            {submittedInquiry ? (
              /* Success Receipt View */
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="text-center space-y-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Inquiry Reference: {submittedInquiry.id}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                    Inquiry Securely Received!
                  </h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{submittedInquiry.fullName}</strong>. Your project brief has been logged into Mitchell's priority queue.
                  </p>
                </div>

                {/* Receipt Details Table */}
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs space-y-2.5 text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Email:</span>
                    <span className="font-medium text-white">{submittedInquiry.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Project Type:</span>
                    <span className="font-medium text-cyan-300">{submittedInquiry.projectType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Budget Range:</span>
                    <span className="font-medium text-white">{submittedInquiry.budgetRange}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-900">
                    <span className="text-slate-400">Target Timeline:</span>
                    <span className="font-medium text-white">{submittedInquiry.timeline}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Preferred Channel:</span>
                    <span className="font-medium uppercase text-emerald-400">{submittedInquiry.preferredContact}</span>
                  </div>
                </div>

                {/* Next Steps Guide */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs space-y-1.5 text-slate-300">
                  <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>What happens next?</span>
                  </div>
                  <p>1. Mitchell will review your brief within 4 hours.</p>
                  <p>2. You will receive an initial architecture breakdown and milestone pricing.</p>
                  <p>3. If urgent, tap the WhatsApp button below to chat right away with your inquiry ID.</p>
                </div>

                {/* WhatsApp Quick Chat Action */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://wa.me/2349024877275?text=Hi%20Mitchell,%20I%20just%20submitted%20project%20inquiry%20${submittedInquiry.id}%20for%20a%20${encodeURIComponent(submittedInquiry.projectType)}%20build.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare className="w-4 h-4 text-slate-950" />
                    <span>Chat with Mitchell on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="py-3 px-5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>

              </div>
            ) : (
              /* The Secure Form */
              <form
                onSubmit={handleSubmit}
                className="p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl space-y-6"
              >
                {/* Honeypot hidden input (Spam bot trap) */}
                <div className="opacity-0 absolute -top-96 left-0 pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="_hp_company">Do not fill this field</label>
                  <input
                    type="text"
                    id="_hp_company"
                    name="_hp_company"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-700/50 text-rose-300 text-xs flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Row 1: Full Name & Business Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Cole"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Business or Brand Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Studio Ltd"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 2: Email & Phone/WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Row 3: Project Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Project Type / Platform Needed <span className="text-cyan-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {projectTypeOptions.map((option) => (
                      <button
                        type="button"
                        key={option}
                        onClick={() => setProjectType(option)}
                        className={`p-2.5 rounded-xl text-xs font-medium text-left transition-all cursor-pointer border ${
                          projectType === option
                            ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 font-semibold shadow-sm'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Row 4: Budget & Timeline Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Estimated Budget Range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setBudgetRange(b)}
                          className={`p-2 rounded-xl text-xs text-center transition-all cursor-pointer border ${
                            budgetRange === b
                              ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 font-semibold'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">
                      Target Launch Timeline
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {timelineOptions.map((t) => (
                        <button
                          type="button"
                          key={t}
                          onClick={() => setTimeline(t)}
                          className={`p-2 rounded-xl text-[11px] text-center transition-all cursor-pointer border leading-tight ${
                            timeline === t
                              ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 font-semibold'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-white'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Row 5: Project Brief / Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Project Goals & Requirements <span className="text-cyan-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-500">
                      {message.length} chars (min 10)
                    </span>
                  </div>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe what you want to build or improve. Feel free to mention reference websites you admire, key pages required, or conversion goals..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>

                {/* Row 6: Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    How do you prefer to receive the proposal response?
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'email', label: 'Email', icon: Mail },
                      { key: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                      { key: 'call', label: 'Strategy Call', icon: Phone },
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setPreferredContact(key as any)}
                        className={`p-2.5 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                          preferredContact === key
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold'
                            : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Anti-Spam Human Verification Challenge */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <span>Human Verification:</span>
                        <span className="font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/50">
                          {mathNum1} + {mathNum2} = ?
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">Anti-bot security calculation</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="number"
                      required
                      placeholder="Answer"
                      value={securityAnswer}
                      onChange={(e) => setSecurityAnswer(e.target.value)}
                      className="w-24 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white text-center focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={generateNewChallenge}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Refresh calculation"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl font-heading font-bold text-sm tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:shadow-xl hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Encrypting & Transmitting Brief...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Send Project Inquiry to Mitchell</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  🔒 Strictly confidential. 100% spam-free guarantee. Mitchell responds directly.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
