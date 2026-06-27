"use client";

import { useState } from "react";

import type { InferenceRequest, InferenceResult } from "@/lib/inference/inference.types";

type UseInference = {
  infer: (request: InferenceRequest) => Promise<InferenceResult>;
  isLoading: boolean;
  error: string | null;
};

export function useInference(): UseInference {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const infer = async (request: InferenceRequest): Promise<InferenceResult> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "추론 요청에 실패했습니다.");
      return data.result as InferenceResult;
    } catch (e) {
      const message = e instanceof Error ? e.message : "추론 요청에 실패했습니다.";
      setError(message);
      throw e;
    } finally {
      setIsLoading(false);
    }
  };

  return { infer, isLoading, error };
}
