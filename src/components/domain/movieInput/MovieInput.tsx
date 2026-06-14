"use client";

import { MovieTasteCard } from "@/components/domain/movieTasteCard";
import { useTasteStore } from "@/store/tasteStore";

const MOCK_MOVIES = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    imageUrl: "",
  },
  {
    id: 2,
    title: "La La Land",
    genre: "Romance",
    imageUrl: "",
  },
  {
    id: 3,
    title: "Parasite",
    genre: "Thriller",
    imageUrl: "",
  },
  {
    id: 4,
    title: "Parasite",
    genre: "Thriller",
    imageUrl: "",
  },
];

export function MovieInput() {
  const movieSelections = useTasteStore((s) => s.movieSelections);

  const addMovieSelection = useTasteStore((s) => s.addMovieSelection);

  const removeMovieSelection = useTasteStore((s) => s.removeMovieSelection);

  const handleSelect = (movie: (typeof MOCK_MOVIES)[number]) => {
    const isSelected = movieSelections.some((item) => item.id === movie.id);

    if (isSelected) {
      removeMovieSelection(movie.id);
      return;
    }

    addMovieSelection({
      id: movie.id,
      title: movie.title,
      posterPath: movie.imageUrl,
      backdropPath: "",
      genres: [movie.genre],
      releaseYear: 2024,
    });
  };

  return (
    <div className="grid-cols-responsive">
      {MOCK_MOVIES.map((movie) => {
        const isSelected = movieSelections.some((item) => item.id === movie.id);

        return (
          <MovieTasteCard
            key={movie.id}
            domain="movie"
            title={movie.title}
            genre={movie.genre}
            imageUrl={movie.imageUrl}
            selected={isSelected}
            onClick={() => handleSelect(movie)}
          />
        );
      })}
    </div>
  );
}
