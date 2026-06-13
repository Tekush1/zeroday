import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const isLeaderboard = location.pathname === '/leaderboard';

  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between comic-panel p-3 bg-white">
        <div className="flex items-center gap-3">
          <Link to="/">
            <h1 className="font-comic text-4xl uppercase tracking-tighter text-black cursor-pointer hover:text-comic-red transition-colors">
              Zero Day <span className="text-comic-red underline decoration-comic-blue underline-offset-4">Heist</span>
            </h1>
          </Link>
          <div className="hidden lg:flex items-center gap-4 ml-6 pl-6 border-l-2 border-black/10">
            <span className="font-mono text-[10px] uppercase opacity-40 font-black">Organized by</span>
            <div className="flex items-center gap-3">
              <span className="font-comic text-xl uppercase text-black">CyberHX</span>
              <span className="text-black/30 text-lg">×</span>
              <span className="font-comic text-xl uppercase text-comic-blue">IXEFO</span>
            </div>
          </div>
        </div>

        <Link
          to="/leaderboard"
          className={`comic-button text-sm !py-2 !px-6 inline-flex items-center gap-2 ${
            isLeaderboard
              ? '!bg-comic-red !text-white'
              : '!bg-comic-blue !text-white hover:!bg-black'
          }`}
        >
          <Trophy size={16} />
          Leaderboard
        </Link>
      </div>
    </header>
  );
};

export default Header;