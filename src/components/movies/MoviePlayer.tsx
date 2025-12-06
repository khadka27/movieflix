"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Movie, Video } from "@/types";
import { FaArrowLeft, FaDownload, FaExpand, FaGlobe } from "react-icons/fa";

interface MoviePlayerProps {
  movie: Movie;
  videoKey?: string;
  videos?: Video[];
  isTv?: boolean;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({
  movie,
  videoKey,
  videos = [],
  isTv = false,
}) => {
  const [showControls, setShowControls] = useState(true);
  const [lightsOff, setLightsOff] = useState(false);
  const [controlsTimer, setControlsTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const typePath = isTv ? "tv" : "movie";

  // Expanded Server List
  const SERVERS = [
    {
      name: "VidSrc (Best for New)",
      url: `https://vidsrc.to/embed/${typePath}/${movie.id}`,
    },
    {
      name: "SuperStream (Fast)",
      url: `https://multiembed.mov/?video_id=${movie.id}&tmdb=1`,
    },
    {
      name: "AutoEmbed (Multi-Lang)",
      url: `https://autoembed.co/${typePath}/tmdb/${movie.id}`,
    },
    { name: "2Embed (Backup)", url: `https://www.2embed.cc/embed/${movie.id}` },
  ];

  const [currentServer, setCurrentServer] = useState(SERVERS[0]);
  const [currentLanguage, setCurrentLanguage] = useState("English");
  const containerRef = useRef<HTMLDivElement>(null);

  const LANGUAGES = [
    { name: "English", type: "Original" },
    { name: "Hindi", type: "Dubbed" },
    { name: "Spanish", type: "Dubbed" },
    { name: "French", type: "Dubbed" },
  ];

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    // AutoEmbed is known for better multi-language support
    if (lang !== "English") {
      const multiLangServer = SERVERS.find((s) => s.name.includes("AutoEmbed"));
      if (multiLangServer && currentServer.name !== multiLangServer.name) {
        setCurrentServer(multiLangServer);
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimer) clearTimeout(controlsTimer);
      const timer = setTimeout(() => setShowControls(false), 4000);
      setControlsTimer(timer);
    };

    const container = containerRef.current;
    if (container) container.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (container)
        container.removeEventListener("mousemove", handleMouseMove);
      if (controlsTimer) clearTimeout(controlsTimer);
    };
  }, [controlsTimer]);

  const toggleFullScreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) document.exitFullscreen();
      else containerRef.current.requestFullscreen();
    }
  };

  return (
    <div
      className={`min-h-screen bg-black overflow-hidden group transition-colors duration-1000 ${
        lightsOff ? "bg-black" : "bg-[#0a0a0a]"
      }`}
    >
      {/* Lights Off Overlay */}
      <div
        className={`absolute inset-0 z-40 bg-black/90 pointer-events-none transition-opacity duration-700 ${
          lightsOff ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Player Container */}
      <div
        ref={containerRef}
        className="relative w-full h-screen flex items-center justify-center bg-black"
      >
        <iframe
          src={currentServer.url}
          className={`w-full h-full border-0 relative z-30 transition-all duration-700 ${
            lightsOff ? "scale-105" : "scale-100"
          }`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={movie.title}
        ></iframe>

        <div
          className={`absolute top-0 left-0 right-0 z-50 bg-linear-to-b from-black/95 via-black/70 to-transparent pt-6 pb-24 px-8 transition-all duration-500 pointer-events-none ${
            showControls
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-8"
          }`}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between max-w-[1920px] mx-auto gap-6 pointer-events-auto">
            {/* LEFT: Back & Title */}
            <div className="flex items-center gap-6">
              <Link
                href={`/movie/${movie.id}`}
                className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md border border-white/5 transition-all group"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium hidden md:inline">Exit</span>
              </Link>

              <div className="text-white space-y-1 select-none">
                <h1 className="text-xl md:text-2xl font-bold drop-shadow-lg tracking-tight flex items-center gap-3">
                  {movie.title}
                  <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                    LIVE
                  </span>
                </h1>
                <p className="text-xs text-gray-400 font-medium">
                  Playing via{" "}
                  <span className="text-gray-200">{currentServer.name}</span>
                  {lightsOff && (
                    <span className="text-yellow-500 ml-2 animate-pulse">
                      — Theater Mode Active
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-3">
              {/* Audio / Language Selector */}
              <div className="relative group/audio">
                <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium text-sm transition backdrop-blur-sm border border-white/5">
                  <FaGlobe className="text-gray-300" />
                  <span className="hidden md:inline">{currentLanguage}</span>
                  <span className="md:hidden">Audio</span>
                </button>
                {/* Audio Dropdown */}
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-2xl overflow-hidden hidden group-hover/audio:block p-1">
                  <div className="px-4 py-2 border-b border-white/5 mb-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Select Audio
                    </p>
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.name}
                      onClick={() => handleLanguageChange(lang.name)}
                      className={`w-full text-left px-4 py-2.5 text-sm rounded-lg transition-colors flex items-center justify-between ${
                        currentLanguage === lang.name
                          ? "bg-white/10 text-white"
                          : "text-gray-400 hover:bg-white/5"
                      }`}
                    >
                      <span>{lang.name}</span>
                      <span className="text-[10px] uppercase border border-gray-600 px-1 rounded text-gray-500">
                        {lang.type}
                      </span>
                    </button>
                  ))}
                  {currentLanguage !== "English" && (
                    <div className="px-3 py-2 text-[10px] text-yellow-500 bg-yellow-500/10 mt-1 rounded text-center">
                      Note: Check player settings icon ⚙️ if audio doesn't
                      change automatically.
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={toggleFullScreen}
                className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95"
                title="Fullscreen"
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
