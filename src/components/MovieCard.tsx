"use client";

import Image from "next/image";
import { FaPlay, FaPlus, FaThumbsUp } from "react-icons/fa";
import { Movie } from "@/types";
import { getImageUrl } from "@/lib/tmdb";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const matchPercentage = movie.vote_average
    ? Math.round(movie.vote_average * 10)
    : 0;
  const releaseYear = (
    movie.release_date ||
    movie.first_air_date ||
    "N/A"
  ).split("-")[0];

  return (
    <div className="group relative h-36 min-w-[240px] md:h-44 md:min-w-[290px] cursor-pointer perspective-1000">
      {/* Main Card Container */}
      <div className="relative h-full w-full rounded-md transition-all duration-300 ease-in-out md:group-hover:scale-110 md:group-hover:z-50 md:group-hover:shadow-2xl">
        <Link
          href={`/movie/${movie.id}?type=${movie.media_type || "movie"}`}
          className="block h-full w-full relative"
        >
          <Image
            src={
              getImageUrl(movie.backdrop_path || movie.poster_path) ||
              "/images/action.png"
            }
            alt={movie.title || movie.name || "Movie Poster"}
            fill
            className="rounded-md object-cover brightness-90 transition group-hover:brightness-110"
          />
        </Link>

        {/* Info Overlay (appears on hover) */}
        <div className="absolute inset-0 z-10 invisible opacity-0 flex-col justify-between rounded-md bg-linear-to-t from-background via-black/40 to-transparent p-4 transition-all duration-300 md:group-hover:visible md:group-hover:opacity-100">
          <div className="flex justify-end pt-2">
            <FaPlus
              className="text-white hover:text-gray-300 transition"
              size={14}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link
                href={`/watch/${movie.id}?type=${movie.media_type || "movie"}`}
              >
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black hover:bg-neutral-200 transition shadow-lg">
                  <FaPlay size={12} className="ml-1" />
                </button>
              </Link>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-400/80 text-white hover:border-white transition bg-black/30 backdrop-blur-sm">
                <FaThumbsUp size={12} />
              </button>
              <div className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-gray-500/50 bg-black/40 backdrop-blur-sm">
                <span className="text-[10px] font-bold text-white uppercase">
                  HD
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-white drop-shadow-md line-clamp-1">
                {movie.title || movie.name}
              </h4>
              <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-200">
                <span className="text-green-400 font-bold">
                  {matchPercentage}% Match
                </span>
                <span>•</span>
                <span className="font-medium">{releaseYear}</span>
                <span className="border border-gray-500 px-1 rounded-[2px] text-[8px] uppercase">
                  5.1
                </span>
              </div>
              {movie.genre_ids && (
                <div className="mt-1 flex flex-wrap gap-1 text-[9px] text-gray-400">
                  <span>Drama</span>
                  <span>•</span>
                  <span>Thriller</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
