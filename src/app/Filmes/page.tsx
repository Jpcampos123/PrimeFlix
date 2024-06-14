"use client";
import { useEffect, useState } from "react";
import MovieCard, { Movie } from "../Components/Movie";
import Loading from "../Components/Loading";

interface FilmeProps {
  showRemoveButton?: boolean;
}

export default function Filme({ showRemoveButton = true }: FilmeProps) {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    // Buscar dados do localStorage
    const storedData = localStorage.getItem("@primeflix");
    if (storedData) {
      setMovie(JSON.parse(storedData));
    }
    setLoading(false);
  }, []);

  const handleRemove = (id: number) => {
    setLoading(true);
    const updatedMovies = movie.filter((m) => m.id !== id);
    setMovie(updatedMovies);
    localStorage.setItem("@primeflix", JSON.stringify(updatedMovies));
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ marginTop: "6.25rem" }}>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-4">Meus Filmes Favoritos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4  gap-4">
          {movie.length > 0 ? (
            movie.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onRemove={handleRemove}
                showRemoveButton={showRemoveButton}
              />
            ))
          ) : (
            <p>Nenhum filme encontrado</p>
          )}
        </div>
      </div>
    </div>
  );
}
