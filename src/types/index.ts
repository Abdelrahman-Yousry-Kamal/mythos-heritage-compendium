export type StoryId = 'odyssey' | 'fatima-ali' | 'medusa';

export type ViewMode = 'portal' | 'story' | 'parallel' | 'satchel';

export interface Hotspot {
  id: string;
  number: number;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  title: string;
  description: string;
  historicalContext: string;
  relicId: string;
}

export interface DecisionChoice {
  id: string;
  title: string;
  actionText: string;
  consequence: string;
  isCanonical: boolean;
  outcomeBadge: string;
}

export interface ChapterDilemma {
  question: string;
  context: string;
  choices: [DecisionChoice, DecisionChoice];
}

export interface Relic {
  id: string;
  storyId: StoryId;
  chapterIndex: number;
  name: string;
  subtitle: string;
  category: string;
  description: string;
  historicalNote: string;
  symbolism: string;
  imageUrl: string;
}

export interface Chapter {
  id: string;
  index: number;
  romanNumber: string;
  title: string;
  location: string;
  era: string;
  imageUrl: string;
  curatorialCaption: string;
  historicalNotes: string[];
  narrativeParagraphs: string[];
  hotspots: Hotspot[];
  dilemma: ChapterDilemma;
  relic: Relic;
}

export interface Story {
  id: StoryId;
  numeral: string;
  title: string;
  englishTitle: string;
  subtitle: string;
  epoch: string;
  region: string;
  hero: string;
  coverImage: string;
  heroThemes: string[];
  description: string;
  chapters: Chapter[];
  borderStyle: 'meander' | 'archway';
}

export interface ParallelTheme {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  odyssey: {
    hero: string;
    focus: string;
    quote: string;
    analysis: string;
    iconName: string;
  };
  fatimaAli: {
    hero: string;
    focus: string;
    quote: string;
    analysis: string;
    iconName: string;
  };
  medusa?: {
    hero: string;
    focus: string;
    quote: string;
    analysis: string;
    iconName: string;
  };
  synthesis: string;
}

