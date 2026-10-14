import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Star, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Globe, 
  Layout, 
  Code2, 
  Wrench,
  Sparkles,
  Check,
  TrendingUp,
  Award
} from 'lucide-react';
import { PROJECTS, SERVICES_DATA, ProjectItem } from '../data/siteData';
import { BLOG_POSTS } from '../data/blogData';
import { SocialLinks } from './SocialLinks';

interface HomePageProps {
  onNavigate: (route: string, subParam?: string) => void;
  onOpenContact: (preselectedService?: string) => void;
  onSelectProject: (project: ProjectItem) => void;
  onOpenCalendly: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenContact,
  onSelectProject,
  onOpenCalendly,
}) => {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    {
      number: '01',
      title: 'Discover',
      short: 'Strategy & Brand Positioning',
      description:
        'We clarify your core offer, target audience, conversion goals, and content hierarchy before touching a single line of code.',
    },
    {
      number: '02',
      title: 'Design',
      short: 'High-Impact Visual Architecture',
      description:
        'Clean, modern layouts crafted around messaging that builds trust, communicates value, and guides visitors straight to booking.',
    },
    {
      number: '03',
      title: 'Build',
      short: 'Fast, Responsive Engineering',
      description:
        'Clean, bloat-free WordPress, Elementor, Squarespace, or Shopify code optimized for sub-second load times and flawless mobile display.',
    },
    {
      number: '04',
      title: 'Launch & Optimize',
      short: 'Domain Setup & Conversion Guarantee',
      description:
        'Final PageSpeed audits, mobile testing, domain setup, team video training, and 30-day post-launch optimization support.',
    },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    Globe: <Globe className="w-5 h-5" />,
    Layout: <Layout className="w-5 h-5" />,
    Code2: <Code2 className="w-5 h-5" />,
    Wrench: <Wrench className="w-5 h-5" />,
  };

  const featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 4);

  return (
    <div className="w-full bg-[#090a15] text-[#f1f5f9]">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 text-xs sm:text-sm font-semibold border border-purple-500/20 shadow-xs">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Mikky Digitalz — High-Converting Web Design</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Websites Built to Convert, Not Just Impress.
            </h1>

            <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
              Hi, I'm <strong className="text-white">Mitchell Adetayo</strong> (Mikky Digitalz). I design and build ultra-fast, responsive WordPress, Elementor, Squarespace, and Shopify websites engineered to turn visitors into paying clients.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={onOpenCalendly}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Book Call on Calendly</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => onNavigate('work')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0f0d22] text-slate-200 border border-[#241d4a] font-semibold text-base hover:bg-[#181533] hover:text-white transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Mockups & Work</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Upwork status & Social pills */}
            <div className="inline-flex flex-col gap-3 p-4 rounded-2xl bg-[#0f0d22] border border-[#241d4a] text-xs sm:text-sm text-slate-300 w-full shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-semibold text-purple-400">Upwork Top Rated:</span>
                <span className="text-slate-400">5.0★ Rating across 30 verified client projects.</span>
              </div>
              <div className="pt-2 border-t border-[#241d4a]">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-2">
                  Connect Across Platforms:
                </span>
                <SocialLinks variant="pills" />
              </div>
            </div>
          </div>

          {/* Right Column: Founder Photo & Rating Badge (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden border-2 border-purple-500/30 bg-[#101226] shadow-2xl group">
              <img
                src="https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801979/Michael_Tewogbde_Website_designer_mchvvw.png"
                alt="Mitchell Adetayo - Mikky Digitalz Founder"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a15] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#101226]/90 backdrop-blur-md border border-[#241d4a] flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Mitchell Adetayo</h3>
                  <p className="text-[11px] text-purple-400 font-medium">Founder & Web Architect @ Mikky Digitalz</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -top-4 -right-4 bg-[#181533] border border-[#241d4a] p-3 rounded-2xl shadow-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">5.0 / 5.0 Stars</div>
                <div className="text-[10px] text-purple-300">30 Verified Reviews</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* WHAT I BUILD (CORE CAPABILITIES) */}
      <section className="py-20 bg-[#101226] border-y border-[#1e2442]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Core Capabilities</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">What I Build</h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer group"
            >
              <span>See all services & breakdowns</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.slice(0, 4).map((srv) => (
              <div
                key={srv.id}
                onClick={() => onNavigate('services')}
                className="p-6 rounded-2xl bg-[#181533] border border-[#241d4a] navy-card-hover cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
                    {iconMap[srv.iconName] || <Globe className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">{srv.subtitle}</p>
                </div>
                <div className="pt-4 border-t border-[#241d4a] flex items-center justify-between text-xs font-semibold text-purple-400">
                  <span>Turnaround: {srv.turnaroundTime}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW MIKKY BUILDS (WORKFLOW) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Predictable Execution</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">How Mikky Builds</h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            A battle-tested 4-step workflow designed to deliver launch-ready websites in 14 days or less without endless delays.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {workflowSteps.map((step, idx) => {
            const isActive = activeWorkflowStep === idx;
            return (
              <div
                key={step.number}
                onClick={() => setActiveWorkflowStep(idx)}
                className={`p-6 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-500 shadow-xl shadow-purple-600/30 scale-[1.02]'
                    : 'bg-[#101226] text-slate-200 border-[#1e2442] hover:border-purple-500/40'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-bold font-mono ${isActive ? 'text-white/80' : 'text-purple-400'}`}>
                    {step.number}
                  </span>
                  <Check className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-600'}`} />
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">{step.title}</h3>
                <p className={`text-xs font-semibold mb-3 uppercase tracking-wider ${isActive ? 'text-purple-200' : 'text-purple-400'}`}>
                  {step.short}
                </p>
                <p className={`text-xs leading-relaxed ${isActive ? 'text-white/90' : 'text-slate-400'}`}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* MEASURABLE OUTCOMES */}
      <section className="py-20 bg-[#101226] text-white border-y border-[#1e2442]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Measurable Outcomes</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">Engineered for Growth</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-[#181533] border border-[#241d4a]">
              <div className="w-10 h-10 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">+49%</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg. Lead Conversion Boost</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#181533] border border-[#241d4a]">
              <div className="w-10 h-10 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">99.8%</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average PageSpeed Score</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#181533] border border-[#241d4a]">
              <div className="w-10 h-10 rounded-full bg-purple-600/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">14 Days</div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Project Turnaround</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#181533] border border-[#241d4a]">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">98%</div>
              <div className="text-xs font-semibold text-[#a78bfa] uppercase tracking-wider">Upwork Job Success Rate (90%+ JSS)</div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT REVIEWS & FEEDBACK */}
      <section id="reviews" className="py-24 bg-[#090a15] border-b border-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20 mb-3">
              <Star className="w-3.5 h-3.5 fill-emerald-400" />
              <span>UPWORK VERIFIED REVIEWS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Client Reviews & Feedback</h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Authentic 5.0★ ratings and feedback from business leaders, speakers, clinics, and e-commerce founders.
            </p>
          </div>

          {/* Upwork metrics bar */}
          <div className="mb-14 p-6 rounded-2xl bg-[#0f0d22] border border-[#241d4a] shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center divide-y md:divide-y-0 md:divide-x divide-[#241d4a]">
              <a
                href="https://www.upwork.com/freelancers/~016fe1e73c258824d4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-[#181533] rounded-xl transition-colors group cursor-pointer"
              >
                <div className="flex items-center justify-center gap-1.5 text-amber-400 font-extrabold text-2xl sm:text-3xl">
                  <span>★ 5.0</span>
                  <span className="text-slate-400 text-sm font-normal">/ 5</span>
                </div>
                <div className="text-xs font-semibold text-slate-400 mt-1 group-hover:text-purple-400 flex items-center justify-center gap-1">
                  <span>Average Rating</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              <a
                href="https://www.upwork.com/freelancers/~016fe1e73c258824d4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-[#181533] rounded-xl transition-colors group cursor-pointer"
              >
                <div className="text-white font-extrabold text-2xl sm:text-3xl">30</div>
                <div className="text-xs font-semibold text-slate-400 mt-1 group-hover:text-purple-400 flex items-center justify-center gap-1">
                  <span>Client Reviews</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              <a
                href="https://www.upwork.com/freelancers/~016fe1e73c258824d4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-[#181533] rounded-xl transition-colors group cursor-pointer"
              >
                <div className="text-emerald-400 font-extrabold text-2xl sm:text-3xl">98%</div>
                <div className="text-xs font-semibold text-slate-400 mt-1 group-hover:text-purple-400 flex items-center justify-center gap-1">
                  <span>90%+ JSS Score</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              <a
                href="https://www.upwork.com/freelancers/~016fe1e73c258824d4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 hover:bg-[#181533] rounded-xl transition-colors group cursor-pointer"
              >
                <div className="text-purple-400 font-extrabold text-2xl sm:text-3xl">51</div>
                <div className="text-xs font-semibold text-slate-400 mt-1 group-hover:text-purple-400 flex items-center justify-center gap-1">
                  <span>Jobs Completed</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            </div>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#101226] border border-[#1e2442] flex flex-col justify-between navy-card-hover">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "Mikky redesigned our agency website on WordPress and Elementor. Speed went from 4.2s to 0.7s, and our consultation bookings doubled within two weeks. Exceptional attention to detail."
                </p>
              </div>
              <div className="pt-4 border-t border-[#1e2442] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Marcus Vance</h4>
                  <p className="text-xs text-purple-400 font-medium">CEO & Speaker</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                  <Check className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#101226] border border-[#1e2442] flex flex-col justify-between navy-card-hover">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "Pixel-perfect conversion of our Figma designs. Mikky completed 5 custom pages in 10 days with zero bugs on mobile. Highly recommended!"
                </p>
              </div>
              <div className="pt-4 border-t border-[#1e2442] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">David Sterling</h4>
                  <p className="text-xs text-purple-400 font-medium">Managing Partner</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                  <Check className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#101226] border border-[#1e2442] flex flex-col justify-between navy-card-hover">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "Rescued our broken Squarespace site right before launch. Mikky fixed our booking forms, mobile layouts, and custom CSS in 48 hours."
                </p>
              </div>
              <div className="pt-4 border-t border-[#1e2442] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Dr. Elena Rostova</h4>
                  <p className="text-xs text-purple-400 font-medium">Founder & Dermatologist</p>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                  <Check className="w-3 h-3" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://www.upwork.com/freelancers/~016fe1e73c258824d4"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/20 cursor-pointer"
            >
              <span>View All 30 Reviews on Upwork</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SELECTED WORK & MOCKUPS */}
      <section className="py-24 bg-[#101226] border-b border-[#1e2442]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Portfolio Showcase</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">Selected Work & Mockups</h2>
            </div>
            <button
              onClick={() => onNavigate('work')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer group"
            >
              <span>View full portfolio showcase</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj)}
                className="group bg-[#181533] rounded-2xl border border-[#241d4a] overflow-hidden navy-card-hover cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#101226]">
                  <img
                    src={proj.mockupUrl || proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow">
                    {proj.categoryLabel}
                  </div>
                  {proj.metricsHighlight && (
                    <div className="absolute top-4 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                      {proj.metricsHighlight}
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                      {proj.tagline}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#241d4a] flex items-center justify-between text-xs font-bold text-purple-400">
                    <span>Key Metric: {proj.result}</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Details <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('work')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              <span>Explore All Projects & Mockups</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SEO, GEO & AEO INSIGHTS SECTION */}
      <section className="py-24 bg-[#090a15] border-b border-[#1e2442]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>SEO • GEO • AEO ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Generative Search & Speed Playbooks
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-xl">
                Engineering websites that rank on Google and get synthesized as authoritative answers by Perplexity, ChatGPT, and Gemini.
              </p>
            </div>
            <a
              href="/blog"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('blog');
                }
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer group"
            >
              <span>View all playbooks & articles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                    e.preventDefault();
                    onNavigate('blog', post.slug);
                  }
                }}
                className="group bg-[#0f0d22] rounded-3xl border border-[#241d4a] hover:border-purple-500/50 p-6 navy-card-hover cursor-pointer flex flex-col justify-between transition-all text-inherit no-underline"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-5 bg-[#181533]">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#090a15]/90 border border-purple-500/40 text-purple-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                      {post.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2 font-mono">
                    <span>{post.publishedDate}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#181533] flex items-center justify-between text-xs font-bold text-purple-400">
                  <span className="text-slate-400 font-normal">By Mitchell Adetayo</span>
                  <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/blog"
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onNavigate('blog');
                }
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#181533] border border-[#241d4a] text-purple-300 text-sm font-semibold hover:bg-[#241d4a] hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore All Insights in the Journal</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#101226] to-[#181533] border border-[#241d4a] text-white space-y-6 max-w-4xl mx-auto shadow-2xl">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Get Started Today</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Have a project in mind? Let's build something that performs.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Free 20-minute discovery consultation on Calendly. Zero sales fluff — clear advice, honest timelines, and custom proposal options.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenCalendly}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer"
            >
              <span>Book Call on Calendly</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#181533] text-slate-200 border border-[#241d4a] font-semibold text-base hover:bg-[#241d4a] hover:text-white transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View Pricing Plans</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
