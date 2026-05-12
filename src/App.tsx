import React, { useState, useEffect } from 'react';
import Header from './components/sections/Header';
import Hero from './components/sections/Hero';
import MissionBriefing from './components/sections/MissionBriefing';
import TargetDossiers from './components/sections/TargetDossiers';
import Sponsors from './components/sections/Sponsors';
import Memes from './components/sections/Memes';
import FAQ from './components/sections/FAQ';
import ComicReader from './components/sections/ComicReader';
import ActionQuote from './components/sections/ActionQuote';
import Socials from './components/sections/Socials';
import Footer from './components/sections/Footer';
import ComicLoader from './components/ui/ComicLoader';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'home' | 'memes' | 'comic'>('home');
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial asset loading
    const timer = setTimeout(() => setIsInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-heist-red selection:text-white font-sans text-black">
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="fixed inset-0 halftone-pattern opacity-10 pointer-events-none" />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ComicLoader size="lg" />
              <h1 className="font-comic text-4xl md:text-6xl uppercase mt-8 tracking-tighter italic">Initializing Heist_</h1>
              <p className="font-mono text-sm tracking-[0.3em] uppercase mt-4 opacity-50">Establishing secure connection...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* BACKGROUND TEXTURE */}
      <div className="fixed inset-0 halftone-pattern opacity-[0.08] pointer-events-none z-0" />
      
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12 relative z-10">
        {view === 'home' ? (
          <>
            <Hero />
            <MissionBriefing />
            <TargetDossiers />
            <Sponsors />
            {/* CTA to Meme Vault */}
            <section className="flex justify-center py-12">
               <button 
                onClick={() => setView('memes')}
                className="comic-button !bg-comic-yellow !text-black !text-4xl px-12 py-6 hover:!bg-comic-red hover:!text-white"
               >
                 ENTER THE MEME VAULT
               </button>
            </section>
            <FAQ onReadBook={() => setView('comic')} />
            <ActionQuote />
            <Socials />
          </>
        ) : view === 'memes' ? (
          <div className="space-y-8">
            <button 
              onClick={() => setView('home')}
              className="comic-button !bg-black !text-white text-xl !py-2 !px-6"
            >
              ← BACK TO COMMAND CENTER
            </button>
            <Memes />
          </div>
        ) : (
          <div className="space-y-8">
            <button 
              onClick={() => setView('home')}
              className="comic-button !bg-black !text-white text-xl !py-2 !px-6"
            >
              ← BACK TO COMMAND CENTER
            </button>
            <ComicReader />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

