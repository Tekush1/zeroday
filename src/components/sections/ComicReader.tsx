import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, ZoomIn, ZoomOut, Maximize2, Minimize2, Play, Pause } from 'lucide-react';
import ComicPanel from '../ui/ComicPanel';
import ComicLoader from '../ui/ComicLoader';
import { playSound } from '../ui/useSoundFX';
import { motion, AnimatePresence } from 'motion/react';

const comicPages = [
  "https://i.ibb.co/S7KhQ22x/Chat-GPT-Image-May-12-2026-11-27-12-PM.png",
  "https://i.ibb.co/rR4ZxVWB/Chat-GPT-Image-May-12-2026-11-27-28-PM.png",
  "https://i.ibb.co/pBKpcQ2W/Chat-GPT-Image-May-12-2026-11-27-34-PM.png",
  "https://i.ibb.co/VYy1k0tg/Chat-GPT-Image-May-12-2026-11-27-42-PM.png",
  "https://i.ibb.co/1Gh2Djdq/Chat-GPT-Image-May-12-2026-11-27-47-PM.png",
  "https://i.ibb.co/DgbJkVRy/Chat-GPT-Image-May-12-2026-11-27-55-PM.png",
  "https://i.ibb.co/3yY2krmy/Chat-GPT-Image-May-12-2026-11-28-07-PM.png",
  "https://i.ibb.co/VWTzknNL/Chat-GPT-Image-May-12-2026-11-28-13-PM.png",
  "https://i.ibb.co/4RjvJTG6/Chat-GPT-Image-May-12-2026-11-28-18-PM.png",
  "https://i.ibb.co/84gN9wVC/Chat-GPT-Image-May-12-2026-11-28-39-PM.png",
  "https://i.ibb.co/rS0772Z/Chat-GPT-Image-May-12-2026-11-29-52-PM.png",
  "https://i.ibb.co/xtYNnXwf/Chat-GPT-Image-May-12-2026-11-29-58-PM.png",
  "https://i.ibb.co/HDGgcvyr/Chat-GPT-Image-May-12-2026-11-30-04-PM.png",
  "https://i.ibb.co/NR8Ffkn/Chat-GPT-Image-May-12-2026-11-30-10-PM.png",
  "https://i.ibb.co/RTHfJkfr/Chat-GPT-Image-May-12-2026-11-30-15-PM.png",
  "https://i.ibb.co/F4Tq3KF3/Chat-GPT-Image-May-12-2026-11-30-21-PM.png",
  "https://i.ibb.co/F4YVfCcN/Chat-GPT-Image-May-12-2026-11-30-28-PM.png",
  "https://i.ibb.co/0V1V9bfw/Chat-GPT-Image-May-12-2026-11-30-33-PM.png",
  "https://i.ibb.co/xq8vB9s3/Chat-GPT-Image-May-12-2026-11-30-40-PM.png",
  "https://i.ibb.co/yFrJrxP3/Chat-GPT-Image-May-12-2026-11-30-47-PM.png"
];

