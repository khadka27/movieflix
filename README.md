# MovieFlix - Movie Streaming Web Application

A modern, responsive movie streaming web application built with Next.js, TypeScript, and the TMDB API.

![MovieFlix Banner](https://image.tmdb.org/t/p/original/kwUQFeFoGYgcClloMfXZ6WVrJJX.jpg)

## Live Demo

[MovieFlix - Visit Live Site](https://movieeflix.vercel.app)

## Features

- **Browse Movies:** Explore popular, top-rated, now playing, and upcoming movies
- **Genre Filtering:** Browse movies by specific genres
- **Search Functionality:** Find movies using the search bar
- **Movie Details:** View comprehensive information about movies
- **Watch Movies:** Stream movie trailers directly in the application
- **Download Options:** Simulated download options for different quality versions
- **Responsive Design:** Fully responsive layout that works on mobile, tablet, and desktop

## Technology Stack

- **Frontend Framework:** Next.js 14 with App Router
- **Programming Language:** TypeScript
- **Styling:** Tailwind CSS
- **API:** The Movie Database (TMDB) API
- **Deployment:** Vercel

## Screenshots

<details>
<summary>View Screenshots</summary>

### Home Page

![Home Page](https://image.tmdb.org/t/p/w500/ugS5FVfCI3RV0ZwZtBV3HAV75OX.jpg)

### Movie Details

![Movie Details](https://image.tmdb.org/t/p/w500/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg)

### Browse Page

![Browse Page](https://image.tmdb.org/t/p/w500/628Dep6AxEtDxjZoGP78TsOxYbK.jpg)

</details>

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- TMDB API key (get it from [TMDB website](https://www.themoviedb.org/settings/api))

### Installation

1. Clone the repository

```bash
git clone https://github.com/khadka27/movieflix.git
cd movieflix
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add your TMDB API key

```
TMDB_API_KEY=your_tmdb_api_key_here
TMDB_API_BASE_URL=https://api.themoviedb.org/3
TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Project Structure

```
movieflix/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   ├── browse/               # Browse page
│   ├── download/             # Download page
│   ├── movie/                # Movie details page
│   ├── search/               # Search page
│   ├── watch/                # Watch page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── not-found.tsx         # 404 page
├── components/               # React components
│   ├── common/               # Common components
│   ├── home/                 # Home page components
│   └── movies/               # Movie-related components
├── lib/                      # Utility functions and API
│   ├── tmdb.ts               # TMDB API client
│   └── utils.ts              # Utility functions
└── types/                    # TypeScript type definitions
```

## Future Enhancements

- User authentication and profiles
- Watchlist and favorites functionality
- Advanced filtering and sorting
- Actual video playback integration
- Server-side caching for improved performance

## Disclaimer

This project is for educational purposes only. It doesn't actually stream or provide downloads for copyrighted content. All movie data is fetched from TMDB API, and media playback is limited to trailers provided by TMDB.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Abishek Khadka  
Email: abishekkhadka90@gmail.com  
Website: [abhishekkhadka.vercel.app](https://abhishekkhadka.vercel.app)  
GitHub: [khadka27](https://github.com/khadka27)
