export type CardLevel = 'purple' | 'yellow' | 'red' | 'blue';

export interface Card {
  id: string;
  name: string;
  category: string;
  level: CardLevel;
  dateEarned: Date;
  prerequisites: string[];
  description: string;
  imageUrl?: string;
  isArchived?: boolean;
}

export type DeckTier = 'starter' | 'student' | 'scholars' | 'master';

export interface Deck {
  id: string;
  name: string;
  tier: DeckTier;
  capacity: number;
  cards: Card[];
  theme?: string;
  isArchived: boolean;
}

export interface DeckTierInfo {
  tier: DeckTier;
  capacity: number;
  unlockMethod: string;
  price?: number;
}

export const DECK_TIERS: Record<DeckTier, DeckTierInfo> = {
  starter: {
    tier: 'starter',
    capacity: 10,
    unlockMethod: 'Free upon sign-up',
  },
  student: {
    tier: 'student',
    capacity: 25,
    unlockMethod: 'Earned via first 20 achievements',
  },
  scholars: {
    tier: 'scholars',
    capacity: 50,
    unlockMethod: 'Purchase or reach Level 3 in any area',
    price: 9.99,
  },
  master: {
    tier: 'master',
    capacity: 100,
    unlockMethod: 'Premium purchase',
    price: 19.99,
  },
}; 