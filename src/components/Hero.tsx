import React from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Clock, 
  Star, 
  CheckCircle2, 
  MessageSquare,
  Lock,
  Sparkles
} from 'lucide-react';

interface HeroProps {
  onStartInquiry: (defaultProjectType?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartInquiry }) => {
  return (
    <section id="home" className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-500/10 via-teal-500/15 to-emerald-500/5 blur-[120px] pointer-events-none rounded-full -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-600/5 blur-[90px] pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Trust Badges Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2.5 p-1 px-3.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>5.0 Rating</span>
            </div>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-300 font-medium">
              Upwork Top Rated (30+ Verified Projects)
            </span>
            <span className="text-slate-600">•</span>
            <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for New Projects</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">High-Converting</span> Websites That Turn Clicks Into Clients.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            I am <strong className="text-white font-semibold">Michael Adetayo</strong> (Mikky Digitalz). I build lightning-fast, conversion-engineered websites on <span className="text-cyan-300 font-medium">WordPress & Elementor</span>, <span className="text-cyan-300 font-medium">Squarespace</span>, and <span className="text-cyan-300 font-medium">Shopify</span>—delivered in 14 days or less.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              onClick={() => onStartInquiry()}
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-heading font-bold text-sm tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 hover:shadow-xl hover:shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>Submit Project Inquiry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/2349024877275?text=Hi%20Michael,%20I%20saw%20your%20portfolio%20on%20MikkyDigitalz%20and%20want%20to%20inquire%20about%20a%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-4 rounded-xl font-heading font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>

          {/* Security reassurance banner */}
          <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              256-Bit Secure Form Submission
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Average Response &lt; 4 Hours
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              Spam-Protected & Encrypted
            </span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-10 max-w-4xl mx-auto">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-1">
                <Zap className="w-4 h-4" />
                <span className="font-heading text-2xl sm:text-3xl font-black text-white">99.8%</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Average PageSpeed</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="font-heading text-2xl sm:text-3xl font-black text-white">14 Days</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Average Turnaround</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-heading text-2xl sm:text-3xl font-black text-white">5.0 ★</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">30+ Verified Reviews</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-center gap-1.5 text-teal-400 mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-heading text-2xl sm:text-3xl font-black text-white">100%</span>
              </div>
              <p className="text-xs text-slate-400 font-medium">Job Success Score</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
