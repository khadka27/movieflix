"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { createYoutubeEmbedUrl } from "@/lib/utils";
import { Movie, Video } from "@/types";
import {
  FaArrowLeft,
  FaDownload,
  FaExpand,
  FaPause,
  FaPlay,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

interface MoviePlayerProps {
  movie: Movie;
  videoKey?: string;
  videos?: Video[];
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({
  movie,
  videoKey,
  videos = [],
}) => {
  // State for player controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  // Use the first trailer if no videoKey is provided
  const defaultVideoKey =
    videoKey ||
    videos.find((video) => video.type === "Trailer" && video.site === "YouTube")
      ?.key;

  // If no valid video is available, use a demo key or placeholder
  const finalVideoKey = defaultVideoKey || "dQw4w9WgXcQ"; // Default to a popular video if none available

  const playerRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle auto-hide of controls
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);

      if (controlsTimer) {
        clearTimeout(controlsTimer);
      }

      const timer = setTimeout(() => {
        setShowControls(false);
      }, 3000);

      setControlsTimer(timer);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }

      if (controlsTimer) {
        clearTimeout(controlsTimer);
      }
    };
  }, [controlsTimer]);

  // In a real implementation, we would use the YouTube iframe API
  // For this demo, we'll simulate controls with a standard iframe
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, we would use the YouTube iframe API methods
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // In a real implementation, we would use the YouTube iframe API methods
  };

  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href={`/movie/${movie.id}`}
          className="flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Details</span>
        </Link>
      </div>

      {/* Player Container */}
      <div
        ref={containerRef}
        className="relative w-full h-screen flex items-center justify-center bg-black"
      >
        {/* Video Player */}
        <iframe
          ref={playerRef}
          src={`${createYoutubeEmbedUrl(finalVideoKey)}${
            isMuted ? "&mute=1" : ""
          }`}
          className="w-full h-full md:w-[90%] md:h-[90%] max-w-5xl mx-auto"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* Custom Controls Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="text-white hover:text-secondary transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>

              <button
                onClick={toggleMute}
                className="text-white hover:text-secondary transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <FaVolumeMute size={20} />
                ) : (
                  <FaVolumeUp size={20} />
                )}
              </button>

              <div className="text-white ml-4">
                <h2 className="font-semibold">{movie.title}</h2>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href={`/download/${movie.id}`}
                className="text-white hover:text-secondary transition-colors flex items-center gap-2"
              >
                <FaDownload size={16} />
                <span className="hidden sm:inline">Download</span>
              </Link>

              <button
                onClick={toggleFullScreen}
                className="text-white hover:text-secondary transition-colors"
                aria-label="Toggle fullscreen"
              >
                <FaExpand size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayer;
