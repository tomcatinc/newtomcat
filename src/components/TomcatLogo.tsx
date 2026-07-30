import React from 'react';

interface TomcatLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  showTagline?: boolean;
  useImage?: boolean;
}

const exactLogoPath = '/src/assets/images/tomcat_exact_logo_1785422460868.jpg';

export const TomcatLogo: React.FC<TomcatLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
  showTagline = true,
  useImage = true
}) => {
  const sizeMap = {
    sm: { icon: 'h-8', text: 'text-base', tagline: 'text-[9px]' },
    md: { icon: 'h-11', text: 'text-xl', tagline: 'text-[10px]' },
    lg: { icon: 'h-16', text: 'text-2xl', tagline: 'text-xs' },
    xl: { icon: 'h-24', text: 'text-3xl', tagline: 'text-sm' }
  };

  const dims = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Exact Logo Image Display */}
      {useImage ? (
        <img 
          src={exactLogoPath} 
          alt="TOMCAT TECHNOLOGY Logo" 
          className={`${dims.icon} w-auto object-contain rounded-lg border border-slate-200 shadow-sm transition-transform duration-300 group-hover:scale-105`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className={`relative ${dims.icon} w-11 rounded-lg bg-white border border-slate-300 flex items-center justify-center shrink-0 shadow-sm`}>
          <svg viewBox="0 0 100 100" className="w-4/5 h-4/5 text-slate-900 fill-current">
            <polygon points="20,15 40,40 15,45" fill="#0f172a" />
            <polygon points="80,15 85,45 60,40" fill="#0f172a" />
            <polygon points="50,92 15,45 35,25 50,38 65,25 85,45" fill="#0f172a" stroke="#0f172a" strokeWidth="3" />
            <polygon points="28,48 44,52 36,58" fill="#10b981" />
            <polygon points="72,48 64,58 56,52" fill="#10b981" />
          </svg>
        </div>
      )}

      {showWordmark && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-black ${dims.text} tracking-tight text-slate-900 font-sans group-hover:text-emerald-600 transition-colors`}>
              TOMCAT
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              LOGISTICS & WEB
            </span>
          </div>
          {showTagline && (
            <span className={`font-mono ${dims.tagline} tracking-widest uppercase text-slate-500 font-semibold`}>
              TECHNOLOGY
            </span>
          )}
        </div>
      )}
    </div>
  );
};
