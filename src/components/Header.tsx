import { Link } from '@/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <header>
      <nav className="flex gap-4 p-4 bg-gray-800 items-center">
        <h1 className="text-2xl font-bold text-white-900">TMDB Explorer</h1>
        <Link to="/movies/category/now_playing">Movies</Link>
        <Link to="/tv/category/airing_today">TV</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/genre/28">Genre</Link>
        <input
          className="ml-auto bg-gray-700 text-white px-4 py-2 rounded-lg"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </nav>
    </header>
  );
};