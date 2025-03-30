'use client';

import React from 'react';
import { Movie } from '@/types';
import MovieCard from './MovieCard';
import Loader from '@/components/common/Loader';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  title?: string;
  emptyMessage?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading = false,
  title,
  emptyMessage = 'No movies found'
}) => {
  if (loading) {
    return <Loader />;
  }

  const hasMovies = movies && movies.length > 0;

  return (
    <div className="py-4">
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      
      {hasMovies ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-gray-500">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;