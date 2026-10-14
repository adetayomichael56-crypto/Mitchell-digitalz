export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  turnaround: string;
  badge: string;
  idealFor: string;
  features: string[];
  startingPrice: string;
  formTypeKey: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'wordpress-elementor',
    title: 'WordPress & Elementor Builds',
    shortDesc:
      'Custom, high-speed WordPress websites with clean Elementor Pro architecture or custom ACF blocks.',
    turnaround: '2 to 3 Weeks',
    badge: 'Most Popular',
    idealFor: 'B2B Agencies, SaaS, Consultancies & Scaling Brands',
    features: [
      'Bloat-free Elementor Pro architecture & custom styling',
      'Advanced Custom Fields (ACF) structured content models',
      'Sub-second page loading (PageSpeed 95+ score guaranteed)',
      'Built-in security hardening, anti-spam, and automated backups',
      'Easy drag-and-drop client editing with video handover walkthrough',
    ],
    startingPrice: '$1,200',
    formTypeKey: 'WordPress & Elementor',
  },
  {
    id: 'squarespace-builds',
    title: 'Squarespace Custom Builds',
    shortDesc:
      'Polished, elegant, and low-maintenance websites for solo practitioners, boutiques, and creative studios.',
    turnaround: '1 to 2 Weeks',
    badge: 'Fast Turnaround',
    idealFor: 'Designers, Photographers, Coaches, Luxury Clinics',
    features: [
      'Tailored custom CSS styling beyond standard templates',
      'Zero maintenance overhead with automatic hosting & SSL',
      'Seamless booking systems (Acuity/Calendly) & form integrations',
      'Mobile-first layout precision for luxury visual appeal',
      'Complete typography system and brand consistency',
    ],
    startingPrice: '$850',
    formTypeKey: 'Squarespace Custom Build',
  },
  {
    id: 'figma-to-live',
    title: 'Figma → Code & AI-to-Live Conversion',
    shortDesc:
      'Transforming static Figma designs or AI-generated concepts into pixel-perfect, responsive production code.',
    turnaround: '1 to 3 Weeks',
    badge: 'High Precision',
    idealFor: 'Design Agencies, Tech Founders, Product Teams',
    features: [
      '100% pixel-perfect match to your Figma vector specs',
      'Flawless responsive behavior across desktop, tablet, and mobile',
      'Fluid micro-interactions and smooth scroll animations',
      'Clean semantic code architecture ready for production',
      'Rigorous cross-browser testing (Chrome, Safari, Firefox, Edge)',
    ],
    startingPrice: '$1,000',
    formTypeKey: 'Figma to Code',
  },
  {
    id: 'shopify-storefronts',
    title: 'Shopify Storefront Builds',
    shortDesc:
      'Conversion-focused e-commerce storefronts designed to showcase products and maximize checkout completion rates.',
    turnaround: '2 to 4 Weeks',
    badge: 'Conversion Focused',
    idealFor: 'D2C Brands, Boutique Merchants, Product Creators',
    features: [
      'Shopify Online Store 2.0 modular architecture',
      'Frictionless slide-out cart drawer & one-click upsells',
      'Conversion-rate optimized product detail page templates',
      'High-speed mobile checkout configuration & payment gateways',
      'App integration stack (reviews, analytics, email capture)',
    ],
    startingPrice: '$1,500',
    formTypeKey: 'Shopify Storefront',
  },
];
