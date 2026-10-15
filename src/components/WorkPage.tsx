import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Filter, 
  Sparkles, 
  Eye, 
  Layers, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS, ProjectItem } from '../data/siteData';

interface WorkPageProps {
  onNavigate?: (route: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenContact: (preselectedService?: string) => void;
  onOpenCalendly: () => void;
}

export const WorkPage: React.FC<WorkPageProps> = ({
  onSelectProject,
  onOpenContact,
  onOpenCalendly,
}) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'scroll' | 'mockup'>('scroll');

  const categories = [
    { id: 'all', label: 'All Projects (10)' },
    { id: 'wordpress', label: 'WordPress & Elementor' },
    { id: 'squarespace', label: 'Squarespace' },
    { id: 'shopify', label: 'Shopify' },
    { id: 'figma-conversion', label: 'Figma / AI to Code' },
    { id: 'rescue', label: 'Rescue & Rebuild' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeCategory);

  const featuredProject = PROJECTS[0]; // Cyrion / Marcus Vance

  return (
    <div className="w-full py-12 md:py-16 bg-[#070612] text-[#f1f5f9] relative overflow-hidden">
      {/* Background ambient purple glow */}
      <div className="absolute top-20 right-1/4 w-[600px] h-[350px] bg-purple-600/10 blur-[130px] pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
            Mikky Digitalz Portfolio Showcase
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mt-2 mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-purple-200">Projects & Mockups</span>.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Real websites designed and engineered by Michael Adetayo (Mikky Digitalz). Hover over any website screenshot below to see the interactive full page scroll effect, or switch to mockup view!
          </p>
        </div>

        {/* Featured Case Study Hero Banner */}
        <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-[#0e0b24] border border-[#2c2263] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Featured Performance Case Study</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {featuredProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Custom video-optimized WordPress & Elementor Pro build generated <strong className="text-white">{featuredProject.result}</strong> in the first 30 days after launch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectProject(featuredProject)}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50"
            >
              <span>Read Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCalendly}
              className="px-6 py-3 rounded-full bg-[#130f2e] hover:bg-[#1a143b] border border-[#261d56] text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-purple-400" />
              <span>Book Call</span>
            </button>
          </div>
        </div>

        {/* Toolbar: Category Filter & View Mode Switcher */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
          
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full lg:w-auto no-scrollbar">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mr-2 shrink-0">
              <Filter className="w-4 h-4 text-purple-400" />
              <span>Filter:</span>
            </div>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-xl shadow-purple-600/35 font-bold'
                      : 'bg-[#0e0b24] text-slate-300 border border-[#261d56] hover:bg-[#130f2e] hover:border-purple-500/40 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-[#0e0b24] border border-[#261d56] rounded-full shrink-0">
            <button
              onClick={() => setViewMode('scroll')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'scroll'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Hover Scroll View</span>
            </button>
            <button
              onClick={() => setViewMode('mockup')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'mockup'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Mockup View</span>
            </button>
          </div>

        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group bg-[#0e0b24] rounded-2xl border border-[#261d56] hover:border-purple-500/50 overflow-hidden navy-card-hover cursor-pointer flex flex-col justify-between shadow-xl"
            >
              {/* Media Container */}
              <div className="relative overflow-hidden bg-[#130f2e] border-b border-[#261d56]">
                {viewMode === 'scroll' ? (
                  <div className="website-scroll-container">
                    <img
                      src={project.fullScreenshotUrl || project.thumbnail}
                      alt={project.title}
                      className="website-scroll-img"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>
                ) : (
                  <div className="aspect-16/10 overflow-hidden">
                    <img
                      src={project.mockupUrl || project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Overlaid badges */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0a081a]/90 border border-purple-500/30 text-purple-300 text-[11px] font-semibold backdrop-blur-md">
                  {project.categoryLabel}
                </div>

                {project.metricsHighlight && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-purple-950/90 border border-purple-500/40 text-purple-200 text-[11px] font-bold backdrop-blur-md">
                    {project.metricsHighlight}
                  </div>
                )}
              </div>

              {/* Information */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-4">
                    {project.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#261d56] flex items-center justify-between text-xs font-semibold text-purple-400">
                  <span className="truncate max-w-[160px]">Metric: {project.result}</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Case Study <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Contact Callout */}
        <div className="mt-20 p-8 sm:p-10 rounded-3xl bg-[#0e0b24] border border-[#2c2263] text-center space-y-4 shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Want a website engineered like these?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Book a 20-minute strategy consultation or submit a direct inquiry with your project requirements.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => onOpenContact()}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold transition-all shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50 cursor-pointer"
            >
              Start Project Inquiry
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
