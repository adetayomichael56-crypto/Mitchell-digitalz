import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Clock, 
  ArrowRight, 
  Inbox, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { SocialLinks } from './SocialLinks';

interface HeaderProps {
  currentPage: string;
  onNavigate: (route: string) => void;
  onOpenContact: () => void;
  onOpenCalendly: () => void;
  onOpenInbox: () => void;
  inquiryCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenContact,
  onOpenCalendly,
  onOpenInbox,
  inquiryCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setLocalTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { route: 'home', label: 'Home' },
    { route: 'services', label: 'Services' },
    { route: 'work', label: 'Work' },
    { route: 'pricing', label: 'Pricing' },
    { route: 'blog', label: 'Blog & GEO' },
  ];

  const handleNavClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a081a]/95 backdrop-blur-md border-b border-[#261d56] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
              e.preventDefault();
              handleNavClick('home');
            }
          }}
          className="flex items-center text-left group cursor-pointer focus:outline-none py-1"
          aria-label="Mikky Digitalz Home"
        >
          <img
            src="https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png"
            alt="Mikky Digitalz Logo"
            className="h-16 sm:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_20px_rgba(147,51,234,0.4)]"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = currentPage === link.route;
            const targetHref = link.route === 'home' ? '/' : `/${link.route}`;
            return (
              <a
                key={link.route}
                href={targetHref}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    handleNavClick(link.route);
                  }
                }}
                className={`relative py-1 text-sm font-medium transition-colors cursor-pointer ${
                  isActive ? 'text-purple-300 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500 rounded-full shadow-[0_0_10px_#9333ea]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Live Clock Ticker */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#130f2e] border border-[#261d56] text-xs font-mono text-slate-300 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-bold text-white">{localTime || 'LIVE'}</span>
          </div>

          {/* WhatsApp quick contact */}
          <a
            href="https://wa.me/2349024877275?text=Hi%20Michael,%20I'd%20like%20to%20discuss%20a%20website%20project%20with%20Mikky%20Digitalz"
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#130f2e] hover:bg-[#1d1645] text-slate-200 border border-[#261d56] hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm"
            title="Chat with Michael on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>

          {/* Book a Call CTA */}
          <button
            onClick={onOpenContact}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-all duration-150 cursor-pointer shadow-lg shadow-purple-600/35 hover:shadow-purple-500/50"
          >
            <span>Book a Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Header Right */}
        <div className="flex lg:hidden items-center gap-2.5">
          <a
            href="https://wa.me/2349024877275?text=Hi%20Michael,%20I'd%20like%20to%20discuss%20a%20website%20project%20with%20Mikky%20Digitalz"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#130f2e] border border-[#261d56] text-emerald-400"
            title="Chat on WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-white hover:bg-[#130f2e] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-xs sm:max-w-sm bg-[#0a081a] text-white border-l border-[#261d56] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Drawer Top */}
              <div className="flex items-center justify-between pb-6 border-b border-[#261d56]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png"
                    alt="Mikky Digitalz Logo"
                    className="h-9 w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-extrabold text-white tracking-tight">Mikky Digitalz</span>
                    <span className="text-[10px] uppercase tracking-widest text-purple-400 font-bold">Web Engineering</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-full bg-[#130f2e] border border-[#261d56] text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Local Time Banner */}
              <div className="mt-5 flex items-center justify-between px-4 py-3 rounded-2xl bg-[#130f2e] border border-[#261d56] text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-400 font-sans font-medium">Your Local Time:</span>
                </div>
                <span className="text-purple-400 font-bold">{localTime || 'LIVE'}</span>
              </div>

              {/* Navigation list */}
              <nav className="mt-6 flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400/80 px-2 mb-1">
                  Navigation Menu
                </span>
                {navLinks.map((link) => {
                  const isActive = currentPage === link.route;
                  const targetHref = link.route === 'home' ? '/' : `/${link.route}`;
                  return (
                    <a
                      key={link.route}
                      href={targetHref}
                      onClick={(e) => {
                        if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                          e.preventDefault();
                          handleNavClick(link.route);
                        }
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center justify-between text-inherit no-underline ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-md'
                          : 'text-slate-300 hover:bg-[#181533] hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-4 h-4 opacity-70" />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-[#241d4a] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3.5 px-6 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <span>Book a Discovery Call</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/2349024877275?text=Hi%20Michael,%20I'd%20like%20to%20discuss%20a%20website%20project%20with%20Mikky%20Digitalz"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-full bg-[#181533] border border-[#241d4a] text-slate-300 text-xs font-medium flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>

              <div className="pt-2">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-purple-400 mb-2">
                  Connect Across Platforms:
                </span>
                <SocialLinks variant="pills" />
              </div>

              <p className="text-[10px] text-slate-500 text-center mt-1">
                © {new Date().getFullYear()} Mikky Digitalz. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
