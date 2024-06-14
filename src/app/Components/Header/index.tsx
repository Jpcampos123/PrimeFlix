"use client";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  function handleRoute(id: string) {
    router.push(id);
  }

  return (
    <header className="bg-black text-white fixed top-0 left-0 w-full z-10">
      <nav className="container mx-auto flex justify-around space-x-4 py-4">
        <a
          onClick={() => handleRoute("/")}
          className="hover:text-blue-700 text-2xl font-bold cursor-pointer"
        >
          Prime Flix
        </a>

        <a
          onClick={() => handleRoute("/Filmes")}
          className="hover:text-blue-700 text-2xl font-bold cursor-pointer"
        >
          Favoritos
        </a>
      </nav>
    </header>
  );
}
