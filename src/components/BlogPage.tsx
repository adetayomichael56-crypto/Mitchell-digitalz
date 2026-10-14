import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  Sparkles, 
  Share2, 
  CheckCircle2, 
  HelpCircle, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Copy, 
  Check,
  ChevronDown,
  ChevronUp,
  Tag
} from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { PROJECTS, ProjectItem } from '../data/siteData';

interface BlogPageProps {
  currentSlug?: string;
  onSelectPost: (slug: string) => void;
  onBackToIndex: () => void;
  onOpenContact: (preselectedService?: string) => void;
  onOpenCalendly: () => void;
  onOpenSeoAudit?: () => void;
  onNavigate?: (page: string) => void;
  onSelectProject?: (proj: ProjectItem) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  currentSlug,
  onSelectPost,
  onBackToIndex,
  onOpenContact,
  onOpenCalendly,
  onOpenSeoAudit,
  onNavigate,
  onSelectProject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const activePost = currentSlug
    ? BLOG_POSTS.find((p) => p.slug === currentSlug)
    : null;

  // Dynamically update document title, description, canonical link, and Schema.org
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (activePost) {
      document.title = `${activePost.seoTitle} | Mikky Digitalz`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', activePost.metaDescription);
      }
      
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `https://mikkydigitalz.netlify.app/blog/${activePost.slug}`);

      // Inject structured data
      const scriptId = 'blog-schema-jsonld';
      let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }

      scriptTag.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': `https://mikkydigitalz.netlify.app/blog/${activePost.slug}#article`,
            'headline': activePost.title,
            'description': activePost.metaDescription,
            'image': activePost.featuredImage,
            'datePublished': '2026-10-12T08:00:00Z',
            'dateModified': '2026-10-13T09:00:00Z',
            'author': {
              '@type': 'Person',
              'name': 'Mitchell Adetayo',
              'jobTitle': 'Lead Web Architect',
              'url': 'https://mikkydigitalz.netlify.app/#founder',
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'Mikky Digitalz',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png',
              },
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': `https://mikkydigitalz.netlify.app/blog/${activePost.slug}`,
            },
          },
          ...(activePost.faqs && activePost.faqs.length > 0 ? [{
            '@type': 'FAQPage',
            '@id': `https://mikkydigitalz.netlify.app/blog/${activePost.slug}#faq`,
            'mainEntity': activePost.faqs.map((f) => ({
              '@type': 'Question',
              'name': f.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': f.answer,
              },
            })),
          }] : []),
        ],
      });
    } else {
      document.title = 'SEO, GEO & Web Engineering Blog | Mikky Digitalz';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          'Articles on Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), WordPress performance tuning, and Shopify custom builds by Mitchell Adetayo.'
        );
      }
      const canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', 'https://mikkydigitalz.netlify.app/blog');
      }
    }
  }, [activePost]);

  const categories = [
    'All',
    'SEO & AEO',
    'WordPress & Speed',
    'Squarespace & Shopify',
    'Engineering & CRO',
  ];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // ==========================================
  // ARTICLE DETAIL VIEW
  // ==========================================
  if (activePost) {
    const schemaData = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': `https://mikkydigitalz.netlify.app/#/blog/${activePost.slug}`,
          'headline': activePost.title,
          'description': activePost.metaDescription,
          'datePublished': activePost.publishedDate,
          'dateModified': activePost.publishedDate,
          'image': activePost.featuredImage,
          'author': {
            '@type': 'Person',
            'name': activePost.author.name,
            'jobTitle': activePost.author.role,
            'url': 'https://www.upwork.com/freelancers/~016fe1e73c258824d4',
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Mikky Digitalz',
            'url': 'https://mikkydigitalz.netlify.app',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png',
            },
          },
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `https://mikkydigitalz.netlify.app/#/blog/${activePost.slug}`,
          },
        },
        {
          '@type': 'FAQPage',
          'mainEntity': activePost.faqs.map((f) => ({
            '@type': 'Question',
            'name': f.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': f.answer,
            },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://mikkydigitalz.netlify.app/#/home',
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Blog',
              'item': 'https://mikkydigitalz.netlify.app/#/blog',
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': activePost.title,
              'item': `https://mikkydigitalz.netlify.app/#/blog/${activePost.slug}`,
            },
          ],
        },
      ],
    };

    return (
      <article className="w-full py-12 md:py-16 bg-[#070612] text-[#f1f5f9] relative overflow-hidden">
        {/* Background ambient radial purple glow */}
        <div className="absolute top-20 right-1/4 w-[600px] h-[350px] bg-purple-600/10 blur-[140px] pointer-events-none rounded-full -z-10" />

        {/* Inject JSON-LD Schema for Google, Perplexity & AI Search Crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back & Breadcrumb bar */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-[#261d56]">
            <button
              onClick={onBackToIndex}
              className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </button>

            <button
              onClick={handleCopyShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#130f2e] border border-[#2c2263] hover:border-purple-500/50 text-xs text-slate-300 transition-colors cursor-pointer"
              title="Share article URL"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-purple-300" /> : <Share2 className="w-3.5 h-3.5 text-purple-400" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>

          {/* Article Header */}
          <header className="space-y-4 mb-10">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-purple-600/25 text-purple-300 font-bold border border-purple-500/40">
                {activePost.category}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-purple-400" />
                {activePost.publishedDate}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                {activePost.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
              {activePost.title}
            </h1>

            {/* Author Card */}
            <div className="flex items-center gap-3 pt-2">
              <img
                src={activePost.author.avatar}
                alt={activePost.author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-purple-500/50 shadow-md shadow-purple-950/40"
              />
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{activePost.author.name}</span>
                  <span className="text-[11px] font-semibold text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30">
                    {activePost.author.upworkRating}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{activePost.author.role}</p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="rounded-3xl overflow-hidden bg-[#0e0b24] border border-[#2c2263] aspect-16/9 mb-10 shadow-2xl">
            <img
              src={activePost.featuredImage}
              alt={activePost.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ========================================================
              AEO DIRECT ANSWER BOX (Optimized for Google Snippets & AI)
              ======================================================== */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#130f2e] to-[#1e1740] border-2 border-purple-500/50 shadow-2xl mb-10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>AEO Direct Answer (Quick Overview)</span>
            </div>
            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
              {activePost.aeoDirectAnswer}
            </p>
          </div>

          {/* ========================================================
              GEO FACTUAL METRICS BOX (Statistical Citations for LLMs)
              ======================================================== */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#0e0b24] border border-[#2c2263] shadow-lg mb-12 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <span>Key Data & Quotable GEO Benchmarks</span>
            </div>
            <div className="space-y-2.5">
              {activePost.geoKeyMetrics.map((metric, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="w-4 h-4 rounded-full bg-purple-600/25 text-purple-300 flex items-center justify-center shrink-0 mt-0.5 border border-purple-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Table of Contents */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0e0b24] border border-[#261d56] mb-12 shadow-md">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block mb-3">
              Table of Contents
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              {activePost.tableOfContents.map((toc, i) => (
                <li key={toc.id} className="flex items-center gap-2 text-slate-300 hover:text-purple-300 transition-colors">
                  <span className="font-mono text-purple-400 text-xs">0{i + 1}.</span>
                  <a href={`#${toc.id}`} className="hover:underline">
                    {toc.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Article Prose Content */}
          <div className="prose prose-invert prose-purple max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
            <div dangerouslySetInnerHTML={{ __html: activePost.content.replace(/\n\n/g, '<br/><br/>').replace(/### (.*)/g, '<h3 class="text-xl sm:text-2xl font-bold text-white mt-8 mb-3 text-purple-200">$1</h3>').replace(/---/g, '<hr class="border-[#261d56] my-8"/>') }} />
          </div>

          {/* Linked Authentic Portfolio Case Study Proof */}
          {activePost.portfolioProject && (
            <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#161138] via-[#0e0b24] to-[#1a143b] border-2 border-purple-500/50 shadow-2xl relative overflow-hidden group">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Real Production Proof Behind This Guide</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/60 text-purple-200 text-xs font-extrabold border border-purple-400/40">
                  <span>Verified Result:</span>
                  <span className="text-white bg-purple-600/50 px-2 py-0.5 rounded-full">{activePost.portfolioProject.metric} {activePost.portfolioProject.metricLabel}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Portfolio Project Screenshot & Mockup */}
                <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-16/10 bg-[#070612] border border-purple-500/40 shadow-lg group-hover:border-purple-300 transition-colors">
                  <img
                    src={activePost.portfolioProject.thumbnail}
                    alt={activePost.portfolioProject.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {activePost.portfolioProject.mockupUrl && (
                    <div className="absolute -bottom-2 -right-2 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shadow-2xl border-2 border-[#130f2e] hidden sm:block">
                      <img
                        src={activePost.portfolioProject.mockupUrl}
                        alt={`${activePost.portfolioProject.title} device preview`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Case Study Details */}
                <div className="md:col-span-7 space-y-3">
                  <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block">
                    {activePost.portfolioProject.category}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-200 transition-colors">
                    {activePost.portfolioProject.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {activePost.portfolioProject.tagline}
                  </p>
                  
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        const matchedProj = PROJECTS.find(p => p.id === activePost.portfolioProject?.id);
                        if (matchedProj && onSelectProject) {
                          onSelectProject(matchedProj);
                        } else if (onNavigate) {
                          onNavigate('work');
                        }
                      }}
                      className="px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>View Full Portfolio Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenContact(activePost.portfolioProject?.category || activePost.category)}
                      className="px-4 py-2.5 rounded-full bg-[#130f2e] hover:bg-[#1a143b] border border-[#2c2263] hover:border-purple-500/50 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Build Similar Platform
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-8 mt-12 border-t border-[#261d56] flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-purple-400 mr-1" />
            {activePost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[#130f2e] border border-[#2c2263] text-xs text-purple-200 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* FAQ Schema Accordion */}
          <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#0e0b24] border border-[#2c2263] space-y-4 shadow-xl">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Frequently Asked Questions (Schema AEO)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Common Questions Answered
              </h3>
            </div>

            {activePost.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="rounded-xl bg-[#130f2e] border border-[#261d56] overflow-hidden">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-sm text-white hover:text-purple-300 cursor-pointer transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#261d56] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Author Bio Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0e0b24] border border-[#2c2263] flex flex-col sm:flex-row items-center gap-6 shadow-xl">
            <img
              src={activePost.author.avatar}
              alt={activePost.author.name}
              className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-purple-500/50 shadow-md shadow-purple-950/40 shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h4 className="text-lg font-bold text-white">{activePost.author.name}</h4>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                  {activePost.author.upworkRating}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Founder and principal web architect at Mikky Digitalz. Specializing in high-converting, sub-second web platforms across WordPress, Squarespace, and Shopify with verified 99.8% PageSpeed ratings.
              </p>
              <div className="pt-1 flex justify-center sm:justify-start gap-3 text-xs">
                <a
                  href="https://www.upwork.com/freelancers/~016fe1e73c258824d4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 hover:underline"
                >
                  Upwork Profile
                </a>
                <span className="text-slate-600">•</span>
                <a
                  href="https://www.linkedin.com/in/mikky-digitalz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Inquiry Callout */}
          <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#140f33] to-[#1c1445] border border-purple-500/40 text-center space-y-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-white">
              Ready to implement this on your website?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
              Get a custom high-converting web engineering proposal tailored to your business, with guaranteed sub-second speeds.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onOpenContact(activePost.category)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit Project Inquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalendly}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#130f2e] hover:bg-[#1a143b] border border-[#2c2263] text-slate-200 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Book 20-Min Strategy Call
              </button>
            </div>
          </div>

        </div>
      </article>
    );
  }

  // ==========================================
  // BLOG INDEX VIEW
  // ==========================================
  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="w-full py-12 md:py-16 bg-[#070612] text-[#f1f5f9] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-20 right-1/4 w-[600px] h-[350px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-0" />
      <div className="absolute top-96 left-10 w-[500px] h-[300px] bg-purple-900/10 blur-[140px] rounded-full pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Blog Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 mb-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>SEO • GEO • AEO ENGINEERING JOURNAL</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mt-2 mb-4">
              High-Converting Web Architecture <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-fuchsia-400">Insights</span>.
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Actionable playbooks on Generative Engine Optimization (GEO), Core Web Vitals, sub-second PageSpeed, and high-converting WordPress & Shopify builds by Mitchell Adetayo.
            </p>
          </div>

          {onOpenSeoAudit && (
            <button
              onClick={onOpenSeoAudit}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600/30 to-violet-600/20 border border-purple-500/40 hover:border-purple-400 text-purple-200 hover:text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-900/20 transition-all cursor-pointer shrink-0 group self-start lg:self-end"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span>Google Console & SEO Ranking Audit</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                GSC Ready
              </span>
            </button>
          )}
        </div>

        {/* Search & Topic Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-400/60" />
            <input
              type="text"
              placeholder="Search playbooks, SEO, speed..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#0e0b24] border border-[#261d56] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-[#0e0b24] text-slate-300 border border-[#261d56] hover:bg-[#130f2e] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Featured Lead Post */}
        {searchTerm === '' && selectedCategory === 'All' && (
          <a
            href={`/blog/${featuredPost.slug}`}
            onClick={(e) => {
              if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                onSelectPost(featuredPost.slug);
              }
            }}
            className="block mb-14 p-6 sm:p-10 rounded-3xl bg-[#0e0b24] border border-[#261d56] hover:border-purple-500/70 transition-all cursor-pointer shadow-2xl group navy-card-hover text-inherit no-underline"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-600 text-white shadow-sm shadow-purple-600/40">
                    Featured Playbook
                  </span>
                  <span className="text-xs text-purple-300 font-medium">
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-purple-300 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed line-clamp-3">
                  {featuredPost.summary}
                </p>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <img
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-purple-500/30"
                    />
                    <span>{featuredPost.author.name}</span>
                    <span>•</span>
                    <span>{featuredPost.publishedDate}</span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:translate-x-1 transition-transform">
                    Read Playbook <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl overflow-hidden aspect-16/10 bg-[#130f2e] border border-[#261d56]">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </a>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              onClick={(e) => {
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  onSelectPost(post.slug);
                }
              }}
              className="p-6 rounded-3xl bg-[#0e0b24] border border-[#261d56] hover:border-purple-500/60 transition-all cursor-pointer flex flex-col justify-between navy-card-hover group text-inherit no-underline"
            >
              <div>
                <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-5 bg-[#130f2e] border border-[#261d56]/60">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#070612]/90 border border-purple-500/40 text-[11px] font-bold text-purple-300 backdrop-blur-md">
                    {post.category}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-purple-300/80 mb-2">
                  <span>{post.publishedDate}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors leading-snug mb-2.5">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-[#261d56] flex items-center justify-between text-xs font-bold text-purple-400">
                <span className="text-slate-400">By {post.author.name}</span>
                <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform text-purple-300">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            No articles match your query. Try a different search term or category.
          </div>
        )}

        {/* Real Portfolio Case Studies Cited in the Blog */}
        <div className="mt-20 pt-16 border-t border-[#261d56]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/20 mb-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CLIENT RESULTS • PORTFOLIO PROOF</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Live Portfolio Case Studies Behind Our Insights
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl">
                Every speed metric, SEO architecture, and conversion benchmark published in our articles is tested and proven across active client web applications.
              </p>
            </div>

            {onNavigate && (
              <button
                onClick={() => onNavigate('work')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer group shrink-0"
              >
                <span>Browse Full Portfolio ({PROJECTS.length} Projects)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROJECTS.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                onClick={() => {
                  if (onSelectProject) {
                    onSelectProject(proj);
                  } else if (onNavigate) {
                    onNavigate('work');
                  }
                }}
                className="rounded-2xl bg-[#0e0b24] border border-[#261d56] hover:border-purple-500/60 p-4 transition-all cursor-pointer group flex flex-col justify-between navy-card-hover"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden aspect-16/10 mb-3 bg-[#130f2e] border border-[#261d56]/50">
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#070612]/90 border border-purple-500/30 text-[10px] font-bold text-purple-300 backdrop-blur-md">
                      {proj.categoryLabel}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[11px] font-extrabold border border-emerald-500/20 mb-2">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{proj.result}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-1">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {proj.tagline}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-[#261d56] flex items-center justify-between text-[11px] font-semibold text-purple-400">
                  <span className="text-slate-400">{proj.platform}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-purple-300">
                    Case Study <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GEO / AEO Advisory Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#130f2e] via-[#0e0b24] to-[#1e133d] border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>BUILT-IN SEO, GEO & AEO STANDARDS</span>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Every Mikky Digitalz website is engineered for AI search citation.
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We configure complete Schema.org JSON-LD architectures, sub-second Core Web Vitals, and semantic entity hierarchies right out of the box.
            </p>
          </div>

          <button
            onClick={() => onOpenContact('SEO & AEO Architecture')}
            className="shrink-0 px-7 py-3.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/40 hover:shadow-purple-500/60 transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Inquire About AEO & SEO Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
