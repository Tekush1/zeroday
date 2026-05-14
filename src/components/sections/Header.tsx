import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between comic-panel p-3 bg-white">
        <div className="flex items-center gap-3">
          <h1 className="font-comic text-4xl uppercase tracking-tighter text-black">
            Zero Day <span className="text-comic-red underline decoration-comic-blue underline-offset-4">Heist</span>
          </h1>
          <div className="hidden lg:flex items-center gap-4 ml-6 pl-6 border-l-2 border-black/10">
            <span className="font-mono text-[10px] uppercase opacity-40 font-black">Organized by</span>
            <div className="flex items-center gap-4">
               <div className="flex items-center group cursor-pointer">
                  <span className="font-comic text-xl uppercase text-black">CyberHX </span>

               </div>
            </div>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 font-comic text-2xl uppercase text-black">
          <a href="#logs" className="hover:text-comic-red transition-colors">Logs</a>
          <a href="#targets" className="hover:text-comic-red transition-colors">Targets</a>
          <a href="#memes" className="hover:text-comic-red transition-colors">Memes</a>
        </nav>
        <a 
          href="https://discord.gg/6NhwhVmmM" 
          target="_blank" 
          rel="noopener noreferrer"
          className="comic-button text-sm !py-2 !px-6 !bg-comic-blue !text-white hover:!bg-black inline-block"
        >
          Join Discord
        </a>
      </div>
    </header>
  );
};

export default Header;