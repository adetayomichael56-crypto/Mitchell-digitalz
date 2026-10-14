import React from 'react';
import { ExternalLink } from 'lucide-react';

interface SocialLinksProps {
  variant?: 'pills' | 'icons';
  className?: string;
}

const SOCIAL_ITEMS = [
  { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~016fe1e73c258824d4', badge: '5.0★' },
  { name: 'Contra', url: 'https://contra.com/mitchell_adetayo_wxd9nczu/work' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mikky-digitalz/' },
  { name: 'Instagram', url: 'https://www.instagram.com/mikkydigitalz/' },
  { name: 'Behance', url: 'https://www.behance.net/michaeladetayo' },
  { name: 'Fiverr', url: 'https://www.fiverr.com/mitchell_56/build-lovable-website-lovable-ai-website-clone-lovable-to-squarespace' },
];

export const SocialLinks: React.FC<SocialLinksProps> = ({ variant = 'pills', className = '' }) => {
  if (variant === 'icons') {
    return (
      <div className={`flex flex-wrap items-center gap-2 ${className}`}>
        {SOCIAL_ITEMS.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-[#181533] border border-[#241d4a] text-slate-300 hover:text-white hover:border-purple-500/60 transition-all text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>{item.name}</span>
            <ExternalLink className="w-3 h-3 text-purple-400 opacity-70" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {SOCIAL_ITEMS.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#151230] border border-[#241d4a] hover:border-purple-500/60 text-slate-300 hover:text-white transition-all text-xs font-medium cursor-pointer shadow-sm hover:scale-105"
        >
          <span>{item.name}</span>
          {item.badge && (
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
              {item.badge}
            </span>
          )}
          <ExternalLink className="w-3 h-3 text-purple-400" />
        </a>
      ))}
    </div>
  );
};
