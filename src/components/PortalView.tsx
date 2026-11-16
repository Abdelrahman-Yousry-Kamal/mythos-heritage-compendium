import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { StoryId } from '../types';
import { STORIES_DATA } from '../data/storiesData';
import { GreekMeanderDivider, IslamicGeometricDivider, BrassCorner } from './Ornaments';
import { Compass, Shield, ArrowLeft, BookOpen, Clock, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface PortalViewProps {
  onSelectStory: (storyId: StoryId) => void;
  onExploreParallel: () => void;
}

export const PortalView: React.FC<PortalViewProps> = ({ onSelectStory, onExploreParallel }) => {
  const [hoveredSide, setHoveredSide] = useState<StoryId | null>(null);

  const odyssey = STORIES_DATA.odyssey;
  const fatimaAli = STORIES_DATA['fatima-ali'];
  const medusa = STORIES_DATA.medusa;

  const editorialTransition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="relative min-h-[calc(100vh-4.5rem)] flex flex-col justify-between bg-parchment-grain select-text">
      
      {/* Sleek Sub-Header Editorial Ticker */}
      <div className="border-b border-[#D2C8B8] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#1A1816] py-2 px-4 sm:px-8 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#575047] dark:text-[#A39A8D]">
            <span className="w-2 h-2 rounded-full bg-[#BF532C] dark:bg-[#D9683F]" />
            <span className="font-arabic-title font-bold text-[#1C1917] dark:text-[#F0EAE1]">
              جناح السرد التفاعلي المقارن
            </span>
            <span className="text-[#D2C8B8] dark:text-[#3A342C] hidden md:inline">•</span>
            <span className="font-arabic-body hidden md:inline text-[11px] text-[#575047] dark:text-[#A39A8D]">
              اختر إحدى الملاحم الثلاث لفتح مجلد القراءة التفاعلية، أو تفضل بمقارنة الأنساق الفلسفية
            </span>
          </div>

          <button
            onClick={() => {
              sounds.playPageTurn();
              onExploreParallel();
            }}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#F8F6F0] dark:bg-[#24211E] border border-[#1C1917] dark:border-[#3A342C] hover:bg-[#1C1917] dark:hover:bg-[#F0EAE1] hover:text-[#F8F6F0] dark:hover:text-[#121110] text-[#1C1917] dark:text-[#F0EAE1] transition-colors font-arabic-title text-xs font-bold shadow-tactile-sm dark:shadow-tactile-dark-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>دراسة الأنساق المشتركة</span>
          </button>
        </div>
      </div>

      {/* Main Split Screen Container: 3 Columns for 3 Epic Stories */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 gap-6 items-stretch">
        
        {/* =========================================================================
            PANEL 1: THE ODYSSEY (أوديسة هوميروس)
           ========================================================================= */}
        <motion.div
          onMouseEnter={() => setHoveredSide('odyssey')}
          onMouseLeave={() => setHoveredSide(null)}
          transition={editorialTransition}
          onClick={() => {
            sounds.playPageTurn();
            onSelectStory('odyssey');
          }}
          className={`relative bg-[#ECF2F6] dark:bg-[#102030] border-2 border-[#15324D] dark:border-[#2C4661] p-5 sm:p-6 shadow-tactile-odyssey dark:shadow-tactile-dark flex flex-col justify-between cursor-pointer group transition-all duration-300 overflow-hidden ${
            hoveredSide === 'odyssey' ? 'ring-2 ring-[#BF532C]' : ''
          }`}
        >
          {/* Refined Fixed-Size Brass Corners */}
          <BrassCorner position="top-left" className="top-2 left-2" size={20} />
          <BrassCorner position="top-right" className="top-2 right-2" size={20} />
          <BrassCorner position="bottom-left" className="bottom-2 left-2" size={20} />
          <BrassCorner position="bottom-right" className="bottom-2 right-2" size={20} />

          {/* Top Panel Meta */}
          <div className="flex items-center justify-between border-b border-[#15324D]/25 dark:border-[#2C4661]/40 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 border-2 border-[#15324D] dark:border-[#2C4661] bg-[#F8F6F0] dark:bg-[#1A1816] flex items-center justify-center font-display text-sm font-bold text-[#15324D] dark:text-[#76A9D9] shadow-tactile-sm dark:shadow-tactile-dark-sm">
                I
              </span>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#BF532C] dark:text-[#D9683F] block font-bold">
                  HELLENIC CHRONICLE
                </span>
                <span className="text-xs font-serif text-[#575047] dark:text-[#A39A8D]">
                  العصر الموكياني • قرابة 1184 ق.م
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#15324D]/40 dark:border-[#2C4661]/60 text-[#15324D] dark:text-[#76A9D9] text-[11px] font-arabic-title font-bold">
              5 فصول كاملة
            </span>
          </div>

          {/* Framed Artwork Canvas Card */}
          <div className="relative aspect-[16/9] w-full border border-[#15324D] dark:border-[#2C4661] bg-[#1C1917] overflow-hidden mb-5 shadow-tactile-sm dark:shadow-tactile-dark-sm">
            <img
              src={odyssey.coverImage}
              alt={odyssey.title}
              className="w-full h-full object-cover filter contrast-105 brightness-95 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark warm vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#15324D]/80 dark:from-[#102030]/90 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-2 right-2 left-2 flex items-center justify-between text-white text-[11px] font-arabic-body">
              <span className="bg-[#1C1917]/85 dark:bg-[#000000]/85 px-2 py-0.5 border border-[#8A7443] dark:border-[#B89C5D]">
                ساحل إيثاكا وبحر إيجه
              </span>
              <span className="flex items-center gap-1 text-[10px] bg-[#15324D]/90 dark:bg-[#102030]/95 px-1.5 py-0.5">
                <Clock className="w-3 h-3" />
                <span>رحلة العشر سنوات</span>
              </span>
            </div>
          </div>

          {/* Typography Content Card */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#BF532C] dark:text-[#D9683F] text-xs font-serif mb-1">
                <Compass className="w-3.5 h-3.5" />
                <span>هوميروس • البطل {odyssey.hero}</span>
              </div>

              <h2 className="font-arabic-title text-2xl font-bold text-[#15324D] dark:text-[#76A9D9] tracking-wide mb-2 leading-tight">
                {odyssey.title}
              </h2>

              <p className="font-arabic-body text-xs sm:text-sm text-[#1C1917] dark:text-[#D5CDBD] leading-relaxed mb-4 text-justify">
                {odyssey.subtitle}
              </p>

              <GreekMeanderDivider className="w-full h-3 my-2" color="#8A7443" />

              {/* Theme Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {odyssey.heroThemes.map((theme, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#D2C8B8] dark:border-[#3A342C] text-[11px] font-arabic-title font-semibold text-[#1C1917] dark:text-[#F0EAE1]"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-3 border-t border-[#15324D]/20 dark:border-[#2C4661]/40 flex items-center justify-between">
              <span className="text-[11px] font-serif text-[#575047] dark:text-[#A39A8D]">
                صراع الحيلة والدهاء ضد أهوال البحر
              </span>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#15324D] dark:bg-[#1C3E5E] text-[#F8F6F0] font-arabic-title font-bold text-xs sm:text-sm border-2 border-[#1C1917] dark:border-[#000000] shadow-tactile dark:shadow-tactile-dark group-hover:bg-[#BF532C] dark:group-hover:bg-[#D9683F] transition-colors">
                <span>ادخل إلى الملحمة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            PANEL 2: FATIMA EL ZAHRAA & THE ROYAL JEWELRY MUSEUM (قصر زيزينيا)
           ========================================================================= */}
        <motion.div
          onMouseEnter={() => setHoveredSide('fatima-ali')}
          onMouseLeave={() => setHoveredSide(null)}
          transition={editorialTransition}
          onClick={() => {
            sounds.playPageTurn();
            onSelectStory('fatima-ali');
          }}
          className={`relative bg-[#EDF3EE] dark:bg-[#0E231B] border-2 border-[#193E30] dark:border-[#234D3D] p-5 sm:p-6 shadow-tactile-fatima dark:shadow-tactile-dark flex flex-col justify-between cursor-pointer group transition-all duration-300 overflow-hidden ${
            hoveredSide === 'fatima-ali' ? 'ring-2 ring-[#BA872C]' : ''
          }`}
        >
          {/* Subtle Arabesque Hairline Corners */}
          <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[#BA872C] pointer-events-none" />
          <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-[#BA872C] pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-[#BA872C] pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[#BA872C] pointer-events-none" />

          {/* Top Panel Meta */}
          <div className="flex items-center justify-between border-b border-[#193E30]/25 dark:border-[#234D3D]/40 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 border-2 border-[#193E30] dark:border-[#234D3D] bg-[#F8F6F0] dark:bg-[#1A1816] flex items-center justify-center font-display text-sm font-bold text-[#193E30] dark:text-[#459E7B] shadow-tactile-sm dark:shadow-tactile-dark-sm">
                II
              </span>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#BA872C] dark:text-[#D4A247] block font-bold">
                  ALEXANDRIA ROYAL HERITAGE
                </span>
                <span className="text-xs font-serif text-[#575047] dark:text-[#A39A8D]">
                  زيزينيا، الإسكندرية • 1919م - 1986م
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#193E30]/40 dark:border-[#234D3D]/60 text-[#193E30] dark:text-[#459E7B] text-[11px] font-arabic-title font-bold">
              5 فصول كاملة
            </span>
          </div>

          {/* Framed Artwork Canvas Card */}
          <div className="relative aspect-[16/9] w-full border border-[#193E30] dark:border-[#234D3D] bg-[#1C1917] overflow-hidden mb-5 shadow-tactile-sm dark:shadow-tactile-dark-sm">
            <img
              src={fatimaAli.coverImage}
              alt={fatimaAli.title}
              className="w-full h-full object-cover filter contrast-[1.02] group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Royal Malachite Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#193E30]/85 dark:from-[#0E231B]/90 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-2 right-2 left-2 flex items-center justify-between text-white text-[11px] font-arabic-body">
              <span className="bg-[#1C1917]/85 dark:bg-[#000000]/85 px-2 py-0.5 border border-[#BA872C] dark:border-[#D4A247]">
                قصر الأميرة فاطمة الزهراء علي حيدر
              </span>
              <span className="flex items-center gap-1 text-[10px] bg-[#193E30]/90 dark:bg-[#0E231B]/95 px-1.5 py-0.5">
                <Clock className="w-3 h-3" />
                <span>متحف المجوهرات الملكية</span>
              </span>
            </div>
          </div>

          {/* Typography Content Card */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#BA872C] dark:text-[#D4A247] text-xs font-serif mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>أنطونيو لاشاك • {fatimaAli.hero}</span>
              </div>

              <h2 className="font-arabic-title text-2xl font-bold text-[#193E30] dark:text-[#459E7B] tracking-wide mb-2 leading-tight">
                {fatimaAli.title}
              </h2>

              <p className="font-arabic-body text-xs sm:text-sm text-[#1C1917] dark:text-[#D5CDBD] leading-relaxed mb-4 text-justify">
                {fatimaAli.subtitle}
              </p>

              <IslamicGeometricDivider className="w-full h-3 my-2" color="#BA872C" />

              {/* Theme Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {fatimaAli.heroThemes.map((theme, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#D2C8B8] dark:border-[#3A342C] text-[11px] font-arabic-title font-semibold text-[#1C1917] dark:text-[#F0EAE1]"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-3 border-t border-[#193E30]/20 dark:border-[#234D3D]/40 flex items-center justify-between">
              <span className="text-[11px] font-serif text-[#575047] dark:text-[#A39A8D]">
                من قصر الأميرة فاطمة حيدر إلى خزانة مجوهرات الملوك
              </span>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#193E30] dark:bg-[#134230] text-[#F8F6F0] font-arabic-title font-bold text-xs sm:text-sm border-2 border-[#1C1917] dark:border-[#000000] shadow-tactile dark:shadow-tactile-dark group-hover:bg-[#BA872C] dark:group-hover:bg-[#D4A247] transition-colors">
                <span>ادخل إلى الملحمة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================================================================
            PANEL 3: MEDUSA & PERSEUS (أسطورة ميدوسا وبيرسيوس)
           ========================================================================= */}
        <motion.div
          onMouseEnter={() => setHoveredSide('medusa')}
          onMouseLeave={() => setHoveredSide(null)}
          transition={editorialTransition}
          onClick={() => {
            sounds.playPageTurn();
            onSelectStory('medusa');
          }}
          className={`relative bg-[#EBEFEB] dark:bg-[#131D16] border-2 border-[#2D3A30] dark:border-[#3D5242] p-5 sm:p-6 shadow-tactile dark:shadow-tactile-dark flex flex-col justify-between cursor-pointer group transition-all duration-300 overflow-hidden ${
            hoveredSide === 'medusa' ? 'ring-2 ring-[#A66829]' : ''
          }`}
        >
          {/* Refined Fixed-Size Brass Corners */}
          <BrassCorner position="top-left" className="top-2 left-2" size={20} />
          <BrassCorner position="top-right" className="top-2 right-2" size={20} />
          <BrassCorner position="bottom-left" className="bottom-2 left-2" size={20} />
          <BrassCorner position="bottom-right" className="bottom-2 right-2" size={20} />

          {/* Top Panel Meta */}
          <div className="flex items-center justify-between border-b border-[#2D3A30]/25 dark:border-[#3D5242]/40 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 border-2 border-[#2D3A30] dark:border-[#3D5242] bg-[#F8F6F0] dark:bg-[#1A1816] flex items-center justify-center font-display text-sm font-bold text-[#2D3A30] dark:text-[#A4C4AA] shadow-tactile-sm dark:shadow-tactile-dark-sm">
                III
              </span>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#A66829] dark:text-[#D4A247] block font-bold">
                  GORGON MYTHOS & AEGIS
                </span>
                <span className="text-xs font-serif text-[#575047] dark:text-[#A39A8D]">
                  العصر الميثولوجي • أثينا والأولمب
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#2D3A30]/40 dark:border-[#3D5242]/60 text-[#2D3A30] dark:text-[#A4C4AA] text-[11px] font-arabic-title font-bold">
              5 فصول كاملة
            </span>
          </div>

          {/* Framed Artwork Canvas Card */}
          <div className="relative aspect-[16/9] w-full border border-[#2D3A30] dark:border-[#3D5242] bg-[#1C1917] overflow-hidden mb-5 shadow-tactile-sm dark:shadow-tactile-dark-sm">
            <img
              src={medusa.coverImage}
              alt={medusa.title}
              className="w-full h-full object-cover filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
            />
            {/* Subtle Bronze Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2D3A30]/85 dark:from-[#131D16]/95 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute bottom-2 right-2 left-2 flex items-center justify-between text-white text-[11px] font-arabic-body">
              <span className="bg-[#1C1917]/85 dark:bg-[#000000]/85 px-2 py-0.5 border border-[#A66829] dark:border-[#D4A247]">
                ترس كارافاجيو لميدوسا
              </span>
              <span className="flex items-center gap-1 text-[10px] bg-[#2D3A30]/90 dark:bg-[#131D16]/95 px-1.5 py-0.5">
                <Clock className="w-3 h-3" />
                <span>أسطورة التحول والدرع</span>
              </span>
            </div>
          </div>

          {/* Typography Content Card */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#A66829] dark:text-[#D4A247] text-xs font-serif mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>أوفيد وهسيود • {medusa.hero}</span>
              </div>

              <h2 className="font-arabic-title text-2xl font-bold text-[#2D3A30] dark:text-[#A4C4AA] tracking-wide mb-2 leading-tight">
                {medusa.title}
              </h2>

              <p className="font-arabic-body text-xs sm:text-sm text-[#1C1917] dark:text-[#D5CDBD] leading-relaxed mb-4 text-justify">
                {medusa.subtitle}
              </p>

              <GreekMeanderDivider className="w-full h-3 my-2" color="#A66829" />

              {/* Theme Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {medusa.heroThemes.map((theme, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#D2C8B8] dark:border-[#3A342C] text-[11px] font-arabic-title font-semibold text-[#1C1917] dark:text-[#F0EAE1]"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Action */}
            <div className="pt-3 border-t border-[#2D3A30]/20 dark:border-[#3D5242]/40 flex items-center justify-between">
              <span className="text-[11px] font-serif text-[#575047] dark:text-[#A39A8D]">
                من لعنة الغورغون إلى درع الحماية الأبدي
              </span>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2D3A30] dark:bg-[#1E2D23] text-[#F8F6F0] font-arabic-title font-bold text-xs sm:text-sm border-2 border-[#1C1917] dark:border-[#000000] shadow-tactile dark:shadow-tactile-dark group-hover:bg-[#A66829] dark:group-hover:bg-[#D4A247] transition-colors">
                <span>ادخل إلى الملحمة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Editorial Footnote Bar */}
      <footer className="border-t border-[#D2C8B8] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#1A1816] py-2.5 px-4 text-center select-none text-[11px] text-[#575047] dark:text-[#A39A8D] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © معرض الأساطير والتراث — تجربة تفاعلية متحفية بملمس الورق المعتق والتوثيق الأثري
          </span>
          <div className="flex items-center gap-3 font-mono text-[10px] text-[#575047] dark:text-[#A39A8D]">
            <span>100% Client-Side</span>
            <span>•</span>
            <span>Tri-Narrative Museum Compendium</span>
            <span>•</span>
            <span>Nocturnal Museum Dark Mode</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
