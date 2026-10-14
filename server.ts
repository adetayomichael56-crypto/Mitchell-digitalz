import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { BLOG_POSTS, BlogPost } from './src/data/blogData';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const isProduction = process.env.NODE_ENV === 'production';
const DATA_FILE = path.resolve(__dirname, 'data', 'inquiries.json');

// In-memory rate limiting map: IP -> timestamp array
const ipSubmissionTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_SUBMISSIONS_PER_WINDOW = 6;

// Helper: Ensure data directory and file exist
function getInquiries(): any[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading inquiries data file:', err);
    return [];
  }
}

function saveInquiries(inquiries: any[]): boolean {
  try {
    const dataDir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error saving inquiries data file:', err);
    return false;
  }
}

function sanitizeText(str: string = ''): string {
  return String(str)
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .trim();
}

function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

function injectPostMetadata(baseHtml: string, post: BlogPost): string {
  let html = baseHtml;

  // Replace title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${post.seoTitle}</title>`);

  // Replace meta description
  const cleanDesc = post.metaDescription.replace(/"/g, '&quot;');
  html = html.replace(/<meta name="description" content=".*?" \/>/i, `<meta name="description" content="${cleanDesc}" />`);

  // Replace og:title & og:description & og:image
  const cleanTitle = post.title.replace(/"/g, '&quot;');
  const cleanSummary = post.summary.replace(/"/g, '&quot;');
  html = html.replace(/<meta property="og:title" content=".*?" \/>/i, `<meta property="og:title" content="${cleanTitle}" />`);
  html = html.replace(/<meta property="og:description" content=".*?" \/>/i, `<meta property="og:description" content="${cleanSummary}" />`);
  html = html.replace(/<meta property="og:image" content=".*?" \/>/i, `<meta property="og:image" content="${post.featuredImage}" />`);

  // Replace twitter cards
  html = html.replace(/<meta name="twitter:title" content=".*?" \/>/i, `<meta name="twitter:title" content="${cleanTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content=".*?" \/>/i, `<meta name="twitter:description" content="${cleanSummary}" />`);
  html = html.replace(/<meta name="twitter:image" content=".*?" \/>/i, `<meta name="twitter:image" content="${post.featuredImage}" />`);

  // Article JSON-LD
  const articleSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `https://mikkydigitalz.netlify.app/blog/${post.slug}#article`,
        "headline": post.title,
        "name": post.seoTitle,
        "description": post.metaDescription,
        "image": post.featuredImage,
        "datePublished": "2026-10-12T08:00:00+00:00",
        "dateModified": "2026-10-13T09:00:00+00:00",
        "mainEntityOfPage": `https://mikkydigitalz.netlify.app/blog/${post.slug}`,
        "author": {
          "@type": "Person",
          "name": "Mitchell Adetayo",
          "jobTitle": "Lead Web Architect",
          "url": "https://mikkydigitalz.netlify.app/#founder"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Mikky Digitalz",
          "url": "https://mikkydigitalz.netlify.app/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png"
          }
        }
      },
      ...(post.faqs && post.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "@id": `https://mikkydigitalz.netlify.app/blog/${post.slug}#faq`,
        "mainEntity": post.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : [])
    ]
  };

  const extraHead = `
    <link rel="canonical" href="https://mikkydigitalz.netlify.app/blog/${post.slug}" />
    <meta property="og:url" content="https://mikkydigitalz.netlify.app/blog/${post.slug}" />
    <script type="application/ld+json">
${JSON.stringify(articleSchema, null, 2)}
    </script>
`;
  html = html.replace('</head>', `${extraHead}</head>`);

  // Noscript fallback for pure text crawlers
  const noscriptSnippet = `
    <noscript>
      <article style="padding:2rem;max-width:800px;margin:auto;">
        <h1>${post.title}</h1>
        <p><strong>Published on:</strong> ${post.publishedDate} by ${post.author.name}</p>
        <p><strong>AEO Direct Answer / Overview:</strong> ${post.aeoDirectAnswer}</p>
        <div>${post.summary}</div>
      </article>
    </noscript>
  `;
  html = html.replace('<div id="root"></div>', `<div id="root"></div>\n${noscriptSnippet}`);

  return html;
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '2mb' }));

  // Request logger
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // Health endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      service: 'Mikky Digitalz Inquiry Engine',
      serverTime: new Date().toISOString(),
    });
  });

  // GET all inquiries
  app.get('/api/inquiries', (_req: Request, res: Response) => {
    const inquiries = getInquiries();
    // Sort newest first
    inquiries.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    res.json(inquiries);
  });

  // POST new client inquiry (with multi-layer anti-spam and validation)
  app.post('/api/inquiries', (req: Request, res: Response) => {
    const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
    const now = Date.now();

    // 1. Rate Limiting Check
    const timestamps = (ipSubmissionTimestamps.get(clientIp) || []).filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );
    if (timestamps.length >= MAX_SUBMISSIONS_PER_WINDOW) {
      res.status(429).json({
        error: 'Too many inquiry submissions. Please wait a few minutes before trying again or message directly via WhatsApp.',
      });
      return;
    }

    const {
      fullName,
      email,
      phone,
      businessName,
      projectType,
      budgetRange,
      timeline,
      message,
      preferredContact,
      referralSource,
      _hp_company,
      _formRenderTime,
      securityAnswer,
      securityExpected,
    } = req.body;

    // 2. Honeypot check (hidden bot trap)
    if (_hp_company && String(_hp_company).trim().length > 0) {
      console.warn(`[Anti-Spam] Honeypot triggered from IP: ${clientIp}`);
      // Pretend to succeed to waste bot resources without persisting spam
      res.status(200).json({
        success: true,
        referenceId: `MK-BOT-${Math.floor(1000 + Math.random() * 9000)}`,
        message: 'Inquiry received securely.',
      });
      return;
    }

    // 3. Minimum interaction time check (instant fill is bot)
    const renderTime = Number(_formRenderTime) || 0;
    const durationMs = renderTime > 0 ? now - renderTime : 5000;
    const securityFlags: string[] = [];

    if (renderTime > 0 && durationMs < 1800) {
      securityFlags.push('Fast-submission (< 1.8s)');
    }

    // 4. Human Verification challenge verification
    if (securityExpected !== undefined && securityAnswer !== undefined) {
      if (Number(securityAnswer) !== Number(securityExpected)) {
        res.status(400).json({
          error: 'Security challenge verification failed. Please try calculating again.',
        });
        return;
      }
    }

    // 5. Input Validation
    const cleanName = sanitizeText(fullName);
    const cleanEmail = sanitizeText(email).toLowerCase();
    const cleanPhone = sanitizeText(phone);
    const cleanBusiness = sanitizeText(businessName);
    const cleanMessage = sanitizeText(message);
    const cleanType = sanitizeText(projectType) || 'WordPress & Elementor';
    const cleanBudget = sanitizeText(budgetRange) || '$1,000 - $2,500';
    const cleanTimeline = sanitizeText(timeline) || 'Standard (2-4 weeks)';
    const cleanContact = ['email', 'whatsapp', 'call'].includes(preferredContact)
      ? preferredContact
      : 'email';
    const cleanReferral = sanitizeText(referralSource) || 'Direct Website';

    if (!cleanName || cleanName.length < 2) {
      res.status(400).json({ error: 'Please provide your full name (minimum 2 characters).' });
      return;
    }

    if (!cleanEmail || !isValidEmail(cleanEmail)) {
      res.status(400).json({ error: 'Please provide a valid business or personal email address.' });
      return;
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      res.status(400).json({
        error: 'Please share a brief description of your project needs (minimum 10 characters).',
      });
      return;
    }

    // Record rate limit timestamp
    timestamps.push(now);
    ipSubmissionTimestamps.set(clientIp, timestamps);

    // Generate unique inquiry reference ID
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const id = `MK-${randomSuffix}`;

    const newInquiry = {
      id,
      fullName: cleanName,
      email: cleanEmail,
      phone: cleanPhone || undefined,
      businessName: cleanBusiness || undefined,
      projectType: cleanType,
      budgetRange: cleanBudget,
      timeline: cleanTimeline,
      message: cleanMessage,
      preferredContact: cleanContact,
      referralSource: cleanReferral,
      timestamp: new Date().toISOString(),
      status: 'new',
      notes: '',
      securityMeta: {
        verifiedHuman: true,
        submissionDurationSeconds: Math.round(durationMs / 1000),
        securityFlags,
      },
    };

    const inquiries = getInquiries();
    inquiries.unshift(newInquiry);
    saveInquiries(inquiries);

    console.log(`[Inquiry Received] ID: ${id} from ${cleanName} <${cleanEmail}>`);

    res.status(201).json({
      success: true,
      referenceId: id,
      message: 'Your project inquiry has been securely received by Mitchell Adetayo (Mikky Digitalz).',
      inquiry: newInquiry,
    });
  });

  // PATCH inquiry status or internal notes
  app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, notes } = req.body;

    const inquiries = getInquiries();
    const targetIndex = inquiries.findIndex((inq) => inq.id === id);

    if (targetIndex === -1) {
      res.status(404).json({ error: 'Inquiry not found.' });
      return;
    }

    if (status !== undefined) {
      inquiries[targetIndex].status = sanitizeText(status);
    }
    if (notes !== undefined) {
      inquiries[targetIndex].notes = sanitizeText(notes);
    }

    saveInquiries(inquiries);
    res.json({ success: true, inquiry: inquiries[targetIndex] });
  });

  // DELETE inquiry
  app.delete('/api/inquiries/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const inquiries = getInquiries();
    const filtered = inquiries.filter((inq) => inq.id !== id);

    if (filtered.length === inquiries.length) {
      res.status(404).json({ error: 'Inquiry not found.' });
      return;
    }

    saveInquiries(filtered);
    res.json({ success: true, message: 'Inquiry removed.' });
  });

  // Export inquiries as CSV
  app.get('/api/inquiries-export.csv', (_req: Request, res: Response) => {
    const inquiries = getInquiries();
    const headers = [
      'ID',
      'Date',
      'Name',
      'Email',
      'Phone',
      'Business',
      'Project Type',
      'Budget',
      'Timeline',
      'Contact Preference',
      'Status',
      'Message',
    ];

    const escapeCsv = (val: any) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = inquiries.map((inq) =>
      [
        escapeCsv(inq.id),
        escapeCsv(inq.timestamp),
        escapeCsv(inq.fullName),
        escapeCsv(inq.email),
        escapeCsv(inq.phone || ''),
        escapeCsv(inq.businessName || ''),
        escapeCsv(inq.projectType),
        escapeCsv(inq.budgetRange),
        escapeCsv(inq.timeline),
        escapeCsv(inq.preferredContact),
        escapeCsv(inq.status),
        escapeCsv(inq.message),
      ].join(',')
    );

    const csvContent = [headers.join(','), ...rows].join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="mikky-digitalz-inquiries.csv"');
    res.send(csvContent);
  });

  // SEO & Crawler endpoints
  app.get('/robots.txt', (_req: Request, res: Response) => {
    const robotsPath = path.resolve(__dirname, 'public', 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.sendFile(robotsPath);
    } else {
      res.type('text/plain').send('User-agent: *\nAllow: /\nSitemap: https://mikkydigitalz.netlify.app/sitemap.xml\n');
    }
  });

  app.get('/sitemap.xml', (_req: Request, res: Response) => {
    const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.sendFile(sitemapPath);
    } else {
      res.status(404).send('Sitemap not found');
    }
  });

  // Setup Vite development server or production static serving
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });

    // Prerendered SEO / AEO / GEO HTML for search crawlers & social cards
    app.get('/blog/:slug', async (req: Request, res: Response, next) => {
      const { slug } = req.params;
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (!post) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(req.originalUrl, template);
        const rendered = injectPostMetadata(template, post);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(rendered);
      } catch (err) {
        next(err);
      }
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    const distIndex = path.resolve(distPath, 'index.html');

    // Production SEO injection for blog posts
    app.get('/blog/:slug', (req: Request, res: Response, next) => {
      const { slug } = req.params;
      const post = BLOG_POSTS.find((p) => p.slug === slug);
      if (!post) {
        return next();
      }
      try {
        const template = fs.readFileSync(distIndex, 'utf-8');
        const rendered = injectPostMetadata(template, post);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(rendered);
      } catch (err) {
        next(err);
      }
    });

    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(distIndex);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Mikky Digitalz server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
