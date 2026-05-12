import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, ZoomIn, ZoomOut, Maximize2, Minimize2, Play, Pause, X } from 'lucide-react';
import ComicPanel from '../ui/ComicPanel';
import ComicLoader from '../ui/ComicLoader';
import { motion, AnimatePresence, useAnimation } from 'motion/react';

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

  // Auto-playing logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying && !isPageLoading) {
      interval = setInterval(() => {
        if (currentPage < comicPages.length - 1) {
          nextPage();
        } else {
          setIsAutoPlaying(false);
        }
      }, 5000); // 5 seconds per page
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, isPageLoading, currentPage]);

  // Hide controls auto-timer in fullscreen
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFullscreen && controlsVisible) {
      timer = setTimeout(() => setControlsVisible(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isFullscreen, controlsVisible]);

  const handleInteraction = () => {
    if (!controlsVisible) setControlsVisible(true);
  };

  // Preload logic: Load current + next 2 pages
  useEffect(() => {
    const pagesToPreload = [
      comicPages[currentPage],
      comicPages[currentPage + 1],
      comicPages[currentPage + 2]
    ].filter(Boolean);

    pagesToPreload.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, [currentPage]);

  const nextPage = useCallback(() => {
    if (currentPage < comicPages.length - 1) {
      setCurrentPage(prev => prev + 1);
      setIsPageLoading(true);
      if (!isFullscreen) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentPage, isFullscreen]);

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setIsPageLoading(true);
      if (!isFullscreen) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentPage, isFullscreen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, isFullscreen]);

  const toggleZoom = () => setIsZoomed(!isZoomed);
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setIsZoomed(false);
    setControlsVisible(true);
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) nextPage();
    if (info.offset.x > threshold) prevPage();
  };

  return (
    <section 
      id="logs"
      onMouseMove={handleInteraction}
      onTouchStart={handleInteraction}
      className={`space-y-12 py-12 transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-[100] bg-black overflow-hidden flex flex-col' : ''}`}
    >
      {/* Header Info */}
      <AnimatePresence>
        {(!isFullscreen || controlsVisible) && (
          <motion.div 
            initial={isFullscreen ? { y: -100 } : {}}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className={`flex flex-col md:flex-row items-center gap-6 justify-between shrink-0 container mx-auto px-4 ${isFullscreen ? 'bg-white p-4 border-b-4 border-black z-20' : ''}`}
          >
            <div className="flex items-center gap-6">
              <div className="bg-black text-white p-4 rotate-3 border-4 border-black">
                <BookOpen size={isFullscreen ? 24 : 32} />
              </div>
              <h2 className={`font-comic uppercase text-black tracking-tighter italic ${isFullscreen ? 'text-3xl' : 'text-5xl md:text-8xl'}`}>
                Mission_Logs
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-comic-red text-white font-comic text-xl md:text-2xl px-6 py-2 border-4 border-black -rotate-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                {currentPage + 1} / {comicPages.length}
              </div>
              <button 
                onClick={toggleFullscreen}
                className="comic-button !bg-black !text-white !p-2 hidden md:flex"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize2 size={24} /> : <Maximize2 size={24} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`relative mx-auto transition-all duration-300 flex-1 flex flex-col justify-center ${isZoomed ? 'max-w-none w-full' : 'max-w-4xl w-full px-4'} ${isFullscreen ? 'overflow-hidden' : ''}`}>
        {/* VIEW TOOLS */}
        <AnimatePresence>
          {(!isFullscreen || controlsVisible) && (
            <motion.div 
              initial={isFullscreen ? { opacity: 0 } : {}}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:flex justify-center gap-4 mb-8 shrink-0"
            >
               <button 
                onClick={toggleZoom}
                className="comic-button !bg-comic-blue !text-white flex items-center justify-center gap-2"
               >
                 {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                 <span className="font-comic uppercase text-sm md:text-base">{isZoomed ? 'Fit Screen' : 'Zoom Detail'}</span>
               </button>
               <button 
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`comic-button flex items-center justify-center gap-2 ${isAutoPlaying ? '!bg-comic-red !text-white' : '!bg-comic-yellow !text-black'}`}
               >
                 {isAutoPlaying ? <Pause size={20} /> : <Play size={20} />}
                 <span className="font-comic uppercase text-sm md:text-base">{isAutoPlaying ? 'Stop Auto' : 'Auto Play'}</span>
               </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* READER STAGE */}
        <div className={`relative flex-1 flex items-center justify-center ${isFullscreen ? 'max-h-full' : ''}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full flex justify-center h-full items-center p-2"
            >
              <ComicPanel className={`p-1 bg-black !border-black relative flex items-center justify-center max-h-full overflow-auto scrollbar-hide ${!isZoomed ? '!shadow-[12px_12px_0_0_rgba(0,0,0,1)]' : ''}`}>
                <div className={`bg-white relative flex items-center justify-center min-h-[400px] ${isZoomed ? 'w-full' : 'max-h-full lg:max-h-[85vh] aspect-[3/4] md:aspect-[4/5]'}`}>
                  {isPageLoading && (
                    <div className="absolute inset-0 z-20 bg-white flex items-center justify-center">
                      <ComicLoader size="md" />
                    </div>
                  )}
                  <motion.img 
                    src={comicPages[currentPage]} 
                    alt={`Mission Log Page ${currentPage + 1}`}
                    onLoad={() => setIsPageLoading(false)}
                    className={`max-w-full max-h-full w-auto h-auto transition-all ${isPageLoading ? 'opacity-0' : 'opacity-100'} cursor-grab active:cursor-grabbing`}
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />
                  
                  {/* NAVIGATION OVERLAYS (Invisible clickable areas for desktop) */}
                  {!isZoomed && !isFullscreen && (
                    <>
                      <div 
                        className="absolute left-0 top-0 w-1/3 h-full cursor-pointer z-10" 
                        onClick={prevPage}
                        title="Previous Page"
                      />
                      <div 
                        className="absolute right-0 top-0 w-1/3 h-full cursor-pointer z-10" 
                        onClick={nextPage}
                        title="Next Page"
                      />
                    </>
                  )}
                </div>
              </ComicPanel>
            </motion.div>
          </AnimatePresence>

          {/* QUICK INDICATOR */}
          {!isFullscreen && (
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase opacity-40 font-black tracking-[0.2em] pointer-events-none whitespace-nowrap">
              [ SWIPE OR USE ARROWS ]
            </div>
          )}
        </div>

        {/* BOTTOM NAVIGATION */}
        <AnimatePresence>
          {(!isFullscreen || controlsVisible) && (
            <motion.div 
              initial={isFullscreen ? { y: 100 } : {}}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              className={`mt-16 shrink-0 ${isFullscreen ? 'bg-white p-4 border-t-4 border-black z-20 w-full' : 'bg-white/10 backdrop-blur-sm p-4 rounded-3xl border-2 border-black/5'}`}
            >
              <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <button 
                    onClick={prevPage}
                    disabled={currentPage === 0}
                    className={`comic-button !py-4 !px-8 !bg-white !text-black border-4 border-black ${currentPage === 0 ? 'opacity-20 cursor-not-allowed shadow-none translate-y-0' : ''}`}
                  >
                    <ChevronLeft size={32} />
                  </button>
                  
                  <div className="hidden lg:flex gap-1.5 px-4 overflow-x-auto max-w-[400px] scrollbar-hide py-2">
                    {comicPages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentPage(idx);
                          setIsPageLoading(true);
                        }}
                        className={`h-6 transition-all duration-300 border-2 border-black shrink-0 ${idx === currentPage ? 'w-10 bg-comic-red' : 'w-4 bg-white hover:bg-comic-yellow'}`}
                        title={`Jump to Page ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button 
                    onClick={nextPage}
                    disabled={currentPage === comicPages.length - 1}
                    className={`comic-button !py-4 !px-8 !bg-white !text-black border-4 border-black ${currentPage === comicPages.length - 1 ? 'opacity-20 cursor-not-allowed shadow-none translate-y-0' : ''}`}
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
                
                {/* Mobile jump info */}
                <div className="lg:hidden font-comic uppercase text-xl text-black">
                  Page {currentPage + 1} / {comicPages.length}
                </div>

                {isFullscreen && (
                   <button 
                    onClick={toggleFullscreen}
                    className="comic-button !bg-comic-red !text-white !p-3 rounded-xl block md:hidden"
                   >
                     CLOSE READER
                   </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isFullscreen && <div className="industrial-line opacity-20" />}
    </section>
  );
};

export default ComicReader;
