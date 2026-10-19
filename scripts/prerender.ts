/**
 * Post-build pre-render for search engines and AI crawlers (SEO / GEO / AEO).
 *
 * Runs after `vite build`. For every public route it writes a real HTML file into
 * dist/ (e.g. dist/services/index.html) containing:
 *   - a unique <title>, meta description, canonical, Open Graph and Twitter tags
 *   - page-specific JSON-LD structured data
 *   - the page's readable text inside #root
 *
 * React's createRoot() replaces the contents of #root when the app loads, so
 * visitors still get the normal interactive site. Crawlers that don't run
 * JavaScript (GPTBot, ClaudeBot, PerplexityBot, etc.) get real content.
 *
 * Content comes from the same data files the React app uses, so the two stay
 * in sync. Edit SITE below to change the public name or profile links.
 */
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import { BLOG_POSTS, type BlogPost } from '../src/data/blogData';
import { SERVICES_DATA, PRICING_PLANS, ADDONS, FAQS, PROJECTS } from '../src/data/siteData';

// ---------------------------------------------------------------------------
// Site identity — change these in one place
// ---------------------------------------------------------------------------
const SITE = {
  url: 'https://mikky-digitalz.netlify.app',
  brand: 'Mikky Digitalz',
  personName: 'Michael Adetayo',
  jobTitle: 'WordPress Website Designer & Elementor Expert',
  logo: 'https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png',
  // Default link-preview image (WhatsApp, LinkedIn, X, Facebook). Lives in public/.
  shareImage: 'https://mikky-digitalz.netlify.app/website-preview.jpg',
  shareImageAlt: 'Mikky Digitalz website shown on a laptop and phone',
  country: 'NG',
  description:
    'Mikky Digitalz is the web design studio of Michael Adetayo, a WordPress Website Designer and Elementor Expert in Nigeria building fast, responsive websites for startups, organizations and service businesses, with Squarespace and Shopify builds, Figma-to-WordPress conversion and Elementor site rescue.',
  // Public profiles. Only list profiles you own; these power entity matching in AI search.
  sameAs: [
    'https://www.linkedin.com/in/mikky-digitalz/',
    'https://contra.com/mitchell_adetayo_wxd9nczu',
    'https://www.fiverr.com/mitchell_56',
    'https://www.behance.net/michaeladetayo',
    'https://dribbble.com/Adetayo_123',
    'https://x.com/AdetayoMitchell',
    'https://web.facebook.com/people/Mikkiedigitalz/61555922321995/',
  ],
};

const DIST = path.resolve(import.meta.dirname, '..', 'dist');
const TEMPLATE = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
const TODAY = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const esc = (s: string) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const abs = (p: string) => (p === '/' ? `${SITE.url}/` : `${SITE.url}${p}`);

const isoDate = (d: string) => {
  // Read the date's own calendar day (no timezone shift).
  const t = new Date(d);
  if (isNaN(t.getTime())) return TODAY;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
};

