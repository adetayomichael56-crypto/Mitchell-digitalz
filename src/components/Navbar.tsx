import React, { useState } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  Inbox, 
  MessageSquare, 
  ShieldCheck, 
  ExternalLink,
  PhoneCall
} from 'lucide-react';

interface NavbarProps {
  onOpenInbox: () => void;
  inquiryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInbox, inquiryCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0b0f17]/85 border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-cyan-500 to-emerald-400 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#0b0f17] rounded-[10px] flex items-center justify-center">
                <span className="font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-300 text-lg">
                  M
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  Mikky Digitalz
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  5.0 ★
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Mitchell Adetayo • Web Architect
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <button 
              onClick={() => scrollTo('services')} 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => scrollTo('work')} 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Selected Work
            </button>
            <button 
              onClick={() => scrollTo('process')} 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              4-Step Process
            </button>
            <button 
              onClick={() => scrollTo('testimonials')} 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button 
              onClick={() => scrollTo('contact')} 
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Secure Contact
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Inquiries Portal Toggle */}
            <button
              onClick={onOpenInbox}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/40 transition-all cursor-pointer shadow-sm"
              title="View and manage received client inquiries"
            >
              <Inbox className="w-4 h-4 text-cyan-400" />
              <span>Inquiry Inbox</span>
              {inquiryCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-cyan-500 text-slate-950 font-bold leading-none">
                  {inquiryCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp link */}
            <a
              href="https://wa.me/2349024877275?text=Hi%20Mitchell,%20I'd%20like%20to%20discuss%20a%20website%20project%20with%20Mikky%20Digitalz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900/90 text-emerald-400 hover:text-emerald-300 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 transition-all"
              title="Chat directly on WhatsApp (+234 9024877275)"
            >
              <MessageSquare className="w-4 h-4" />
            </a>

            {/* Primary CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className="relative group px-4 py-2.5 rounded-xl font-heading font-semibold text-xs tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:shadow-lg hover:shadow-cyan-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                Start Project Inquiry
              </span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenInbox}
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400"
              title="Inquiry Inbox"
            >
              <Inbox className="w-4 h-4" />
              {inquiryCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0b0f17] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollTo('services')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-300"
          >
            Services
          </button>
          <button
            onClick={() => scrollTo('work')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-300"
          >
            Selected Work
          </button>
          <button
            onClick={() => scrollTo('process')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-300"
          >
            4-Step Process
          </button>
          <button
            onClick={() => scrollTo('testimonials')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm text-slate-300 hover:bg-slate-900 hover:text-cyan-300"
          >
            Client Reviews
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-cyan-300 hover:bg-cyan-950/30 flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Submit Client Inquiry
          </button>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInbox();
              }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 border border-slate-700 flex items-center justify-center gap-2"
            >
              <Inbox className="w-4 h-4 text-cyan-400" />
              Manage Client Inquiries ({inquiryCount})
            </button>
            <a
              href="https://wa.me/2349024877275"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-950/50 text-emerald-300 border border-emerald-600/30 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Chat on WhatsApp (+234 9024877275)
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
