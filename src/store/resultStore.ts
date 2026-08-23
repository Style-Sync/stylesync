import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { StyleResult } from "@/types/result";

/** 결과별 DB 저장 상태. 저장 배너가 실제 결과를 반영하도록 사용한다. */
export type SaveStatus = "saving" | "saved" | "error";

type ResultStore = {
  results: Record<string, StyleResult>;
  saveStatuses: Record<string, SaveStatus>;
  saveResult: (result: StyleResult) => void;
  setSaveStatus: (id: string, status: SaveStatus) => void;
  getResult: (id: string) => StyleResult | undefined;
};

export const useResultStore = create<ResultStore>()(
  persist(
    (set, get) => ({
      results: {},
      saveStatuses: {},
      saveResult: (result) =>
        set((state) => ({ results: { ...state.results, [result.id]: result } })),
      setSaveStatus: (id, status) =>
        set((state) => ({ saveStatuses: { ...state.saveStatuses, [id]: status } })),
      getResult: (id) => get().results[id],
    }),
    {
      name: "result-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
