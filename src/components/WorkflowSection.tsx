import React from 'react';
import { Compass, Palette, Code2, Rocket, ArrowRight } from 'lucide-react';

interface WorkflowSectionProps {
  onStartInquiry: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onStartInquiry }) => {
  const steps = [
    {
      number: '01',
      icon: Compass,
      title: 'Discover & Strategy',
      tagline: 'Day 1 – 3',
      description:
        'Clarifying your core value proposition, target customer profile, conversion goals, and strategic content hierarchy before writing any code.',
      highlights: ['Conversion Architecture', 'Competitor Analysis', 'Content Structure & Wireframes'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      number: '02',
      icon: Palette,
      title: 'High-Impact Design',
      tagline: 'Day 4 – 7',
      description:
        'Crafting modern visual layouts focused on building trust, establishing authority, and effortlessly guiding visitors toward taking action.',
      highlights: ['Custom Aesthetic Systems', 'Micro-Interactions & Trust Badges', 'Mobile Ergonomics First'],
      color: 'from-teal-400 to-cyan-500',
    },
    {
      number: '03',
      icon: Code2,
      title: 'Clean Engineering',
      tagline: 'Day 8 – 11',
      description:
        'Fast, responsive development using bloat-free architecture optimized for sub-second load times across WordPress, Squarespace, or Shopify.',
      highlights: ['95+ Google PageSpeed Guarantee', 'Zero Plugin Bloat / Clean Code', 'Cross-Device Responsiveness'],
      color: 'from-emerald-400 to-teal-500',
    },
    {
      number: '04',
      icon: Rocket,
      title: 'Launch & Optimize',
      tagline: 'Day 12 – 14',
      description:
        'Full QA stress testing, domain configuration, automated backup setup, video handover tutorials, plus 30 days of post-launch optimization.',
      highlights: ['Technical SEO & Schema Setup', 'Loom Video Client Training', '30-Day Post-Launch Support'],
      color: 'from-amber-400 to-emerald-400',
    },
  ];

  return (
    <section id="process" className="py-24 bg-slate-950/70 border-t border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
            <span>The Mikky Digitalz Guarantee</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            The Battle-Tested 4-Step Workflow
          </h2>
          <p className="text-base text-slate-300">
            How we take your website from initial concept to launch-ready in 14 days or less, with zero delays or technical headaches.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading text-3xl font-black text-slate-700 group-hover:text-cyan-400 transition-colors">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {step.tagline}
                    </span>
                  </div>

                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.color} p-0.5 mb-5 shadow-lg shadow-cyan-500/10`}>
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 space-y-1.5">
                  {step.highlights.map((h, i) => (
                    <div key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-heading text-lg sm:text-xl font-bold text-white">
              Have an urgent timeline or specific launch deadline?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Share your project requirements today and receive a scoped proposal within 4 hours.
            </p>
          </div>
          <button
            onClick={onStartInquiry}
            className="shrink-0 px-6 py-3 rounded-xl font-heading font-semibold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:shadow-lg hover:shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Lock In Your Project Slot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
