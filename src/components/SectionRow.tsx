"use client";

import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MovieCard from "./MovieCard";
import { Movie } from "@/types";

interface SectionProps {
  title: string;
  movies: Movie[];
}

const SectionRow = ({ title, movies }: SectionProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-4 py-8 pl-4 md:pl-12">
      <h2 className="group flex items-center gap-2 text-xl font-semibold text-white md:text-2xl transition hover:text-white/90 cursor-pointer">
        {title}
        <span className="hidden text-sm font-normal text-cyan-400 opacity-0 transition group-hover:inline-block group-hover:opacity-100">
          Explore All
        </span>
      </h2>

      <div className="group relative">
        <div
          className="absolute bottom-0 top-0 left-0 z-40 m-auto h-[90%] w-12 cursor-pointer bg-black/50 opacity-0 transition hover:bg-black/70 group-hover:opacity-100 hidden md:flex items-center justify-center"
          onClick={() => handleClick("left")}
        >
          <FaChevronLeft className="text-white" size={24} />
        </div>

        <div
          ref={rowRef}
          className="flex items-center gap-4 overflow-x-scroll scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar for standard browsers
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <div
          className="absolute bottom-0 top-0 right-0 z-40 m-auto h-[90%] w-12 cursor-pointer bg-black/50 opacity-0 transition hover:bg-black/70 group-hover:opacity-100 hidden md:flex items-center justify-center"
          onClick={() => handleClick("right")}
        >
          <FaChevronRight className="text-white" size={24} />
        </div>
      </div>
    </div>
  );
};

export default SectionRow;
