import { ImageGrid } from '@/components';
import { MOVIE_GENRE, TV_GENRE } from '@/core/constants';
import type { MoviesResponse, TvShowsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useNavigate, useParams } from 'react-router-dom';

const GENRES = [
  { label: 'Action', id: 28 },
  { label: 'Adventure', id: 12 },
  { label: 'Animation', id: 16 },
  { label: 'Crime', id: 80 },
  { label: 'Family', id: 10751 },
  { label: 'Fantasy', id: 14 },
  { label: 'History', id: 36 },
  { label: 'Horror', id: 27 },
  { label: 'Mystery', id: 9648 },
  { label: 'Sci-Fi', id: 878 },
];

export const GenreView = () => {
  const { genreId } = useParams();
  const navigate = useNavigate();

  const { data: movies } = useTmdb<MoviesResponse>(MOVIE_GENRE, { with_genres: genreId }, [genreId]);
  const { data: tvShows } = useTmdb<TvShowsResponse>(TV_GENRE, { with_genres: genreId }, [genreId]);

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex gap-2 flex-wrap">
        {GENRES.map((genre) => (
          <button
            key={genre.id}
            onClick={() => navigate(`/genre/${genre.id}`)}
            className={`px-4 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_#4a7c59] ${
              genreId === String(genre.id) ? 'bg-[#4a7c59] text-white' : 'bg-white text-[#4a7c59] border border-[#4a7c59]'
            }`}
          >
            {genre.label}
          </button>
        ))}
      </div>
      <h1 className="text-3xl font-bold text-[#2d3b2d]">Movies</h1>
      <ImageGrid
        results={(movies?.results ?? []).map((m) => ({ id: m.id, imagePath: m.poster_path, primaryText: m.original_title }))}
        onClick={(id) => navigate(`/movies/${id}`)}
      />
      <h1 className="text-3xl font-bold text-[#2d3b2d]">TV Shows</h1>
      <ImageGrid
        results={(tvShows?.results ?? []).map((t) => ({ id: t.id, imagePath: t.poster_path, primaryText: t.name }))}
        onClick={(id) => navigate(`/tv/${id}`)}
      />
    </section>
  );
};
