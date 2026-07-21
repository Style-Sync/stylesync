"use client";

import Image from "next/image";

import type { IInputSummaryProps } from "./inputSummary.types";

export function InputSummary({ items, onRemove, label }: IInputSummaryProps) {
  if (items.length === 0) return null;

  return (
    <div className="mb-6">
      {label && (
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-on-surface-variant">
          {label}
        </p>
      )}
      <div className="flex gap-4 overflow-x-auto pb-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative flex w-16 flex-shrink-0 flex-col items-center gap-1.5"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-surface-variant">
              {item.imageUrl && (
                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
              )}
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                aria-label={`${item.name} 선택 해제`}
                className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-container text-xs leading-none text-white shadow-sm"
              >
                ×
              </button>
            </div>
            <span className="w-full truncate text-center text-xs leading-tight text-on-background">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
