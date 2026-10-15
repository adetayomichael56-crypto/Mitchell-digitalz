import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1200;

    let animId: number;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setPercent(progress);

      if (progress < 100) {
        animId = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(onComplete, 600);
        }, 200);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#070712] text-white p-8 md:p-12 border-b border-purple-900/50 transition-transform duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${
        isClosing ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Top Header */}
      <div className="w-full flex justify-between items-center text-xs tracking-widest text-purple-300/70 uppercase font-mono">
        <span>Mikky Digitalz</span>
        <span>Michael Adetayo</span>
      </div>

      {/* Center Branding */}
      <div className="flex flex-col items-center text-center max-w-sm">
        <div className="mb-6 flex justify-center">
          <img
            src="https://res.cloudinary.com/qrnzfn6h/image/upload/v1784801863/My_real_logo_no_bg_uzbovb.png"
            alt="Mikky Digitalz Logo"
            className="h-16 w-auto object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.5)]"
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
          Mikky Digitalz
        </h1>
        <p className="text-xs text-purple-300 font-semibold tracking-widest uppercase">
          Website Designer & Developer
        </p>
      </div>

      {/* Bottom Progress Bar */}
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="w-full h-[3px] bg-purple-950 rounded-full overflow-hidden mb-3 border border-purple-800/30">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-violet-400 transition-all duration-75 ease-out shadow-[0_0_12px_#8b5cf6]"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="flex justify-between w-full text-xs font-mono text-purple-300/80">
          <span>LOADING EXPERIENCE</span>
          <span className="font-bold text-white">{percent}%</span>
        </div>
      </div>
    </div>
  );
};
