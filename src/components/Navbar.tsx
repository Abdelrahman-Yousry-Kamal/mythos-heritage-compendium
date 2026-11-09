import React, { useState } from 'react';
import type { ViewMode, StoryId } from '../types';
import { 
  Compass, Scroll, Shield, Maximize2, Minimize2, 
  Volume2, VolumeX, Sparkles, BookOpen, Moon, Sun 
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface NavbarProps {
  currentView: ViewMode;
  activeStoryId: StoryId;
  onSelectView: (view: ViewMode) => void;
  onSelectStory: (storyId: StoryId) => void;
  unlockedRelicCount: number;
  totalRelicCount: number;
  onOpenSatchel: () => void;
  hasNewRelic: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  activeStoryId,
  onSelectView,
  onSelectStory,
  unlockedRelicCount,
  totalRelicCount,
  onOpenSatchel,
  hasNewRelic,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAmbientOn, setIsAmbientOn] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const toggleMute = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const toggleAmbient = () => {
    const ambientPlaying = sounds.toggleAmbientMusic();
    setIsAmbientOn(ambientPlaying);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F6F0] dark:bg-[#1A1816] border-b border-[#D2C8B8] dark:border-[#3A342C] shadow-sm select-none transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        
        {/* Left / Start: Emblem & Museum Title */}
        <div 
          onClick={() => {
            sounds.playPageTurn();
            onSelectView('portal');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="العودة إلى بوابة الملاحم الرئيسية"
        >
          <div className="w-9 h-9 border-2 border-[#1C1917] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#24211E] flex items-center justify-center shadow-tactile-sm dark:shadow-tactile-dark-sm transition-transform group-hover:-translate-x-0.5">
            <Scroll className="w-4 h-4 text-[#8A7443] dark:text-[#D4A247]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-arabic-title font-bold text-sm sm:text-base text-[#1C1917] dark:text-[#F0EAE1] leading-tight">
                معرض الأساطير والتراث
              </span>
              <span className="text-[10px] px-1.5 py-0.2 bg-[#8A7443]/15 dark:bg-[#8A7443]/30 text-[#575047] dark:text-[#D5CDBD] font-serif border border-[#8A7443]/40 hidden md:inline-block">
                مجلد متحفي
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-[#575047] dark:text-[#A39A8D] font-mono tracking-widest uppercase">
              MYTHOS & HERITAGE COMPENDIUM
            </span>
          </div>
        </div>

        {/* Center: Navigation Pill Switcher */}
        <nav className="hidden lg:flex items-center bg-[#EFE9DF] dark:bg-[#24211E] p-1 border border-[#D2C8B8] dark:border-[#3A342C] shadow-tactile-sm dark:shadow-tactile-dark-sm">
          {/* Portal Home */}
          <button
            onClick={() => {
              sounds.playPageTurn();
              onSelectView('portal');
            }}
            className={`px-3 py-1 text-xs font-arabic-title font-bold transition-all ${
              currentView === 'portal'
                ? 'bg-[#1C1917] text-[#F8F6F0] dark:bg-[#F0EAE1] dark:text-[#121110] shadow-sm'
                : 'text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1] hover:bg-[#F8F6F0]/70 dark:hover:bg-[#1A1816]'
            }`}
          >
            بوابة الملاحم
          </button>

          <div className="w-px h-3.5 bg-[#D2C8B8] dark:bg-[#3A342C] mx-1" />

          {/* Odyssey */}
          <button
            onClick={() => {
              sounds.playPageTurn();
              onSelectStory('odyssey');
              onSelectView('story');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-arabic-title font-bold transition-all ${
              currentView === 'story' && activeStoryId === 'odyssey'
                ? 'bg-[#15324D] text-[#F8F6F0] dark:bg-[#1C3E5E] shadow-sm'
                : 'text-[#575047] dark:text-[#A39A8D] hover:text-[#15324D] dark:hover:text-[#76A9D9] hover:bg-[#ECF2F6] dark:hover:bg-[#102030]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-[#BF532C] dark:text-[#D9683F]" />
            ملحمة الأوديسة
          </button>

          <div className="w-px h-3.5 bg-[#D2C8B8] dark:bg-[#3A342C] mx-1" />

          {/* Fatima & Ali */}
          <button
            onClick={() => {
              sounds.playPageTurn();
              onSelectStory('fatima-ali');
              onSelectView('story');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-arabic-title font-bold transition-all ${
              currentView === 'story' && activeStoryId === 'fatima-ali'
                ? 'bg-[#193E30] text-[#F8F6F0] dark:bg-[#134230] shadow-sm'
                : 'text-[#575047] dark:text-[#A39A8D] hover:text-[#193E30] dark:hover:text-[#459E7B] hover:bg-[#EDF3EE] dark:hover:bg-[#0E231B]'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-[#BA872C] dark:text-[#D4A247]" />
            قصر فاطمة الزهراء (متحف المجوهرات)
          </button>

          <div className="w-px h-3.5 bg-[#D2C8B8] dark:bg-[#3A342C] mx-1" />

          {/* Parallel Lore */}
          <button
            onClick={() => {
              sounds.playPageTurn();
              onSelectView('parallel');
            }}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-arabic-title font-bold transition-all ${
              currentView === 'parallel'
                ? 'bg-[#8A7443] text-[#F8F6F0] dark:bg-[#A38644] shadow-sm'
                : 'text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1] hover:bg-[#F8F6F0]/70 dark:hover:bg-[#1A1816]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            مقارنة الأنساق
          </button>
        </nav>

        {/* Right / End: Relic Satchel & Audio & Dark Mode & Fullscreen */}
        <div className="flex items-center gap-2">
          
          {/* Dark Mode Button (الوضع الليلي المتحفي) */}
          <button
            onClick={onToggleDarkMode}
            className="p-1.5 sm:px-2.5 sm:py-1 border border-[#D2C8B8] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#24211E] text-[#575047] dark:text-[#D5CDBD] hover:text-[#1C1917] dark:hover:text-[#F0EAE1] hover:border-[#1C1917] dark:hover:border-[#D5CDBD] transition-all flex items-center gap-1.5 text-xs font-arabic-title font-semibold shadow-tactile-sm dark:shadow-tactile-dark-sm"
            title={isDarkMode ? "التبديل إلى الوضع النهاري" : "التبديل إلى الوضع الليلي المتحفي"}
            aria-label="تبديل الوضع الليلي والنهاري"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#D4A247]" />
                <span className="hidden md:inline">الوضع النهاري</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#8A7443]" />
                <span className="hidden md:inline">الوضع الليلي</span>
              </>
            )}
          </button>

          {/* Ambient Tone Toggle */}
          <button
            onClick={toggleAmbient}
            className={`p-1.5 sm:px-2.5 sm:py-1 border border-[#D2C8B8] dark:border-[#3A342C] transition-all flex items-center gap-1 text-xs font-serif ${
              isAmbientOn 
                ? 'bg-[#8A7443] text-[#F8F6F0] border-[#1C1917] dark:border-[#000000]' 
                : 'bg-[#EFE9DF] dark:bg-[#24211E] text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1]'
            }`}
            title={isAmbientOn ? "إيقاف نغمة الأثير المتحفية" : "تشغيل نغمة الأثير المتحفية"}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#BA872C] dark:text-[#D4A247]" />
            <span className="hidden xl:inline text-[11px] font-arabic-title">أثير المعرض</span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={toggleMute}
            className="p-1.5 border border-[#D2C8B8] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#24211E] text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1] transition-colors"
            title={isMuted ? "تشغيل المؤثرات الصوتية" : "كتم الأصوات"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Fullscreen Presentation Mode Button */}
          <button
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-[#D2C8B8] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#24211E] text-[#575047] dark:text-[#A39A8D] hover:text-[#1C1917] dark:hover:text-[#F0EAE1] hover:border-[#1C1917] dark:hover:border-[#D5CDBD] text-xs font-arabic-title font-semibold transition-all shadow-tactile-sm dark:shadow-tactile-dark-sm"
            title="وضع العرض المتحفي بملء الشاشة"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">عرض تقديمي</span>
          </button>

          {/* Relic Satchel Button */}
          <button
            onClick={() => {
              sounds.playRelicUnlock();
              onOpenSatchel();
            }}
            className={`relative flex items-center gap-2 px-3 py-1.5 border-2 border-[#1C1917] dark:border-[#3A342C] font-arabic-title font-bold text-xs sm:text-sm transition-all shadow-tactile dark:shadow-tactile-dark hover:-translate-y-0.5 ${
              hasNewRelic
                ? 'bg-[#BA872C] text-[#1C1917] animate-pulse'
                : 'bg-[#EFE9DF] dark:bg-[#24211E] text-[#1C1917] dark:text-[#F0EAE1] hover:bg-[#F8F6F0] dark:hover:bg-[#1A1816]'
            }`}
          >
            <Scroll className="w-3.5 h-3.5 text-[#82292E] dark:text-[#D45B65]" />
            <span>حقيبة الذخائر</span>
            <span className="px-1.5 py-0.2 bg-[#1C1917] text-[#F8F6F0] dark:bg-[#000000] dark:text-[#D4A247] text-[10px] font-mono">
              {unlockedRelicCount}/{totalRelicCount}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Secondary Switcher */}
      <div className="lg:hidden flex items-center justify-around border-t border-[#D2C8B8] dark:border-[#3A342C] bg-[#EFE9DF] dark:bg-[#24211E] px-2 py-1 text-xs font-arabic-title font-semibold overflow-x-auto">
        <button
          onClick={() => {
            sounds.playPageTurn();
            onSelectView('portal');
          }}
          className={`px-2 py-1 ${currentView === 'portal' ? 'text-[#1C1917] dark:text-[#F0EAE1] border-b-2 border-[#1C1917] dark:border-[#F0EAE1]' : 'text-[#575047] dark:text-[#A39A8D]'}`}
        >
          البوابة
        </button>
        <button
          onClick={() => {
            sounds.playPageTurn();
            onSelectStory('odyssey');
            onSelectView('story');
          }}
          className={`px-2 py-1 flex items-center gap-1 ${currentView === 'story' && activeStoryId === 'odyssey' ? 'text-[#15324D] dark:text-[#76A9D9] border-b-2 border-[#15324D] dark:border-[#76A9D9]' : 'text-[#575047] dark:text-[#A39A8D]'}`}
        >
          الأوديسة
        </button>
        <button
          onClick={() => {
            sounds.playPageTurn();
            onSelectStory('fatima-ali');
            onSelectView('story');
          }}
          className={`px-2 py-1 flex items-center gap-1 ${currentView === 'story' && activeStoryId === 'fatima-ali' ? 'text-[#193E30] dark:text-[#459E7B] border-b-2 border-[#193E30] dark:border-[#459E7B]' : 'text-[#575047] dark:text-[#A39A8D]'}`}
        >
          قصر المجوهرات
        </button>
        <button
          onClick={() => {
            sounds.playPageTurn();
            onSelectView('parallel');
          }}
          className={`px-2 py-1 ${currentView === 'parallel' ? 'text-[#8A7443] dark:text-[#D4A247] border-b-2 border-[#8A7443] dark:border-[#D4A247]' : 'text-[#575047] dark:text-[#A39A8D]'}`}
        >
          مقارنة الأنساق
        </button>
      </div>
    </header>
  );
};
