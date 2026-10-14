export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'WordPress' | 'Squarespace' | 'Shopify' | 'Figma to Code';
  metrics: string;
  metricsLabel: string;
  description: string;
  tags: string[];
  deliverables: string[];
  turnaround: string;
  imageUrl: string;
  livePreviewUrl?: string;
}

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'cyrion',
    title: 'Cyrion — Tech & AI Innovation Platform',
    subtitle: 'Enterprise AI & SaaS Landing Architecture',
    category: 'WordPress',
    metrics: '+49%',
    metricsLabel: 'Qualified Enterprise Leads',
    description:
      'Engineered an ultra-fast WordPress build with custom ACF blocks for an emerging enterprise AI platform. Engineered for sub-second mobile page loads and clear B2B conversion paths.',
    tags: ['WordPress', 'Elementor Pro', 'ACF Blocks', 'Speed 99/100'],
    deliverables: ['Custom Theme Architecture', 'Lead Capture Funnel', 'Dynamic Demo Booking', 'Interactive Features Grid'],
    turnaround: '14 Days',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    livePreviewUrl: 'https://mikkydigitalz.netlify.app/#/home',
  },
  {
    id: 'pirus',
    title: 'PIRUS — Luxury Dark Digital Agency',
    subtitle: 'High-End Brand & Creative Studio Platform',
    category: 'WordPress',
    metrics: '3.1x',
    metricsLabel: 'Higher Inquiry Conversions',
    description:
      'Immersive dark-themed agency portfolio engineered with micro-interactions, smooth scroll performance, and conversion-engineered case study presentations.',
    tags: ['Elementor Pro', 'Custom CSS', 'High-Converting', 'GSAP Motion'],
    deliverables: ['Custom Case Study Showcase', 'Interactive Inquiry Flow', 'Dark Glassmorphism UI', 'Mobile Optimization'],
    turnaround: '16 Days',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    livePreviewUrl: 'https://mikkydigitalz.netlify.app/#/home',
  },
  {
    id: 'xable',
    title: 'Xable — Modern Digital Agency Platform',
    subtitle: 'Scalable Service Business Platform',
    category: 'Figma to Code',
    metrics: '2.4x',
    metricsLabel: 'Online Client Bookings',
    description:
      'Turned complex high-fidelity Figma components into clean, responsive WordPress templates with zero layout shifts and instant booking integrations.',
    tags: ['Figma to WordPress', 'Responsive UI', 'Calendly Integration', 'SEO Structured'],
    deliverables: ['Figma Pixel-Perfect Code', 'Booking Funnel', 'Service Matrix', 'Schema SEO'],
    turnaround: '12 Days',
    imageUrl: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80',
    livePreviewUrl: 'https://mikkydigitalz.netlify.app/#/home',
  },
  {
    id: 'iconi',
    title: 'Iconi — Photography & Creative Portfolio',
    subtitle: 'Visual Artist Portfolio & Print Inquiries',
    category: 'Squarespace',
    metrics: '99/100',
    metricsLabel: 'Mobile Speed Score',
    description:
      'Boutique Squarespace implementation for a luxury photographer. Custom CSS typography, curated gallery grids, and effortless self-hosted client gallery delivery.',
    tags: ['Squarespace', 'Custom CSS', 'Minimalist UI', 'Client Galleries'],
    deliverables: ['Custom Grid Gallery', 'Print Shop Integration', 'Automated Inquiry Routing', 'Mobile Speed Audit'],
    turnaround: '9 Days',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    livePreviewUrl: 'https://mikkydigitalz.netlify.app/#/home',
  },
  {
    id: 'apex-roofing',
    title: 'Summit Apex — Modern Commercial Services',
    subtitle: 'Local High-Intent Quote Generation System',
    category: 'WordPress',
    metrics: '+85%',
    metricsLabel: 'Quote Requests Generated',
    description:
      'Conversion-focused local contractor site with interactive instant estimate form, verified license badges, and click-to-call mobile ergonomics.',
    tags: ['WordPress', 'Elementor', 'Local SEO', 'Quote Calculator'],
    deliverables: ['Emergency CTA Floating Bar', 'Instant Estimate Calculator', 'Review Badges', 'Google Analytics 4 Tracking'],
    turnaround: '10 Days',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    livePreviewUrl: 'https://mikkydigitalz.netlify.app/#/home',
  },
  {
    id: 'velour-store',
    title: 'Velour Apothecary — D2C Clean Beauty',
    subtitle: 'High-Converting Shopify Storefront',
    category: 'Shopify',
    metrics: '+38%',
    metricsLabel: 'Average Cart Size & Checkout Rate',
    description:
      'Bespoke Shopify Online Store 2.0 architecture with frictionless bundle builder, customer review highlights, and sub-1s checkout transitions.',
    tags: ['Shopify OS 2.0', 'Liquid', 'eCommerce CRO', 'Speed Optimized'],
    deliverables: ['Custom Product Template', 'One-Click Upsell Drawer', 'Subscription Funnel', 'Inventory Sync'],
    turnaround: '18 Days',
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80',
    livePreviewUrl: 'https://mikkydigitalz.netlify.app/#/home',
  },
];
