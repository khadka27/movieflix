"use client";

import Image from "next/image";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { Movie } from "@/types";
import { getImageUrl } from "@/lib/tmdb";
import Link from "next/link";

interface HeroProps {
  movie: Movie;
}

const HeroSection = ({ movie }: HeroProps) => {
  if (!movie) return null;

  return (
    <div className="relative w-full h-[90vh] text-white">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={
            getImageUrl(movie.backdrop_path || movie.poster_path, "original") ||
            "/images/hero.png"
          }
          alt={movie.title}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Cinematic Gradients */}
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center px-4 md:px-12 max-w-[1440px] mx-auto">
        <div className="max-w-2xl space-y-6 pt-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
           {/* Movie Logo Placeholder (Title for now) */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white to-gray-400 drop-shadow-2xl">
            {movie.title}
          </h1>
          
          <div className="flex items-center gap-3 text-lg font-medium text-gray-300">
             <span className="text-green-500">98% Match</span>
             <span>{movie.release_date?.split('-')[0]}</span>
             <span className="border border-white/30 px-2 rounded-sm text-sm">4K Ultra HD</span>
          </div>

          <p className="text-lg md:text-xl text-gray-100 drop-shadow-md line-clamp-3 leading-relaxed max-w-xl">
            {movie.overview}
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link href={`/watch/${movie.id}`}>
              <button className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-[4px] hover:bg-neutral-200 transition font-bold text-xl shadow-xl">
                <FaPlay size={24} />
                Play
              </button>
            </Link>
            <Link href={`/movie/${movie.id}`}>
              <button className="flex items-center gap-3 px-8 py-3 bg-gray-500/40 text-white rounded-[4px] hover:bg-gray-500/30 transition font-bold text-xl backdrop-blur-md border border-white/10">
                <FaInfoCircle size={28} />
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
