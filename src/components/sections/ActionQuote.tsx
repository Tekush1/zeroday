import React from 'react';
import { Activity } from 'lucide-react';
import SpeechBubble from '../ui/SpeechBubble';

const ActionQuote: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-12">
        <SpeechBubble className="w-full !bg-comic-white">
          <h3 className="font-comic text-6xl md:text-7xl uppercase leading-none mb-6 text-black">
            "CHALLENGES? <span className="text-comic-red">BRING IT ON!</span> <br />
            THE FLAG IS <span className="bg-comic-yellow px-4 underline decoration-comic-blue">OURS!</span>"
          </h3>
          <p className="font-comic text-2xl text-black/60 uppercase">
            REMEMBER... THE BEST HEISTS DON'T BREAK THINGS. THEY BUILD SOMETHING BETTER.
          </p>
        </SpeechBubble>
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 bg-black flex items-center justify-center -rotate-6 border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(45,92,247,1)]">
            <Activity size={40} className="text-comic-red" />
          </div>
          <div className="font-comic text-4xl uppercase italic text-black">
            Strike Leader // <span className="text-comic-red">Resistance v.4</span>
          </div>
        </div>
      </div>

      <div className="comic-panel h-[400px] grayscale brightness-50 contrast-125 overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
          alt="Cyberpunk Heist"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-6 left-6 text-white font-comic text-3xl uppercase tracking-tighter">
          LIVE_FEED: SECTOR_A
        </div>
        <div className="absolute top-6 right-6 flex gap-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-2 h-2 bg-heist-red rounded-full animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionQuote;
