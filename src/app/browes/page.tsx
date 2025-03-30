import { Suspense } from "react";
import { Metadata } from "next";
import {
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
} from "@/lib/tmdb";
import MovieGrid from "@/components/movies/MovieGrid";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import { Movie } from "@/types";

interface SearchParams {
  category?: string;
  genre?: string;
  page?: string;
}

export const metadata: Metadata = {
  title: "Browse Movies | MovieFlix",
  description: "Browse our collection of movies by category or genre",
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Await the promise to resolve the search parameters
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category || "popular";
  const genreId = resolvedSearchParams.genre;
  const page = parseInt(resolvedSearchParams.page || "1");

  let movies: Movie[] = [];
  let totalPages = 0;
  let title = "";

  try {
    let data;

    // Fetch movies based on category
    switch (category) {
      case "top_rated":
        data = await getTopRatedMovies(page);
        title = "Top Rated Movies";
        break;
      case "now_playing":
        data = await getNowPlayingMovies(page);
        title = "Now Playing";
        break;
      case "upcoming":
        data = await getUpcomingMovies(page);
        title = "Upcoming Movies";
        break;
      case "popular":
      default:
        data = await getPopularMovies(page);
        title = "Popular Movies";
        break;
    }

    movies = data.results;
    totalPages = data.total_pages;

    // Simulate filtering by genre by updating the title if a genre is provided
    if (genreId) {
      title = `${title} - Genre: ${genreId}`;
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
  }

  // Define genre mapping for UI display
  const genreMapping: Record<string, string> = {
    "28": "Action",
    "12": "Adventure",
    "16": "Animation",
    "35": "Comedy",
    "80": "Crime",
    "99": "Documentary",
    "18": "Drama",
    "10751": "Family",
    "14": "Fantasy",
    "36": "History",
    "27": "Horror",
    "10402": "Music",
    "9648": "Mystery",
    "10749": "Romance",
    "878": "Science Fiction",
    "10770": "TV Movie",
    "53": "Thriller",
    "10752": "War",
    "37": "Western",
  };

  const genreName = genreId
    ? genreMapping[genreId] || `Genre ${genreId}`
    : null;
  if (genreName) {
    title = `${genreName} Movies`;
  }

  return (
    <div className="min-h-screen">
      <div className="container-custom py-8">
        {/* Category and Genre Filters */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href="/browse?category=popular"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "popular" && !genreId
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Popular
            </a>
            <a
              href="/browse?category=top_rated"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "top_rated" && !genreId
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Top Rated
            </a>
            <a
              href="/browse?category=now_playing"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "now_playing" && !genreId
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Now Playing
            </a>
            <a
              href="/browse?category=upcoming"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === "upcoming" && !genreId
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              Upcoming
            </a>
          </div>

          <details className="mb-6">
            <summary className="cursor-pointer text-lg font-medium">
              Browse by Genre
            </summary>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {Object.entries(genreMapping).map(([id, name]) => (
                <a
                  key={id}
                  href={`/browse?genre=${id}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors text-center ${
                    genreId === id
                      ? "bg-blue-900 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {name}
                </a>
              ))}
            </div>
          </details>
        </div>

        {/* Movies Grid */}
        <Suspense fallback={<Loader />}>
          <MovieGrid
            movies={movies}
            emptyMessage="No movies found for this category or genre"
          />

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={Math.min(totalPages, 500)} // TMDB API typically limits to 500 pages
            />
          )}
        </Suspense>
      </div>
    </div>
  );
}
