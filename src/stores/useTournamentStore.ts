import { create } from 'zustand';

export type matchFilterTypes = "all" | "Q1" | "Q2" | "Q3" | "Q4" | "Q5" | "Q6";
export type dataFilterTypes = "countdown" | "winner" | "placements" | "mvp" | "mvpwinner" | "mvptable" | "matchtable" | "classificationtable" | "specialclassificationtable" | "rankingmvpbadge";

export interface Team {
  guildId: number;
  name: string;
  points: string;
  position: number;
  wins: number;
  tag?: string;
  avatar?: string;
}

type useTournamentStore = {
  countdown: string;
  teams: Team[];
  matchFilter: matchFilterTypes;
  dataFilter: dataFilterTypes;
  ranking: { [key: string]: any };
  setCountdown: (value: string) => void;
  setMatchFilter: (filter: matchFilterTypes) => void;
  setDataFilter: (filter: dataFilterTypes) => void;
  setTeams: (teams: Team[]) => void;
  setRanking: (match: matchFilterTypes, filter: dataFilterTypes, value: any) => void;
  clearRanking: () => void;
}

export const useTournamentStore = create<useTournamentStore>((set) => ({
  countdown: "2025-11-09T19:55:20.000Z",
  teams: [],
  matchFilter: "all",
  dataFilter: "countdown",
  ranking: {},

  setCountdown: (countdown) => set({ countdown }),
  setMatchFilter: (matchFilter) => set({ matchFilter }),
  setDataFilter: (dataFilter) => set({ dataFilter }),
  setTeams: (teams) => set({ teams }),
  setRanking: (match, filter, value) => set((state) => ({
    ranking: {
      ...state.ranking,
      [match]: {
        ...(state.ranking[match] || {}),
        [filter]: value,
      },
    },
  })),
  clearRanking: () => set({ ranking: {} })
}));
