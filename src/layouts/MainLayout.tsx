import { Header } from '@/components/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#3d2b1f] text-white">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
