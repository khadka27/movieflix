/* eslint-disable @typescript-eslint/no-unused-vars */
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMovieDetails, getImageUrl } from "@/lib/tmdb";
import { formatRuntime } from "@/lib/tmdb";
import { getYearFromDate } from "@/lib/utils";
import { FaArrowLeft, FaDownload, FaFilm, FaPlay } from "react-icons/fa";

interface DownloadPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: DownloadPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const movie = await getMovieDetails(parseInt(resolvedParams.id));
    return {
      title: `Download ${movie.title} | MovieFlix`,
      description: `Download ${movie.title} in HD quality from MovieFlix`,
    };
  } catch (error) {
    return {
      title: "Download Movie | MovieFlix",
      description: "Download movies for free",
    };
  }
}

export default async function DownloadPage({ params }: DownloadPageProps) {
  try {
    const resolvedParams = await params;
    const movieId = parseInt(resolvedParams.id);
    const movie = await getMovieDetails(movieId);

    const posterUrl = getImageUrl(movie.poster_path, "w500");
    const backdropUrl = getImageUrl(movie.backdrop_path, "original");
    const year = getYearFromDate(movie.release_date);

    // Demo download options (In a real app, these would be actual download links)
    const downloadOptions = [
      { quality: "4K Ultra HD", size: "8.1 GB", format: "MKV" },
      { quality: "1080p Full HD", size: "2.4 GB", format: "MP4" },
      { quality: "720p HD", size: "1.2 GB", format: "MP4" },
      { quality: "480p SD", size: "700 MB", format: "MP4" },
      { quality: "360p Low", size: "450 MB", format: "MP4" },
    ];

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        {/* Back Button */}
        <div className="container-custom pt-6">
          <Link
            href={`/movie/${movie.id}`}
            className="text-white hover:text-secondary flex items-center gap-2 w-fit"
          >
            <FaArrowLeft />
            <span>Back to Movie Details</span>
          </Link>
        </div>

        {/* Download Section */}
        <div className="container-custom py-8">
          <div className="bg-dark rounded-xl overflow-hidden shadow-2xl">
            {/* Header with Backdrop */}
            <div className="relative h-[200px] md:h-[300px]">
              {backdropUrl && (
                <Image
                  src={backdropUrl}
                  alt={movie.title}
                  fill
                  priority
                  style={{ objectFit: "cover" }}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {movie.title} {year && `(${year})`}
                </h1>
                {movie.tagline && (
                  <p className="text-gray-300 italic">{movie.tagline}</p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Left Column - Poster and Info */}
                <div className="md:col-span-4 flex flex-col items-center md:items-start">
                  {/* Poster */}
                  <div className="relative h-[300px] w-[200px] rounded-lg overflow-hidden shadow-lg mb-4">
                    {posterUrl ? (
                      <Image
                        src={posterUrl}
                        alt={movie.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="200px"
                      />
                    ) : (
                      <div className="w-full h-full bg-black flex items-center justify-center">
                        <span className="text-gray-400">{movie.title}</span>
                      </div>
                    )}
                  </div>

                  {/* Quick Info */}
                  <div className="w-full bg-black/20 rounded-lg p-4 text-white space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Duration:</span>
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Quality:</span>
                      <span>Multiple</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Rating:</span>
                      <span>{movie.vote_average.toFixed(1)}/10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Release:</span>
                      <span>{movie.release_date}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 w-full space-y-2">
                    <Link
                      href={`/watch/${movie.id}`}
                      className="btn btn-secondary w-full flex items-center justify-center gap-2"
                    >
                      <FaPlay />
                      <span>Watch Online</span>
                    </Link>
                  </div>
                </div>

                {/* Right Column - Download Options */}
                <div className="md:col-span-8">
                  <h2 className="text-xl font-bold text-white mb-4">
                    Download Options
                  </h2>

                  <div className="bg-black/20 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-3 md:grid-cols-4 bg-black/40 text-white font-semibold p-3">
                      <div>Quality</div>
                      <div>Size</div>
                      <div className="hidden md:block">Format</div>
                      <div className="text-right">Download</div>
                    </div>

                    {downloadOptions.map((option, index) => (
                      <div
                        key={index}
                        className={`grid grid-cols-3 md:grid-cols-4 p-4 text-white ${
                          index % 2 === 0 ? "bg-black/10" : "bg-black/20"
                        }`}
                      >
                        <div className="flex items-center">
                          <FaFilm className="text-secondary mr-2" />
                          <span>{option.quality}</span>
                        </div>
                        <div className="flex items-center">{option.size}</div>
                        <div className="hidden md:flex items-center">
                          {option.format}
                        </div>
                        <div className="text-right">
                          <button className="px-4 py-2 bg-secondary text-white rounded-full hover:bg-primary transition-colors flex items-center gap-1 ml-auto">
                            <FaDownload size={14} />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Download Notice */}
                  <div className="mt-6 p-4 border border-yellow-600 rounded-lg bg-yellow-600/10 text-white">
                    <h3 className="font-bold text-yellow-500 mb-2">
                      Download Notice
                    </h3>
                    <p>
                      This is a demo app for educational purposes. In a
                      real-world application, you would need to ensure
                      compliance with copyright laws and distribution rights.
                      The download links on this page are not functional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching movie details:", error);
    notFound();
  }
}