const ORG_ID = `${SITE.url}/#organization`;
const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** Site-wide entity graph: who you are, linked to your public profiles. */
const baseGraph = () => [
  {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.brand,
    url: `${SITE.url}/`,
    logo: SITE.logo,
    image: SITE.logo,
    description: SITE.description,
    founder: { '@id': PERSON_ID },
    address: { '@type': 'PostalAddress', addressCountry: SITE.country },
    areaServed: 'Worldwide',
    knowsAbout: [
      'WordPress', 'Elementor', 'Elementor Pro', 'Advanced Custom Fields', 'WooCommerce',
      'Squarespace', 'Shopify', 'Figma to WordPress', 'Website redesign', 'Core Web Vitals',
      'On-page SEO',
    ],
    sameAs: SITE.sameAs,
  },
  {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.personName,
    jobTitle: SITE.jobTitle,
    worksFor: { '@id': ORG_ID },
    url: `${SITE.url}/`,
    image: SITE.logo,
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Ilorin' },
    sameAs: SITE.sameAs,
  },
  {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE.url}/`,
    name: SITE.brand,
    publisher: { '@id': ORG_ID },
  },
];

const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: abs(it.path),
  })),
});

const faqPage = (id: string, faqs: { question: string; answer: string }[]) => ({
  '@type': 'FAQPage',
  '@id': id,
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

interface PageDef {
  route: string; // "/" or "/services"
  title: string;
  description: string;
  ogType?: 'website' | 'article';
  image?: string;
  graph: object[]; // page-specific JSON-LD nodes
  body: string; // crawler-readable HTML placed inside #root
}

/** Shared nav so crawlers can follow every page from every page. */
const nav = () => `
<nav aria-label="Main">
  <a href="/">Home</a> · <a href="/services">Services</a> · <a href="/work">Work</a> ·
  <a href="/pricing">Pricing</a> · <a href="/blog">Blog</a>
</nav>`;

const footer = () => `
<footer>
  <p>${esc(SITE.brand)} — ${esc(SITE.personName)}, ${esc(SITE.jobTitle)}. Based in Nigeria, working with clients worldwide.</p>
  <p>Profiles: ${SITE.sameAs.map((u) => `<a href="${esc(u)}" rel="me">${esc(new URL(u).hostname.replace('www.', ''))}</a>`).join(' · ')}</p>
</footer>`;

const wrap = (inner: string) => `
<div id="prerender-content" style="max-width:860px;margin:0 auto;padding:96px 16px 64px;font-family:Onest,system-ui,sans-serif;line-height:1.65;color:#cbd5e1">
${nav()}
<main>
${inner}
</main>
${footer()}
</div>`;

// ---------------------------------------------------------------------------
// Render a page into the built index.html template
// ---------------------------------------------------------------------------
function render(page: PageDef): string {
  const url = abs(page.route);
  const image = page.image || SITE.shareImage;
  let html = TEMPLATE;

  const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
    const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/?>`, 'i');
    const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
    html = re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`);
  };

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(page.title)}</title>`);
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${url}" />`);
  setMeta('name', 'description', page.description);
  setMeta('property', 'og:title', page.title);
  setMeta('property', 'og:description', page.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:type', page.ogType || 'website');
  setMeta('property', 'og:image', image);
  setMeta('name', 'twitter:title', page.title);
  setMeta('name', 'twitter:description', page.description);
  setMeta('name', 'twitter:image', image);
  setMeta('name', 'twitter:card', 'summary_large_image');
  if (!page.image) {
    setMeta('property', 'og:image:width', '1376');
    setMeta('property', 'og:image:height', '768');
    setMeta('property', 'og:image:alt', SITE.shareImageAlt);
    setMeta('name', 'twitter:image:alt', SITE.shareImageAlt);
  }

  // Replace the template's JSON-LD with the full site graph + this page's nodes.
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@graph': [...baseGraph(), ...page.graph] }, null, 2)
    .replace(/</g, '\\u003c');
  html = html.replace(
    /<!-- Schema\.org[\s\S]*?<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">\n${jsonLd}\n    </script>`,
  );

  html = html.replace('<div id="root"></div>', `<div id="root">${wrap(page.body)}</div>`);
  return html;
}

function write(route: string, html: string) {
  const file = route === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
}

// ---------------------------------------------------------------------------
// Page definitions
// ---------------------------------------------------------------------------
const servicesListHtml = SERVICES_DATA.map(
  (s) => `
<section id="${esc(s.anchor)}">
  <h2>${esc(s.title)}</h2>
  <p><strong>${esc(s.subtitle)}</strong></p>
  <p>${esc(s.description)}</p>
  <ul>${s.bulletPoints.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
  <p><strong>Ideal for:</strong> ${esc(s.idealFor)} <strong>Typical turnaround:</strong> ${esc(s.turnaroundTime)}.</p>
</section>`,
).join('');

const servicesGraph = SERVICES_DATA.map((s) => ({
  '@type': 'Service',
  '@id': `${SITE.url}/services#${s.anchor}`,
  name: s.title,
  description: s.description,
  serviceType: s.title,
  provider: { '@id': ORG_ID },
  areaServed: 'Worldwide',
}));

const postsListHtml = BLOG_POSTS.map(
  (p) => `<li><a href="/blog/${esc(p.slug)}">${esc(p.title)}</a> — ${esc(p.summary)}</li>`,
).join('');

const pages: PageDef[] = [];

// Home ----------------------------------------------------------------------
pages.push({
  route: '/',
  title: `${SITE.brand} — WordPress & Elementor Website Designer | ${SITE.personName}`,
  description:
    'Michael Adetayo (Mikky Digitalz) designs and builds fast, responsive WordPress & Elementor websites, plus Squarespace and Shopify builds, for startups, organizations and service businesses.',
  graph: [
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/#webpage`,
      url: `${SITE.url}/`,
      name: `${SITE.brand} — WordPress & Elementor Website Designer`,
      isPartOf: { '@id': WEBSITE_ID },
      about: { '@id': ORG_ID },
    },
  ],
  body: `
<h1>Websites Built to Convert, Not Just Impress.</h1>
<p>Hi, I'm <strong>${esc(SITE.personName)}</strong> (${esc(SITE.brand)}), a ${esc(SITE.jobTitle)} based in Nigeria. I design and build fast, responsive WordPress &amp; Elementor, Squarespace and Shopify websites for startups, organizations and service-based businesses — new builds, redesigns, Figma-to-WordPress conversions and rescues of unfinished Elementor sites.</p>
<h2>Services</h2>
<ul>${SERVICES_DATA.map((s) => `<li><a href="/services#${esc(s.anchor)}">${esc(s.title)}</a> — ${esc(s.subtitle)}</li>`).join('')}</ul>
<h2>Pricing</h2>
<ul>${PRICING_PLANS.map((p) => `<li>${esc(p.name)}: ${esc(p.price)} — ${esc(p.description)}</li>`).join('')}</ul>
<p><a href="/pricing">See full pricing and FAQs</a> · <a href="/work">See the portfolio</a></p>
<h2>Latest articles</h2>
<ul>${postsListHtml}</ul>`,
});

