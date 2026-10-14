import React, { useState } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  ArrowRight, 
  ExternalLink, 
  Lock,
  Inbox
} from 'lucide-react';
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  onNavigate: (route: string) => void;
  onOpenContact: () => void;
  onOpenCalendly: () => void;
  onOpenInbox?: () => void;
  onOpenSeoAudit?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenContact,
  onOpenCalendly,
  onOpenInbox,
  onOpenSeoAudit,
}) => {
  const [copied, setCopied] = useState(false);
  const email = 'mitchelladetayo@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#090a15] text-white pt-16 pb-12 border-t border-[#1e2442]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1e2442]">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start pr-0 md:pr-6">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center text-left mb-6 group cursor-pointer focus:outline-none"
            >
              <img
                src="https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png"
                alt="Mikky Digitalz Logo"
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                referrerPolicy="no-referrer"
              />
            </button>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-sm">
              Designing and building fast, high-converting websites on WordPress, Elementor, Squarespace, and Shopify for growing businesses, coaches, and brands worldwide.
            </p>

            <div className="flex flex-col gap-3 mb-4 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181533] text-slate-300 text-xs font-medium border border-[#241d4a] w-fit">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for new website projects</span>
              </div>
              <SocialLinks variant="icons" className="mt-1" />
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Navigation
            </h3>
            <a
              href="/"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('home');
                }
              }}
              className="text-left text-sm text-slate-300 hover:text-purple-400 transition-colors py-1 cursor-pointer text-inherit no-underline"
            >
              Home
            </a>
            <a
              href="/services"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('services');
                }
              }}
              className="text-left text-sm text-slate-300 hover:text-purple-400 transition-colors py-1 cursor-pointer text-inherit no-underline"
            >
              Services Breakdown
            </a>
            <a
              href="/work"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('work');
                }
              }}
              className="text-left text-sm text-slate-300 hover:text-purple-400 transition-colors py-1 cursor-pointer text-inherit no-underline"
            >
              Portfolio & Mockups
            </a>
            <a
              href="/pricing"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('pricing');
                }
              }}
              className="text-left text-sm text-slate-300 hover:text-purple-400 transition-colors py-1 cursor-pointer text-inherit no-underline"
            >
              Pricing & Packages
            </a>
            <a
              href="/blog"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('blog');
                }
              }}
              className="text-left text-sm text-slate-300 hover:text-purple-400 transition-colors py-1 cursor-pointer flex items-center gap-1.5 text-inherit no-underline"
            >
              <span>Blog & AEO Playbooks</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full font-bold">New</span>
            </a>
            {onOpenSeoAudit && (
              <button
                onClick={onOpenSeoAudit}
                className="text-left text-sm text-emerald-400 hover:text-emerald-300 transition-colors py-1 cursor-pointer flex items-center gap-1.5 font-medium"
              >
                <span>Google Indexing & SEO Audit</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full font-bold">Checklist</span>
              </button>
            )}
            <a
              href="https://www.upwork.com/freelancers/~016fe1e73c258824d4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left text-sm text-slate-400 hover:text-slate-200 hover:underline transition-colors py-1 cursor-pointer flex items-center gap-1"
            >
              <span>Upwork Reviews (5.0★)</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Col 3: Direct Contact (4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
              Direct Contact
            </h3>
            <p className="text-sm text-slate-300">
              Ready to turn visitors into leads? Reach out directly or book a free discovery meeting on Calendly.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mt-1">
              <a
                href={`mailto:${email}?subject=Website%20Project%20Inquiry%20-%20Mikky%20Digitalz`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#181533] hover:bg-[#241d4a] text-white text-sm font-medium transition-colors border border-[#241d4a]"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span className="truncate">{email}</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center justify-center p-2.5 rounded-lg bg-[#181533] hover:bg-[#241d4a] text-white text-sm transition-colors border border-[#241d4a] cursor-pointer"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              </button>
            </div>

            <button
              onClick={onOpenCalendly}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-purple-600/30 mt-2 cursor-pointer"
            >
              <span>Schedule Call on Calendly</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onOpenInbox && (
              <button
                onClick={onOpenInbox}
                className="inline-flex items-center gap-2 text-xs text-purple-400 hover:text-purple-300 transition-colors pt-1 cursor-pointer"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Inquiries Management</span>
              </button>
            )}
          </div>

        </div>

        {/* Profiles bar */}
        <div className="py-8 border-b border-[#1e2442]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-purple-400">
                Official Profiles & Social Channels
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Connect with Mitchell Adetayo (Mikky Digitalz) across platforms:
              </p>
            </div>
          </div>
          <SocialLinks variant="pills" />
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Mikky Digitalz (Mitchell Adetayo). All rights reserved.</p>
          <div className="flex gap-6 text-slate-400">
            <span className="hover:text-white transition-colors">WordPress & Elementor</span>
            <span className="hover:text-white transition-colors">Squarespace</span>
            <span className="hover:text-white transition-colors">Shopify</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
