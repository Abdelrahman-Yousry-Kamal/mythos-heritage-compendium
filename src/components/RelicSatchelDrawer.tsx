import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Relic } from '../types';
import { ALL_RELICS } from '../data/storiesData';
import { Compass, Shield, Lock, Sparkles, X, CheckCircle2, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface RelicSatchelDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedRelicIds: string[];
  onInspectRelic: (relic: Relic) => void;
  onUnlockAll: () => void;
  onResetRelics: () => void;
}

export const RelicSatchelDrawer: React.FC<RelicSatchelDrawerProps> = ({
  isOpen,
  onClose,
  unlockedRelicIds,
  onInspectRelic,
  onUnlockAll,
  onResetRelics,
}) => {
  const odysseyRelics = ALL_RELICS.filter((r) => r.storyId === 'odyssey');
  const fatimaRelics = ALL_RELICS.filter((r) => r.storyId === 'fatima-ali');
  const medusaRelics = ALL_RELICS.filter((r) => r.storyId === 'medusa');

  const totalCount = ALL_RELICS.length;
  const unlockedCount = unlockedRelicIds.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#1C1917]/50"
            onClick={onClose}
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-screen max-w-md bg-[#F8F6F0] dark:bg-[#121110] border-l-2 border-[#1C1917] dark:border-[#3A342C] shadow-2xl flex flex-col justify-between transition-colors"
            >
              
              {/* Drawer Header */}
              <div className="p-4 sm:p-5 border-b-2 border-[#1C1917] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#1A1816] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#82292E] dark:bg-[#D45B65]" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#575047] dark:text-[#A39A8D]">
                      MUSEUM RELIC SATCHEL
                    </span>
                  </div>
                  <h2 className="font-arabic-title text-lg sm:text-xl font-bold text-[#1C1917] dark:text-[#F0EAE1]">
                    حقيبة الذخائر والمقتنيات الأثرية
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 border border-[#1C1917] dark:border-[#3A342C] bg-[#F8F6F0] dark:bg-[#24211E] text-[#1C1917] dark:text-[#F0EAE1] hover:bg-[#1C1917] dark:hover:bg-[#F0EAE1] hover:text-[#F8F6F0] dark:hover:text-[#121110] transition-colors"
                  title="إغلاق الحقيبة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar & Curator Presentation Tools */}
              <div className="p-3.5 bg-[#EFE9DF]/80 dark:bg-[#1A1816]/90 border-b border-[#D2C8B8] dark:border-[#3A342C] space-y-2">
                <div className="flex items-center justify-between text-xs font-arabic-title font-semibold text-[#1C1917] dark:text-[#F0EAE1]">
                  <span>نسبة استكشاف الذخائر</span>
                  <span className="font-mono text-[#82292E] dark:text-[#D45B65] font-bold">{unlockedCount} / {totalCount} ({progressPercent}%)</span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full h-2 bg-[#F8F6F0] dark:bg-[#24211E] border border-[#1C1917] dark:border-[#3A342C] overflow-hidden">
                  <div
                    className="h-full bg-[#8A7443] dark:bg-[#D4A247] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Curator Presentation Buttons */}
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <button
                    onClick={() => {
                      sounds.playRelicUnlock();
                      onUnlockAll();
                    }}
                    className="text-[#15324D] dark:text-[#76A9D9] hover:underline font-arabic-title font-bold flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#BA872C] dark:text-[#D4A247]" />
                    <span>كشف الكل للعرض المتحفي</span>
                  </button>

                  <button
                    onClick={() => {
                      sounds.playPageTurn();
                      onResetRelics();
                    }}
                    className="text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1] font-arabic-title flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>إعادة الضبط</span>
                  </button>
                </div>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                
                {/* Section 1: The Odyssey Relics */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5 pb-1 border-b border-[#15324D]/30 dark:border-[#2C4661]/50">
                    <Compass className="w-4 h-4 text-[#BF532C] dark:text-[#D9683F]" />
                    <h3 className="font-arabic-title font-bold text-sm text-[#15324D] dark:text-[#76A9D9]">
                      ذخائر ملحمة الأوديسة (البحر المتوسط)
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {odysseyRelics.map((relic) => {
                      const isUnlocked = unlockedRelicIds.includes(relic.id);
                      return (
                        <div
                          key={relic.id}
                          onClick={() => {
                            if (isUnlocked) {
                              sounds.playPageTurn();
                              onInspectRelic(relic);
                            }
                          }}
                          className={`p-2 border transition-all flex items-center gap-3 ${
                            isUnlocked
                              ? 'bg-[#ECF2F6] dark:bg-[#102030] border-[#15324D] dark:border-[#2C4661] shadow-tactile-sm dark:shadow-tactile-dark-sm cursor-pointer hover:bg-[#F8F6F0] dark:hover:bg-[#1A1816]'
                              : 'bg-[#EFE9DF]/50 dark:bg-[#1A1816]/50 border-[#D2C8B8] dark:border-[#3A342C] opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="relative w-11 h-11 border border-[#1C1917] dark:border-[#3A342C] bg-[#1C1917] shrink-0 overflow-hidden">
                            {isUnlocked ? (
                              <img
                                src={relic.imageUrl}
                                alt={relic.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#575047]/20">
                                <Lock className="w-3.5 h-3.5 text-[#575047] dark:text-[#A39A8D]" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-mono uppercase text-[#BF532C] dark:text-[#D9683F] truncate font-bold">
                                الفصل {relic.chapterIndex + 1}
                              </span>
                              {isUnlocked && (
                                <span className="text-[10px] font-arabic-title text-[#193E30] dark:text-[#459E7B] font-bold flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" />
                                  متاح
                                </span>
                              )}
                            </div>
                            <h4 className="font-arabic-title font-bold text-xs text-[#1C1917] dark:text-[#F0EAE1] truncate">
                              {isUnlocked ? relic.name : 'أثر محجوب في المغامرة'}
                            </h4>
                            <p className="font-arabic-body text-[10px] text-[#575047] dark:text-[#A39A8D] truncate">
                              {isUnlocked ? relic.category : 'انقر دبابيس الفصل أو اتخذ قرارك لكشفه'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Fatima el Zahraa & Royal Jewelry Museum */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5 pb-1 border-b border-[#193E30]/30 dark:border-[#234D3D]/50">
                    <Shield className="w-4 h-4 text-[#BA872C] dark:text-[#D4A247]" />
                    <h3 className="font-arabic-title font-bold text-sm text-[#193E30] dark:text-[#459E7B]">
                      ذخائر قصر المجوهرات الملكية بزيزينيا
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {fatimaRelics.map((relic) => {
                      const isUnlocked = unlockedRelicIds.includes(relic.id);
                      return (
                        <div
                          key={relic.id}
                          onClick={() => {
                            if (isUnlocked) {
                              sounds.playPageTurn();
                              onInspectRelic(relic);
                            }
                          }}
                          className={`p-2 border transition-all flex items-center gap-3 ${
                            isUnlocked
                              ? 'bg-[#EDF3EE] dark:bg-[#0E231B] border-[#193E30] dark:border-[#234D3D] shadow-tactile-sm dark:shadow-tactile-dark-sm cursor-pointer hover:bg-[#F8F6F0] dark:hover:bg-[#1A1816]'
                              : 'bg-[#EFE9DF]/50 dark:bg-[#1A1816]/50 border-[#D2C8B8] dark:border-[#3A342C] opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="relative w-11 h-11 border border-[#1C1917] dark:border-[#3A342C] bg-[#1C1917] shrink-0 overflow-hidden">
                            {isUnlocked ? (
                              <img
                                src={relic.imageUrl}
                                alt={relic.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#575047]/20">
                                <Lock className="w-3.5 h-3.5 text-[#575047] dark:text-[#A39A8D]" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-mono uppercase text-[#BA872C] dark:text-[#D4A247] truncate font-bold">
                                الفصل {relic.chapterIndex + 1}
                              </span>
                              {isUnlocked && (
                                <span className="text-[10px] font-arabic-title text-[#193E30] dark:text-[#459E7B] font-bold flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" />
                                  متاح
                                </span>
                              )}
                            </div>
                            <h4 className="font-arabic-title font-bold text-xs text-[#1C1917] dark:text-[#F0EAE1] truncate">
                              {isUnlocked ? relic.name : 'أثر محجوب في المغامرة'}
                            </h4>
                            <p className="font-arabic-body text-[10px] text-[#575047] dark:text-[#A39A8D] truncate">
                              {isUnlocked ? relic.category : 'انقر دبابيس الفصل أو اتخذ قرارك لكشفه'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Section 3: Medusa & Perseus */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5 pb-1 border-b border-[#2D3A30]/30 dark:border-[#3D5242]/50">
                    <Sparkles className="w-4 h-4 text-[#A66829] dark:text-[#D4A247]" />
                    <h3 className="font-arabic-title font-bold text-sm text-[#2D3A30] dark:text-[#A4C4AA]">
                      ذخائر أسطورة ميدوسا وبيرسيوس (الأولمب)
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {medusaRelics.map((relic) => {
                      const isUnlocked = unlockedRelicIds.includes(relic.id);
                      return (
                        <div
                          key={relic.id}
                          onClick={() => {
                            if (isUnlocked) {
                              sounds.playPageTurn();
                              onInspectRelic(relic);
                            }
                          }}
                          className={`p-2 border transition-all flex items-center gap-3 ${
                            isUnlocked
                              ? 'bg-[#EBEFEB] dark:bg-[#131D16] border-[#2D3A30] dark:border-[#3D5242] shadow-tactile-sm dark:shadow-tactile-dark-sm cursor-pointer hover:bg-[#F8F6F0] dark:hover:bg-[#1A1816]'
                              : 'bg-[#EFE9DF]/50 dark:bg-[#1A1816]/50 border-[#D2C8B8] dark:border-[#3A342C] opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="relative w-11 h-11 border border-[#1C1917] dark:border-[#3A342C] bg-[#1C1917] shrink-0 overflow-hidden">
                            {isUnlocked ? (
                              <img
                                src={relic.imageUrl}
                                alt={relic.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-[#575047]/20">
                                <Lock className="w-3.5 h-3.5 text-[#575047] dark:text-[#A39A8D]" />
                              </div>
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-[10px] font-mono uppercase text-[#A66829] dark:text-[#D4A247] truncate font-bold">
                                الفصل {relic.chapterIndex + 1}
                              </span>
                              {isUnlocked && (
                                <span className="text-[10px] font-arabic-title text-[#193E30] dark:text-[#459E7B] font-bold flex items-center gap-0.5">
                                  <CheckCircle2 className="w-3 h-3" />
                                  متاح
                                </span>
                              )}
                            </div>
                            <h4 className="font-arabic-title font-bold text-xs text-[#1C1917] dark:text-[#F0EAE1] truncate">
                              {isUnlocked ? relic.name : 'أثر محجوب في المغامرة'}
                            </h4>
                            <p className="font-arabic-body text-[10px] text-[#575047] dark:text-[#A39A8D] truncate">
                              {isUnlocked ? relic.category : 'انقر دبابيس الفصل أو اتخذ قرارك لكشفه'}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-3.5 bg-[#EFE9DF] dark:bg-[#1A1816] border-t-2 border-[#1C1917] dark:border-[#3A342C] text-center transition-colors">
                <button
                  onClick={onClose}
                  className="w-full py-2 bg-[#1C1917] dark:bg-[#24211E] text-[#F8F6F0] dark:text-[#F0EAE1] font-arabic-title font-bold text-xs shadow-tactile dark:shadow-tactile-dark hover:bg-[#8A7443] dark:hover:bg-[#A38644] transition-colors"
                >
                  العودة إلى المعرض
                </button>
              </div>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
