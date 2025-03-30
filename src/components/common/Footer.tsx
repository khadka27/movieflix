'use client';

import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaRegCopyright } from 'react-icons/fa';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="col-span-1">
            <Link href="/" className="text-2xl font-bold flex items-center">
              <span className="text-secondary">Movie</span>
              <span>Flix</span>
            </Link>
            <p className="mt-4 text-gray-300">
              Your ultimate destination for watching and downloading high-quality movies easily.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/browse" className="text-gray-300 hover:text-secondary transition-colors">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link href="/browse?category=popular" className="text-gray-300 hover:text-secondary transition-colors">
                  Popular Movies
                </Link>
              </li>
              <li>
                <Link href="/browse?category=top_rated" className="text-gray-300 hover:text-secondary transition-colors">
                  Top Rated Movies
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/browse?genre=28" className="text-gray-300 hover:text-secondary transition-colors">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=35" className="text-gray-300 hover:text-secondary transition-colors">
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=18" className="text-gray-300 hover:text-secondary transition-colors">
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/browse?genre=27" className="text-gray-300 hover:text-secondary transition-colors">
                  Horror
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
            <p className="text-gray-300">
              Subscribe to our newsletter for updates on new releases and features.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-800 flex items-center justify-center text-gray-400">
          <FaRegCopyright className="mr-1" />
          <span>{currentYear} MovieFlix. Powered by TMDB API.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;