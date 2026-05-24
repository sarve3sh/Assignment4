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
  const [searchType, setSearchType] = useState('movie');
  const location = useLocation();
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500);
  const { data } = useTmdb<any>(SEARCH_ENDPOINTS[searchType], { query: debouncedQuery, page }, [debouncedQuery, page, searchType]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const type = params.get('type');
    if (q) setQuery(q);
    if (type) setSearchType(type);
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
