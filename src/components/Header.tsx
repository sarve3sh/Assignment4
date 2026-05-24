import { Link } from '@/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('movie');

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/search?q=${query}&type=${searchType}`);
    }
  };

  return (
    <header>
      <nav className="flex gap-4 p-4 bg-[#4a7c59] items-center shadow-lg">
        <h1 className="text-2xl font-bold text-white">TMDB Explorer</h1>
        <Link to="/movies/category/now_playing">Movies</Link>
        <Link to="/tv/category/airing_today">TV</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/genre/28">Genre</Link>
        <div className="ml-auto flex items-center gap-2">
          <input
            className="bg-white/20 text-white placeholder-white/70 px-4 py-2 rounded-lg border border-white/30 focus:outline-none focus:border-white"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          {['movie', 'tv', 'person'].map((type) => (
            <button
              key={type}
              onClick={() => {
                setSearchType(type);
                if (query.trim()) {
                  navigate(`/search?q=${query}&type=${type}`);
                }
              }}
              className={`px-3 py-2 rounded-lg transition-all duration-300 ${
                searchType === type
                  ? 'bg-white text-[#4a7c59] font-bold'
                  : 'bg-white/20 text-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};