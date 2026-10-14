import React from 'react';
import { SERVICES_LIST } from '../data/servicesData';
import { Check, ArrowRight, Sparkles, Clock } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceKey: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 bg-slate-950/70 border-t border-b border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Specialized Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Tailored Engineering For High-Converting Websites
          </h2>
          <p className="text-base text-slate-300">
            Every build is engineered from scratch for optimal performance, frictionless user journeys, and maximum lead generation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_LIST.map((service) => (
            <div
              key={service.id}
              className="group relative p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {service.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                <h3 className="font-heading text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                  {service.title}
                </h3>
                
                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  {service.shortDesc}
                </p>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-xs text-slate-300 mb-6">
                  <span className="text-slate-400 font-medium">Best for: </span>
                  <span className="text-cyan-300 font-medium">{service.idealFor}</span>
                </div>

                {/* Features checklist */}
                <div className="space-y-2.5 mb-8">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA & Price */}
              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Est. Investment</span>
                  <span className="font-heading text-lg font-bold text-white">from {service.startingPrice}</span>
                </div>

                <button
                  onClick={() => onSelectService(service.formTypeKey)}
                  className="px-4 py-2.5 rounded-xl font-heading text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm group-hover:bg-slate-800/90"
                >
                  <span>Select & Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
