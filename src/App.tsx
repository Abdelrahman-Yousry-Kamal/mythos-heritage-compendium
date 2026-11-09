import { useState, useEffect } from 'react';
import type { ViewMode, StoryId, Relic } from './types';
import { ALL_RELICS } from './data/storiesData';
import { Navbar } from './components/Navbar';
import { PortalView } from './components/PortalView';
import { StoryReaderView } from './components/StoryReaderView';
import { ParallelLoreView } from './components/ParallelLoreView';
import { RelicSatchelDrawer } from './components/RelicSatchelDrawer';
import { RelicInspectModal } from './components/RelicInspectModal';
import { sounds } from './utils/soundEffects';

export function App() {
  // Navigation & Story View States
  const [currentView, setCurrentView] = useState<ViewMode>('portal');
  const [activeStoryId, setActiveStoryId] = useState<StoryId>('odyssey');
  const [chapterIndices, setChapterIndices] = useState<Record<StoryId, number>>({
    odyssey: 0,
    'fatima-ali': 0,
  });

  // Dark Mode State (Persisted in localStorage, defaults to Light Museum Mode)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mythos-dark-mode');
      if (saved !== null) {
        return saved === 'true';
      }
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('mythos-dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('mythos-dark-mode', 'false');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    sounds.playPageTurn();
    setIsDarkMode((prev) => !prev);
  };

  // Relic Satchel States (Initial 2 starter relics unlocked for museum immediacy)
  const [unlockedRelicIds, setUnlockedRelicIds] = useState<string[]>([
    'relic-compass-aeolus',
    'relic-shield-zf',
  ]);
  const [isSatchelOpen, setIsSatchelOpen] = useState(false);
  const [inspectingRelic, setInspectingRelic] = useState<Relic | null>(null);
  const [hasNewRelic, setHasNewRelic] = useState(false);

  // Unlock single relic
  const handleUnlockRelic = (relicId: string) => {
    if (!unlockedRelicIds.includes(relicId)) {
      setUnlockedRelicIds((prev) => [...prev, relicId]);
      setHasNewRelic(true);
      setTimeout(() => setHasNewRelic(false), 5000);
    }
  };

  // Unlock all relics for Museum Presentation mode
  const handleUnlockAll = () => {
    const allIds = ALL_RELICS.map((r) => r.id);
    setUnlockedRelicIds(allIds);
  };

  // Reset unlocked relics
  const handleResetRelics = () => {
    setUnlockedRelicIds(['relic-compass-aeolus', 'relic-shield-zf']);
  };

  // Chapter navigation
  const handleSelectChapter = (index: number) => {
    setChapterIndices((prev) => ({
      ...prev,
      [activeStoryId]: index,
    }));
  };

  // Story selector
  const handleSelectStory = (storyId: StoryId) => {
    setActiveStoryId(storyId);
    setCurrentView('story');
  };

  // Keyboard Navigation: Arrow keys to flip chapters & Escape to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Close modals on Escape
      if (e.key === 'Escape') {
        if (inspectingRelic) {
          setInspectingRelic(null);
        } else if (isSatchelOpen) {
          setIsSatchelOpen(false);
        }
        return;
      }

      // Flip chapters on ArrowLeft / ArrowRight when reading stories
      if (currentView === 'story' && !isSatchelOpen && !inspectingRelic) {
        const currentIdx = chapterIndices[activeStoryId];
        if (e.key === 'ArrowLeft') {
          // In Arabic RTL, ArrowLeft moves forward to the next page
          if (currentIdx < 4) {
            sounds.playPageTurn();
            handleSelectChapter(currentIdx + 1);
          }
        } else if (e.key === 'ArrowRight') {
          // ArrowRight moves back to previous page
          if (currentIdx > 0) {
            sounds.playPageTurn();
            handleSelectChapter(currentIdx - 1);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView, activeStoryId, chapterIndices, isSatchelOpen, inspectingRelic]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F0] dark:bg-[#121110] text-[#1C1917] dark:text-[#F0EAE1] font-arabic-body selection:bg-[#BF532C]/20 selection:text-[#1C1917] dark:selection:text-[#F0EAE1] transition-colors duration-200">
      
      {/* Persistent Editorial Top Navigation Bar */}
      <Navbar
        currentView={currentView}
        activeStoryId={activeStoryId}
        onSelectView={setCurrentView}
        onSelectStory={handleSelectStory}
        unlockedRelicCount={unlockedRelicIds.length}
        totalRelicCount={ALL_RELICS.length}
        onOpenSatchel={() => setIsSatchelOpen(true)}
        hasNewRelic={hasNewRelic}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'portal' && (
          <PortalView
            onSelectStory={handleSelectStory}
            onExploreParallel={() => setCurrentView('parallel')}
          />
        )}

        {currentView === 'story' && (
          <StoryReaderView
            storyId={activeStoryId}
            chapterIndex={chapterIndices[activeStoryId]}
            onSelectChapter={handleSelectChapter}
            onUnlockRelic={handleUnlockRelic}
            unlockedRelicIds={unlockedRelicIds}
          />
        )}

        {currentView === 'parallel' && (
          <ParallelLoreView
            onBackToPortal={() => setCurrentView('portal')}
          />
        )}
      </main>

      {/* Slide-Over Drawer: Relic Satchel */}
      <RelicSatchelDrawer
        isOpen={isSatchelOpen}
        onClose={() => setIsSatchelOpen(false)}
        unlockedRelicIds={unlockedRelicIds}
        onInspectRelic={(relic) => setInspectingRelic(relic)}
        onUnlockAll={handleUnlockAll}
        onResetRelics={handleResetRelics}
      />

      {/* Curatorial Inspection Modal */}
      <RelicInspectModal
        relic={inspectingRelic}
        onClose={() => setInspectingRelic(null)}
      />

    </div>
  );
}

export default App;
