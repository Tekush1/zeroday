import React from 'react';

interface ComicPanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  halftone?: boolean;
}

const ComicPanel: React.FC<ComicPanelProps> = ({ children, title, className = "", halftone = false }) => (
  <div className={`comic-panel p-6 ${className} ${halftone ? 'halftone-pattern' : ''}`}>
    {title && (
      <div className="absolute top-0 left-0 bg-black text-white px-4 py-1 font-comic text-xl uppercase z-10">
        {title}
      </div>
    )}
    <div className="relative z-0 h-full w-full">
      {children}
    </div>
  </div>
);

export default ComicPanel;
