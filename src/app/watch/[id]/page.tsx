/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getMovieDetails, getTvDetails } from "@/lib/tmdb";
import MoviePlayer from "@/components/movies/MoviePlayer";

interface WatchPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ type?: string }>;
}

export async function generateMetadata({
  params,
  searchParams,
}: WatchPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isTv = resolvedSearchParams.type === "tv";

  try {
    const fetcher = isTv ? getTvDetails : getMovieDetails;
    const movie = await fetcher(parseInt(resolvedParams.id));

    const titlePrefix = isTv ? "Watch TV Show" : "Watch Movie";
    return {
      title: `${titlePrefix} ${movie.title} | MovieFlix`,
      description: `Watch ${movie.title} online for free on MovieFlix`,
    };
  } catch (error) {
    return {
      title: "Watch | MovieFlix",
      description: "Watch movies and TV shows online for free",
    };
  }
}

export default async function WatchPage({
  params,
  searchParams,
}: WatchPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const isTv = resolvedSearchParams.type === "tv";

  try {
    const movieId = parseInt(resolvedParams.id);
    const fetcher = isTv ? getTvDetails : getMovieDetails;
    const movie = await fetcher(movieId);

    // Look for a trailer or teaser video
    const videos = movie.videos?.results || [];
    const trailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    // Use the first video if no trailer is found
    const videoKey =
      trailer?.key ||
      (videos[0]?.site === "YouTube" ? videos[0]?.key : undefined);

    return (
      <div className="min-h-screen">
        <MoviePlayer
          movie={movie}
          videoKey={videoKey}
          videos={videos}
          isTv={isTv}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching details:", error);
    notFound();
  }
}
