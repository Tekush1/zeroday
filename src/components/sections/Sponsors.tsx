import React from 'react';
import ComicPanel from '../ui/ComicPanel';

const Sponsors: React.FC = () => {
  const sponsors = [
    { name: "CYBERDYNE", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "OSCORP", logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "STARK IND", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "WAYNE ENT", logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "UMBRELLA", logo: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=300&h=300" },
    { name: "WEYLAND", logo: "https://images.unsplash.com/photo-1551288049-2e47262a6327?auto=format&fit=crop&q=80&w=300&h=300" }
  ];

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-6">
        <h2 className="font-comic text-6xl uppercase px-8 py-2 bg-comic-red text-white -rotate-1 border-4 border-black">Our Allies</h2>
        <div className="h-4 bg-black flex-1 halftone-pattern" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {sponsors.map((spon, idx) => (
          <ComicPanel key={idx} className="group hover:rotate-3 transition-transform p-0 !shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:!shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
            <div className="aspect-square grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden relative">
               <img 
                src={spon.logo} 
                alt={spon.name} 
                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform"
                referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
               <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-1 font-comic text-xl uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {spon.name}
               </div>
            </div>
          </ComicPanel>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;
