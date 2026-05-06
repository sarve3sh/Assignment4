import { useNavigate } from 'react-router-dom';

export const HomeView = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f0f4f0] text-[#2d3b2d] flex items-center justify-center">
      <section className="max-w-3xl w-full text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight text-[#4a7c59]">TMDB Explorer</h1>
        <p className="text-[#4a7c59]/70 text-lg">Explore movies and discover people using a fast, modern interface.</p>
        <button
          onClick={() => navigate('/movies/category/now_playing')}
          className="px-8 py-3 bg-[#4a7c59] text-white rounded-full transition-all duration-300 hover:shadow-[0_0_20px_#4a7c59] hover:bg-[#3d6b4a]"
        >
          Enter
        </button>
        <footer className="pt-10 text-sm text-[#4a7c59]/50">Built with React, Vite and React Router</footer>
      </section>
    </main>
  );
};
