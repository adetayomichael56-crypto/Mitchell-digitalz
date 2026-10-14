import React from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2, 
  TrendingUp, 
  Quote, 
  Clock 
} from 'lucide-react';
import { ProjectItem } from '../data/siteData';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (serviceName?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-[#0a081a] border border-[#261d56] text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#120e2e] text-white flex items-center justify-between border-b border-[#261d56] shrink-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-purple-600/20 text-xs font-semibold text-purple-400 border border-purple-500/30">
              {project.categoryLabel}
            </span>
            {project.metricsHighlight && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <TrendingUp className="w-3 h-3" />
                <span>{project.metricsHighlight}</span>
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#0a081a] hover:bg-[#1a143b] text-slate-300 transition-colors cursor-pointer border border-[#261d56]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Title & Tagline */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              {project.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              {project.tagline}
            </p>
          </div>

          {/* Hero Screenshot */}
          <div className="relative rounded-2xl overflow-hidden bg-[#130f2e] border border-[#261d56] aspect-16/9">
            <img
              src={project.fullScreenshotUrl || project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between text-white text-xs font-medium bg-[#0a081a]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#261d56] gap-2">
              <span className="text-slate-300">
                Platform: <strong className="text-white">{project.platform}</strong>
              </span>
              <span className="font-semibold text-emerald-400">
                Result: {project.result}
              </span>
            </div>
          </div>

          {/* Client & Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#130f2e] border border-[#261d56] text-xs">
            <div>
              <span className="font-semibold uppercase tracking-wider text-purple-400 block mb-1">
                Client & Industry
              </span>
              <p className="text-sm font-semibold text-white">
                {project.clientName} — {project.clientRole}
              </p>
            </div>
            <div>
              <span className="font-semibold uppercase tracking-wider text-purple-400 block mb-1">
                Website Domain
              </span>
              <p className="text-sm font-mono text-purple-300">
                {project.websiteDomain}
              </p>
            </div>
          </div>

          {/* Before & After (if present) */}
          {project.beforeAfter && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-[#130f2e] border border-[#261d56]">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
                  Before Engagement:
                </span>
                <p className="text-xs text-slate-300">{project.beforeAfter.before}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  After Mikky Digitalz Build:
                </span>
                <p className="text-xs text-emerald-300 font-semibold">{project.beforeAfter.after}</p>
              </div>
            </div>
          )}

          {/* Testimonial Quote (if present) */}
          {project.testimonial && (
            <div className="p-6 rounded-2xl bg-[#130f2e] border border-purple-500/30 relative">
              <Quote className="w-8 h-8 text-purple-600/30 mb-2" />
              <p className="text-sm text-slate-200 italic mb-3 leading-relaxed">
                "{project.testimonial.quote}"
              </p>
              <div className="text-xs font-semibold text-white">
                {project.testimonial.author} — <span className="text-purple-400">{project.testimonial.title}</span>
              </div>
            </div>
          )}

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-[#130f2e] border border-[#261d56] space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">
                The Challenge
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#130f2e] border border-[#261d56] space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                The Engineering Solution
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Deliverables List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
              Key Deliverables
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((deliv, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>{deliv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-[#261d56] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400">
              Reference code: <strong className="text-purple-400 font-mono">#{project.id}</strong>
            </span>

            <button
              onClick={() => {
                onClose();
                onInquire(project.categoryLabel);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Inquire About A Similar Build</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
