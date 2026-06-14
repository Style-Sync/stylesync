"use client";

import { useState } from "react";

import { FashionTasteCard } from "@/components/domain/fashionTasteCard";

const STYLE_OPTIONS = [
  {
    id: "minimal",
    title: "Minimal",
    genre: "Clean",
    imageUrl: "",
  },
  {
    id: "street",
    title: "Street",
    genre: "Urban",
    imageUrl: "",
  },
  {
    id: "vintage",
    title: "Vintage",
    genre: "Classic",
    imageUrl: "",
  },
  {
    id: "sporty",
    title: "Sporty",
    genre: "Casual",
    imageUrl: "",
  },
];

export function FashionInput() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (styleId: string) => {
    setSelectedIds((prev) =>
      prev.includes(styleId) ? prev.filter((id) => id !== styleId) : [...prev, styleId]
    );
  };

  return (
    <div className="grid-cols-responsive">
      {STYLE_OPTIONS.map((item) => (
        <FashionTasteCard
          key={item.id}
          domain="fashion"
          title={item.title}
          genre={item.genre}
          imageUrl={item.imageUrl}
          selected={selectedIds.includes(item.id)}
          onClick={() => handleSelect(item.id)}
        />
      ))}
    </div>
  );
}
