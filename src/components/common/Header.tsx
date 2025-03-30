import { Suspense } from 'react';
import Banner from '@/components/home/Banner';
import FeaturedMovies from '@/components/home/FeaturedMovies';
import Loader from '@/components/common/Loader';
import { getNowPlayingMovies, getPopularMovies, getTopRatedMovies } from '@/lib/tmdb';

export default async function Home() {
  // Fetch initial movie data
  const [nowPlayingData, popularMoviesData, topRatedMoviesData] = await Promise.all([
    getNowPlayingMovies(),
    getPopularMovies(),
    getTopRatedMovies(),
  ]);

  return (
    <div className="min-h-screen">
      <Suspense fallback={<Loader />}>
        <Banner movies={nowPlayingData.results.slice(0, 5)} />
      </Suspense>

      <div className="container-custom py-8 space-y-12">
        <Suspense fallback={<Loader />}>
          <FeaturedMovies 
            title="Popular Movies" 
            movies={popularMoviesData.results} 
            viewMoreLink="/browse?category=popular" 
          />
        </Suspense>
        
        <Suspense fallback={<Loader />}>
          <FeaturedMovies 
            title="Top Rated Movies" 
            movies={topRatedMoviesData.results} 
            viewMoreLink="/browse?category=top_rated" 
          />
        </Suspense>
        
        <Suspense fallback={<Loader />}>
          <FeaturedMovies 
            title="Now Playing" 
            movies={nowPlayingData.results} 
            viewMoreLink="/browse?category=now_playing" 
          />
        </Suspense>
      </div>
    </div>
  );
}