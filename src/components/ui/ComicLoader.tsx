import React from 'react';
import { motion } from 'motion/react';

const ComicLoader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-xl',
    md: 'w-24 h-24 text-2xl',
    lg: 'w-48 h-48 text-5xl',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [-5, 5, -5],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`${sizeClasses[size]} bg-comic-yellow border-4 border-black flex items-center justify-center font-comic font-black uppercase italic shadow-[8px_8px_0_0_rgba(0,0,0,1)] relative`}
      >
        <div className="absolute inset-0 bg-white opacity-20 halftone-pattern" />
        <span className="relative z-10 text-black">Loading...</span>
        
        {/* Decorative rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <div
            key={angle}
            className="absolute w-full h-[2px] bg-black bg-opacity-20"
            style={{ transform: `rotate(${angle}deg)` }}
          />
        ))}
      </motion.div>
      <div className="mt-4 font-mono text-[10px] uppercase font-black tracking-widest animate-pulse">
        Fetching Intel...
      </div>
    </div>
  );
};

export default ComicLoader;
