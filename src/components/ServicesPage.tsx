import React, { useState } from 'react';
import { 
  ArrowRight, 
  Clock, 
  Check, 
  Globe, 
  Layout, 
  Code2, 
  ShoppingBag, 
  Wrench, 
  Sparkles,
  Calendar,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';
import { SERVICES_DATA } from '../data/siteData';

interface ServicesPageProps {
  onNavigate: (route: string) => void;
  onOpenContact: (preselectedService?: string) => void;
  onOpenCalendly: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenContact,
  onOpenCalendly,
}) => {
  const [activeTab, setActiveTab] = useState(SERVICES_DATA[0].id);

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-6 h-6" />,
    Layout: <Layout className="w-6 h-6" />,
    Code2: <Code2 className="w-6 h-6" />,
    ShoppingBag: <ShoppingBag className="w-6 h-6" />,
    Wrench: <Wrench className="w-6 h-6" />,
  };

  const deliverySteps = [
    {
      num: '01',
      title: 'Discovery & Wireframing',
      desc: 'We map out your business goals, target audience journey, site architecture, and conversion funnels.',
    },
    {
      num: '02',
      title: 'High-Fidelity Visual Design',
      desc: 'Crafting responsive layout prototypes with dark/light themes, crisp typography, and real brand assets.',
    },
    {
      num: '03',
      title: 'Development & Speed Optimization',
      desc: 'Building on WordPress, Elementor, Squarespace, or Shopify with sub-second page loads and mobile-first CSS.',
    },
    {
      num: '04',
      title: 'Testing & Launch Handover',
      desc: 'On-page SEO setup, form routing tests, security lockdown, and personalized video walkthroughs for your team.',
    },
  ];

  return (
    <div className="w-full py-12 md:py-16 bg-[#090a15] text-[#f1f5f9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>EXPERT WEB DESIGN & DEVELOPMENT SERVICES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mt-2 mb-4">
            High-Converting Web Engineering.
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Tailored digital platforms across WordPress, Elementor, Squarespace, and Shopify. Whether you need a brand-new custom build, Figma-to-code conversion, or an urgent rescue for an unfinished site, every project is engineered for sub-second speed, mobile responsiveness, and maximum lead generation.
          </p>
        </div>

        {/* Category Tab Bar */}
        <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {SERVICES_DATA.map((srv) => {
            const isActive = activeTab === srv.id;
            return (
              <button
                key={srv.id}
                onClick={() => {
                  setActiveTab(srv.id);
                  const el = document.getElementById(srv.anchor);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-[#0f0d22] text-slate-300 border border-[#241d4a] hover:bg-[#181533] hover:text-white'
                }`}
              >
                <span>{srv.title}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Service Cards */}
        <div className="space-y-12 mb-20">
          {SERVICES_DATA.map((srv, idx) => (
            <div
              key={srv.id}
              id={srv.anchor}
              className="p-8 sm:p-10 rounded-3xl bg-[#0f0d22] border border-[#241d4a] shadow-2xl relative overflow-hidden navy-card-hover group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-violet-600 group-hover:w-3 transition-all duration-300" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left info (5 cols) */}
                <div className="lg:col-span-5 space-y-5 pr-0 lg:pr-6">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                      {iconMap[srv.iconName] || <Globe className="w-6 h-6" />}
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider bg-[#181533] px-3.5 py-1.5 rounded-full border border-[#241d4a]">
                      0{idx + 1} // Core Service
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {srv.title}
                  </h2>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-purple-300 bg-[#181533] p-2.5 rounded-xl border border-[#241d4a] w-fit">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span>Estimated Turnaround: <strong className="text-white">{srv.turnaroundTime}</strong></span>
                    </div>

                    <div className="flex items-start gap-2 text-xs text-slate-400">
                      <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong className="text-slate-200">Ideal For:</strong> {srv.idealFor}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => onOpenContact(srv.title)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white text-xs sm:text-sm font-semibold hover:bg-purple-500 transition-colors cursor-pointer shadow-lg shadow-purple-600/30"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={onOpenCalendly}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#181533] text-slate-300 border border-[#241d4a] text-xs sm:text-sm font-medium hover:bg-[#241d4a] hover:text-white transition-colors cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <span>Book Call</span>
                    </button>
                  </div>
                </div>

                {/* Right Deliverables Checklist (7 cols) */}
                <div className="lg:col-span-7 bg-[#181533] p-6 sm:p-8 rounded-2xl border border-[#241d4a] shadow-inner space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                    What's Included in This Build
                  </h3>
                  <div className="space-y-3">
                    {srv.bulletPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <div className="w-5 h-5 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/30">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Delivery Process */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-[#0f0d22] border border-[#241d4a] shadow-xl">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Standard Workflow</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Our 4-Step Delivery Process</h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Every build follows a structured, milestone-driven process to ensure zero scope creep and on-time launches.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverySteps.map((step) => (
              <div key={step.num} className="p-6 rounded-2xl bg-[#181533] border border-[#241d4a] space-y-2">
                <span className="font-mono text-xl font-bold text-purple-400">{step.num}</span>
                <h3 className="font-bold text-sm text-white">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Rescue Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#181533] to-[#251540] border border-purple-600/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>EMERGENCY WEBSITE RESCUE</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">Stuck with a broken or slow website?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              I diagnose and fix broken Elementor, Squarespace, and Shopify layouts, remove plugin conflicts, and bring load times under 1 second within 3 to 7 business days.
            </p>
          </div>

          <button
            onClick={() => onOpenContact('Rescue & Rebuild Services')}
            className="shrink-0 px-6 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/30 cursor-pointer flex items-center gap-2"
          >
            <span>Request Emergency Audit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
