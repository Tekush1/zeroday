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
import { playSound, setSoundEnabled, isSoundEnabled } from './components/ui/useSoundFX';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<'home' | 'memes' | 'comic'>('home');
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // ── Global hover sound (lightweight tick on any button/a/[role=button]) ──
  useEffect(() => {
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('button, a, [role="button"]')) playSound('hover');
    };
    document.addEventListener('mouseover', onEnter);
    return () => document.removeEventListener('mouseover', onEnter);
  }, []);

  // ── Global click sounds by element type ──
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const btn = t.closest('button, a, [role="button"]');
      if (!btn) return;

      const text = btn.textContent?.toLowerCase() ?? '';
      const cls = btn.className ?? '';

      if (text.includes('discord') || text.includes('register') || text.includes('initialize')) {
        playSound('whoosh');
      } else if (text.includes('back') || text.includes('close') || text.includes('escape')) {
        playSound('cancel');
      } else if (text.includes('auto') || text.includes('play') || text.includes('confirm')) {
        playSound('confirm');
      } else if (text.includes('log') || text.includes('target') || text.includes('meme') || btn.closest('nav')) {
        playSound('nav');
      } else if (text.includes('zoom') || text.includes('full')) {
        playSound('pop');
      } else if (cls.includes('comic-button')) {
        playSound('zap');
      } else {
        playSound('click');
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const toggleSFX = () => {
    const next = !sfxOn;
    setSfxOn(next);
    setSoundEnabled(next);
    if (next) playSound('confirm');
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden selection:bg-heist-red selection:text-white font-sans text-black">
      <AnimatePresence>
        {isInitialLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[1000] bg-white flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="fixed inset-0 halftone-pattern opacity-10 pointer-events-none" />
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <ComicLoader size="lg" />
              <h1 className="font-comic text-4xl md:text-6xl uppercase mt-8 tracking-tighter italic">Initializing Heist_</h1>
              <p className="font-mono text-sm tracking-[0.3em] uppercase mt-4 opacity-50">Establishing secure connection...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background texture */}
      <div className="fixed inset-0 halftone-pattern opacity-[0.08] pointer-events-none z-0" />

      {/* Global SFX toggle — fixed bottom right */}
      {!isInitialLoading && (
        <button
          onClick={toggleSFX}
          className="fixed bottom-5 right-5 z-[200] font-comic text-xs uppercase border-4 border-black px-3 py-2 bg-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] hover:bg-comic-yellow transition-colors"
          title="Toggle sound effects"
        >
          {sfxOn ? '🔊 SFX' : '🔇 SFX'}
        </button>
      )}

      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-12 relative z-10">
        {view === 'home' ? (
          <>
            <Hero />
            <MissionBriefing />
            <TargetDossiers />
            <Sponsors />
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
            <button onClick={() => setView('home')} className="comic-button !bg-black !text-white text-xl !py-2 !px-6">
              ← BACK TO COMMAND CENTER
            </button>
            <Memes />
          </div>
        ) : (
          <div className="space-y-8">
            <button onClick={() => setView('home')} className="comic-button !bg-black !text-white text-xl !py-2 !px-6">
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