// Services ------------------------------------------------------------------
pages.push({
  route: '/services',
  title: `WordPress, Elementor, Squarespace & Shopify Website Services | ${SITE.brand}`,
  description:
    'Custom WordPress & Elementor builds, Squarespace and Shopify websites, Figma-to-WordPress conversion, and rescue of broken or unfinished Elementor sites by Michael Adetayo.',
  graph: [
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/services#webpage`,
      url: abs('/services'),
      name: 'Website Design & Development Services',
      isPartOf: { '@id': WEBSITE_ID },
    },
    ...servicesGraph,
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]),
  ],
  body: `
<h1>Website Design &amp; Development Services</h1>
<p>Tailored websites on WordPress, Elementor, Squarespace and Shopify — brand-new custom builds, Figma-to-code conversion, or an urgent rescue for an unfinished site. Every project is built to be fast, mobile-responsive and easy for your team to manage.</p>
${servicesListHtml}`,
});

// Work ----------------------------------------------------------------------
// Only project names, platforms and descriptions are published here.
// Client names, testimonials and result figures are intentionally left out
// of crawler HTML and structured data until they are verified.
pages.push({
  route: '/work',
  title: `Portfolio — WordPress, Elementor & Squarespace Website Projects | ${SITE.brand}`,
  description:
    'Selected website projects by Michael Adetayo (Mikky Digitalz): WordPress & Elementor builds, Squarespace sites, Shopify storefronts and Figma-to-code conversions.',
  graph: [
    {
      '@type': 'CollectionPage',
      '@id': `${SITE.url}/work#webpage`,
      url: abs('/work'),
      name: 'Website Design Portfolio',
      isPartOf: { '@id': WEBSITE_ID },
    },
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }]),
  ],
  body: `
<h1>Website Design Portfolio</h1>
<p>Selected websites designed and built by ${esc(SITE.personName)} (${esc(SITE.brand)}).</p>
${PROJECTS.map(
  (p) => `
<article>
  <h2>${esc(p.title)}</h2>
  <p><strong>Platform:</strong> ${esc(p.platform)}</p>
  <p>${esc(p.tagline)}</p>
  <p><strong>Challenge:</strong> ${esc(p.challenge)}</p>
  <p><strong>Solution:</strong> ${esc(p.solution)}</p>
  <ul>${p.deliverables.map((d) => `<li>${esc(d)}</li>`).join('')}</ul>
</article>`,
).join('')}`,
});

// Pricing -------------------------------------------------------------------
pages.push({
  route: '/pricing',
  title: `Website Design Pricing — WordPress & Squarespace Packages | ${SITE.brand}`,
  description: `Transparent website pricing from ${PRICING_PLANS[0].price}: Starter, Growth and Custom packages for WordPress, Elementor, Squarespace and Shopify builds, plus add-ons and FAQs.`,
  graph: [
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/pricing#webpage`,
      url: abs('/pricing'),
      name: 'Website Design Pricing',
      isPartOf: { '@id': WEBSITE_ID },
    },
    faqPage(`${SITE.url}/pricing#faq`, FAQS),
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]),
  ],
  body: `
<h1>Website Design Pricing</h1>
<p>Every project begins with a free consultation call to confirm scope and goals. Clear deliverables and fixed investment options.</p>
${PRICING_PLANS.map(
  (p) => `
<section>
  <h2>${esc(p.name)} — ${esc(p.price)}</h2>
  <p>${esc(p.description)}</p>
  <ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
</section>`,
).join('')}
<h2>Add-ons</h2>
<ul>${ADDONS.map((a) => `<li><strong>${esc(a.title)}</strong> (${esc(a.price)}) — ${esc(a.description)}</li>`).join('')}</ul>
<h2>Frequently asked questions</h2>
${FAQS.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('')}`,
});

