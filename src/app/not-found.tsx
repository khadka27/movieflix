import Link from 'next/link';
import { FaHome, FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="container-custom max-w-2xl mx-auto p-8 text-center">
        <h1 className="text-6xl font-bold text-secondary mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          The movie or page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/" 
            className="btn btn-primary flex items-center justify-center gap-2"
          >
            <FaHome />
            <span>Back to Home</span>
          </Link>
          
          <Link 
            href="/search" 
            className="btn btn-outline text-white flex items-center justify-center gap-2"
          >
            <FaSearch />
            <span>Search Movies</span>
          </Link>
        </div>
      </div>
    </div>
  );
}