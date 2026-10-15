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
import { ClientInquiry } from '../types/inquiry';

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

    // Reference number shown to the visitor and included in the email you receive.
    const reference = `MK-${Math.floor(1000 + Math.random() * 9000)}`;

    // Sent to Netlify Forms (form "inquiry", defined as a hidden form in index.html).
    const body = new URLSearchParams({
      'form-name': 'inquiry',
      'bot-field': honeypot,
      name: formData.name.trim(),
      email: formData.email.trim(),
      service: formData.service,
      budget: formData.budget,
      message: formData.message.trim(),
      reference,
    });

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) {
        throw new Error(`Submission failed (${res.status})`);
      }

      const inquiry: ClientInquiry = {
        id: reference,
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        projectType: formData.service,
        budgetRange: formData.budget,
        timeline: 'Standard (2-4 weeks)',
        message: formData.message.trim(),
        preferredContact: 'email',
        timestamp: new Date().toISOString(),
        status: 'new',
      };
      setSubmittedInquiry(inquiry);
      onInquirySubmitted?.(inquiry);
    } catch (err) {
      console.error('Inquiry submission error:', err);
      setErrorMessage(
        "Sorry, your message couldn't be sent. Please try again, or reach me directly on WhatsApp or email.",
      );
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
            className="p-2 rounded-full bg-[#0a081a] hover:bg-[#1a143b] text-slate-300