const ComicReader: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const controlsTimer = useRef<ReturnType<typeof setTimeout>>();
  const touchStart = useRef<number>(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying && !isPageLoading) {
      interval = setInterval(() => {
        if (currentPage < comicPages.length - 1) {
          setDirection('next');
          setCurrentPage(p => p + 1);
          setIsPageLoading(true);
          playSound('flip');
        } else {
          setIsAutoPlaying(false);
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isPageLoading, currentPage]);

  useEffect(() => {
    if (isFullscreen && controlsVisible) {
      clearTimeout(controlsTimer.current);
      controlsTimer.current = setTimeout(() => setControlsVisible(false), 3000);
    }
    return () => clearTimeout(controlsTimer.current);
  }, [isFullscreen, controlsVisible]);

  useEffect(() => {
    [comicPages[currentPage + 1], comicPages[currentPage + 2]].filter(Boolean).forEach(url => {
      const img = new Image(); img.src = url;
    });
  }, [currentPage]);

  const nextPage = useCallback(() => {
    if (currentPage < comicPages.length - 1) {
      setDirection('next');
      setCurrentPage(p => p + 1);
      setIsPageLoading(true);
      playSound('flip');
    }
  }, [currentPage]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setDirection('prev');
      setCurrentPage(p => p - 1);
      setIsPageLoading(true);
      playSound('flip');
    }
  }, [currentPage]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nextPage, prevPage, isFullscreen]);

  const showControls = () => { if (!controlsVisible) setControlsVisible(true); };
  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { if (diff > 0) nextPage(); else prevPage(); }
  };

  const toggleFullscreen = () => {
    playSound('whoosh');
    setIsFullscreen(f => !f);
    setIsZoomed(false);
    setControlsVisible(true);
  };

  const variants = {
    enter: (dir: 'next' | 'prev') => ({ x: dir === 'next' ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: 'next' | 'prev') => ({ x: dir === 'next' ? -60 : 60, opacity: 0 }),
  };

  return (
    <section
      id="logs"
      onMouseMove={showControls}
      onTouchStart={(e) => { showControls(); handleTouchStart(e); }}
      onTouchEnd={handleTouchEnd}
      className={`space-y-8 py-12 transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[100] bg-black flex flex-col overflow-hidden' : ''}`}
    >
      <AnimatePresence>
        {(!isFullscreen || controlsVisible) && (
          <motion.div
            initial={isFullscreen ? { y: -80, opacity: 0 } : {}}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className={`flex flex-col md:flex-row items-center gap-4 justify-between shrink-0 ${isFullscreen ? 'bg-white px-6 py-3 border-b-4 border-black' : 'container mx-auto px-4'}`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-black text-white p-3 rotate-3 border-4 border-black">
                <BookOpen size={isFullscreen ? 20 : 28} />
              </div>
              <h2 className={`font-comic uppercase text-black tracking-tighter italic ${isFullscreen ? 'text-3xl' : 'text-5xl md:text-7xl'}`}>
                Mission_Logs
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-comic-red text-white font-comic text-xl px-5 py-1 border-4 border-black -rotate-1 shadow-[3px_3px_0_0_rgba(0,0,0,1)]">
                {currentPage + 1} / {comicPages.length}
              </div>
              <button onClick={toggleFullscreen} className="comic-button !bg-black !text-white !p-2 !text-base hidden md:flex" title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(!isFullscreen || controlsVisible) && (
          <motion.div initial={isFullscreen ? { opacity: 0 } : {}} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center gap-4 shrink-0 px-4">
            <button onClick={() => { setIsZoomed(z => !z); playSound('pop'); }} className="comic-button !bg-comic-blue !text-white flex items-center gap-2 !text-base !py-3 !px-5">
              {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              <span className="font-comic uppercase text-sm">{isZoomed ? 'Fit' : 'Zoom'}</span>
            </button>
            <button
              onClick={() => { setIsAutoPlaying(a => !a); playSound(isAutoPlaying ? 'cancel' : 'confirm'); }}
              className={`comic-button flex items-center gap-2 !text-base !py-3 !px-5 ${isAutoPlaying ? '!bg-comic-red !text-white' : '!bg-comic-yellow !text-black'}`}
            >
              {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span className="font-comic uppercase text-sm">{isAutoPlaying ? 'Stop' : 'Auto Play'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative flex-1 flex flex-col items-center justify-center mx-auto w-full ${isZoomed ? 'max-w-none px-0' : 'max-w-3xl px-4'}`}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-full flex justify-center"
          >
            <ComicPanel className={`p-1 bg-black !border-black relative flex items-center justify-center w-full ${!isZoomed ? '!shadow-[10px_10px_0_0_rgba(0,0,0,1)]' : ''}`}>
              <div className={`bg-white relative flex items-center justify-center w-full overflow-hidden ${isZoomed ? 'min-h-[60vh]' : isFullscreen ? 'max-h-[72vh]' : 'aspect-[3/4] max-h-[80vh]'}`}>
                {isPageLoading && (
                  <div className="absolute inset-0 z-20 bg-white flex items-center justify-center">
                    <ComicLoader size="md" />
                  </div>
                )}
                <img
                  src={comicPages[currentPage]}
                  alt={`Mission Log Page ${currentPage + 1}`}
                  onLoad={() => setIsPageLoading(false)}
                  className={`max-w-full max-h-full w-auto h-auto select-none transition-opacity duration-300 ${isPageLoading ? 'opacity-0' : 'opacity-100'}`}
                  referrerPolicy="no-referrer"
                  draggable={false}
                />
                {!isZoomed && (
                  <>
                    <div className="absolute left-0 top-0 w-1/3 h-full cursor-w-resize z-10" onClick={prevPage} />
                    <div className="absolute right-0 top-0 w-1/3 h-full cursor-e-resize z-10" onClick={nextPage} />
                  </>
                )}
              </div>
            </ComicPanel>
          </motion.div>
        </AnimatePresence>
        {!isFullscreen && (
          <p className="mt-3 font-mono text-[10px] uppercase opacity-30 tracking-[0.2em] text-center">
            ← SWIPE OR CLICK SIDES OR USE ARROW KEYS →
          </p>
        )}
      </div>

      <AnimatePresence>
        {(!isFullscreen || controlsVisible) && (
          <motion.div
            initial={isFullscreen ? { y: 80, opacity: 0 } : {}}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className={`shrink-0 ${isFullscreen ? 'bg-white px-6 py-3 border-t-4 border-black' : 'px-4'}`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`comic-button !py-3 !px-7 !bg-white !text-black border-4 border-black !text-base ${currentPage === 0 ? 'opacity-20 cursor-not-allowed !shadow-none !translate-x-0 !translate-y-0' : ''}`}
                >
                  <ChevronLeft size={28} />
                </button>
                <div className="hidden md:flex gap-1.5 overflow-x-auto max-w-xs py-1">
                  {comicPages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentPage ? 'next' : 'prev');
                        setCurrentPage(idx);
                        setIsPageLoading(true);
                        playSound('click');
                      }}
                      className={`h-5 shrink-0 border-2 border-black transition-all duration-200 ${idx === currentPage ? 'w-8 bg-comic-red' : 'w-4 bg-white hover:bg-comic-yellow'}`}
                      title={`Page ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextPage}
                  disabled={currentPage === comicPages.length - 1}
                  className={`comic-button !py-3 !px-7 !bg-white !text-black border-4 border-black !text-base ${currentPage === comicPages.length - 1 ? 'opacity-20 cursor-not-allowed !shadow-none !translate-x-0 !translate-y-0' : ''}`}
                >
                  <ChevronRight size={28} />
                </button>
              </div>
              <div className="md:hidden font-comic uppercase text-lg text-black">
                Page {currentPage + 1} / {comicPages.length}
              </div>
              {isFullscreen && (
                <button onClick={toggleFullscreen} className="comic-button !bg-comic-red !text-white !py-2 !px-6 !text-base md:hidden">
                  CLOSE READER
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isFullscreen && <div className="industrial-line opacity-20" />}
    </section>
  );
};

export default ComicReader;
