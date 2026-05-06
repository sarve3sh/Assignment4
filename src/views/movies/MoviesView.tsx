import { ImageGrid, Pagination } from '@/components';
import { NOW_PLAYING_ENDPOINT, POPULAR_ENDPOINT, TOP_RATED_ENDPOINT, UPCOMING_ENDPOINT } from '@/core/constants';
import type { MoviesResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CATEGORY_ENDPOINTS: Record<string, string> = {
  now_playing: NOW_PLAYING_ENDPOINT,
  popular: POPULAR_ENDPOINT,
  top_rated: TOP_RATED_ENDPOINT,
  upcoming: UPCOMING_ENDPOINT,
};

const CATEGORY_TITLES: Record<string, string> = {
  now_playing: 'Now Playing',
  popular: 'Popular',
  top_rated: 'Top Rated',
  upcoming: 'Upcoming',
};
export const MoviesView = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const endpoint = CATEGORY_ENDPOINTS[category ?? 'now_playing'];
  const title = CATEGORY_TITLES[category ?? 'now_playing'];
  const { data } = useTmdb<MoviesResponse>(endpoint, { page }, [page, category]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex gap-2">
        {Object.entries(CATEGORY_TITLES).map(([key, label]) => (
          <button
            key={key}
            onClick={() => navigate(`/movies/category/${key}`)}
            className={category === key ? 'bg-white text-black px-4 py-2 rounded-full' : 'bg-gray-700 text-white px-4 py-2 rounded-full'}
          >
            {label}
          </button>
        ))}
      </div>
      <ImageGrid results={gridData} onClick={(id) => navigate(`/movies/${id}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
