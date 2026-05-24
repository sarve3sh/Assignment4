import { ButtonGroup, ImageGrid, Pagination } from '@/components';
import { TRENDING_ENDPOINT } from '@/core/constants';
import type { MoviesResponse, TvShowsResponse } from '@/core/types';
import { useTmdb } from '@/hooks';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TV_TRENDING_ENDPOINT = 'https://api.themoviedb.org/3/trending/tv';

export const TrendingView = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const interval = searchParams.get('interval') || 'day';
  const [mediaType, setMediaType] = useState('movie');

  const { data: movieData } = useTmdb<MoviesResponse>(`${TRENDING_ENDPOINT}/${interval}`, { page }, [page, interval]);
  const { data: tvData } = useTmdb<TvShowsResponse>(`${TV_TRENDING_ENDPOINT}/${interval}`, { page }, [page, interval]);

  const data = mediaType === 'movie' ? movieData : tvData;

  const gridData = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imagePath: result.poster_path,
    primaryText: result.original_title || result.name,
  }));

  if (!data) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <section className="max-w-[1200px] mx-auto p-5 space-y-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {['movie', 'tv'].map((type) => (
            <button
              key={type}
              onClick={() => setMediaType(type)}
              className={`px-4 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_#4a7c59] ${
                mediaType === type
                  ? 'bg-[#4a7c59] text-white'
                  : 'bg-white text-[#4a7c59] border border-[#4a7c59]'
              }`}
            >
              {type === 'movie' ? 'Movies' : 'TV'}
            </button>
          ))}
        </div>
        <ButtonGroup
          value={interval}
          options={[
            { label: 'Today', value: 'day' },
            { label: 'Week', value: 'week' },
          ]}
          onClick={(value) => setSearchParams({ interval: value })}
        />
      </div>
      <ImageGrid
        results={gridData}
        onClick={(id) => navigate(mediaType === 'movie' ? `/movies/${id}` : `/tv/${id}`)}
      />
      <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
    </section>
  );
};