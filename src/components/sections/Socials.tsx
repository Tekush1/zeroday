import React from 'react';
import ComicPanel from '../ui/ComicPanel';

const Socials: React.FC = () => {
  const platforms = [
    { 
      name: "INSTAGRAM", 
      image: "https://i.ibb.co/G3Jt1mKs/instagram-1-svgrepo-com.jpg", 
      color: "bg-[#E1306C]", 
      handle: "@zerodayheist",
      link: "https://www.instagram.com/zerodayheist"
    },
    { 
      name: "X / TWITTER", 
      image: "https://i.ibb.co/pF3fQ0d/twitter-svgrepo-com.jpg", 
      color: "bg-[#000000]", 
      handle: "@zerodayheist",
      link: "https://www.x.com/zerodayheist"
    },
    { 
      name: "DISCORD", 
      image: "https://i.ibb.co/8LfSSnxH/discord-icon.jpg",
      color: "bg-[#5865F2]", 
      handle: "JOIN THE SERVER",
      link: "https://discord.gg/6NhwhVmmM"
    }
  ];

  return (
    <section id="socials" className="comic-panel p-12 md:p-20 text-center space-y-12 halftone-pattern bg-comic-yellow border-[12px] overflow-hidden">
      <div className="absolute inset-0 opacity-10 action-line" />
      <div className="relative z-10 space-y-12">
        <h2 className="font-comic text-7xl md:text-[8rem] uppercase tracking-tighter leading-none italic text-black">
          STAY <span className="text-comic-red underline decoration-comic-blue">CONNECTED.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platforms.map((p, idx) => (
            <a 
              key={idx} 
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <ComicPanel 
                className={`h-full !p-8 transition-transform group-hover:-rotate-2 group-hover:scale-105 ${p.color} text-white border-black ${p.name === 'DISCORD' ? 'ring-8 ring-black ring-offset-4 ring-offset-comic-blue group-hover:ring-comic-red transition-all' : ''}`}
              >
                <div className="flex flex-col items-center gap-6">
                  <div className="w-24 h-24 bg-white text-black border-4 border-black rotate-3 group-hover:rotate-0 transition-transform overflow-hidden flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-comic text-4xl uppercase tracking-tighter">{p.name}</h3>
                    <p className="font-mono text-sm font-black uppercase opacity-80">{p.handle}</p>
                  </div>
                </div>
              </ComicPanel>
            </a>
          ))}
        </div>

        <p className="font-comic text-3xl uppercase text-black max-w-2xl mx-auto pt-8">
          "Don't miss a single <span className="text-comic-red">decryption window.</span> follow the uplink."
        </p>
      </div>
    </section>
  );
};

export default Socials;
