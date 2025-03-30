import { NextRequest, NextResponse } from 'next/server';

// Define TMDB API constants
const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = process.env.TMDB_API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');
    const id = searchParams.get('id');
    const query = searchParams.get('query');
    const page = searchParams.get('page') || '1';

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint parameter is required' }, { status: 400 });
    }

    // Build the appropriate URL based on the endpoint
    let url = '';
    const params = new URLSearchParams({
      api_key: API_KEY as string,
      page,
    });

    switch (endpoint) {
      case 'movie':
        if (!id) {
          return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
        }
        url = `${BASE_URL}/movie/${id}?${params.toString()}&append_to_response=videos,credits,similar`;
        break;
      
      case 'popular':
        url = `${BASE_URL}/movie/popular?${params.toString()}`;
        break;
      
      case 'top_rated':
        url = `${BASE_URL}/movie/top_rated?${params.toString()}`;
        break;
      
      case 'now_playing':
        url = `${BASE_URL}/movie/now_playing?${params.toString()}`;
        break;
      
      case 'upcoming':
        url = `${BASE_URL}/movie/upcoming?${params.toString()}`;
        break;
      
      case 'search':
        if (!query) {
          return NextResponse.json({ error: 'Query parameter is required for search' }, { status: 400 });
        }
        params.append('query', query);
        url = `${BASE_URL}/search/movie?${params.toString()}`;
        break;
      
      case 'genre':
        const genreId = searchParams.get('genre_id');
        if (!genreId) {
          return NextResponse.json({ error: 'Genre ID is required' }, { status: 400 });
        }
        params.append('with_genres', genreId);
        url = `${BASE_URL}/discover/movie?${params.toString()}`;
        break;
      
      default:
        return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 });
    }

    // Fetch data from TMDB API
    const response = await fetch(url);
    
    if (!response.ok) {
      return NextResponse.json(
        { error: `Error fetching data from TMDB: ${response.statusText}` }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}