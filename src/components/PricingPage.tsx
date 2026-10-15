import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  Star, 
  HelpCircle, 
  Calculator, 
  Sparkles, 
  ChevronDown, 
  ChevronUp,
  DollarSign
} from 'lucide-react';
import { PRICING_PLANS, ADDONS, FAQS } from '../data/siteData';

interface PricingPageProps {
  onNavigate?: (route: string) => void;
  onOpenContact: (preselectedService?: string) => void;
  onOpenCalendly: () => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onOpenContact,
  onOpenCalendly,
}) => {
  const [openFaq, setOpenFaq] = useState<string | null>('not-included');
  const [selectedBaseTier, setSelectedBaseTier] = useState<string>('growth');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['speed-boost']);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const currentTier = PRICING_PLANS.find((p) => p.id === selectedBaseTier);
  const basePrice = currentTier?.numericPrice || 0;
  const addonsTotal = selectedAddons.reduce((acc, aId) => {
    const item = ADDONS.find((a) => a.id === aId);
    return acc + (item ? item.numericPrice : 0);
  }, 0);
  const estimatedTotal = basePrice + addonsTotal;

  return (
    <div className="w-full py-12 md:py-16 bg-[#070612] text-[#f1f5f9] relative overflow-hidden">
      {/* Background ambient radial purple glow */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[350px] bg-purple-600/10 blur-[130px] pointer-events-none rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">
            Investment & Packages
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mt-2 mb-4">
            Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-purple-200">Pricing</span>.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every project with Michael Adetayo (Mikky Digitalz) begins with a free consultation call to confirm scope and goals. Zero hidden fees, no unexpected upsells — just clear deliverables and fixed investment options.
          </p>
        </div>

        {/* 3 Pricing Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.popular;
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-200 navy-card-hover ${
                  isPopular
                    ? 'bg-purple-600 text-white shadow-2xl shadow-purple-600/40 border-2 border-purple-400 scale-[1.02] z-10'
                    : 'bg-[#0e0b24] text-slate-100 border border-[#261d56] shadow-xl hover:border-purple-500/50'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white text-purple-950 text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                    <p className={`text-xs leading-relaxed ${isPopular ? 'text-white/90' : 'text-slate-300'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-8 pb-6 border-b border-current/15">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      {plan.numericPrice && (
                        <span className={`text-xs font-medium uppercase ${isPopular ? 'text-white/80' : 'text-slate-400'}`}>
                          / fixed total
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className={`text-xs font-bold uppercase tracking-wider block ${isPopular ? 'text-white/90' : 'text-purple-400'}`}>
                      What's Included:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            isPopular ? 'bg-white text-purple-600' : 'bg-purple-600/25 text-purple-300 border border-purple-500/30'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={isPopular ? 'text-white/95' : 'text-slate-200'}>
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onOpenContact(plan.name)}
                  className={`w-full py-3.5 px-6 rounded-full text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                    isPopular
                      ? 'bg-white text-purple-950 hover:bg-slate-100 font-bold shadow-xl'
                      : 'bg-purple-600 text-white hover:bg-purple-500 shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50'
                  }`}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE PROJECT ESTIMATOR / CALCULATOR */}
        <div className="mb-20 p-8 sm:p-12 rounded-3xl bg-[#0e0b24] border border-[#261d56] shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">
                <Calculator className="w-4 h-4" />
                <span>Interactive Estimator</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Calculate Your Custom Project Investment
              </h2>
            </div>
            <p className="text-xs text-slate-300 max-w-sm">
              Select a base tier and toggle optional add-ons to preview an instant estimated investment total.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Step 1: Base Tier */}
              <div>
                <label className="block text-xs font-bold uppercase text-purple-400 mb-2">
                  1. Choose Base Platform Tier
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {PRICING_PLANS.map((tier) => {
                    const isSelected = selectedBaseTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedBaseTier(tier.id)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-400 font-bold shadow-xl shadow-purple-600/35'
                            : 'bg-[#130f2e] text-slate-200 border-[#261d56] hover:border-purple-500/40'
                        }`}
                      >
                        <div className="text-xs">{tier.name}</div>
                        <div className="text-sm font-semibold mt-0.5">{tier.price}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Add-ons */}
              <div>
                <label className="block text-xs font-bold uppercase text-purple-400 mb-2">
                  2. Select Optional Add-ons & Extras
                </label>
                <div className="space-y-2">
                  {ADDONS.map((addon) => {
                    const isChecked = selectedAddons.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-[#161138] border-purple-500 shadow-sm'
                            : 'bg-[#110d2c] border-[#261d56] hover:bg-[#161138]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                              isChecked
                                ? 'bg-purple-600 border-purple-500 text-white'
                                : 'border-[#3b2d6e] bg-[#0e0b24]'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">{addon.title}</div>
                            <div className="text-[11px] text-slate-400">{addon.description}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-purple-400 shrink-0 pl-2">
                          +{addon.price}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Summary Box (5 cols) */}
            <div className="lg:col-span-5 bg-[#130f2e] text-white p-6 sm:p-8 rounded-2xl border border-[#261d56] shadow-xl space-y-6">
              <div className="border-b border-[#261d56] pb-4">
                <span className="text-xs uppercase tracking-widest text-purple-400 font-semibold">
                  Estimated Total Investment
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  {currentTier?.numericPrice === null
                    ? 'Custom Quote'
                    : `$${estimatedTotal.toLocaleString()}`}
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Fixed pricing quote confirmed during free discovery call.
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-[#261d56]">
                  <span className="text-slate-300">{currentTier?.name}</span>
                  <span className="font-mono font-bold text-purple-400">{currentTier?.price}</span>
                </div>

                {selectedAddons.map((aId) => {
                  const item = ADDONS.find((a) => a.id === aId);
                  if (!item) return null;
                  return (
                    <div key={aId} className="flex justify-between items-center py-1 text-slate-400">
                      <span>{item.title}</span>
                      <span className="font-mono text-purple-300">+{item.price}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() =>
                  onOpenContact(
                    `${currentTier?.name} ($${estimatedTotal.toLocaleString()})`
                  )
                }
                className="w-full py-3.5 px-6 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xl shadow-purple-600/35 hover:shadow-purple-500/50 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Inquire With This Estimated Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* FAQS ACCORDION */}
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-purple-400 font-bold">Frequently Asked Questions</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Clear Answers Before Kickoff</h2>
          </div>

          {FAQS.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#0e0b24] border border-[#261d56] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between text-sm sm:text-base font-bold text-white hover:text-purple-300 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-400 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-4" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#261d56] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
