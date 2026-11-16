import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PARALLEL_LORE_THEMES } from '../data/storiesData';
import { GreekMeanderDivider, IslamicGeometricDivider, CuratorialStamp } from './Ornaments';
import { Compass, Shield, Feather, Crown, Scroll, Sparkles, BookOpen, Quote, ArrowLeftRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ParallelLoreViewProps {
  onBackToPortal: () => void;
}

export const ParallelLoreView: React.FC<ParallelLoreViewProps> = ({ onBackToPortal }) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(PARALLEL_LORE_THEMES[0].id);

  const activeTheme = PARALLEL_LORE_THEMES.find((t) => t.id === selectedThemeId) || PARALLEL_LORE_THEMES[0];

  const getThemeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-4 h-4 text-[#BF532C]" />;
      case 'Shield':
        return <Shield className="w-4 h-4 text-[#BA872C]" />;
      case 'Feather':
        return <Feather className="w-4 h-4 text-[#8A7443]" />;
      case 'Crown':
        return <Crown className="w-4 h-4 text-[#82292E]" />;
      case 'Scroll':
        return <Scroll className="w-4 h-4 text-[#15324D]" />;
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-[#193E30]" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#BA872C]" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] bg-parchment-grain py-8 px-4 sm:px-6 lg:px-8 select-text">
      <div className="max-w-7xl mx-auto space-y-7">
        
        {/* Curatorial Header */}
        <div className="bg-[#EFE9DF] dark:bg-[#1A1816] border-2 border-[#1C1917] dark:border-[#3A342C] p-5 sm:p-6 shadow-tactile dark:shadow-tactile-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
          <div>
            <div className="flex items-center gap-2 text-xs font-serif text-[#575047] dark:text-[#A39A8D] mb-1">
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#BF532C] dark:text-[#D9683F]" />
              <span>مختبر الدراسات المقارنة والميثولوجيا التراثية</span>
            </div>
            <h1 className="font-arabic-title text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F0EAE1] leading-tight">
              مقارنة الأنساق والرموز العالمية
            </h1>
            <p className="font-arabic-body text-xs sm:text-sm text-[#575047] dark:text-[#A39A8D] mt-1 max-w-3xl">
              دراسة تحليلية تقابل بين مآثر ملحمة الأوديسة، وصرح قصر الأميرة فاطمة الزهراء بالإسكندرية، وأسطورة ميدوسا وبيرسيوس عبر أربعة محاور جوهرية.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <CuratorialStamp text="دراسة أكاديمية ثلاثية" code="PARALLEL-TRIO" color="#8A7443" />
          </div>
        </div>

        {/* Theme Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {PARALLEL_LORE_THEMES.map((theme, idx) => {
            const isSelected = theme.id === selectedThemeId;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  sounds.playPageTurn();
                  setSelectedThemeId(theme.id);
                }}
                className={`p-3 text-right border transition-all text-xs font-arabic-title ${
                  isSelected
                    ? 'border-[#1C1917] dark:border-[#D4A247] bg-[#F8F6F0] dark:bg-[#24211E] shadow-tactile dark:shadow-tactile-dark font-bold'
                    : 'border-[#D2C8B8] dark:border-[#3A342C] bg-[#EFE9DF]/70 dark:bg-[#1A1816]/70 hover:bg-[#EFE9DF] dark:hover:bg-[#1A1816] hover:border-[#1C1917] dark:hover:border-[#D5CDBD] text-[#575047] dark:text-[#A39A8D]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-mono text-[10px] text-[#8A7443] dark:text-[#D4A247]">0{idx + 1}</span>
                  <span className="text-[10px] font-serif text-[#8A7443] dark:text-[#D4A247]">{theme.category}</span>
                </div>
                <div className="text-[#1C1917] dark:text-[#F0EAE1] text-xs sm:text-sm leading-snug">
                  {theme.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Thematic Comparison Stage */}
        <motion.div
          key={activeTheme.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-6"
        >
          {/* Side-by-Side 3-Column Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
            
            {/* Panel 1: The Odyssey (Greek Paradigm) */}
            <div className="bg-[#ECF2F6] dark:bg-[#102030] border-2 border-[#15324D] dark:border-[#2C4661] p-5 shadow-tactile-odyssey dark:shadow-tactile-dark flex flex-col justify-between relative transition-colors">
              <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-[#15324D]/60 dark:text-[#76A9D9]/60">
                CLASSICAL HELLENIC
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full border border-[#15324D] dark:border-[#2C4661] bg-[#F8F6F0] dark:bg-[#1A1816] flex items-center justify-center">
                    {getThemeIcon(activeTheme.odyssey.iconName)}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono text-[#BF532C] dark:text-[#D9683F] uppercase tracking-wider block font-bold">
                      ملحمة الأوديسة — هوميروس
                    </span>
                    <h3 className="font-arabic-title text-base sm:text-lg font-bold text-[#15324D] dark:text-[#76A9D9]">
                      {activeTheme.odyssey.hero}
                    </h3>
                  </div>
                </div>

                <div className="bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#15324D]/30 dark:border-[#2C4661]/50 p-3 mb-3.5 shadow-tactile-sm dark:shadow-tactile-dark-sm">
                  <span className="text-[11px] font-arabic-title font-bold text-[#15324D] dark:text-[#76A9D9] block mb-1">
                    محور التناول الفلسفي:
                  </span>
                  <p className="font-arabic-body text-xs text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed">
                    {activeTheme.odyssey.focus}
                  </p>
                </div>

                {/* Quotation */}
                <div className="bg-[#15324D]/10 dark:bg-[#15324D]/25 border-r-2 border-[#BF532C] dark:border-[#D9683F] p-3 text-xs font-arabic-body italic text-[#1C1917] dark:text-[#D5CDBD] leading-relaxed mb-3.5 flex items-start gap-2">
                  <Quote className="w-4 h-4 text-[#BF532C] dark:text-[#D9683F] shrink-0 mt-0.5" />
                  <span>{activeTheme.odyssey.quote}</span>
                </div>

                {/* Analytical Prose */}
                <p className="font-arabic-body text-xs sm:text-sm text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed text-justify">
                  {activeTheme.odyssey.analysis}
                </p>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-[#15324D]/20 dark:border-[#2C4661]/40 flex items-center justify-between text-[11px] font-serif text-[#575047] dark:text-[#A39A8D]">
                <span>الموروث: العقل الملاحي والتراجيديا</span>
                <GreekMeanderDivider className="w-20 h-3" color="#8A7443" />
              </div>
            </div>

            {/* Panel 2: Princess Fatima Al-Zahraa & Royal Jewelry Museum */}
            <div className="bg-[#EDF3EE] dark:bg-[#0E231B] border-2 border-[#193E30] dark:border-[#234D3D] p-5 shadow-tactile-fatima dark:shadow-tactile-dark flex flex-col justify-between relative transition-colors">
              <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-[#193E30]/60 dark:text-[#459E7B]/60">
                ALEXANDRIA ROYAL HERITAGE
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full border border-[#193E30] dark:border-[#234D3D] bg-[#F8F6F0] dark:bg-[#1A1816] flex items-center justify-center">
                    {getThemeIcon(activeTheme.fatimaAli.iconName)}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono text-[#BA872C] dark:text-[#D4A247] uppercase tracking-wider block font-bold">
                      قصر زيزينيا والتحف الملكية
                    </span>
                    <h3 className="font-arabic-title text-base sm:text-lg font-bold text-[#193E30] dark:text-[#459E7B]">
                      {activeTheme.fatimaAli.hero}
                    </h3>
                  </div>
                </div>

                <div className="bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#193E30]/30 dark:border-[#234D3D]/50 p-3 mb-3.5 shadow-tactile-sm dark:shadow-tactile-dark-sm">
                  <span className="text-[11px] font-arabic-title font-bold text-[#193E30] dark:text-[#459E7B] block mb-1">
                    محور التناول الفلسفي:
                  </span>
                  <p className="font-arabic-body text-xs text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed">
                    {activeTheme.fatimaAli.focus}
                  </p>
                </div>

                {/* Quotation */}
                <div className="bg-[#193E30]/10 dark:bg-[#193E30]/25 border-r-2 border-[#BA872C] dark:border-[#D4A247] p-3 text-xs font-arabic-body italic text-[#1C1917] dark:text-[#D5CDBD] leading-relaxed mb-3.5 flex items-start gap-2">
                  <Quote className="w-4 h-4 text-[#BA872C] dark:text-[#D4A247] shrink-0 mt-0.5" />
                  <span>{activeTheme.fatimaAli.quote}</span>
                </div>

                {/* Analytical Prose */}
                <p className="font-arabic-body text-xs sm:text-sm text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed text-justify">
                  {activeTheme.fatimaAli.analysis}
                </p>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-[#193E30]/20 dark:border-[#234D3D]/40 flex items-center justify-between text-[11px] font-serif text-[#575047] dark:text-[#A39A8D]">
                <span>الموروث: عمارة القصور والنفائس</span>
                <IslamicGeometricDivider className="w-20 h-3" color="#BA872C" />
              </div>
            </div>

            {/* Panel 3: Medusa & Perseus (Gorgon & Aegis Paradigm) */}
            <div className="bg-[#EBEFEB] dark:bg-[#131D16] border-2 border-[#2D3A30] dark:border-[#3D5242] p-5 shadow-tactile dark:shadow-tactile-dark flex flex-col justify-between relative transition-colors">
              <div className="absolute top-2 left-2 text-[10px] font-mono font-bold text-[#2D3A30]/60 dark:text-[#A4C4AA]/60">
                GORGON MYTHOS & AEGIS
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-full border border-[#2D3A30] dark:border-[#3D5242] bg-[#F8F6F0] dark:bg-[#1A1816] flex items-center justify-center">
                    {getThemeIcon(activeTheme.medusa?.iconName || 'Shield')}
                  </span>
                  <div>
                    <span className="text-[10px] font-mono text-[#A66829] dark:text-[#D4A247] uppercase tracking-wider block font-bold">
                      أسطورة ميدوسا وبيرسيوس
                    </span>
                    <h3 className="font-arabic-title text-base sm:text-lg font-bold text-[#2D3A30] dark:text-[#A4C4AA]">
                      {activeTheme.medusa?.hero}
                    </h3>
                  </div>
                </div>

                <div className="bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#2D3A30]/30 dark:border-[#3D5242]/50 p-3 mb-3.5 shadow-tactile-sm dark:shadow-tactile-dark-sm">
                  <span className="text-[11px] font-arabic-title font-bold text-[#2D3A30] dark:text-[#A4C4AA] block mb-1">
                    محور التناول الفلسفي:
                  </span>
                  <p className="font-arabic-body text-xs text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed">
                    {activeTheme.medusa?.focus}
                  </p>
                </div>

                {/* Quotation */}
                <div className="bg-[#2D3A30]/10 dark:bg-[#2D3A30]/25 border-r-2 border-[#A66829] dark:border-[#D4A247] p-3 text-xs font-arabic-body italic text-[#1C1917] dark:text-[#D5CDBD] leading-relaxed mb-3.5 flex items-start gap-2">
                  <Quote className="w-4 h-4 text-[#A66829] dark:text-[#D4A247] shrink-0 mt-0.5" />
                  <span>{activeTheme.medusa?.quote}</span>
                </div>

                {/* Analytical Prose */}
                <p className="font-arabic-body text-xs sm:text-sm text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed text-justify">
                  {activeTheme.medusa?.analysis}
                </p>
              </div>

              <div className="pt-3.5 mt-3.5 border-t border-[#2D3A30]/20 dark:border-[#3D5242]/40 flex items-center justify-between text-[11px] font-serif text-[#575047] dark:text-[#A39A8D]">
                <span>الموروث: أسطورة التحول ودرع الحماية</span>
                <GreekMeanderDivider className="w-20 h-3" color="#A66829" />
              </div>
            </div>

          </div>

          {/* Curatorial Synthesis Banner */}
          <div className="bg-[#EFE9DF] dark:bg-[#1A1816] border-2 border-[#1C1917] dark:border-[#3A342C] p-5 shadow-tactile dark:shadow-tactile-dark transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#BA872C] dark:text-[#D4A247]" />
              <h4 className="font-arabic-title font-bold text-sm sm:text-base text-[#1C1917] dark:text-[#F0EAE1]">
                الخلاصة التركيبية المتحفية (Curatorial Synthesis)
              </h4>
            </div>
            <p className="font-arabic-body text-xs sm:text-sm text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed text-justify">
              {activeTheme.synthesis}
            </p>
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => {
              sounds.playPageTurn();
              onBackToPortal();
            }}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#EFE9DF] dark:bg-[#1A1816] text-[#1C1917] dark:text-[#F0EAE1] font-arabic-title font-bold text-sm border-2 border-[#1C1917] dark:border-[#3A342C] shadow-tactile dark:shadow-tactile-dark hover:bg-[#F8F6F0] dark:hover:bg-[#24211E] transition-all"
          >
            <span>العودة إلى بوابة الملاحم الرئيسية</span>
          </button>
        </div>

      </div>
    </div>
  );
};
