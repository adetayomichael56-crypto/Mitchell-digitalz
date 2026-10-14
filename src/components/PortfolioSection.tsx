import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS, ProjectItem } from '../data/portfolioData';
import { ExternalLink, ArrowRight, Zap, CheckCircle2, X } from 'lucide-react';

interface PortfolioSectionProps {
  onRequestSimilar: (projectTitle: string, category: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onRequestSimilar }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'WordPress', 'Squarespace', 'Shopify', 'Figma to Code'];

  const filteredProjects = selectedCategory === 'All'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="work" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-xs font-semibold mb-3">
              <span>Verified Results</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Selected Work & Conversion Mockups
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
              High-converting platforms built for modern businesses, tech startups, and boutique creative brands.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl bg-slate-900/60 border border-slate-800/90 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              {/* Image banner with overlay */}
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                {/* Metric pill */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-950/90 border border-cyan-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="text-cyan-400 font-bold text-xs font-heading">{project.metrics}</span>
                  <span className="text-[10px] text-slate-300 font-medium">{project.metricsLabel}</span>
                </div>

                {/* Category tag */}
                <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/90 text-cyan-300 border border-slate-700">
                  {project.category}
                </div>
              </div>

              {/* Content info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cyan-400/90 font-medium mb-2.5">
                    {project.subtitle}
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-slate-800/80 text-slate-400 border border-slate-700/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onRequestSimilar(project.title, project.category)}
                    className="px-3 py-1 rounded-lg text-[11px] font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
                  >
                    Inquire Similar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {activeModalProject.category}
              </span>
              <span className="text-xs text-slate-400">Turnaround: {activeModalProject.turnaround}</span>
            </div>

            <h3 className="font-heading text-2xl font-bold text-white mb-2">
              {activeModalProject.title}
            </h3>
            <p className="text-sm text-cyan-300 mb-4">{activeModalProject.subtitle}</p>

            {/* Impact Metric Banner */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 mb-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <div className="font-heading text-2xl font-black text-cyan-300">
                  {activeModalProject.metrics}
                </div>
                <div className="text-xs text-slate-300">
                  {activeModalProject.metricsLabel}
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeModalProject.description}
            </p>

            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Key Deliverables & Architecture
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModalProject.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA in modal */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={activeModalProject.livePreviewUrl || 'https://mikky-digitalz.netlify.app/#/home'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <span>Live showcase portfolio reference</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  const proj = activeModalProject;
                  setActiveModalProject(null);
                  onRequestSimilar(proj.title, proj.category);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-heading font-semibold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-emerald-400 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer"
              >
                Request Similar Website Build
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
