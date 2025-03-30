import { Movie } from '@/types';

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with commas
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

// Format rating to one decimal place
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Get year from date string
export const getYearFromDate = (dateString: string): string => {
  if (!dateString) return '';
  return new Date(dateString).getFullYear().toString();
};

// Generate a random number between min and max
export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get random items from an array
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  if (count >= array.length) return array;
  
  const result: T[] = [];
  const copyArray = [...array];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copyArray.length);
    result.push(copyArray[randomIndex]);
    copyArray.splice(randomIndex, 1);
  }
  
  return result;
};

// Filter adult content based on user preference
export const filterAdultContent = (movies: Movie[], showAdult: boolean = false): Movie[] => {
  if (showAdult) return movies;
  return movies.filter(movie => !movie.adult);
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};

// Create a YouTube embed URL
export const createYoutubeEmbedUrl = (key: string): string => {
  return `https://www.youtube.com/embed/${key}?autoplay=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;
};

// Parse query parameters from URL
export const parseQueryParams = (url: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const queryString = url.split('?')[1];
  
  if (!queryString) return params;
  
  const pairs = queryString.split('&');
  
  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  }
  
  return params;
};