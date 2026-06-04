"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { isValidDomain } from "@/hooks/useStepValidation";
import { useTasteStore } from "@/store/tasteStore";
import type { Domain } from "@/types/taste";

type DomainGuardProps = {
  domain: string;
  children: React.ReactNode;
};

export const DomainGuard = ({ domain, children }: DomainGuardProps) => {
  const router = useRouter();
  const selectedDomain = useTasteStore((s) => s.selectedDomain);
  const setSelectedDomain = useTasteStore((s) => s.setSelectedDomain);

  useEffect(() => {
    if (!isValidDomain(domain)) {
      router.replace("/select");
      return;
    }

    if (!selectedDomain) {
      setSelectedDomain(domain as Domain);
      return;
    }

    if (selectedDomain !== domain) {
      router.replace(`/taste/${selectedDomain}`);
    }
  }, [domain, selectedDomain, router, setSelectedDomain]);

  if (!isValidDomain(domain)) return null;

  return <>{children}</>;
};
