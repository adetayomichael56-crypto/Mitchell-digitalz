import React, { useState } from 'react';
import { 
  Laptop, 
  Smartphone, 
  Layers, 
  Search, 
  Share2, 
  Maximize2, 
  ExternalLink, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Star, 
  Sparkles, 
  Copy, 
  Check, 
  Eye, 
  ArrowRight,
  X,
  Globe,
  Info
} from 'lucide-react';
import mockupImage from '../assets/images/website_mockup_preview_1792412555711.jpg';

interface WebsiteMockupPreviewProps {
  onNavigate: (route: string) => void;
  onOpenCalendly: () => void;
  onOpenContact: () => void;
}

type PreviewTab = '3d-studio' | 'desktop' | 'mobile' | 'google-serp' | 'social-card';

export const WebsiteMockupPreview: React.FC<WebsiteMockupPreviewProps> = ({
  onNavigate,
  onOpenCalendly,
  onOpenContact,
}) => {
  const [activeTab, setActiveTab] = useState<PreviewTab>('3d-studio');
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSimPage, setActiveSimPage] = useState<'home' | 'services' | 'work' | 'pricing'>('home');

  const siteUrl = 'https://mikky-digitalz.netlify.app';
  const previewImageUrl = `${siteUrl}/website-preview.jpg`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const hotspots = [
    {
      id: 1,
      x: '20%',
      y: '22%',
      title: 'GEO & AEO Knowledge Graph',
      tag: 'AI Citation Ready',
      desc: 'Deep Schema.org JSON-LD structured data configured so ChatGPT, Perplexity, and Google Search index and cite Mikky Digitalz.',
    },
    {
      id: 2,
      x: '45%',
      y: '38%',
      title: 'High-Converting Hero Architecture',
      tag: 'Conversion Rate Boost',
      desc: 'Psychology-driven visual hierarchy, bold typography, and immediate Calendly call-to-action for frictionless client booking.',
    },
    {
      id: 3,
      x: '58%',
      y: '25%',
      title: 'Sub-Second Performance',
      tag: '99+ PageSpeed',
      desc: 'Zero-bloat engineering, responsive WebP/JPEG assets, and optimal DOM structure for sub-0.6s First Contentful Paint.',
    },
    {
      id: 4,
      x: '82%',
      y: '32%',
      title: 'Fluid Mobile-First Smartphone Mockup',
      tag: 'Flawless Responsiveness',
      desc: 'Pixel-perfect typography and touch-optimized navigation on iPhone and modern Android devices.',
    },
    {
      id: 5,
      x: '38%',
      y: '72%',
      title: 'Upwork Top Rated Proof Signals',
      tag: '5.0★ 30 Reviews',
      desc: 'Integrated verified trust badges, client testimonial highlights, and social proof that drive 2x higher consultation conversions.',
    },
  ];

  return (
    <section id="website-preview" className="py-20 bg-[#070612] text-[#f1f5f9] relative overflow-hidden border-b border-[#261d56]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-tr from-purple-600/15 via-violet-600/10 to-indigo-600/10 blur-[150px] pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 text-purple-300 text-xs font-bold border border-purple-500/30 mb-3 shadow-lg shadow-purple-900/20">
              <Eye className="w-3.5 h-3.5 text-purple-400" />
              <span>LIVE WEBSITE PREVIEW & ARCHITECTURE MOCKUP</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Website Mockup & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-purple-200">Interactive Preview</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-2 leading-relaxed">
              Experience the complete visual and technical architecture of <strong className="text-white">Mikky Digitalz</strong>. Switch between the 3D Studio Mockup, MacBook desktop browser, iPhone 16 Pro mobile view, and Google Search Console SERP card.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsFullscreenOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#140f33] hover:bg-[#1f174e] border border-[#2c2263] text-purple-300 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md hover:border-purple-400/50"
            >
              <Maximize2 className="w-4 h-4" />
              <span>Fullscreen Inspect</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
            >
              {copiedLink ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Preview URL Copied!' : 'Copy Site Link'}</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveTab('3d-studio')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === '3d-studio'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400'
                : 'bg-[#0e0b24] text-slate-300 border border-[#261d56] hover:bg-[#161138] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>3D Studio Mockup (Featured)</span>
          </button>

          <button
            onClick={() => setActiveTab('desktop')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'desktop'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400'
                : 'bg-[#0e0b24] text-slate-300 border border-[#261d56] hover:bg-[#161138] hover:text-white'
            }`}
          >
            <Laptop className="w-4 h-4" />
            <span>MacBook Browser Mockup</span>
          </button>

          <button
            onClick={() => setActiveTab('mobile')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'mobile'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400'
                : 'bg-[#0e0b24] text-slate-300 border border-[#261d56] hover:bg-[#161138] hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>iPhone 16 Pro Mockup</span>
          </button>

          <button
            onClick={() => setActiveTab('google-serp')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'google-serp'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400'
                : 'bg-[#0e0b24] text-slate-300 border border-[#261d56] hover:bg-[#161138] hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Google SERP & Search Console</span>
          </button>

          <button
            onClick={() => setActiveTab('social-card')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === 'social-card'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 border border-purple-400'
                : 'bg-[#0e0b24] text-slate-300 border border-[#261d56] hover:bg-[#161138] hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Share Card (OG Preview)</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: 3D STUDIO MULTI-DEVICE MOCKUP (FEATURED) */}
        {/* ======================================================== */}
        {activeTab === '3d-studio' && (
          <div className="relative rounded-3xl overflow-hidden border border-[#2c2263] bg-[#0c0921] shadow-2xl p-2 sm:p-6 group">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-4 border-b border-[#261d56] px-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white font-medium">3D Photorealistic Studio Mockup</span>
                <span className="hidden sm:inline text-purple-400">• Interactive Hotspots Active</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-400 hidden md:inline">Click any glowing numbered pin to view technical specs</span>
                <button
                  onClick={() => setIsFullscreenOpen(true)}
                  className="text-purple-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Zoom 4K</span>
                </button>
              </div>
            </div>

            {/* Main Mockup Graphic with Hotspots */}
            <div className="relative rounded-2xl overflow-hidden bg-[#070612] aspect-16/9 flex items-center justify-center border border-[#1d1645]">
              <img
                src={mockupImage}
                alt="Mikky Digitalz Website Multi-Device 3D Mockup Preview"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              />

              {/* Glowing Interactive Hotspot Pins */}
              {hotspots.map((spot) => {
                const isSelected = activeHotspot === spot.id;
                return (
                  <div
                    key={spot.id}
                    style={{ left: spot.x, top: spot.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      onClick={() => setActiveHotspot(isSelected ? null : spot.id)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 cursor-pointer shadow-xl ${
                        isSelected
                          ? 'bg-purple-500 text-white scale-125 ring-4 ring-purple-400/50'
                          : 'bg-purple-600/90 text-white hover:scale-110 ring-2 ring-purple-300/40 hover:bg-purple-500'
                      }`}
                      aria-label={`Hotspot ${spot.id}: ${spot.title}`}
                    >
                      <span className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-30" />
                      <span className="relative z-10">{spot.id}</span>
                    </button>

                    {/* Popover Card */}
                    {isSelected && (
                      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 sm:w-72 p-4 rounded-2xl bg-[#0e0b24]/95 border border-purple-500/50 backdrop-blur-xl text-white shadow-2xl z-30 animate-fade-in text-left">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                            {spot.tag}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspot(null);
                            }}
                            className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{spot.title}</h4>
                        <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">{spot.desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#261d56] text-xs">
              <div className="p-3 rounded-xl bg-[#0f0c2a] border border-[#221a4f]">
                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Architecture</div>
                <div className="text-white font-semibold">Vite + React SPA + SSR Ready</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0f0c2a] border border-[#221a4f]">
                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Search Engine Ready</div>
                <div className="text-white font-semibold">GEO, AEO & Schema JSON-LD</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0f0c2a] border border-[#221a4f]">
                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Performance</div>
                <div className="text-emerald-400 font-semibold">0.6s FCP • 99+ PageSpeed</div>
              </div>
              <div className="p-3 rounded-xl bg-[#0f0c2a] border border-[#221a4f]">
                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Canonical Origin</div>
                <div className="text-white font-semibold truncate">mikky-digitalz.netlify.app</div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MACBOOK DESKTOP BROWSER MOCKUP */}
        {/* ======================================================== */}
        {activeTab === 'desktop' && (
          <div className="rounded-3xl border border-[#2c2263] bg-[#0e0b24] shadow-2xl overflow-hidden">
            {/* macOS Browser Chrome */}
            <div className="px-4 py-3 bg-[#130f2e] border-b border-[#261d56] flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-xs text-slate-400 hidden sm:inline">Mikky Digitalz — High-Converting Web Design</span>
              </div>

              {/* URL Address Bar */}
              <div className="flex-1 max-w-lg mx-auto bg-[#090717] px-4 py-1.5 rounded-lg border border-[#2c2263] text-xs flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-400 font-mono text-[11px] truncate">https://mikky-digitalz.netlify.app</span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-bold shrink-0">
                  SSL Secured
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="hidden md:inline px-2 py-1 rounded bg-purple-500/15 text-purple-300 font-mono text-[11px] border border-purple-500/30">
                  Desktop 1440×900
                </span>
              </div>
            </div>

            {/* Simulated Desktop Website View */}
            <div className="p-6 bg-[#070612] min-h-[500px] flex flex-col justify-between">
              {/* Simulated Navigation Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#261d56]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-purple-300">
                    M
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">Mikky Digitalz</div>
                    <div className="text-[10px] text-purple-300">Web Engineering & GEO</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {(['home', 'services', 'work', 'pricing'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSimPage(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                        activeSimPage === tab
                          ? 'bg-purple-600 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-[#130f2e]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                  <button
                    onClick={onOpenCalendly}
                    className="ml-2 px-4 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Book Call
                  </button>
                </div>
              </div>

              {/* Simulated Body Content */}
              <div className="py-12 max-w-3xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-xs font-bold border border-purple-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Sub-Second Performance • GEO & AEO Architecture</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                  Websites Built to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-purple-200">Convert</span>, Not Just Impress.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                  Engineered by Mitchell Adetayo on WordPress, Elementor, Squarespace, and Shopify to turn organic search and AI citations into scheduled client consultations.
                </p>

                {/* Simulated Metrics Card Grid */}
                <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                  <div className="p-3 rounded-xl bg-[#110d2c] border border-[#2c2263]">
                    <div className="text-xl font-extrabold text-white">★ 5.0</div>
                    <div className="text-[10px] text-slate-400">30 Upwork Reviews</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#110d2c] border border-[#2c2263]">
                    <div className="text-xl font-extrabold text-emerald-400">0.6s</div>
                    <div className="text-[10px] text-slate-400">Average Load Time</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#110d2c] border border-[#2c2263]">
                    <div className="text-xl font-extrabold text-purple-300">14 Days</div>
                    <div className="text-[10px] text-slate-400">Launch Guarantee</div>
                  </div>
                </div>
              </div>

              {/* Bottom Browser Bar */}
              <div className="pt-4 border-t border-[#261d56] flex items-center justify-between text-[11px] text-slate-400">
                <span>Rendering active viewport for desktop clients</span>
                <button
                  onClick={() => onNavigate(activeSimPage)}
                  className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Open this section on live site</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: IPHONE 16 PRO MOBILE MOCKUP */}
        {/* ======================================================== */}
        {activeTab === 'mobile' && (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 py-6">
            {/* Phone Chassis */}
            <div className="relative w-[320px] sm:w-[350px] aspect-[9/19.5] rounded-[52px] p-3.5 bg-gradient-to-b from-[#2a2254] via-[#1a143b] to-[#0d0a21] shadow-2xl shadow-purple-950/80 border-4 border-[#3c2f7b]">
              {/* Dynamic Island */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 flex items-center justify-between px-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#333]" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Screen Area */}
              <div className="w-full h-full rounded-[42px] overflow-hidden bg-[#070612] border border-[#1a143b] flex flex-col justify-between pt-8 pb-4 px-4 text-white">
                {/* Status Bar */}
                <div className="flex items-center justify-between text-[11px] text-slate-300 px-2 pt-1 font-semibold">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <span>5G</span>
                    <span className="text-[10px]">100%</span>
                  </div>
                </div>

                {/* Mobile Header */}
                <div className="flex items-center justify-between py-3 border-b border-[#261d56]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-600/30 flex items-center justify-center font-bold text-xs text-purple-300">
                      M
                    </div>
                    <span className="text-xs font-bold">Mikky Digitalz</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    ★ 5.0
                  </span>
                </div>

                {/* Mobile Hero Content */}
                <div className="space-y-3 py-4 text-left">
                  <div className="inline-block px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                    Upwork Top Rated Web Designer
                  </div>
                  <h4 className="text-xl font-extrabold leading-tight">
                    Websites Built to Convert, Not Just Impress.
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    WordPress, Elementor, Squarespace & Shopify builds engineered for sub-second speeds.
                  </p>

                  <div className="p-3 rounded-xl bg-[#110d2c] border border-[#2c2263] space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Client Rating:</span>
                      <span className="text-amber-400 font-bold">5.0 / 5.0 Stars</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Avg. PageSpeed:</span>
                      <span className="text-emerald-400 font-bold">99.8% (0.6s)</span>
                    </div>
                  </div>

                  <button
                    onClick={onOpenCalendly}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-lg shadow-purple-600/40 text-center cursor-pointer"
                  >
                    Book Call on Calendly
                  </button>
                </div>

                {/* Mobile Bottom Navigation Simulator */}
                <div className="pt-2 border-t border-[#261d56] flex items-center justify-around text-[10px] text-slate-400">
                  <button onClick={() => onNavigate('home')} className="text-purple-400 font-semibold cursor-pointer">Home</button>
                  <button onClick={() => onNavigate('services')} className="hover:text-white cursor-pointer">Services</button>
                  <button onClick={() => onNavigate('work')} className="hover:text-white cursor-pointer">Work</button>
                  <button onClick={() => onNavigate('pricing')} className="hover:text-white cursor-pointer">Pricing</button>
                </div>
              </div>
            </div>

            {/* Mobile Feature Description */}
            <div className="max-w-md space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 text-xs font-bold border border-purple-500/30">
                <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                <span>Responsive Viewport Precision</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Flawless On Every Screen Size & Mobile Device
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Over 65% of your prospective clients will browse your website on a smartphone. Mikky Digitalz is built with fluid typography, thumb-friendly tap targets, and zero horizontal scroll anomalies.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-0.6s Mobile First Contentful Paint</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sticky Floating Calendly & WhatsApp contact buttons</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Mobile Friendly Pass on Google Search Console</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: GOOGLE SERP & SEARCH CONSOLE PREVIEW */}
        {/* ======================================================== */}
        {activeTab === 'google-serp' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0b24] border border-[#2c2263] shadow-2xl max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#261d56] gap-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center font-bold text-xs text-[#4285F4]">
                  G
                </div>
                <span className="text-sm font-bold text-white">Google Search Result & Sitelinks Simulation</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  <span>Google Console Verified</span>
                </span>
              </div>
            </div>

            {/* Google SERP Card */}
            <div className="p-5 rounded-2xl bg-[#140f33] border border-[#261d56] space-y-2 text-left">
              {/* Breadcrumb URL */}
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <img
                  src="https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png"
                  alt="Favicon"
                  className="w-4 h-4 rounded-full bg-black/40"
                />
                <span className="text-slate-300 font-medium">Mikky Digitalz</span>
                <span>›</span>
                <span className="text-slate-400 truncate">https://mikky-digitalz.netlify.app</span>
              </div>

              {/* SERP Title */}
              <h3 className="text-lg sm:text-xl font-bold text-[#8ab4f8] hover:underline cursor-pointer">
                Mikky Digitalz — High-Converting Web Engineering, GEO & AEO
              </h3>

              {/* Rating Snippet */}
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="font-semibold text-white">Rating: 5.0</span>
                <span>•</span>
                <span>30 Upwork Verified Reviews</span>
                <span>•</span>
                <span className="text-emerald-400">Free Consultation Available</span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                Sub-second web engineering and client inquiry systems built for search engines and AI citation by Mitchell Adetayo. Expert in WordPress, Elementor, Squarespace, and Shopify.
              </p>

              {/* SERP Sitelinks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 mt-2 border-t border-[#261d56]">
                <div 
                  onClick={() => onNavigate('services')}
                  className="p-2.5 rounded-lg bg-[#0e0b24] hover:bg-[#1a143b] transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-[#8ab4f8]">Services & Capabilities</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">WordPress, Squarespace, Shopify & Custom Engineering</div>
                </div>

                <div 
                  onClick={() => onNavigate('work')}
                  className="p-2.5 rounded-lg bg-[#0e0b24] hover:bg-[#1a143b] transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-[#8ab4f8]">Selected Work & Mockups</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">Explore verified client projects and interactive case studies</div>
                </div>

                <div 
                  onClick={() => onNavigate('pricing')}
                  className="p-2.5 rounded-lg bg-[#0e0b24] hover:bg-[#1a143b] transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-[#8ab4f8]">Transparent Pricing & Packages</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">Fixed-price launch packages with 14-day turnaround</div>
                </div>

                <div 
                  onClick={() => onNavigate('blog')}
                  className="p-2.5 rounded-lg bg-[#0e0b24] hover:bg-[#1a143b] transition-colors cursor-pointer"
                >
                  <div className="text-xs font-bold text-[#8ab4f8]">GEO & AEO Knowledge Base</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1">Guides on AI search citation, Perplexity & Google AI Overviews</div>
                </div>
              </div>
            </div>

            {/* Google Search Console Status */}
            <div className="p-4 rounded-xl bg-[#110d2c] border border-[#2c2263] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-white font-bold">Google Site Verification Active</div>
                  <div className="text-[11px] text-slate-400">Token: <code className="text-purple-300">googlee63b711c38e98de3</code></div>
                </div>
              </div>
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors cursor-pointer"
              >
                Copy URL
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: SOCIAL SHARE CARD (OPENGRAPH / TWITTER) */}
        {/* ======================================================== */}
        {activeTab === 'social-card' && (
          <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-[#0e0b24] border border-[#2c2263] shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#261d56]">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold text-white">Social Media Preview Card</span>
              </div>
              <span className="text-xs text-slate-400">WhatsApp • Twitter / X • LinkedIn • Slack</span>
            </div>

            {/* Social Card Preview */}
            <div className="rounded-2xl overflow-hidden border border-[#2c2263] bg-[#070612] shadow-xl group">
              <div className="relative aspect-16/9 overflow-hidden bg-black">
                <img
                  src={mockupImage}
                  alt="Social share preview card mockup"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-purple-300 border border-white/10">
                  og:image (1200×630 Mockup)
                </div>
              </div>

              <div className="p-4 space-y-1.5 bg-[#120e2e] text-left">
                <div className="text-[11px] uppercase tracking-wider text-purple-400 font-bold">
                  mikky-digitalz.netlify.app
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Mikky Digitalz — High-Converting Websites, GEO & AEO Architecture
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">
                  Sub-second web engineering and client inquiry systems built for search engines and AI citation by Mitchell Adetayo.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="text-xs text-slate-400 text-left">
                Shared URL: <code className="text-purple-300">{siteUrl}</code>
              </div>
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Copy Shareable Link'}</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in">
          {/* Modal Header */}
          <div className="flex items-center justify-between max-w-7xl mx-auto w-full text-white pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-purple-500" />
              <div>
                <h3 className="text-sm sm:text-base font-bold">Mikky Digitalz — 4K Device Mockup Presentation</h3>
                <p className="text-xs text-purple-300">Apple Studio Display & iPhone 16 Pro Showcase</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold transition-all cursor-pointer flex items-center gap-2"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied' : 'Share Site'}</span>
              </button>
              <button
                onClick={() => setIsFullscreenOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Large Image View */}
          <div className="flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            <img
              src={mockupImage}
              alt="Mikky Digitalz Fullscreen Mockup Preview"
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          {/* Modal Footer */}
          <div className="max-w-7xl mx-auto w-full pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <span className="text-emerald-400 font-bold">● High Resolution Asset</span>
              <span>Available on <code className="text-purple-300 font-mono">/website-preview.jpg</code></span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsFullscreenOpen(false);
                  onOpenCalendly();
                }}
                className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold transition-all shadow-lg shadow-purple-600/40 cursor-pointer"
              >
                Book Call on Calendly
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
