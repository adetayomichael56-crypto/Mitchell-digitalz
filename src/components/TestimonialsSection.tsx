import React from 'react';
import { Star, ShieldCheck, Quote, CheckCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote:
        'Mitchell is hands down the most skilled web developer I have hired on Upwork. He engineered our enterprise WordPress platform with custom ACF blocks in just 12 days. Our mobile Google PageSpeed is a solid 99!',
      author: 'Marcus Vance',
      role: 'Founder & CEO, TechVentures London',
      project: 'WordPress & Elementor Architecture',
      rating: 5,
      verified: 'Verified Upwork Client',
    },
    {
      quote:
        'Transformed our complex Figma files into a clean, lightweight Squarespace website that loads instantly. Within 3 weeks of launching, client inquiries tripled. The contact flow he built makes booking effortless.',
      author: 'Elena Rostova',
      role: 'Principal Architect, Studio Forma',
      project: 'Squarespace Custom Build',
      rating: 5,
      verified: 'Verified Upwork Client',
    },
    {
      quote:
        'Our Shopify conversion rate jumped by 38% after Mitchell rebuilt our product pages and cart drawer. Fast, responsive, communicative, and gave us a full video tutorial of how to manage our inventory.',
      author: 'Julian Thorne',
      role: 'E-commerce Director, Apothecary Co.',
      project: 'Shopify Storefront 2.0',
      rating: 5,
      verified: 'Verified Upwork Client',
    },
    {
      quote:
        'Outstanding attention to detail. No bloated plugins, clean CSS, and delivered 2 days ahead of schedule. Mitchell understands both visual aesthetics and technical performance.',
      author: 'Amina Bello',
      role: 'Managing Partner, Apex Legal Group',
      project: 'Custom Corporate Website',
      rating: 5,
      verified: 'Verified Upwork Client',
    },
  ];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-400 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>30+ Five-Star Reviews</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Trusted By Founders & Creative Studios
          </h2>
          <p className="text-base text-slate-300">
            Real feedback from clients who needed fast turnarounds, reliable code, and measurable conversion growth.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 relative hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{item.verified}</span>
                  </div>
                </div>

                <Quote className="w-8 h-8 text-slate-700 mb-3" />
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-heading text-sm font-bold text-white">
                    {item.author}
                  </h4>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 font-medium border border-slate-700">
                  {item.project}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
