import React from 'react';
import { motion } from 'motion/react';
import { Award, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import ComicPanel from '../ui/ComicPanel';
import SpeechBubble from '../ui/SpeechBubble';

const Hero: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[70vh]">
      {/* Main Hero Panel */}
      <ComicPanel title="Sector 01: The Breach" className="lg:col-span-8 group relative bg-comic-white h-full" halftone>
        <div className="absolute inset-0 action-line opacity-30" />

        {/* Organizers Badge */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white border-2 border-black px-4 py-1.5 -rotate-1 z-10 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
          <span className="font-mono text-[8px] uppercase font-black opacity-40 whitespace-nowrap">Org. by</span>
          <div className="flex items-center gap-3">
            <img src="/cyberhx-logo.jpg" alt="CyberHX" className="h-7 w-auto object-contain" />
            <div className="w-[1px] h-5 bg-black/20" />
            <img src="https://i.ibb.co/KptFC4h2/final.png" alt="IXEFO" className="h-7 w-auto object-contain" />
          </div>
        </div>

        <div className="relative h-full flex flex-col justify-center items-center text-center p-12 pt-24 space-y-8 min-h-[500px]">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <h2 className="font-comic text-6xl md:text-[8rem] leading-none uppercase tracking-[-0.05em] italic text-black">
              ARE YOU <br />
              <span className="text-[7rem] md:text-[10rem] px-6 bg-black text-white inline-block mt-4 -rotate-2">IN?</span>
            </h2>
          </motion.div>

          <SpeechBubble className="!bg-comic-white">
            <p className="font-comic text-2xl uppercase tracking-tight text-black">
              "This isn't just a CTF. This is... <br />
              <span className="text-comic-red font-black text-3xl">Zero Day Heist!</span>"
            </p>
          </SpeechBubble>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            <a
              href="https://creds.cyberhx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="comic-button !bg-comic-yellow !text-black hover:!bg-black hover:!text-comic-yellow inline-flex items-center gap-2"
            >
              <Award size={20} />
              Download Certificate
            </a>
            <Link
              to="/leaderboard"
              className="comic-button !bg-comic-red !text-white hover:!bg-black inline-flex items-center gap-2"
            >
              <Trophy size={20} />
              View Leaderboard
            </Link>
          </div>
        </div>
      </ComicPanel>

      {/* Secondary Panels */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        {/* Event Ended Panel — replaces countdown */}
        <ComicPanel className="flex-1 bg-comic-white text-black flex flex-col justify-center items-center p-8 text-center overflow-hidden">
          <div className="absolute top-2 right-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 180 }}
            className="space-y-3"
          >
            <div className="font-comic text-7xl">🏁</div>
            <h3 className="font-comic text-4xl uppercase italic text-black leading-tight">
              HEIST<br />
              <span className="bg-black text-comic-yellow px-2">COMPLETE</span>
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-widest opacity-50 pt-2">
              06 June 2026 · Mission Accomplished
            </p>
          </motion.div>

          <div className="mt-6 pt-6 border-t-2 border-black/10 w-full space-y-3">
            <a
              href="https://creds.cyberhx.com"
              target="_blank"
              rel="noopener noreferrer"
              className="comic-button !bg-comic-yellow !text-black hover:!bg-black hover:!text-comic-yellow w-full flex items-center justify-center gap-2 !text-base"
            >
              <Award size={16} /> Claim Certificate
            </a>
            <Link
              to="/leaderboard"
              className="comic-button !bg-white !text-black border-4 border-black hover:!bg-comic-red hover:!text-white w-full flex items-center justify-center gap-2 !text-base"
            >
              <Trophy size={16} /> Leaderboard
            </Link>
          </div>
        </ComicPanel>

        {/* Results Panel — replaces date panel */}
        <ComicPanel className="flex-1 p-8 halftone-pattern flex flex-col justify-center bg-comic-white">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="w-2 h-8 bg-black" />
            ))}
          </div>
          <h3 className="font-comic text-4xl uppercase text-black">
            RESULTS ARE <span className="text-comic-red underline decoration-comic-blue underline-offset-4">OUT!</span>
          </h3>
          <div className="mt-4 space-y-1">
            <div className="font-comic text-2xl text-black">63 TEAMS COMPETED</div>
            <div className="font-comic text-4xl text-comic-red">₹250K+</div>
            <div className="font-comic text-xl text-black mt-2">Prize Distributed</div>
          </div>
          <div className="font-sans text-[10px] font-black uppercase text-black mt-4 tracking-widest opacity-40">
            MISSION DEBRIEFING COMPLETE.
          </div>
        </ComicPanel>
      </div>
    </section>
  );
};

export default Hero;