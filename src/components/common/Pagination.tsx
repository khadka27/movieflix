/* eslint-disable prefer-const */
'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages,
  onPageChange 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      // Update URL with new page parameter
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      router.push(`?${params.toString()}`);
    }
  };

  // Calculate page range to display
  const getPageNumbers = () => {
    const range = [];
    const displayCount = 5; // Number of page numbers to show
    
    let start = Math.max(1, currentPage - Math.floor(displayCount / 2));
    let end = Math.min(totalPages, start + displayCount - 1);
    
    // Adjust start if end is at max
    if (end === totalPages) {
      start = Math.max(1, end - displayCount + 1);
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    
    return range;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center my-8">
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1
              ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500'
              : 'bg-primary text-white hover:bg-dark'
          }`}
        >
          Prev
        </button>
        
        {/* First page */}
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`px-3 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              1
            </button>
            
            {/* Ellipsis */}
            {getPageNumbers()[0] > 2 && (
              <span className="px-3 py-2">...</span>
            )}
          </>
        )}
        
        {/* Page numbers */}
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-md ${
              currentPage === page
                ? 'bg-secondary text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
        
        {/* Last page */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {/* Ellipsis */}
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <span className="px-3 py-2">...</span>
            )}
            
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`px-3 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-secondary text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        {/* Next button */}
        <button
          onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 rounded-md ${
            currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed bg-gray-200 text-gray-500'
              : 'bg-primary text-white hover:bg-dark'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;