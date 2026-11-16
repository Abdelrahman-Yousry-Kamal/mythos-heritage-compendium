import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { StoryId, Hotspot, DecisionChoice } from '../types';
import { STORIES_DATA } from '../data/storiesData';
import { BrassCorner, IslamicArchBorder, GreekMeanderDivider, IslamicGeometricDivider, CuratorialStamp } from './Ornaments';
import { 
  MapPin, Eye, FileText, ChevronRight, ChevronLeft, 
  CheckCircle2, Sparkles, Award
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface StoryReaderViewProps {
  storyId: StoryId;
  chapterIndex: number;
  onSelectChapter: (index: number) => void;
  onUnlockRelic: (relicId: string) => void;
  unlockedRelicIds: string[];
}

export const StoryReaderView: React.FC<StoryReaderViewProps> = ({
  storyId,
  chapterIndex,
  onSelectChapter,
  onUnlockRelic,
  unlockedRelicIds,
}) => {
  const story = STORIES_DATA[storyId];
  const chapter = story.chapters[chapterIndex];

  // State
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [viewModeTab, setViewModeTab] = useState<'image' | 'notes'>('image');
  const [selectedChoice, setSelectedChoice] = useState<DecisionChoice | null>(null);
  const [unlockedToast, setUnlockedToast] = useState<string | null>(null);

  // Reset decision state & hotspot when chapter changes
  useEffect(() => {
    setActiveHotspot(null);
    setSelectedChoice(null);
    setViewModeTab('image');
  }, [chapterIndex, storyId]);

  // Handle clicking a hotspot pin
  const handlePinClick = (hotspot: Hotspot) => {
    sounds.playRelicUnlock();
    setActiveHotspot(hotspot);

    if (!unlockedRelicIds.includes(hotspot.relicId)) {
      onUnlockRelic(hotspot.relicId);
      setUnlockedToast(`تمت إضافة أثر جديد إلى حقيبتك: ${chapter.relic.name}`);
      setTimeout(() => setUnlockedToast(null), 4500);
    }
  };

  // Handle user's mythic choice
  const handleChoiceSelect = (choice: DecisionChoice) => {
    sounds.playDecisionStamp();
    setSelectedChoice(choice);

    if (!unlockedRelicIds.includes(chapter.relic.id)) {
      onUnlockRelic(chapter.relic.id);
      setUnlockedToast(`تم فك سر الذخيرة: ${chapter.relic.name}`);
      setTimeout(() => setUnlockedToast(null), 4500);
    }
  };

  const handleNextChapter = () => {
    if (chapterIndex < story.chapters.length - 1) {
      sounds.playPageTurn();
      onSelectChapter(chapterIndex + 1);
    }
  };

  const handlePrevChapter = () => {
    if (chapterIndex > 0) {
      sounds.playPageTurn();
      onSelectChapter(chapterIndex - 1);
    }
  };

  const isOdyssey = storyId === 'odyssey';
  const isMedusa = storyId === 'medusa';
  const primaryThemeColor = isOdyssey ? '#15324D' : isMedusa ? '#2D3A30' : '#193E30';
  const accentThemeColor = isOdyssey ? '#BF532C' : isMedusa ? '#A66829' : '#BA872C';

  return (
    <div 
      className="min-h-[calc(100vh-4.5rem)] flex flex-col justify-between bg-parchment-grain pb-20 relative select-text"
      data-theme={storyId}
    >
      {/* Toast Notification for Relic Discovery */}
      <AnimatePresence>
        {unlockedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#EFE9DF] border-2 border-[#1C1917] px-4 py-2.5 shadow-tactile flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#BA872C] flex items-center justify-center text-[#1C1917]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-arabic-title font-bold text-[#1C1917] block">
                اكتشاف أثري جديد!
              </span>
              <span className="font-arabic-body text-[#575047]">
                {unlockedToast}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter Editorial Topbar */}
      <div className="border-b border-[#D2C8B8] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#1A1816] px-4 sm:px-8 py-2.5 flex items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <span 
            className="w-7 h-7 border border-[#1C1917] dark:border-[#3A342C] bg-[#F8F6F0] dark:bg-[#24211E] flex items-center justify-center font-display text-sm font-bold shadow-tactile-sm dark:shadow-tactile-dark-sm"
            style={{ color: primaryThemeColor }}
          >
            {chapter.romanNumber}
          </span>
          <div>
            <h1 className="font-arabic-title text-base sm:text-lg font-bold text-[#1C1917] dark:text-[#F0EAE1] leading-tight">
              {story.title} — {chapter.title}
            </h1>
            <span className="text-[11px] font-serif text-[#575047] dark:text-[#A39A8D] flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#BF532C] dark:text-[#D9683F]" />
              <span>{chapter.location}</span>
              <span className="text-[#D2C8B8] dark:text-[#3A342C]">•</span>
              <span>{chapter.era}</span>
            </span>
          </div>
        </div>

        {/* View mode toggle (Image vs Curatorial Notes) */}
        <div className="flex items-center bg-[#F8F6F0] dark:bg-[#24211E] border border-[#D2C8B8] dark:border-[#3A342C] p-0.5 shadow-tactile-sm dark:shadow-tactile-dark-sm">
          <button
            onClick={() => {
              sounds.playPageTurn();
              setViewModeTab('image');
            }}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-arabic-title font-semibold transition-colors ${
              viewModeTab === 'image'
                ? 'bg-[#1C1917] text-[#F8F6F0] dark:bg-[#F0EAE1] dark:text-[#121110]'
                : 'text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>العرض المصور</span>
          </button>
          <button
            onClick={() => {
              sounds.playPageTurn();
              setViewModeTab('notes');
            }}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-arabic-title font-semibold transition-colors ${
              viewModeTab === 'notes'
                ? 'bg-[#1C1917] text-[#F8F6F0] dark:bg-[#F0EAE1] dark:text-[#121110]'
                : 'text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>الهوامش التراثية</span>
          </button>
        </div>
      </div>

      {/* Main Dual-Column Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =========================================================================
              LEFT COLUMN (55% ON DESKTOP): VISUAL STAGE & INTERACTIVE HOTSPOTS
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            {/* Visual Stage Container */}
            <div className="relative">
              {isOdyssey || isMedusa ? (
                /* Classical Rectangular Frame with Brass Corner Brackets */
                <div 
                  className="relative border-2 p-2 shadow-tactile-odyssey"
                  style={{ borderColor: primaryThemeColor, backgroundColor: '#1C1917' }}
                >
                  <BrassCorner position="top-left" className="top-1 left-1" size={20} />
                  <BrassCorner position="top-right" className="top-1 right-1" size={20} />
                  <BrassCorner position="bottom-left" className="bottom-1 left-1" size={20} />
                  <BrassCorner position="bottom-right" className="bottom-1 right-1" size={20} />

                  {/* Main Artwork Stage */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-[#1C1917]">
                    {viewModeTab === 'image' ? (
                      <>
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.title}
                          className="w-full h-full object-cover filter contrast-[1.03] sepia-[0.08]"
                        />
                        {/* Tactile Vignette Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/60 via-transparent to-transparent pointer-events-none" />

                        {/* Interactive Hotspot Pins */}
                        {chapter.hotspots.map((hotspot) => {
                          const isActive = activeHotspot?.id === hotspot.id;
                          return (
                            <button
                              key={hotspot.id}
                              onClick={() => handlePinClick(hotspot)}
                              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                              className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group flex items-center justify-center transition-all ${
                                isActive ? 'scale-125' : 'hover:scale-110'
                              }`}
                              title={hotspot.title}
                            >
                              <span className="absolute w-7 h-7 rounded-full border border-[#BF532C] animate-ping opacity-60 pointer-events-none" />
                              <div className={`w-6 h-6 rounded-full border border-[#1C1917] flex items-center justify-center font-mono text-xs font-bold shadow-tactile-sm ${
                                isActive 
                                  ? 'bg-[#BF532C] text-[#F8F6F0]' 
                                  : 'bg-[#F8F6F0] text-[#15324D] group-hover:bg-[#BF532C] group-hover:text-[#F8F6F0]'
                              }`}>
                                {hotspot.number}
                              </div>
                            </button>
                          );
                        })}

                        {/* Floating Hotspot Tooltip Card */}
                        <AnimatePresence>
                          {activeHotspot && (
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-3 left-3 right-3 z-40 bg-[#F8F6F0] dark:bg-[#1A1816] border-2 border-[#1C1917] dark:border-[#3A342C] p-3.5 shadow-tactile dark:shadow-tactile-dark text-[#1C1917] dark:text-[#F0EAE1]"
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-[#15324D] dark:bg-[#76A9D9] text-[#F8F6F0] dark:text-[#121110] font-mono text-xs flex items-center justify-center font-bold">
                                    {activeHotspot.number}
                                  </span>
                                  <h4 className="font-arabic-title font-bold text-sm text-[#15324D] dark:text-[#76A9D9]">
                                    {activeHotspot.title}
                                  </h4>
                                </div>
                                <button
                                  onClick={() => setActiveHotspot(null)}
                                  className="text-xs text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1] font-bold px-1.5 py-0.5 border border-[#D2C8B8] dark:border-[#3A342C]"
                                >
                                  ✕ إغلاق
                                </button>
                              </div>

                              <p className="font-arabic-body text-xs text-[#1C1917] dark:text-[#D5CDBD] leading-relaxed mb-2">
                                {activeHotspot.description}
                              </p>

                              <div className="bg-[#EFE9DF] dark:bg-[#24211E] p-2 border-r-2 border-[#BF532C] dark:border-[#D9683F] text-[11px] text-[#575047] dark:text-[#D5CDBD] font-serif leading-normal flex items-start gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#BF532C] dark:text-[#D9683F] shrink-0 mt-0.5" />
                                <span>{activeHotspot.historicalContext}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      /* Historical Context Notes Mode */
                      <div className="w-full h-full bg-[#EFE9DF] dark:bg-[#1A1816] p-6 overflow-y-auto">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-[#15324D] dark:text-[#76A9D9]" />
                          <h4 className="font-arabic-title text-base font-bold text-[#15324D] dark:text-[#76A9D9]">
                            الهوامش النقدية والتاريخية لهذا الفصل
                          </h4>
                        </div>
                        <ul className="space-y-3 font-arabic-body text-sm text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed">
                          {chapter.historicalNotes.map((note, i) => (
                            <li key={i} className="flex items-start gap-2 p-3 bg-[#F8F6F0] dark:bg-[#24211E] border border-[#D2C8B8] dark:border-[#3A342C] shadow-tactile-sm dark:shadow-tactile-dark-sm">
                              <span className="font-display font-bold text-[#BF532C] dark:text-[#D9683F] text-sm shrink-0">
                                §{i + 1}
                              </span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Pointed Ornamental Arch Frame for Fatima el Zahraa & Royal Jewelry Museum */
                <IslamicArchBorder className="p-2">
                  <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden bg-[#193E30] dark:bg-[#0E231B]">
                    {viewModeTab === 'image' ? (
                      <>
                        <img
                          src={chapter.imageUrl}
                          alt={chapter.title}
                          className="w-full h-full object-cover filter contrast-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#193E30]/65 dark:from-[#0E231B]/75 via-transparent to-transparent pointer-events-none" />

                        {/* Interactive Hotspot Pins */}
                        {chapter.hotspots.map((hotspot) => {
                          const isActive = activeHotspot?.id === hotspot.id;
                          return (
                            <button
                              key={hotspot.id}
                              onClick={() => handlePinClick(hotspot)}
                              style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                              className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 group flex items-center justify-center transition-all ${
                                isActive ? 'scale-125' : 'hover:scale-110'
                              }`}
                              title={hotspot.title}
                            >
                              <span className="absolute w-7 h-7 rounded-full border border-[#BA872C] animate-ping opacity-60 pointer-events-none" />
                              <div className={`w-6 h-6 rounded-full border border-[#1C1917] dark:border-[#3A342C] flex items-center justify-center font-mono text-xs font-bold shadow-tactile-sm dark:shadow-tactile-dark-sm ${
                                isActive 
                                  ? 'bg-[#BA872C] text-[#1C1917]' 
                                  : 'bg-[#F8F6F0] dark:bg-[#24211E] text-[#193E30] dark:text-[#D4A247] group-hover:bg-[#BA872C] group-hover:text-[#1C1917]'
                              }`}>
                                {hotspot.number}
                              </div>
                            </button>
                          );
                        })}

                        {/* Floating Hotspot Tooltip Card */}
                        <AnimatePresence>
                          {activeHotspot && (
                            <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-3 left-3 right-3 z-40 bg-[#F8F6F0] dark:bg-[#1A1816] border-2 border-[#193E30] dark:border-[#234D3D] p-3.5 shadow-tactile-fatima dark:shadow-tactile-dark text-[#1C1917] dark:text-[#F0EAE1]"
                            >
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-[#193E30] dark:bg-[#459E7B] text-[#F8F6F0] dark:text-[#121110] font-mono text-xs flex items-center justify-center font-bold">
                                    {activeHotspot.number}
                                  </span>
                                  <h4 className="font-arabic-title font-bold text-sm text-[#193E30] dark:text-[#459E7B]">
                                    {activeHotspot.title}
                                  </h4>
                                </div>
                                <button
                                  onClick={() => setActiveHotspot(null)}
                                  className="text-xs text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1] font-bold px-1.5 py-0.5 border border-[#D2C8B8] dark:border-[#3A342C]"
                                >
                                  ✕ إغلاق
                                </button>
                              </div>

                              <p className="font-arabic-body text-xs text-[#1C1917] dark:text-[#D5CDBD] leading-relaxed mb-2">
                                {activeHotspot.description}
                              </p>

                              <div className="bg-[#EDF3EE] dark:bg-[#24211E] p-2 border-r-2 border-[#BA872C] dark:border-[#D4A247] text-[11px] text-[#575047] dark:text-[#D5CDBD] font-serif leading-normal flex items-start gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-[#BA872C] dark:text-[#D4A247] shrink-0 mt-0.5" />
                                <span>{activeHotspot.historicalContext}</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      /* Historical Context Notes Mode */
                      <div className="w-full h-full bg-[#EDF3EE] dark:bg-[#1A1816] p-6 overflow-y-auto">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-4 h-4 text-[#193E30] dark:text-[#459E7B]" />
                          <h4 className="font-arabic-title text-base font-bold text-[#193E30] dark:text-[#459E7B]">
                            الهوامش التراثية والمصادر التاريخية
                          </h4>
                        </div>
                        <ul className="space-y-3 font-arabic-body text-sm text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed">
                          {chapter.historicalNotes.map((note, i) => (
                            <li key={i} className="flex items-start gap-2 p-3 bg-[#F8F6F0] dark:bg-[#24211E] border border-[#D2C8B8] dark:border-[#3A342C] shadow-tactile-sm dark:shadow-tactile-dark-sm">
                              <span className="font-display font-bold text-[#BA872C] dark:text-[#D4A247] text-sm shrink-0">
                                §{i + 1}
                              </span>
                              <span>{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </IslamicArchBorder>
              )}
            </div>

            {/* Curatorial Caption Bar */}
            <div className="bg-[#EFE9DF] dark:bg-[#1A1816] border border-[#D2C8B8] dark:border-[#3A342C] p-3 shadow-tactile-sm dark:shadow-tactile-dark-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 transition-colors">
              <p className="font-serif italic text-xs text-[#575047] dark:text-[#D5CDBD] leading-relaxed">
                «{chapter.curatorialCaption}»
              </p>
              <div className="shrink-0 flex items-center gap-2">
                <CuratorialStamp 
                  text={isOdyssey ? "أرشيف إيثاكا" : isMedusa ? "أرشيف الأساطير الإغريقية" : "متحف المجوهرات"} 
                  code={`CAT-${chapter.romanNumber}`}
                  color={accentThemeColor}
                />
              </div>
            </div>

            {/* Chapter Relic Card Preview */}
            <div className="bg-[#F8F6F0] dark:bg-[#1A1816] border border-[#D2C8B8] dark:border-[#3A342C] p-3 flex items-center justify-between gap-3 shadow-tactile-sm dark:shadow-tactile-dark-sm transition-colors">
              <div className="flex items-center gap-3">
                <img
                  src={chapter.relic.imageUrl}
                  alt={chapter.relic.name}
                  className="w-12 h-12 object-cover border border-[#1C1917] dark:border-[#3A342C] shadow-tactile-sm shrink-0"
                />
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#BF532C] dark:text-[#D9683F] block font-bold">
                    ذخيرة الفصل المرتبطة ({chapter.relic.category})
                  </span>
                  <h4 className="font-arabic-title font-bold text-xs sm:text-sm text-[#1C1917] dark:text-[#F0EAE1]">
                    {chapter.relic.name}
                  </h4>
                </div>
              </div>
              <div className="text-left shrink-0">
                {unlockedRelicIds.includes(chapter.relic.id) ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-arabic-title font-bold text-[#193E30] dark:text-[#459E7B] bg-[#EDF3EE] dark:bg-[#0E231B] px-2 py-0.5 border border-[#193E30] dark:border-[#234D3D]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    مكتشف في الحقيبة
                  </span>
                ) : (
                  <span className="text-[11px] font-arabic-title text-[#8A7443] dark:text-[#D4A247] border border-dashed border-[#8A7443] dark:border-[#D4A247] px-2 py-0.5">
                    انقر الدبابيس لاكتشافه
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* =========================================================================
              RIGHT COLUMN (45% ON DESKTOP): NARRATIVE SCROLL & INTERACTIVE DECISION
             ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Chapter Heading Banner */}
            <div className="border-b-2 border-[#1C1917] dark:border-[#3A342C] pb-3">
              <div className="flex items-center justify-between text-xs text-[#575047] dark:text-[#A39A8D] font-serif mb-1">
                <span>الفصل {chapter.romanNumber} من أصل V</span>
                <span className="font-mono text-[11px] uppercase tracking-widest font-bold" style={{ color: accentThemeColor }}>
                  CHRONICLE EPISODE
                </span>
              </div>
              <h2 
                className="font-arabic-title text-2xl sm:text-3xl font-bold leading-tight"
                style={{ color: primaryThemeColor }}
              >
                {chapter.title}
              </h2>
            </div>

            {/* Narrative Prose with Illuminated Drop-Cap */}
            <div className="space-y-3.5 font-arabic-body text-[#1C1917] dark:text-[#F0EAE1] text-sm sm:text-base leading-relaxed text-justify">
              {chapter.narrativeParagraphs.map((paragraph, idx) => (
                <p 
                  key={idx}
                  className={idx === 0 ? "dropcap-ar" : ""}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {isOdyssey || isMedusa ? (
              <GreekMeanderDivider className="w-full h-3 my-2" color={accentThemeColor} />
            ) : (
              <IslamicGeometricDivider className="w-full h-3 my-2" color="#BA872C" />
            )}

            {/* Mythic Decision Dilemma Card */}
            <div className="bg-[#EFE9DF] dark:bg-[#1A1816] border-2 border-[#1C1917] dark:border-[#3A342C] p-4 sm:p-5 shadow-tactile dark:shadow-tactile-dark relative transition-colors">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentThemeColor }} />
                <h3 className="font-arabic-title font-bold text-sm sm:text-base text-[#1C1917] dark:text-[#F0EAE1]">
                  اختر المسار — معضلة المصير الأسطوري
                </h3>
              </div>

              <p className="font-arabic-body text-xs text-[#575047] dark:text-[#A39A8D] mb-3">
                {chapter.dilemma.question}
              </p>

              {/* Two Choice Options */}
              <div className="space-y-2.5">
                {chapter.dilemma.choices.map((choice) => {
                  const isSelected = selectedChoice?.id === choice.id;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleChoiceSelect(choice)}
                      className={`w-full text-right p-3 border transition-all text-xs font-arabic-title leading-snug flex items-start justify-between gap-3 ${
                        isSelected
                          ? 'border-[#1C1917] dark:border-[#D4A247] bg-[#F8F6F0] dark:bg-[#24211E] shadow-tactile dark:shadow-tactile-dark'
                          : 'border-[#D2C8B8] dark:border-[#3A342C] bg-[#F8F6F0]/70 dark:bg-[#24211E]/70 hover:bg-[#F8F6F0] dark:hover:bg-[#24211E] hover:border-[#1C1917] dark:hover:border-[#D5CDBD]'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span className={`w-4 h-4 rounded-full border border-[#1C1917] dark:border-[#3A342C] flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] ${
                          isSelected ? 'bg-[#1C1917] dark:bg-[#D4A247] text-[#F8F6F0] dark:text-[#121110]' : 'bg-[#EFE9DF] dark:bg-[#1A1816] text-[#1C1917] dark:text-[#F0EAE1]'
                        }`}>
                          {choice.isCanonical ? 'أ' : 'ب'}
                        </span>
                        <div>
                          <span className="font-bold text-[#1C1917] dark:text-[#F0EAE1] block">
                            {choice.title}
                          </span>
                          <span className="font-arabic-body text-[#575047] dark:text-[#A39A8D] text-[11px] block mt-0.5">
                            {choice.actionText}
                          </span>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#193E30] dark:text-[#459E7B] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Outcome Box */}
              <AnimatePresence>
                {selectedChoice && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3.5 pt-3.5 border-t border-[#D2C8B8] dark:border-[#3A342C]"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono px-2 py-0.5 border border-[#1C1917] dark:border-[#3A342C] bg-[#F8F6F0] dark:bg-[#24211E] font-bold text-[#1C1917] dark:text-[#F0EAE1]">
                        {selectedChoice.outcomeBadge}
                      </span>
                      <span className="text-[11px] text-[#575047] dark:text-[#A39A8D] font-serif">
                        {selectedChoice.isCanonical ? 'مسار النص الأصلي' : 'فرع تاريخي تخيلي'}
                      </span>
                    </div>

                    <p className="font-arabic-body text-xs text-[#1C1917] dark:text-[#F0EAE1] leading-relaxed bg-[#F8F6F0] dark:bg-[#24211E] p-3 border border-[#D2C8B8] dark:border-[#3A342C] shadow-tactile-sm dark:shadow-tactile-dark-sm">
                      {selectedChoice.consequence}
                    </p>

                    {/* Continue Button */}
                    <div className="mt-3.5 flex items-center justify-end">
                      {chapterIndex < story.chapters.length - 1 ? (
                        <button
                          onClick={handleNextChapter}
                          className="flex items-center gap-2 px-4 py-2 bg-[#1C1917] dark:bg-[#24211E] text-[#F8F6F0] dark:text-[#F0EAE1] font-arabic-title font-bold text-xs sm:text-sm border-2 border-[#1C1917] dark:border-[#3A342C] shadow-tactile dark:shadow-tactile-dark hover:bg-[#8A7443] dark:hover:bg-[#A38644] transition-colors"
                        >
                          <span>المتابعة إلى الفصل التالي</span>
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-arabic-title font-bold text-[#193E30] dark:text-[#459E7B] bg-[#EDF3EE] dark:bg-[#0E231B] px-3 py-1.5 border border-[#193E30] dark:border-[#234D3D]">
                          <Award className="w-4 h-4" />
                          <span>اكتملت فصول هذه الملحمة الخالدة بنجاح!</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>
      </div>

      {/* =========================================================================
          BOTTOM PERSISTENT BAR: INTERACTIVE JOURNEY MAP & TIMELINE
         ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#EFE9DF] dark:bg-[#1A1816] border-t-2 border-[#1C1917] dark:border-[#3A342C] shadow-lg select-none transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between gap-4">
          
          {/* Previous Chapter Button */}
          <button
            onClick={handlePrevChapter}
            disabled={chapterIndex === 0}
            className={`flex items-center gap-1 px-3 py-1.5 border border-[#1C1917] dark:border-[#3A342C] text-xs font-arabic-title font-bold transition-all shadow-tactile-sm dark:shadow-tactile-dark-sm ${
              chapterIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-[#EFE9DF] dark:bg-[#1A1816] text-[#575047] dark:text-[#A39A8D]'
                : 'bg-[#F8F6F0] dark:bg-[#24211E] text-[#1C1917] dark:text-[#F0EAE1] hover:bg-[#1C1917] dark:hover:bg-[#F0EAE1] hover:text-[#F8F6F0] dark:hover:text-[#121110]'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span className="hidden sm:inline">الفصل السابق</span>
          </button>

          {/* Interactive Horizontal 5-Node Map */}
          <div className="flex-1 max-w-2xl mx-2 flex items-center justify-between relative">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[#D2C8B8] dark:bg-[#3A342C] -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 right-4 h-0.5 transition-all duration-500 z-0"
              style={{
                backgroundColor: primaryThemeColor,
                left: `${100 - (chapterIndex / 4) * 100}%`,
              }}
            />

            {/* 5 Landmark Nodes */}
            {story.chapters.map((chap, i) => {
              const isCurrent = i === chapterIndex;
              const isVisited = i <= chapterIndex;
              return (
                <button
                  key={chap.id}
                  onClick={() => {
                    sounds.playPageTurn();
                    onSelectChapter(i);
                  }}
                  className={`relative z-10 flex flex-col items-center group focus:outline-none`}
                  title={chap.title}
                >
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#1C1917] dark:border-[#3A342C] flex items-center justify-center font-display text-xs font-bold transition-transform shadow-tactile-sm dark:shadow-tactile-dark-sm group-hover:scale-110 ${
                    isCurrent
                      ? 'scale-110 ring-2 ring-[#1C1917] dark:ring-[#D4A247]'
                      : isVisited
                      ? 'text-[#F8F6F0]'
                      : 'bg-[#F8F6F0] dark:bg-[#24211E] text-[#575047] dark:text-[#A39A8D]'
                  }`}
                  style={{
                    backgroundColor: isCurrent ? accentThemeColor : isVisited ? primaryThemeColor : undefined,
                    color: isCurrent || isVisited ? '#F8F6F0' : undefined,
                  }}>
                    {chap.romanNumber}
                  </div>
                  <span className={`text-[10px] font-arabic-title hidden md:block mt-0.5 font-semibold truncate max-w-[85px] text-center ${
                    isCurrent ? 'text-[#1C1917] dark:text-[#F0EAE1]' : 'text-[#575047] dark:text-[#A39A8D]'
                  }`}>
                    {chap.romanNumber}. {chap.title.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Next Chapter Button */}
          <button
            onClick={handleNextChapter}
            disabled={chapterIndex === story.chapters.length - 1}
            className={`flex items-center gap-1 px-3 py-1.5 border border-[#1C1917] dark:border-[#3A342C] text-xs font-arabic-title font-bold transition-all shadow-tactile-sm dark:shadow-tactile-dark-sm ${
              chapterIndex === story.chapters.length - 1
                ? 'opacity-40 cursor-not-allowed bg-[#EFE9DF] dark:bg-[#1A1816] text-[#575047] dark:text-[#A39A8D]'
                : 'bg-[#F8F6F0] dark:bg-[#24211E] text-[#1C1917] dark:text-[#F0EAE1] hover:bg-[#1C1917] dark:hover:bg-[#F0EAE1] hover:text-[#F8F6F0] dark:hover:text-[#121110]'
            }`}
          >
            <span className="hidden sm:inline">الفصل التالي</span>
            <ChevronLeft className="w-4 h-4" />
          </button>

        </div>
      </div>

    </div>
  );
};
