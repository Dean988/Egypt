import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TreasureHuntProgress {
  currentStep: number;
  completed: boolean;
  startedAt?: string | null;
}

interface Progress {
  visitedExhibits: string[];
  visitedRoutes: string[];
  treasureHunts: {
    [id: string]: TreasureHuntProgress;
  };
}

interface ButtonPositions {
  servicesButton: {
    bottom: number;
    right: number;
  };
  chatButton: {
    bottom: number;
    right: number;
  };
}

interface PurchasedTicket {
  id: string;
  ticketId: string;
  name: string;
  price: number;
  quantity: number;
  date: string;
  time: string;
  purchaseDate: string;
  validUntil: string;
  qrCode: string;
  used: boolean;
}

interface UserState {
  name: string;
  email: string;
  tickets: string[];
  purchasedTickets: PurchasedTicket[];
  progress: Progress;
  treasureHuntProgress: {
    [id: string]: TreasureHuntProgress;
  };
  buttonPositions: ButtonPositions;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  addTicket: (ticketId: string) => void;
  addPurchasedTicket: (ticket: PurchasedTicket) => void;
  markExhibitAsVisited: (exhibitId: string) => void;
  markRouteAsVisited: (routeId: string) => void;
  updateTreasureHuntProgress: (treasureHuntId: string, progress: TreasureHuntProgress) => void;
  completeTreasureHunt: (treasureHuntId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      tickets: [],
      purchasedTickets: [],
      progress: {
        visitedExhibits: [],
        visitedRoutes: [],
        treasureHunts: {},
      },
      treasureHuntProgress: {
        hunt1: { currentStep: 0, completed: false, startedAt: null },
        hunt2: { currentStep: 0, completed: false, startedAt: null },
        hunt3: { currentStep: 0, completed: false, startedAt: null },
      },
      buttonPositions: {
        servicesButton: {
          bottom: 120,
          right: 24,
        },
        chatButton: {
          bottom: 200,
          right: 24,
        },
      },
      setName: (name) => set({ name }),
      setEmail: (email) => set({ email }),
      addTicket: (ticketId) => set((state) => ({
        tickets: [...state.tickets, ticketId],
      })),
      addPurchasedTicket: (ticket) => set((state) => ({
        purchasedTickets: [...state.purchasedTickets, ticket],
      })),
      markExhibitAsVisited: (exhibitId) => set((state) => ({
        progress: {
          ...state.progress,
          visitedExhibits: state.progress.visitedExhibits.includes(exhibitId)
            ? state.progress.visitedExhibits
            : [...state.progress.visitedExhibits, exhibitId],
        },
      })),
      markRouteAsVisited: (routeId) => set((state) => ({
        progress: {
          ...state.progress,
          visitedRoutes: state.progress.visitedRoutes.includes(routeId)
            ? state.progress.visitedRoutes
            : [...state.progress.visitedRoutes, routeId],
        },
      })),
      updateTreasureHuntProgress: (treasureHuntId, progress) => set((state) => ({
        treasureHuntProgress: {
          ...state.treasureHuntProgress,
          [treasureHuntId]: progress,
        },
        progress: {
          ...state.progress,
          treasureHunts: {
            ...state.progress.treasureHunts,
            [treasureHuntId]: progress,
          },
        },
      })),
      completeTreasureHunt: (treasureHuntId) => set((state) => ({
        treasureHuntProgress: {
          ...state.treasureHuntProgress,
          [treasureHuntId]: {
            ...state.treasureHuntProgress[treasureHuntId],
            completed: true,
          },
        },
        progress: {
          ...state.progress,
          treasureHunts: {
            ...state.progress.treasureHunts,
            [treasureHuntId]: {
              ...state.progress.treasureHunts[treasureHuntId],
              completed: true,
            },
          },
        },
      })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);