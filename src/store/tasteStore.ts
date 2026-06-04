import { create } from "zustand";

import type { Domain, MusicSelection, MovieSelection, FashionSelection } from "@/types/taste";

type TasteStore = {
  selectedDomain: Domain | null;
  musicSelections: MusicSelection[];
  movieSelections: MovieSelection[];
  fashionSelection: FashionSelection;

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
  fashionSelection: { styles: [], fashionMoods: [] },
};

export const useTasteStore = create<TasteStore>((set) => ({
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
    set((state) => ({ fashionSelection: { ...state.fashionSelection, styles } })),

  setFashionMoods: (moods) =>
    set((state) => ({ fashionSelection: { ...state.fashionSelection, fashionMoods: moods } })),

  reset: () => set(initialState),
}));
