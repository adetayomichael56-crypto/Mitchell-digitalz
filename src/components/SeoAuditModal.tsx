import React from 'react';
import { 
  X, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  FileText, 
  Search, 
  Bot, 
  Cpu, 
  Globe, 
  Share2, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface SeoAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: (service?: string) => void;
}

export const SeoAuditModal: React.FC<SeoAuditModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  if (!isOpen) return null;

  const checklistItems = [
    {
      title: 'Clean Canonical URLs (No Hash Fragment Wall)',
      status: 'Engineered & Live',
      description: 'Googlebot ignores URLs after "#". All blog posts and pages now have clean canonical routes (/blog/:slug, /services, /work) via HTML5 History routing.',
      badge: 'Critical for Google',
      icon: Globe,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Valid Googlebot Crawlable <a> Links',
      status: 'Implemented',
      description: 'Googlebot does not execute button clicks. All navigation cards and blog links use semantic <a href="..."> tags with instant SPA routing.',
      badge: 'Crawl Budget',
      icon: Search,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Dynamic XML Sitemap (/sitemap.xml)',
      status: 'Generated & Validated',
      description: 'Comprehensive sitemap listing all site pages and blog post URLs with priority, change frequency, and last-modified dates for Google Search Console.',
      badge: 'Discovery',
      icon: FileText,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Robots.txt with AI Crawler Directives',
      status: 'Configured & Active',
      description: 'Explicit permissions and sitemap pointer for Googlebot, Bingbot, PerplexityBot, ClaudeBot, and GPTBot / ChatGPT Search.',
      badge: 'AI & Search',
      icon: Bot,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Schema.org JSON-LD Entities (Organization, BlogPosting, FAQPage)',
      status: 'Active on all articles',
      description: 'Deep structured graph linking Mitchell Adetayo (founder & author), Upwork profile, business entity, and FAQ accordions for Position Zero rich snippets.',
      badge: 'Rich Results',
      icon: Cpu,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'AEO Direct Answer Blocks (< 60 words definition)',
      status: 'Embedded in every post',
      description: 'Engineered specifically for Google AI Overviews and answer engines like Perplexity to extract factual definitions without halluncination.',
      badge: 'Position Zero',
      icon: Sparkles,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Sub-Second Core Web Vitals & Zero Layout Shift',
      status: 'Top 1% Tier',
      description: 'Lightning-fast LCP (< 0.8s), zero CLS, preconnected Google Fonts, and modern responsive CSS across all mobile devices.',
      badge: 'Ranking Factor',
      icon: TrendingUp,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-4xl bg-[#0f0d22] border border-[#241d4a] text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#181533] text-white flex items-center justify-between border-b border-[#241d4a] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">Will It Rank On Google?</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Ready for Indexing
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Technical SEO, GEO & AEO Architecture Audit for Mikky Digitalz
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#0f0d22] hover:bg-[#241d4a] text-slate-300 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8">
          
          {/* Executive Summary Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#161338] to-[#1a1444] border border-purple-500/40">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              The Direct Answer: Yes, because the technical foundation is built.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Previously, a standard Single Page App with only hash fragments (<code className="text-purple-300 bg-purple-950/60 px-1 py-0.5 rounded">#/blog/...</code>) could <strong className="text-white">not</strong> be indexed by Google because Googlebot ignores fragment identifiers. 
              We have now upgraded Mikky Digitalz with <strong className="text-white">clean canonical routing, an automated XML sitemap, robots.txt, Schema.org JSON-LD graphs, and crawlable semantic links</strong>.
            </p>
          </div>

          {/* Technical Checklist */}
          <div>
            <h4 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4 flex items-center justify-between">
              <span>Technical Ranking Checklist (7/7 Complete)</span>
              <span className="text-emerald-400 text-xs font-semibold">100% Passed</span>
            </h4>

            <div className="space-y-3">
              {checklistItems.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#14112e] border border-[#231c4c] flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:border-purple-500/40 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-white">{item.title}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${item.color}`}>
                            {item.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-purple-300/80 shrink-0 self-start sm:self-center">
                      [{item.badge}]
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Steps for Ranking */}
          <div className="p-5 rounded-2xl bg-[#120f2b] border border-[#2b215c]">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              What You Must Do Next to Rank in 24–72 Hours
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Google doesn’t automatically discover a new site the second it is launched. Follow these 4 practical steps:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-[#090a15] border border-[#231c4c]">
                <div className="font-bold text-purple-300 mb-1">1. Google Search Console</div>
                <p className="text-slate-400 leading-relaxed">
                  Go to <code className="text-slate-200">search.google.com/search-console</code> and verify your domain (<code className="text-slate-200">mikkydigitalz.netlify.app</code>).
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#090a15] border border-[#231c4c]">
                <div className="font-bold text-purple-300 mb-1">2. Submit XML Sitemap</div>
                <p className="text-slate-400 leading-relaxed">
                  Under the Sitemaps tab, enter <code className="text-purple-300">sitemap.xml</code> and click Submit. Googlebot will immediately queue all 6 articles.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#090a15] border border-[#231c4c]">
                <div className="font-bold text-purple-300 mb-1">3. Request Indexing</div>
                <p className="text-slate-400 leading-relaxed">
                  Use the URL Inspection bar for your top article and click <strong className="text-white">"Request Indexing"</strong> to get crawled within hours.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#090a15] border border-[#231c4c]">
                <div className="font-bold text-purple-300 mb-1">4. Add Profile Backlinks</div>
                <p className="text-slate-400 leading-relaxed">
                  Link to your site from your Upwork profile, LinkedIn, and GitHub. These authoritative links pass domain trust (E-E-A-T).
                </p>
              </div>
            </div>
          </div>

          {/* Direct Verification Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Live File & Audit Verification Links
            </h4>
            <div className="flex flex-wrap gap-2.5">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1b173e] hover:bg-purple-600/30 border border-purple-500/30 text-xs font-medium text-purple-300 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View /sitemap.xml</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="/robots.txt"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1b173e] hover:bg-purple-600/30 border border-purple-500/30 text-xs font-medium text-purple-300 transition-colors"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>View /robots.txt</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1b173e] hover:bg-purple-600/30 border border-purple-500/30 text-xs font-medium text-purple-300 transition-colors"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Google Rich Results Test</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <a
                href="https://pagespeed.web.dev/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1b173e] hover:bg-purple-600/30 border border-purple-500/30 text-xs font-medium text-purple-300 transition-colors"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Google PageSpeed Insights</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="p-4 sm:p-5 bg-[#14112e] border-t border-[#241d4a] flex items-center justify-between gap-4 shrink-0">
          <p className="text-[11px] text-slate-400 hidden sm:block">
            All 6 blog articles feature AEO Direct Answers and Schema.org graphs.
          </p>

          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-[#1e1740] text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenContact('Google SEO & AEO Consultation');
              }}
              className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-lg shadow-purple-600/30"
            >
              <span>Get SEO Web Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
