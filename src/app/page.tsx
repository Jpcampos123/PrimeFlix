"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Header from "./Components/Header";
import api from "@/services/api";
import MovieCard, { Movie } from "./Components/Movie";
import Loading from "./Components/Loading";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [series, setSeries] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<string>("movie");

  useEffect(() => {
    async function loadSeries() {
      try {
        const res = await api.get("/tv/top_rated", {
          params: {
            language: "pt-BR",
            page: 1,
          },
        });

        const data = res.data;
        setSeries(data.results);

        setLoading(false); // Marca o carregamento como concluído
      } catch (err: any) {
        setError(err.message);
        setLoading(false); // Marca o carregamento como concluído
      }
    }
    async function loadFilmes() {
      try {
        const res = await api.get("/movie/now_playing", {
          params: {
            language: "pt-BR",
            page: 1,
          },
        });

        const data = res.data;
        setMovies(data.results);
        setLoading(false); // Marca o carregamento como concluído
      } catch (err: any) {
        setError(err.message);
        setLoading(false); // Marca o carregamento como concluído
      }
    }

    loadFilmes();
    loadSeries();
  }, []);

  const handleRemove = (id: number) => {
    const updatedMovies = movies.filter((m) => m.id !== id);
    setMovies(updatedMovies);
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {/* filmes */}
      <div className="container mx-auto py-8 mt-16 text-center lg:text-left ">
        <h1 className="text-3xl font-bold mb-4  ">Filmes em Cartaz</h1>
        <Swiper
          direction="horizontal"
          spaceBetween={10}
          slidesPerView={4}
          navigation
          modules={[Navigation]}
          className="h-[600px]"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.4, spaceBetween: 20 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id} className="swiper-slide-custom">
              <MovieCard
                movie={movie}
                onRemove={handleRemove}
                showRemoveButton={false}
                type={type}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* séries */}
      <div className="container mx-auto py-8 mt-10 text-center lg:text-left ">
        <h1 className="text-3xl font-bold mb-4 ">
          Séries mais assistidas do momento
        </h1>
        <Swiper
          direction="horizontal"
          spaceBetween={10}
          slidesPerView={4}
          navigation
          modules={[Navigation]}
          className="h-[600px]"
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.4, spaceBetween: 20 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {series.map((serie) => (
            <SwiperSlide key={serie.id} className="swiper-slide-custom">
              <MovieCard
                movie={serie}
                onRemove={handleRemove}
                showRemoveButton={false}
                type="tv"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
