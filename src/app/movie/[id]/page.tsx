/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getMovieDetails } from "@/lib/tmdb";
import MovieDetails from "@/components/movies/MovieDetails";
import MovieGrid from "@/components/movies/MovieGrid";
import Loader from "@/components/common/Loader";
import { FaArrowLeft } from "react-icons/fa";

interface MoviePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const movie = await getMovieDetails(parseInt(resolvedParams.id));

    return {
      title: `${movie.title} | MovieFlix`,
      description: movie.overview.substring(0, 160),
    };
  } catch (error) {
    return {
      title: "Movie Details | MovieFlix",
      description: "View detailed information about this movie",
    };
  }
}

export default async function MoviePage({ params }: MoviePageProps) {
  try {
    const resolvedParams = await params;
    const movieId = parseInt(resolvedParams.id);
    const movie = await getMovieDetails(movieId);

    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
        {/* Back Button */}
        <div className="container-custom pt-4">
          <Link
            href="/"
            className="text-white hover:text-secondary flex items-center gap-2 w-fit"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Movie Details */}
        <Suspense fallback={<Loader />}>
          <MovieDetails movie={movie} />
        </Suspense>

        {/* Similar Movies */}
        {movie.similar?.results.length > 0 && (
          <div className="container-custom py-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Similar Movies
            </h2>
            <Suspense fallback={<Loader />}>
              <MovieGrid
                movies={movie.similar.results.slice(0, 12)}
                emptyMessage="No similar movies found"
              />
            </Suspense>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching movie details:", error);
    notFound();
  }
}
