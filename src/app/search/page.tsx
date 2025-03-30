import { Suspense } from "react";
import { Metadata } from "next";
import { searchMovies } from "@/lib/tmdb";
import MovieGrid from "@/components/movies/MovieGrid";
import Pagination from "@/components/common/Pagination";
import Loader from "@/components/common/Loader";
import { Movie } from "@/types";

interface SearchPageProps {
  searchParams: {
    q: string;
    page?: string;
  };
}

export const metadata: Metadata = {
  title: "Search Movies | MovieFlix",
  description: "Search for your favorite movies on MovieFlix",
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const page = parseInt(searchParams.page || "1");

  let movies: Movie[] = [];
  let totalPages = 0;
  let totalResults = 0;

  // Only search if a query is provided
  if (query) {
    try {
      const searchResults = await searchMovies(query, page);
      movies = searchResults.results;
      totalPages = searchResults.total_pages;
      totalResults = searchResults.total_results;
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            {query ? `Search Results for "${query}"` : "Search Movies"}
          </h1>

          {query && (
            <p className="text-gray-500">
              Found {totalResults} movies matching your search
            </p>
          )}
        </div>

        <Suspense fallback={<Loader />}>
          {query ? (
            <>
              <MovieGrid
                movies={movies}
                emptyMessage={`No movies found matching "${query}"`}
              />

              {totalPages > 1 && (
                <Pagination currentPage={page} totalPages={totalPages} />
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="text-xl font-semibold mb-2">
                Enter a search term
              </h2>
              <p className="text-gray-500 max-w-md">
                Use the search bar at the top of the page to find your favorite
                movies
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
