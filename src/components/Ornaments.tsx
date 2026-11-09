import React from 'react';

/**
 * Greek Meander (Key) Horizontal Divider
 * شريط المياندر الإغريقي الهندسي الدقيق
 */
export const GreekMeanderDivider: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-4 my-2",
  color = "#8C7A4B"
}) => {
  return (
    <div className={`overflow-hidden flex items-center justify-center opacity-75 ${className}`}>
      <svg
        width="100%"
        height="14"
        viewBox="0 0 320 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat-x"
        className="w-full h-full"
      >
        <pattern id="greek-meander-pattern" x="0" y="0" width="28" height="14" patternUnits="userSpaceOnUse">
          <path
            d="M0 1h26v12H6V5h14v5h-9V8h5V7h-7v5h19V0H0v1z"
            fill={color}
          />
        </pattern>
        <rect width="100%" height="14" fill="url(#greek-meander-pattern)" />
      </svg>
    </div>
  );
};

/**
 * Islamic Arabesque / Geometric Star Divider
 * شريط الرقش العربي والنجوم الثمانية الأندلسية
 */
export const IslamicGeometricDivider: React.FC<{ className?: string; color?: string }> = ({
  className = "w-full h-4 my-2",
  color = "#C58B3B"
}) => {
  return (
    <div className={`overflow-hidden flex items-center justify-center opacity-75 ${className}`}>
      <svg
        width="100%"
        height="14"
        viewBox="0 0 320 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="repeat-x"
        className="w-full h-full"
      >
        <pattern id="islamic-geom-pattern" x="0" y="0" width="32" height="14" patternUnits="userSpaceOnUse">
          <path
            d="M16 1 L19 4 L23 1 L25 5 L29 6 L26 9 L29 13 L25 12 L22 14 L19 11 L16 14 L13 11 L10 14 L7 12 L3 13 L6 9 L3 6 L7 5 L9 1 L13 4 Z"
            stroke={color}
            strokeWidth="0.8"
            fill="none"
          />
          <circle cx="16" cy="7" r="1.5" fill={color} />
          <line x1="0" y1="7" x2="6" y2="7" stroke={color} strokeWidth="0.8" strokeDasharray="1 1.5" />
          <line x1="26" y1="7" x2="32" y2="7" stroke={color} strokeWidth="0.8" strokeDasharray="1 1.5" />
        </pattern>
        <rect width="100%" height="14" fill="url(#islamic-geom-pattern)" />
      </svg>
    </div>
  );
};

/**
 * Refined Classical Brass Corner Brackets (Fixed Size 24x24px)
 * زوايا برونزية كلاسيكية دقيقة لا تتمدد ابدا
 */
export const BrassCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = "", size = 22 }) => {
  const getRotation = () => {
    switch (position) {
      case 'top-left':
        return 'rotate-0';
      case 'top-right':
        return 'rotate-90';
      case 'bottom-right':
        return 'rotate-180';
      case 'bottom-left':
        return '-rotate-90';
    }
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      className={`absolute pointer-events-none z-20 ${getRotation()} ${className}`}
    >
      <path
        d="M1 23V1h22"
        stroke="#1C1917"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M4 20V4h16"
        stroke="#8C7A4B"
        strokeWidth="1"
        strokeLinecap="square"
      />
      <circle cx="7" cy="7" r="1.5" fill="#8C7A4B" stroke="#1C1917" strokeWidth="0.5" />
    </svg>
  );
};

/**
 * Pointed Islamic Archway Frame Overlay for Fatima el Zahraa & Ali Haydar
 * إطار العمارة الأندلسية المذهب بحواف هندسية متوازنة
 */
export const IslamicArchBorder: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative border border-[#193E30] dark:border-[#234D3D] p-2 bg-[#EDF3EE] dark:bg-[#0E231B] shadow-tactile-fatima dark:shadow-tactile-dark ${className}`}>
      {/* Outer hairline */}
      <div className="absolute inset-1 border border-[#BA872C]/40 dark:border-[#D4A247]/40 pointer-events-none" />
      {/* Corner accents (fixed 12x12px) */}
      <div className="absolute top-1 right-1 w-2.5 h-2.5 border-r border-t border-[#BA872C] dark:border-[#D4A247]" />
      <div className="absolute top-1 left-1 w-2.5 h-2.5 border-l border-t border-[#BA872C] dark:border-[#D4A247]" />
      <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-r border-b border-[#BA872C] dark:border-[#D4A247]" />
      <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-l border-b border-[#BA872C] dark:border-[#D4A247]" />
      {children}
    </div>
  );
};

/**
 * Museum Exhibition Authenticity Stamp
 * ختم التوثيق المتحفي
 */
export const CuratorialStamp: React.FC<{ text: string; code: string; color?: string }> = ({
  text,
  code,
  color = "#8A7443",
}) => {
  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-[#1C1917]/50 dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#1A1816] text-xs font-serif shadow-tactile-sm dark:shadow-tactile-dark-sm select-none"
      style={{ borderColor: color }}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="font-arabic-title font-semibold text-[#1C1917] dark:text-[#F0EAE1] text-[11px]">{text}</span>
      <span className="text-[10px] text-[#575047] dark:text-[#A39A8D] font-mono border-r border-[#1C1917]/30 dark:border-[#3A342C] pr-1 mr-0.5">
        [{code}]
      </span>
    </div>
  );
};
