import axios from "axios";
import { MovieResponse, MovieDetails, User } from "@/types";

// Define TMDB API constants directly here to avoid issues with environment variables
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getImageUrl = (path: string, size: string = "w500") => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPopularMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/popular", {
    params: { page },
  });
  return response.data;
};

export const getTopRatedMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/top_rated", {
    params: { page },
  });
  return response.data;
};

export const getNowPlayingMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/now_playing", {
    params: { page },
  });
  return response.data;
};

export const getUpcomingMovies = async (
  page: number = 1
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/movie/upcoming", {
    params: { page },
  });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${id}`, {
    params: {
      append_to_response: "videos,credits,similar",
    },
  });
  return response.data;
};

export const searchMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse> => {
  const response = await api.get<MovieResponse>("/search/movie", {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

export const getAccountDetails = async (session_id: string): Promise<User> => {
  const response = await api.get<User>("/account", {
    params: {
      session_id,
    },
  });
  return response.data;
};

// Helper function to format movie runtime
export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
