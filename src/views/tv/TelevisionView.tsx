import { ImageGrid, Pagination } from '@/components';
import { TV_AIRING_TODAY_ENDPOINT, TV_ON_THE_AIR_ENDPOINT, TV_POPULAR_ENDPOINT, TV_TOP_RATED_ENDPOINT } from '@/core/constants';
import type { TvShowsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CATEGORY_ENDPOINTS: Record<string, string> = {
  airing_today: TV_AIRING_TODAY_ENDPOINT,
  popular: TV_POPULAR_ENDPOINT,
  top_rated: TV_TOP_RATED_ENDPOINT,
  on_the_air: TV_ON_THE_AIR_ENDPOINT,
};

const CATEGORY_TITLES: Record<string, string> = {
  airing_today: 'Airing Today',
  popular: 'Popular',
  top_rated: 'Top Rated',
  on_the_air: 'On The Air',
};
export const TelevisionView = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const endpoint = CATEGORY_ENDPOINTS[category ?? 'airing_today'];
  const title = CATEGORY_TITLES[category ?? 'airing_today'];
  const { data } = useTmdb<TvShowsResponse>(endpoint, { page }, [page, category]);

  const gridData = (data?.results ?? []).map((result) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.name,
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
            onClick={() => navigate(`/tv/category/${key}`)}
            className={category === key ? 'bg-white text-black px-4 py-2 rounded-full' : 'bg-gray-700 text-white px-4 py-2 rounded-full'}
          >
            {label}
          </button>
        ))}
      </div>
      <ImageGrid results={gridData} onClick={(id) => navigate(`/tv/${id}`)} />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};
