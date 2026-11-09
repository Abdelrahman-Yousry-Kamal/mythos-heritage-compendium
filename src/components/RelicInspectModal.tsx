import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Relic } from '../types';
import { CuratorialStamp } from './Ornaments';
import { Compass, Shield, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface RelicInspectModalProps {
  relic: Relic | null;
  onClose: () => void;
}

export const RelicInspectModal: React.FC<RelicInspectModalProps> = ({ relic, onClose }) => {
  if (!relic) return null;

  const isOdyssey = relic.storyId === 'odyssey';
  const primaryColor = isOdyssey ? '#15324D' : '#193E30';
  const accentColor = isOdyssey ? '#BF532C' : '#BA872C';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1917]/60 select-text">
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-2xl bg-[#F8F6F0] dark:bg-[#121110] border-2 border-[#1C1917] dark:border-[#3A342C] shadow-tactile dark:shadow-tactile-dark p-5 sm:p-7 max-h-[90vh] overflow-y-auto transition-colors"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-1.5 border border-[#1C1917] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#24211E] text-[#1C1917] dark:text-[#F0EAE1] hover:bg-[#1C1917] dark:hover:bg-[#F0EAE1] hover:text-[#F8F6F0] dark:hover:text-[#121110] transition-colors"
            title="إغلاق المعاينة"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Metadata */}
          <div className="flex items-center gap-2 mb-2 text-xs font-serif text-[#575047] dark:text-[#A39A8D]">
            {isOdyssey ? (
              <Compass className="w-4 h-4 text-[#BF532C] dark:text-[#D9683F]" />
            ) : (
              <Shield className="w-4 h-4 text-[#BA872C] dark:text-[#D4A247]" />
            )}
            <span>{isOdyssey ? 'ملحمة الأوديسة — جناح البحر المتوسط' : 'قصر الأميرة فاطمة الزهراء — متحف المجوهرات الملكية'}</span>
            <span>•</span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#BF532C] dark:text-[#D9683F] font-bold">
              {relic.category}
            </span>
          </div>

          <h2 className="font-arabic-title text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F0EAE1] mb-0.5">
            {relic.name}
          </h2>
          <span className="text-xs font-serif text-[#575047] dark:text-[#A39A8D] italic block mb-3.5">
            {relic.subtitle}
          </span>

          {/* Relic Image Stage */}
          <div className="relative aspect-[16/9] w-full border-2 border-[#1C1917] dark:border-[#3A342C] overflow-hidden mb-4 bg-[#1C1917] shadow-tactile-sm dark:shadow-tactile-dark-sm">
            <img
              src={relic.imageUrl}
              alt={relic.name}
              className="w-full h-full object-cover filter contrast-[1.03] sepia-[0.06]"
            />
            <div className="absolute bottom-2 right-2">
              <CuratorialStamp text="أثر موثق ومفحوص" code={relic.id.toUpperCase()} color={accentColor} />
            </div>
          </div>

          {/* Description Prose */}
          <div className="space-y-2.5 font-arabic-body text-xs sm:text-sm text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed mb-4">
            <p className="bg-[#EFE9DF] dark:bg-[#1A1816] p-3 border-r-2 border-[#1C1917] dark:border-[#3A342C] leading-relaxed">
              {relic.description}
            </p>

            <div className="bg-[#F8F6F0] dark:bg-[#24211E] p-3 border border-[#D2C8B8] dark:border-[#3A342C] space-y-1">
              <span className="font-arabic-title font-bold text-xs block" style={{ color: primaryColor }}>
                الهامش التاريخي والتوثيق الأثري:
              </span>
              <p className="text-xs text-[#575047] dark:text-[#A39A8D] leading-relaxed">
                {relic.historicalNote}
              </p>
            </div>

            <div className="bg-[#EDF3EE] dark:bg-[#0E231B] p-3 border border-[#193E30]/30 dark:border-[#234D3D]/50 space-y-1">
              <span className="font-arabic-title font-bold text-xs text-[#193E30] dark:text-[#459E7B] block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#BA872C] dark:text-[#D4A247]" />
                الدلالة الرمزية والفلسفية:
              </span>
              <p className="text-xs text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed">
                {relic.symbolism}
              </p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-3 border-t border-[#D2C8B8] dark:border-[#3A342C] flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-[#193E30] dark:text-[#459E7B] font-arabic-title font-bold">
              <CheckCircle2 className="w-4 h-4" />
              مودع في خزائن المعرض التفاعلي
            </span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#1C1917] dark:bg-[#24211E] text-[#F8F6F0] dark:text-[#F0EAE1] font-arabic-title font-bold border border-[#1C1917] dark:border-[#3A342C] shadow-tactile-sm dark:shadow-tactile-dark-sm hover:bg-[#8A7443] transition-colors"
            >
              إغلاق البطاقة
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
