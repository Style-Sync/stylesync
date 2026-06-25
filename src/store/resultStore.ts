import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { StyleResult } from "@/types/result";

type ResultStore = {
  results: Record<string, StyleResult>;
  saveResult: (result: StyleResult) => void;
  getResult: (id: string) => StyleResult | undefined;
};

export const useResultStore = create<ResultStore>()(
  persist(
    (set, get) => ({
      results: {},
      saveResult: (result) =>
        set((state) => ({ results: { ...state.results, [result.id]: result } })),
      getResult: (id) => get().results[id],
    }),
    {
      name: "result-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
