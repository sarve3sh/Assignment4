import { ImageGrid, Pagination, SearchBar } from '@/components';
import { useDebounce, useTmdb } from '@/hooks';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SEARCH_ENDPOINTS: Record<string, string> = {
  person: 'https://api.themoviedb.org/3/search/person',
  movie: 'https://api.themoviedb.org/3/search/movie',
  tv: 'https://api.themoviedb.org/3/search/tv',
};

export const SearchView = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState<number>(1);
  const [searchType, setSearchType] = useState('person');
  const location = useLocation();
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500);
  const { data } = useTmdb<any>(SEARCH_ENDPOINTS[searchType], { query: debouncedQuery, page }, [debouncedQuery, page, searchType]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) setQuery(q);
  }, [location.search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const gridData = (data?.results ?? []).map((result: any) => ({
    id: result.id,
    imagePath: result.profile_path || result.poster_path,
    primaryText: result.name || result.title,
  }));

  return (
    <section className="max-w-[1200px] mx-auto p-10 space-y-5">
      <SearchBar value={query} onChange={setQuery} />
      <div className="flex gap-2">
        {['person', 'movie', 'tv'].map((type) => (
          <button
            key={type}
            onClick={() => setSearchType(type)}
            className={`px-4 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_15px_#4a7c59] ${
              searchType === type ? 'bg-[#4a7c59] text-white' : 'bg-white text-[#4a7c59] border border-[#4a7c59]'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <ImageGrid
        results={gridData}
        onClick={(id) => navigate(searchType === 'person' ? `/person/${id}` : searchType === 'movie' ? `/movies/${id}` : `/tv/${id}`)}
      />
      {data?.results?.length ? (
        <Pagination page={page} maxPages={data.total_pages} onClick={setPage} />
      ) : (
        <p className="text-center text-[#4a7c59]">No search results found</p>
      )}
    </section>
  );
};