// Blog index ----------------------------------------------------------------
pages.push({
  route: '/blog',
  title: `Website Design, SEO & GEO Blog | ${SITE.brand}`,
  description:
    'Practical articles by Michael Adetayo on WordPress & Elementor performance, choosing a website platform, Figma-to-code, and getting cited by AI search (GEO & AEO).',
  graph: [
    {
      '@type': 'Blog',
      '@id': `${SITE.url}/blog#blog`,
      url: abs('/blog'),
      name: `${SITE.brand} Blog`,
      publisher: { '@id': ORG_ID },
      blogPost: BLOG_POSTS.map((p) => ({ '@id': `${abs(`/blog/${p.slug}`)}#article` })),
    },
    breadcrumb([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]),
  ],
  body: `
<h1>Website Design, SEO &amp; GEO Articles</h1>
<p>Playbooks on WordPress &amp; Elementor performance, platform choice, Figma-to-code and AI search visibility by ${esc(SITE.personName)}.</p>
<ul>${postsListHtml}</ul>`,
});

// Blog posts ----------------------------------------------------------------
const postPage = (p: BlogPost): PageDef => {
  const url = abs(`/blog/${p.slug}`);
  const published = isoDate(p.publishedDate);
  return {
    route: `/blog/${p.slug}`,
    title: p.seoTitle,
    description: p.metaDescription,
    ogType: 'article',
    image: p.featuredImage,
    graph: [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        headline: p.title,
        description: p.metaDescription,
        image: p.featuredImage,
        datePublished: published,
        dateModified: published,
        author: { '@id': PERSON_ID },
        publisher: { '@id': ORG_ID },
        keywords: p.tags.join(', '),
        articleSection: p.category,
      },
      ...(p.faqs?.length ? [faqPage(`${url}#faq`, p.faqs)] : []),
      breadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: p.title, path: `/blog/${p.slug}` },
      ]),
    ],
    body: `
<article>
  <h1>${esc(p.title)}</h1>
  <p>By ${esc(SITE.personName)}, ${esc(SITE.brand)} · <time datetime="${published}">${esc(p.publishedDate)}</time> · ${esc(p.readTime)}</p>
  <p><strong>${esc(p.aeoDirectAnswer)}</strong></p>
  ${marked.parse(p.content.trim(), { async: false }) as string}
  ${
    p.faqs?.length
      ? `<h2>Frequently asked questions</h2>${p.faqs.map((f) => `<h3>${esc(f.question)}</h3><p>${esc(f.answer)}</p>`).join('')}`
      : ''
  }
  <p><a href="/blog">More articles</a> · <a href="/services">Services</a></p>
</article>`,
  };
};
BLOG_POSTS.forEach((p) => pages.push(postPage(p)));

// ---------------------------------------------------------------------------
// Write pages, 404 page and sitemap
// ---------------------------------------------------------------------------
for (const page of pages) write(page.route, render(page));

// 404: the app shell (shows the homepage UI) but marked noindex, served with a real 404 status by Netlify.
const notFound = TEMPLATE.replace('</head>', '    <meta name="robots" content="noindex" />\n  </head>').replace(
  /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
  '',
);
fs.writeFileSync(path.join(DIST, '404.html'), notFound);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => {
    const post = BLOG_POSTS.find((b) => `/blog/${b.slug}` === p.route);
    const lastmod = post ? isoDate(post.publishedDate) : TODAY;
    return `  <url>\n    <loc>${abs(p.route)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  })
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);

// llms.txt: plain-text site summary for AI assistants (https://llmstxt.org)
const llms = `# ${SITE.brand}

> ${SITE.description}

${SITE.brand} is run by ${SITE.personName}, a ${SITE.jobTitle} based in Nigeria who works with clients worldwide. Contact is through the "Book a Call" form on the site or WhatsApp.

## Services
${SERVICES_DATA.map((s) => `- [${s.title}](${SITE.url}/services#${s.anchor}): ${s.subtitle}`).join('\n')}

## Pricing
${PRICING_PLANS.map((p) => `- ${p.name}: ${p.price} — ${p.description}`).join('\n')}
- Full details and FAQs: ${SITE.url}/pricing

## Articles
${BLOG_POSTS.map((p) => `- [${p.title}](${SITE.url}/blog/${p.slug}): ${p.summary}`).join('\n')}

## Pages
- [Home](${SITE.url}/)
- [Services](${SITE.url}/services)
- [Portfolio](${SITE.url}/work)
- [Pricing](${SITE.url}/pricing)
- [Blog](${SITE.url}/blog)

## Profiles
${SITE.sameAs.map((u) => `- ${u}`).join('\n')}
`;
fs.writeFileSync(path.join(DIST, 'llms.txt'), llms);

console.log(`Pre-rendered ${pages.length} pages:\n${pages.map((p) => `  ${p.route}`).join('\n')}`);
