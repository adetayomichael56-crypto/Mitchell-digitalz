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
  Award,
  Eye,
  Laptop
} from 'lucide-react';
import { PROJECTS, SERVICES_DATA, ProjectItem } from '../data/siteData';
import { BLOG_POSTS } from '../data/blogData';
import { SocialLinks } from './SocialLinks';
import { WebsiteMockupPreview } from './WebsiteMockupPreview';

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
    <div className="w-full bg-[#070612] text-[#f1f5f9] relative overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Background ambient radial purple glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-purple-600/20 via-violet-600/15 to-indigo-600/10 blur-[140px] pointer-events-none rounded-full -z-10" />
        <div className="absolute top-10 right-10 w-80 h-80 bg-purple-500/15 blur-[110px] pointer-events-none rounded-full -z-10" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-violet-600/10 blur-[100px] pointer-events-none rounded-full -z-10" />

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/15 text-purple-300 text-xs sm:text-sm font-semibold border border-purple-500/30 shadow-lg shadow-purple-900/20">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Mikky Digitalz — High-Converting Web Design</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
              Websites Built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-purple-200">Convert</span>, Not Just Impress.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Hi, I'm <strong className="text-white">Michael Adetayo</strong> (Mikky Digitalz). I design and build ultra-fast, responsive <span className="text-purple-300 font-medium">WordPress & Elementor</span>, <span className="text-purple-300 font-medium">Squarespace</span>, and <span className="text-purple-300 font-medium">Shopify</span> websites engineered to turn visitors into paying clients.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenCalendly}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Book Call on Calendly</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('website-preview');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#1c1447] text-purple-200 border border-purple-500/40 font-semibold text-sm sm:text-base hover:bg-[#251b5e] hover:text-white hover:border-purple-400 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-950/40 group"
              >
                <Eye className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Live Website Mockup</span>
              </button>

              <button
                onClick={() => onNavigate('work')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#110d2c] text-slate-300 border border-[#2c2263] font-semibold text-sm sm:text-base hover:bg-[#18123a] hover:text-white hover:border-purple-500/50 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Client Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Availability & Social pills */}
            <div className="inline-flex flex-col gap-3 p-4 rounded-2xl bg-[#110d2c] border border-[#2c2263] text-xs sm:text-sm text-slate-300 w-full shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="font-semibold text-purple-300">Available for new projects:</span>
                <span className="text-slate-300">Based in Nigeria, working with clients worldwide.</span>
              </div>
              <div className="pt-2 border-t border-[#261d56]">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-purple-400 mb-2">
                  Connect Across Platforms:
                </span>
                <SocialLinks variant="pills" />
              </div>
            </div>
          </div>

          {/* Right Column: Founder Photo & Rating Badge (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl overflow-hidden border-2 border-purple-500/40 bg-[#0e0b24] shadow-2xl shadow-purple-950/50 group">
              <img
                src="https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801979/Michael_Tewogbde_Website_designer_mchvvw.png"
                alt="Michael Adetayo - Mikky Digitalz Founder"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070612] via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0e0b24]/90 backdrop-blur-md border border-[#2c2263] flex items-center justify-between shadow-xl">
                <div>
                  <h3 className="text-sm font-bold text-white">Michael Adetayo</h3>
                  <p className="text-[11px] text-purple-300 font-medium">Founder & Web Architect @ Mikky Digitalz</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-600/25 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Float badge */}
            <div className="absolute -top-4 -right-4 bg-[#161138] border border-[#2c2263] p-3 rounded-2xl shadow-2xl shadow-purple-950/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">WordPress & Elementor</div>
                <div className="text-[10px] text-purple-300">Expert Website Builds</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* INTERACTIVE WEBSITE MOCKUP & ARCHITECTURE PREVIEW */}
      <WebsiteMockupPreview
        onNavigate={onNavigate}
        onOpenCalendly={onOpenCalendly}
        onOpenContact={onOpenContact}
      />

      {/* WHAT I BUILD (CORE CAPABILITIES) */}
      <section className="py-20 bg-[#0a081a] border-y border-[#261d56]">
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
                className="p-6 rounded-2xl bg-[#110d2c] border border-[#2c2263] navy-card-hover cursor-pointer flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-600/25 text-purple-300 flex items-center justify-center mb-4 border border-purple-500/30">
                    {iconMap[srv.iconName] || <Globe className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{srv.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-3">{srv.subtitle}</p>
                </div>
                <div className="pt-4 border-t border-[#261d56] flex items-center justify-between text-xs font-semibold text-purple-300">
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
                    ? 'bg-purple-600 text-white border-purple-400 shadow-2xl shadow-purple-600/40 scale-[1.02]'
                    : 'bg-[#0e0b24] text-slate-200 border-[#261d56] hover:border-purple-500/50 hover:bg-[#140f33]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-2xl font-bold font-mono ${isActive ? 'text-white/90' : 'text-purple-400'}`}>
                    {step.number}
                  </span>
                  <Check className={`w-5 h-5 ${isActive ? 'text-white' : 'text-purple-400/40'}`} />
                </div>
                <h3 className="text-xl font-bold mb-1 text-white">{step.title}</h3>
                <p className={`text-xs font-semibold mb-3 uppercase tracking-wider ${isActive ? 'text-purple-100' : 'text-purple-300'}`}>
                  {step.short}
                </p>
                <p className={`text-xs leading-relaxed ${isActive ? 'text-white/95' : 'text-slate-300'}`}>
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* MEASURABLE OUTCOMES */}
      <section className="py-20 bg-[#0a081a] text-white border-y border-[#261d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Measurable Outcomes</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">Engineered for Growth</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-6 rounded-2xl bg-[#110d2c] border border-[#2c2263] shadow-lg">
              <div className="w-10 h-10 rounded-full bg-purple-600/25 text-purple-300 flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">+49%</div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Avg. Lead Conversion Boost</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#110d2c] border border-[#2c2263] shadow-lg">
              <div className="w-10 h-10 rounded-full bg-purple-600/25 text-purple-300 flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">99.8%</div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Average PageSpeed Score</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#110d2c] border border-[#2c2263] shadow-lg">
              <div className="w-10 h-10 rounded-full bg-purple-600/25 text-purple-300 flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">14 Days</div>
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">Average Project Turnaround</div>
            </div>

            <div className="p-6 rounded-2xl bg-[#110d2c] border border-[#2c2263] shadow-lg">
              <div className="w-10 h-10 rounded-full bg-purple-600/25 text-purple-300 flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                <Award className="w-5 h-5" />
              </div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">BSc</div>
              <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider">Computer Science, University of Ilorin</div>
            </div>
          </div>
        </div>
      </section>

      {/* CLIENT REVIEWS & FEEDBACK */}
      <section id="reviews" className="py-24 bg-[#070612] border-b border-[#261d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 text-purple-300 text-xs font-bold border border-purple-500/30 mb-3">
              <Star className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
              <span>CLIENT FEEDBACK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Client Reviews & Feedback</h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              What working together looks like for business leaders, speakers, clinics, and e-commerce founders.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#0e0b24] border border-[#261d56] flex flex-col justify-between navy-card-hover shadow-lg">
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
              <div className="pt-4 border-t border-[#261d56] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Marcus Vance</h4>
                  <p className="text-xs text-purple-400 font-medium">CEO & Speaker</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e0b24] border border-[#261d56] flex flex-col justify-between navy-card-hover shadow-lg">
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
              <div className="pt-4 border-t border-[#261d56] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">David Sterling</h4>
                  <p className="text-xs text-purple-400 font-medium">Managing Partner</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-[#0e0b24] border border-[#261d56] flex flex-col justify-between navy-card-hover shadow-lg">
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
              <div className="pt-4 border-t border-[#261d56] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Dr. Elena Rostova</h4>
                  <p className="text-xs text-purple-400 font-medium">Founder & Dermatologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK & MOCKUPS */}
      <section className="py-24 bg-[#0a081a] border-b border-[#261d56]">
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
                className="group bg-[#110d2c] rounded-2xl border border-[#2c2263] overflow-hidden navy-card-hover cursor-pointer flex flex-col justify-between shadow-xl"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#0e0b24]">
                  <img
                    src={proj.mockupUrl || proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                    {proj.categoryLabel}
                  </div>
                  {proj.metricsHighlight && (
                    <div className="absolute top-4 right-4 bg-purple-900/90 border border-purple-400/40 text-purple-200 text-xs font-bold px-3 py-1.5 rounded-full shadow backdrop-blur-md">
                      {proj.metricsHighlight}
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {proj.tagline}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#261d56] flex items-center justify-between text-xs font-bold text-purple-400">
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-purple-600 text-white text-sm font-semibold hover:bg-purple-500 transition-all shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50 cursor-pointer"
            >
              <span>Explore All Projects & Mockups</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SEO, GEO & AEO INSIGHTS SECTION */}
      <section className="py-24 bg-[#070612] border-b border-[#261d56]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-xs font-bold border border-purple-500/30 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>SEO • GEO • AEO ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Generative Search & Speed Playbooks
              </h2>
              <p className="text-slate-300 text-sm mt-2 max-w-xl">
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
                className="group bg-[#0e0b24] rounded-3xl border border-[#2c2263] hover:border-purple-500/60 p-6 navy-card-hover cursor-pointer flex flex-col justify-between transition-all text-inherit no-underline shadow-lg"
              >
                <div>
                  <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-5 bg-[#161138]">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#070612]/90 border border-purple-500/40 text-purple-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-md">
                      {post.category}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2 font-mono">
                    <span>{post.publishedDate}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#261d56] flex items-center justify-between text-xs font-bold text-purple-400">
                  <span className="text-slate-400 font-normal">By Michael Adetayo</span>
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
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#110d2c] border border-[#2c2263] text-purple-300 text-sm font-semibold hover:bg-[#18123a] hover:border-purple-500/50 hover:text-white transition-all cursor-pointer shadow-md"
            >
              <span>Explore All Insights in the Journal</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#0e0b24] via-[#140f33] to-[#1c1445] border border-[#3b2a75] text-white space-y-6 max-w-4xl mx-auto shadow-2xl shadow-purple-950/60">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Get Started Today</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Have a project in mind? Let's build something that <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-purple-200">performs</span>.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Free 20-minute discovery consultation on Calendly. Zero sales fluff — clear advice, honest timelines, and custom proposal options.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenCalendly}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-base transition-all duration-150 flex items-center justify-center gap-2 shadow-xl shadow-purple-600/40 hover:shadow-purple-500/60 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Book Call on Calendly</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#110d2c] text-slate-200 border border-[#2c2263] font-semibold text-base hover:bg-[#18123a] hover:border-purple-500/50 hover:text-white transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-md"
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
