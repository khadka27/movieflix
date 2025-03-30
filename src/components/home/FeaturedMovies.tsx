'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Movie } from '@/types';
import MovieCard from '@/components/movies/MovieCard';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface FeaturedMoviesProps {
  title: string;
  movies: Movie[];
  viewMoreLink?: string;
}

const FeaturedMovies: React.FC<FeaturedMoviesProps> = ({ 
  title, 
  movies,
  viewMoreLink 
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ 
        left: -300, 
        behavior: 'smooth' 
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ 
        left: 300, 
        behavior: 'smooth' 
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        
        {viewMoreLink && (
          <Link 
            href={viewMoreLink} 
            className="text-secondary flex items-center gap-1 hover:underline"
          >
            <span>View All</span>
            <FaArrowRight size={14} />
          </Link>
        )}
      </div>
      
      <div className="relative">
        {/* Scroll Controls */}
        <button 
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>
        
        <button 
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
        
        {/* Scrollable Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide space-x-4 py-2 px-1 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-[180px] md:w-[220px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;