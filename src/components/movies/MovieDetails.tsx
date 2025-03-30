'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MovieDetails as MovieDetailsType } from '@/types';
import { getImageUrl, formatRuntime, formatDate } from '@/lib/tmdb';
import { formatCurrency, formatNumber } from '@/lib/utils';
import { FaStar, FaPlay, FaDownload, FaCalendarAlt, FaClock } from 'react-icons/fa';

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  
  // Find trailer if available
  const trailer = movie.videos?.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
  
  // Get director
  const director = movie.credits?.crew.find((person) => person.job === 'Director');
  
  // Get top cast (limit to 6)
  const topCast = movie.credits?.cast.slice(0, 6) || [];

  return (
    <div className="min-h-screen">
      {/* Backdrop Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh]">
        {backdropUrl && (
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            quality={80}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      {/* Movie Content */}
      <div className="container-custom mx-auto -mt-[25vh] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Poster */}
          <div className="md:col-span-3 flex justify-center md:justify-start">
            <div className="relative h-[400px] w-[270px] rounded-lg overflow-hidden shadow-lg">
              {posterUrl ? (
                <Image
                  src={posterUrl}
                  alt={movie.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="270px"
                />
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <span className="text-gray-400">{movie.title}</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-9 text-white">
            {/* Title and Tagline */}
            <h1 className="text-3xl md:text-4xl font-bold">
              {movie.title} <span className="text-gray-400">({movie.release_date.slice(0, 4)})</span>
            </h1>
            
            {movie.tagline && (
              <p className="text-gray-300 italic mt-2">{movie.tagline}</p>
            )}

            {/* Rating and Info */}
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
                <span className="text-gray-400 ml-1">({formatNumber(movie.vote_count)} votes)</span>
              </div>
              
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="text-gray-400" />
                <span>{formatDate(movie.release_date)}</span>
              </div>
              
              {movie.runtime > 0 && (
                <div className="flex items-center gap-1">
                  <FaClock className="text-gray-400" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="mt-4 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/browse?genre=${genre.id}`}
                  className="bg-dark/80 px-3 py-1 rounded-full text-sm hover:bg-secondary transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href={`/watch/${movie.id}`} className="btn btn-secondary flex items-center gap-2">
                <FaPlay />
                <span>Watch Now</span>
              </Link>
              
              <Link href={`/download/${movie.id}`} className="btn btn-primary flex items-center gap-2">
                <FaDownload />
                <span>Download</span>
              </Link>
              
              {trailer && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline text-white"
                >
                  Watch Trailer
                </a>
              )}
            </div>

            {/* Overview */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Overview</h3>
              <p className="text-gray-300">{movie.overview}</p>
            </div>

            {/* Credits */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {director && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Director</h3>
                  <p className="text-gray-300">{director.name}</p>
                </div>
              )}
              
              {topCast.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Cast</h3>
                  <div className="text-gray-300">
                    {topCast.map((actor, index) => (
                      <span key={actor.id}>
                        {actor.name}
                        {index < topCast.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
              {movie.status && (
                <div>
                  <h4 className="font-semibold">Status</h4>
                  <p>{movie.status}</p>
                </div>
              )}
              
              {movie.budget > 0 && (
                <div>
                  <h4 className="font-semibold">Budget</h4>
                  <p>{formatCurrency(movie.budget)}</p>
                </div>
              )}
              
              {movie.revenue > 0 && (
                <div>
                  <h4 className="font-semibold">Revenue</h4>
                  <p>{formatCurrency(movie.revenue)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;