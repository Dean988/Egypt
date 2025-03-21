export interface Exhibit {
  id: string;
  name: string;
  period: string;
  description: string;
  imageUrl: string;
  location: string;
  floor: number;
  roomNumber: string;
  audioGuideAvailable: boolean;
  featured?: boolean;
  exhibitType?: 'mummy' | 'papyrus' | 'statue' | 'jewelry' | 'artifact' | 'painting' | 'tool' | 'weapon' | 'furniture' | 'cosmetic' | 'amulet' | 'vessel' | 'relief' | 'stela' | 'coffin';
}

export interface Route {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  duration: number;
  exhibits: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  recommended?: boolean;
  thematic?: boolean;
  themeColor?: string;
  startingPoint?: string;
  endingPoint?: string;
}

export interface TreasureHunt {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  difficulty: string;
  duration: number;
  locations: number;
  ageRange: string;
  points: number;
  clues: Clue[];
  estimatedTime: number | string;
  ageRecommendation: string;
}

export interface Clue {
  id: string;
  question: string;
  hint: string;
  exhibitId: string;
  answer: string;
  imageUrl: string;
}

export interface Ticket {
  id: string;
  type?: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
  validityPeriod?: string;
}

export interface UserTicket {
  id: string;
  ticketId: string;
  purchaseDate: string;
  validUntil: string;
  used: boolean;
  qrCode: string;
  quantity?: number;
  totalPrice?: number;
}

export interface UserProgress {
  completedExhibits: string[];
  treasureHuntProgress: {
    [huntId: string]: {
      started: boolean;
      completedClues: string[];
      completed: boolean;
      startTime?: string;
      endTime?: string;
    };
  };
  favoriteExhibits: string[];
  visitedRoutes: string[];
}

export interface Room {
  id: string;
  number: string;
  name: string;
  description: string;
  floor: number;
  x: number;
  y: number;
  exhibitType?: string;
  exhibitId?: string;
  isSpecial?: boolean;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  color: string;
  rooms: string[];
  exhibitTypes: string[];
}

export interface ButtonPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}