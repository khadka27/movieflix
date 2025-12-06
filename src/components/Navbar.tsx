"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch, FaBell, FaUser, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      setShowSearch(true);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-linear-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 h-16 md:h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>

            <Link
              href="/"
              className="text-primary text-2xl md:text-3xl font-bold tracking-tighter cursor-pointer"
            >
              MOVIEFLIX
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              TV Shows
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Movies
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              My List
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Browse by Languages
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6 text-white">
          <div className={`flex items-center transition-all duration-300 ${showSearch ? "bg-black/80 border border-white/20 rounded-full px-3 py-1" : ""}`}>
             {showSearch ? (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      router.push(`/?q=${encodeURIComponent(searchQuery)}`);
                    }
                  }}
                  className="flex items-center"
                >
                   <FaSearch size={16} className="text-gray-400 mr-2" />
                   <input 
                     type="text"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder="Titles, people, genres"
                     className="bg-transparent border-none focus:ring-0 text-sm text-white placeholder-gray-400 w-32 md:w-64 outline-none"
                     autoFocus
                   />
                   <button 
                     type="button" 
                     onClick={() => setShowSearch(false)}
                     className="ml-2 text-gray-400 hover:text-white"
                   >
                     <FaTimes size={14} />
                   </button>
                </form>
             ) : (
               <button onClick={() => setShowSearch(true)} className="hover:text-gray-300 transition-colors">
                 <FaSearch size={20} />
               </button>
             )}
          </div>

          <button className="hover:text-gray-300 transition-colors">
            <FaBell size={20} />
          </button>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center overflow-hidden border border-transparent group-hover:border-white transition-colors">
              <FaUser size={16} />
            </div>
            <span className="hidden md:block text-xs group-hover:underline">
              User
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-background border-t border-gray-800 p-4 flex flex-col gap-4 text-white animate-in slide-in-from-top-5 duration-200">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-gray-300 font-semibold"
          >
            Home
          </Link>
          <Link
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-gray-300 font-semibold"
          >
            TV Shows
          </Link>
          <Link
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-gray-300 font-semibold"
          >
            Movies
          </Link>
          <Link
            href="#"
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-gray-300 font-semibold"
          >
            My List
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
