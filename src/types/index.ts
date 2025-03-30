export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    adult: boolean;
    original_language: string;
    original_title: string;
    video: boolean;
  }
  
  export interface MovieDetails extends Movie {
    genres: Genre[];
    runtime: number;
    status: string;
    tagline: string;
    budget: number;
    revenue: number;
    homepage: string;
    production_companies: ProductionCompany[];
    videos: {
      results: Video[];
    };
    similar: {
      results: Movie[];
    };
    credits: {
      cast: Cast[];
      crew: Crew[];
    };
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }
  
  export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
  }
  
  export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }
  
  export interface Crew {
    id: number;
    name: string;
    job: string;
    department: string;
    profile_path: string;
  }
  
  export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
  
  export interface User {
    id: number;
    username: string;
    name: string;
    avatar: {
      gravatar: {
        hash: string;
      };
      tmdb: {
        avatar_path: string;
      };
    };
  }