import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';
import ComicPanel from '../ui/ComicPanel';
import SpeechBubble from '../ui/SpeechBubble';

const TARGET_DATE = new Date('2026-06-06T12:00:00+05:30');

const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = TARGET_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[70vh]">
      {/* Main Hero Panel */}
      <ComicPanel title="Sector 01: The Breach" className="lg:col-span-8 group relative bg-comic-white h-full" halftone>
        <div className="absolute inset-0 action-line opacity-30" />
        
        {/* Organizers Badge */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white border-2 border-black px-4 py-1.5 -rotate-1 z-10 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
           <span className="font-mono text-[8px] uppercase font-black opacity-40 whitespace-nowrap">Org. by</span>
           <div className="flex items-center gap-4">
              <div className="flex items-center">
                 <img
                   src="/cyberhx-logo.jpg"
                   alt="CyberHX"
                   className="h-7 w-auto object-contain"
                 />
              </div>
           </div>
        </div>

        <div className="relative h-full flex flex-col justify-center items-center text-center p-12 pt-24 space-y-8 min-h-[500px]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <h2 className="font-comic text-6xl md:text-[8rem] leading-none uppercase tracking-[-0.05em] italic text-black">
              ARE YOU <br />
              <span className="text-comic-red text-[7rem] md:text-[10rem] px-6 bg-black text-white inline-block mt-4 -rotate-2">IN?</span>
            </h2>
          </motion.div>

          <SpeechBubble className="animate-bounce !bg-comic-white">
            <p className="font-comic text-2xl uppercase tracking-tight text-black">
              "This isn't just a CTF. This is... <br />
              <span className="text-comic-red font-black text-3xl">Zero Day Heist!</span>"
            </p>
          </SpeechBubble>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <a 
              href="https://ctf.cyberhx.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="comic-button !bg-comic-red !text-white hover:!bg-black inline-block"
            >
              Initialize Mission
            </a>
            <a 
              href="https://unstop.com/hackathons/zero-day-heist-6-hour-ctf-challenge-cyber-hx-1683151" 
              target="_blank" 
              rel="noopener noreferrer"
              className="comic-button !bg-comic-blue !text-white inline-block"
            >
              Register Here!
            </a>
          </div>
        </div>
      </ComicPanel>

      {/* Secondary Panels */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <ComicPanel className="flex-1 bg-comic-white text-black flex flex-col justify-center items-center p-8 text-center group overflow-hidden">
          <div className="absolute top-2 right-2 flex items-center gap-2">
             <div className="w-2 h-2 bg-comic-red rounded-full animate-ping" />
          </div>
          
          <h3 className="font-comic text-4xl uppercase mb-6 text-black italic">Time Remaining</h3>
          
          <div className="grid grid-cols-2 gap-4 w-full">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hrs', value: timeLeft.hours },
              { label: 'Min', value: timeLeft.minutes },
              { label: 'Sec', value: timeLeft.seconds }
            ].map((unit) => (
              <div key={unit.label} className="bg-white border-4 border-black p-4 rounded-xl flex flex-col items-center group-hover:bg-comic-yellow transition-colors">
                <span className="font-comic text-4xl md:text-5xl text-black tabular-nums">
                  {unit.value.toString().padStart(2, '0')}
                </span>
                <span className="font-sans text-[10px] font-black uppercase text-comic-red tracking-widest">{unit.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-black/10 w-full flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Clock size={16} className="text-comic-blue" />
                <span className="font-mono text-[10px] uppercase opacity-40">Frequency Stable</span>
             </div>
          </div>
        </ComicPanel>

        <ComicPanel className="flex-1 p-8 halftone-pattern flex flex-col justify-center bg-comic-white">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-2 h-8 bg-black" />
            ))}
          </div>
          <h3 className="font-comic text-4xl uppercase text-black">THE DATE IS <span className="text-comic-red underline decoration-comic-blue underline-offset-4">SET!</span></h3>
          <div className="mt-4 space-y-2">
            <div className="font-comic text-5xl text-black">06 JUNE 2026</div>
            <div className="font-comic text-3xl text-comic-blue">12:00 PM - 06:00 PM IST</div>
          </div>
          <div className="font-sans text-[10px] font-black uppercase text-black mt-4 tracking-widest opacity-40">
            SYNC YOUR NODES. DON'T BE LATE.
          </div>
        </ComicPanel>
      </div>
    </section>
  );
};

export default Hero;
