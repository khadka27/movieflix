'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types';
import { getImageUrl } from '@/lib/tmdb';
import { truncateText } from '@/lib/utils';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

interface BannerProps {
  movies: Movie[];
}

const Banner: React.FC<BannerProps> = ({ movies }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (movies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % movies.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [movies.length]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentSlide];
  const backdropUrl = getImageUrl(currentMovie.backdrop_path, 'original');

  return (
    <div className="relative w-full h-[70vh] md:h-[80vh]">
      {/* Backdrop Image */}
      <div className="absolute inset-0 z-0">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={currentMovie.title}
            fill
            priority
            quality={80}
            style={{ objectFit: 'cover' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      </div>

      {/* Movie Info */}
      <div className="container-custom mx-auto h-full flex flex-col justify-end pb-16 md:pb-20 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {currentMovie.title}
          </h1>
          <p className="text-gray-300 text-lg mb-6">
            {truncateText(currentMovie.overview, 200)}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={`/watch/${currentMovie.id}`} className="btn btn-primary flex items-center gap-2">
              <FaPlay />
              <span>Watch Now</span>
            </Link>
            <Link href={`/movie/${currentMovie.id}`} className="btn btn-outline text-white flex items-center gap-2">
              <FaInfoCircle />
              <span>More Info</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-secondary' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;