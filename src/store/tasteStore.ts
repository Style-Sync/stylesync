import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { Domain, MusicSelection, MovieSelection, FashionSelection } from "@/types/taste";

type TasteStore = {
  selectedDomain: Domain | null;
  musicSelections: MusicSelection[];
  movieSelections: MovieSelection[];
  fashionSelections: FashionSelection[];

  setSelectedDomain: (domain: Domain) => void;
  addMusicSelection: (item: MusicSelection) => void;
  removeMusicSelection: (id: string) => void;
  addMovieSelection: (item: MovieSelection) => void;
  removeMovieSelection: (id: number) => void;
  setFashionStyles: (styles: string[]) => void;
  setFashionMoods: (moods: string[]) => void;
  reset: () => void;
};

const initialState = {
  selectedDomain: null,
  musicSelections: [],
  movieSelections: [],
  fashionSelections: [{ styles: [], fashionMoods: [] }] as FashionSelection[],
};

export const useTasteStore = create<TasteStore>()(
  persist(
    (set) => ({
      ...initialState,

      setSelectedDomain: (domain) => set({ selectedDomain: domain }),

      addMusicSelection: (item) =>
        set((state) => {
          if (state.musicSelections.length >= 3) return state;
          if (state.musicSelections.find((s) => s.id === item.id)) return state;
          return { musicSelections: [...state.musicSelections, item] };
        }),

      removeMusicSelection: (id) =>
        set((state) => ({
          musicSelections: state.musicSelections.filter((s) => s.id !== id),
        })),

      addMovieSelection: (item) =>
        set((state) => {
          if (state.movieSelections.length >= 3) return state;
          if (state.movieSelections.find((s) => s.id === item.id)) return state;
          return { movieSelections: [...state.movieSelections, item] };
        }),

      removeMovieSelection: (id) =>
        set((state) => ({
          movieSelections: state.movieSelections.filter((s) => s.id !== id),
        })),

      setFashionStyles: (styles) =>
        set((state) => ({
          fashionSelections: [{ ...state.fashionSelections[0], styles }],
        })),

      setFashionMoods: (moods) =>
        set((state) => ({
          fashionSelections: [{ ...state.fashionSelections[0], fashionMoods: moods }],
        })),

      reset: () => set(initialState),
    }),
    {
      name: "taste-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);