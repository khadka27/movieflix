"use client";

import { useEffect, useState } from "react";

export default function NetflixLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000); // 4 seconds intro

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black animation-fade-out">
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        {/* The 'N' Animation Container - adapted for 'M' or just generic Netflix style */}
        <div className="netflix-intro">
          <span className="netflix-text">MOVIEFLIX</span>
        </div>
      </div>

      <style jsx>{`
        .netflix-intro {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: zoom-in 3.5s ease-out forwards;
        }

        .netflix-text {
          font-family: "Arial Black", "Helvetica", sans-serif;
          font-size: 5rem;
          font-weight: 900;
          color: #e50914;
          letter-spacing: 5px;
          text-shadow: 0 0 20px rgba(229, 9, 20, 0.8);
          opacity: 0;
          animation: text-appear 3s ease-in-out forwards;
        }

        @media (min-width: 768px) {
          .netflix-text {
            font-size: 8rem;
          }
        }

        /* Keyframes mimicking the Netflix ta-dum intro */
        @keyframes zoom-in {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes text-appear {
          0% {
            opacity: 0;
            transform: scale(0.1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animation-fade-out {
          animation: fade-out-bg 0.5s 3.5s forwards;
        }

        @keyframes fade-out-bg {
          to {
            opacity: 0;
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
}
