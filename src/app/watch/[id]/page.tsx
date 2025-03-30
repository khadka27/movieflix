/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getMovieDetails } from "@/lib/tmdb";
import MoviePlayer from "@/components/movies/MoviePlayer";

interface WatchPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: WatchPageProps): Promise<Metadata> {
  try {
    const movie = await getMovieDetails(parseInt(params.id));

    return {
      title: `Watch ${movie.title} | MovieFlix`,
      description: `Watch ${movie.title} online for free on MovieFlix`,
    };
  } catch (error) {
    return {
      title: "Watch Movie | MovieFlix",
      description: "Watch movies online for free",
    };
  }
}

export default async function WatchPage({ params }: WatchPageProps) {
  try {
    const movieId = parseInt(params.id);
    const movie = await getMovieDetails(movieId);

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
        <MoviePlayer movie={movie} videoKey={videoKey} videos={videos} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching movie details:", error);
    notFound();
  }
}
