"use client";

import { MusicTasteCard } from "@/components/domain/musicTasteCard";
import { useTasteStore } from "@/store/tasteStore";

const MOCK_ARTISTS = [
  {
    id: "1",
    title: "NewJeans",
    genre: "Y2K Pop",
    imageUrl: "",
  },
  {
    id: "2",
    title: "Keshi",
    genre: "Lo-fi",
    imageUrl: "",
  },
  {
    id: "3",
    title: "IU",
    genre: "Ballad",
    imageUrl: "",
  },
  {
    id: "4",
    title: "IU",
    genre: "Ballad",
    imageUrl: "",
  },
];

export function MusicInput() {
  const musicSelections = useTasteStore((s) => s.musicSelections);

  const addMusicSelection = useTasteStore((s) => s.addMusicSelection);

  const removeMusicSelection = useTasteStore((s) => s.removeMusicSelection);

  const handleSelect = (artist: (typeof MOCK_ARTISTS)[number]) => {
    const isSelected = musicSelections.some((item) => item.id === artist.id);

    if (isSelected) {
      removeMusicSelection(artist.id);
      return;
    }

    addMusicSelection({
      id: artist.id,
      name: artist.title,
      image: artist.imageUrl,
      genres: [artist.genre],
      previewUrl: "",
    });
  };

  return (
    <div className="grid-cols-responsive">
      {MOCK_ARTISTS.map((artist) => {
        const isSelected = musicSelections.some((item) => item.id === artist.id);

        return (
          <MusicTasteCard
            key={artist.id}
            domain="music"
            title={artist.title}
            genre={artist.genre}
            imageUrl={artist.imageUrl}
            selected={isSelected}
            onClick={() => handleSelect(artist)}
          />
        );
      })}
    </div>
  );
}
