import React, { useState, useEffect } from 'react';
import ComicPanel from '../ui/ComicPanel';
import ComicLoader from '../ui/ComicLoader';
import { motion, AnimatePresence } from 'motion/react';

const Memes: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX with the new loader
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Using the user provided image and some relative placeholders
  const memeImages = [
    "https://i.ibb.co/C51DsryC/Screenshot-from-2026-05-12-21-43-47.png",
    "https://images.unsplash.com/photo-1513360371669-4ada3d3f4be5?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1519098901907-578f77174e92?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1492370284958-c20b159687dc?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400&h=400",
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=400"
  ];

  // Creating a list of 20 items for the grid
  const allMemes = [...memeImages, ...memeImages, ...memeImages].slice(0, 20);

  return (
    <section id="memes" className="space-y-12">
      <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-6">
          <h2 className="font-comic text-6xl uppercase px-8 py-2 bg-comic-yellow text-black rotate-1 border-4 border-black">The Meme Vault</h2>
          <div className="hidden md:block h-4 bg-comic-red w-32 -rotate-1 border-2 border-black" />
        </div>
        <p className="font-comic text-2xl uppercase text-black max-w-sm text-center md:text-right">
          "If we can't hack it, <span className="text-comic-red">we'll meme it!</span>"
        </p>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[400px] flex flex-col items-center justify-center bg-gray-50 border-4 border-dashed border-black/10 rounded-3xl"
          >
            <ComicLoader size="lg" />
            <p className="font-comic text-xl text-black mt-4 uppercase">Decrypting Dankness...</p>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {allMemes.map((url, idx) => (
              <ComicPanel 
                key={idx} 
                className={`p-1 group hover:scale-[1.05] transition-all duration-300 ${idx % 3 === 0 ? 'rotate-1' : idx % 2 === 0 ? '-rotate-1' : 'rotate-0'}`}
              >
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                   <img 
                    src={url} 
                    alt={`Heist Meme ${idx + 1}`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                   />
                   <div className="absolute inset-0 border-2 border-black/10 group-hover:border-transparent transition-colors" />
                   <div className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 font-comic text-sm">#HEIST_{idx + 1}</div>
                </div>
              </ComicPanel>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-center pt-8">
         <button className="comic-button !bg-comic-yellow !text-black hover:!bg-black hover:!text-white">
           Submit Your Own Meme
         </button>
      </div>
    </section>
  );
};

export default Memes;
