import HeroSection from "@/components/HeroSection";
import SectionRow from "@/components/SectionRow";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMulti,
} from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";

export const revalidate = 3600; // Revalidate every hour

export default async function Home({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = await searchParams; // Next.js 15 requires awaiting searchParams if it's dynamic, though this is Next 14/15 safe pattern
  const searchQuery = query?.q;

  if (searchQuery) {
    const searchData = await searchMulti(searchQuery);
    return (
      <main className="relative min-h-screen pt-24 px-4 md:px-12 pb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Results for "{searchQuery}"
        </h2>
        
        {searchData.results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8 gap-x-4">
            {searchData.results
              .filter((movie) => movie.backdrop_path || movie.poster_path) // Filter out items with no images
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-xl">No results found for "{searchQuery}"</p>
            <p className="text-sm mt-2">Try searching for something else.</p>
          </div>
        )}
      </main>
    );
  }

  const [nowPlayingData, popularData, topRatedData, upcomingData] =
    await Promise.all([
      getNowPlayingMovies(),
      getPopularMovies(),
      getTopRatedMovies(),
      getUpcomingMovies(),
    ]);

  const featuredMovie = nowPlayingData.results[0];

  return (
    <main className="relative min-h-screen pb-20">
      <HeroSection movie={featuredMovie} />

      <div className="relative z-20 -mt-32 flex flex-col gap-8 md:gap-12">
        <SectionRow title="Trending Now" movies={popularData.results} />
        <SectionRow title="Top Rated" movies={topRatedData.results} />
        <SectionRow title="New Releases" movies={nowPlayingData.results} />
        <SectionRow title="Coming Soon" movies={upcomingData.results} />
      </div>
    </main>
  );
}
