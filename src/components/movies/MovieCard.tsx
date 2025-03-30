'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import { formatRating, getYearFromDate } from '@/lib/utils';
import { FaStar, FaPlay, FaInfoCircle, FaDownload } from 'react-icons/fa';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const year = getYearFromDate(movie.release_date);
  const rating = formatRating(movie.vote_average);

  return (
    <div 
      className="movie-card h-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 180px, 220px"
            priority={false}
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 ease-in-out"
          />
        ) : (
          <div className="w-full h-full bg-gray-900 flex items-center justify-center">
            <span className="text-gray-400">{movie.title}</span>
          </div>
        )}
        
        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center space-y-2 p-4 transition-opacity duration-300">
            <Link 
              href={`/watch/${movie.id}`}
              className="w-full btn btn-secondary flex items-center justify-center gap-2"
            >
              <FaPlay size={14} />
              <span>Watch</span>
            </Link>
            
            <Link 
              href={`/download/${movie.id}`}
              className="w-full btn btn-primary flex items-center justify-center gap-2"
            >
              <FaDownload size={14} />
              <span>Download</span>
            </Link>
            
            <Link 
              href={`/movie/${movie.id}`}
              className="w-full btn btn-outline text-white flex items-center justify-center gap-2"
            >
              <FaInfoCircle size={14} />
              <span>Details</span>
            </Link>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded-md flex items-center">
          <FaStar className="text-yellow-400 mr-1" size={12} />
          <span className="text-sm">{rating}</span>
        </div>
      </div>
      
      {/* Movie Info */}
      <div className="p-2">
        <Link href={`/movie/${movie.id}`}>
          <h3 className="font-semibold text-sm md:text-base line-clamp-1 hover:text-secondary transition-colors">
            {movie.title}
          </h3>
        </Link>
        {year && (
          <p className="text-xs text-gray-500">{year}</p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;