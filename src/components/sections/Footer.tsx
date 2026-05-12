import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-comic-white border-t-[12px] border-black py-24 px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16 text-center md:text-left">
        <div className="space-y-6">
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <span className="font-comic text-5xl uppercase tracking-tighter text-black">Zero Day Heist</span>
          </div>
          <div className="flex flex-col gap-2 items-center md:items-start">
             <span className="font-mono text-[10px] uppercase opacity-40 font-black">Organized by</span>
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-black text-comic-red flex items-center justify-center rounded-sm rotate-3">
                      <span className="font-black text-[10px]">CHX</span>
                   </div>
                   <span className="font-comic text-2xl uppercase">CyberHX</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-comic-blue text-white flex items-center justify-center rounded-sm -rotate-3">
                      <span className="font-black text-[10px]">IX</span>
                   </div>
                   <span className="font-comic text-2xl uppercase">Ixego</span>
                </div>
             </div>
          </div>
          <p className="font-sans text-sm opacity-60 uppercase font-black tracking-widest max-w-sm text-black">
            THE GRID IS A CONSTRUCT. THE RESISTANCE IS REAL. WE EXFILTRATE, WE VERIFY, WE DISAPPEAR.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 font-comic text-3xl uppercase text-black">
          <a href="#socials" className="hover:text-comic-red underline decoration-comic-blue underline-offset-8">Follow</a>
          <a href="https://discord.gg/6NhwhVmmM" target="_blank" rel="noopener noreferrer" className="hover:text-comic-red underline decoration-comic-red underline-offset-8">Join Discord</a>
          <a href="https://www.x.com/zerodayheist" target="_blank" rel="noopener noreferrer" className="hover:text-comic-red underline decoration-comic-blue underline-offset-8">Updates</a>
          <a href="https://www.instagram.com/zerodayheist" target="_blank" rel="noopener noreferrer" className="hover:text-comic-red underline decoration-comic-red underline-offset-8">Gallery</a>
        </div>

        <div className="text-center md:text-right text-black">
          <div className="font-comic text-6xl italic uppercase mb-2">To Be Continued...</div>
          <div className="font-mono text-[10px] opacity-60 uppercase font-black tracking-tighter max-w-[300px] mb-2 ml-auto">
            DISCLAIMER: THIS IS A FAN-MADE COMMUNITY CTF EVENT. WE ARE NOT AFFILIATED WITH ANY REAL-WORLD ENTITIES MENTIONED. HACK RESPONSIBLY.
          </div>
          <div className="font-mono text-[12px] opacity-40 uppercase font-black tracking-widest">
            © 2026 // NO RIGHTS RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
