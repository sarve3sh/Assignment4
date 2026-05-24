import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen #F5F5DC text-white">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
