// MovieDetails.tsx
"use client";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Loading from "@/app/Components/Loading";
import { toast } from "react-toastify";


export interface MovieDetails {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string;
  tagline: string;
  vote_average: number;
}

export interface MovieDetailsResponse {
  movie: MovieDetails;
}

const MovieDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const type = params.type;
  const id = params.id;
  const [movie, setMovie] = useState<MovieDetails>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        const res = await api.get(`/${type}/${id}`, {
          params: {
            language: "pt-BR",
          },
        });

        setMovie(res.data);
        setLoading(false); // Marca o carregamento como concluído
      } catch (error) {
        console.error("Erro ao carregar os detalhes do filme:", error);
        setLoading(false); // Marca o carregamento como concluído
      }
    };

    fetchMovieDetails();
  }, [id, type]);

  function salvarFilme() {
    const minhaLista: any = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo: any) => filmesSalvo.id === movie?.id
    );

    if (hasFilme) {
      toast.warn("item já está na lista");
      return;
    }

    filmesSalvos.push(movie);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    toast.success("FILME SALVO COM SUCESSO!");
  }

  if (loading) {
    return <Loading />;
  }

  if (!movie) {
    return <div>Filme não encontrado</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="max-w-6xl mx-auto p-4" style={{ marginTop: "6.25rem" }}>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-2/5 flex justify-center items-center mb-4 md:mb-0">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg w-full h-full md:max-w-sm"
            />
          </div>
          <div className="w-full md:w-3/5 md:pl-8">
            <h1 className="text-3xl font-bold mb-4">
              {movie.title ? movie.title : movie.name}
            </h1>
            <h1 className="text-3xl font-bold mb-4">Sinopse</h1>
            <p className="text-base text-gray-700 mb-4">{movie.overview}</p>
            <strong className="mb-6">
              Avaliação {movie.vote_average.toFixed(2)} /10
            </strong>
            <div className="flex flex-col sm:flex-row mt-3 sm:space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
                onClick={salvarFilme}
              >
                Salvar
              </button>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <a
                  target="_blank"
                  href={`http://youtube.com/results?search_query=${movie.title} Trailer`}
                >
                  Trailer
                </a>
              </button>
            </div>
            <div className="hidden sm:block">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => router.back()}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
