"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loading from "../Loading";

export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
}

export interface MovieCardProps {
  movie: Movie;
  onRemove?: (id: number) => void;
  showRemoveButton?: boolean;
  type?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onRemove,
  showRemoveButton,
  type,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNavigateToDetails = () => {
    setLoading(true);
    // router.push(`/Detalhes/${type}/${movie.id}`);
    router.push(`/Detalhes/${movie.title ? "movie" : "tv"}/${movie.id}`);
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  const truncate = (str: string, num: number) => {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  return (
    <div className="w-80 mx-4 my-8 bg-white rounded-lg overflow-hidden shadow-lg mx-auto ">
      <div className="relative h-64">
        <img
          className="w-full h-full object-cover object-center"
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">
          {movie.title ? movie.title : movie.name}
        </h3>

        <p className="text-gray-700 text-base flex h-32 overflow-hidden my-4">
          {movie.overview.length < 220
            ? movie.overview
            : truncate(movie.overview, 165)}
        </p>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
            onClick={handleNavigateToDetails}
          >
            Detalhes
          </button>
          {showRemoveButton && onRemove && (
            <button
              onClick={() => onRemove(movie.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm"
            >
              Remover
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
