import React from 'react';
import ComicPanel from '../ui/ComicPanel';

const Sponsors: React.FC = () => {
  const sponsors = [
    { name: "HACKVISER", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkrJ1tQfj0u4Ox1dZ9X4B3eQJpMBVnJwhQ&s", url: "https://hackviser.com" }
  ];

  const poweredBy = [
    { name: "UNSTOP", logo: "https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/branding-guidelines/logos/blue/Unstop-Logo-Blue-Medium.jpg", url: "https://unstop.com" }
  ];

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-6">
        <h2 className="font-comic text-6xl uppercase px-8 py-2 bg-comic-red text-white -rotate-1 border-4 border-black">Our Sponsors</h2>
        <div className="h-4 bg-black flex-1 halftone-pattern" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {sponsors.map((spon, idx) => (
          <a key={idx} href={spon.url} target="_blank" rel="noopener noreferrer">
            <ComicPanel className="group hover:rotate-3 transition-transform p-0 !shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:!shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
              <div className="aspect-square overflow-hidden relative bg-white flex items-center justify-center p-3">
                <img
                  src={spon.logo}
                  alt={spon.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-1 font-comic text-xl uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {spon.name}
                </div>
              </div>
            </ComicPanel>
          </a>
        ))}
      </div>

      {/* Powered By Section */}
      <div className="flex items-center gap-6">
        <h2 className="font-comic text-6xl uppercase px-8 py-2 bg-comic-blue text-white rotate-1 border-4 border-black">Powered By</h2>
        <div className="h-4 bg-black flex-1 halftone-pattern" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {poweredBy.map((item, idx) => (
          <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer">
            <ComicPanel className="group hover:rotate-3 transition-transform p-0 !shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:!shadow-[12px_12px_0_0_rgba(0,0,0,1)]">
              <div className="aspect-square overflow-hidden relative bg-white flex items-center justify-center p-4">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-1 font-comic text-xl uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.name}
                </div>
              </div>
            </ComicPanel>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Sponsors;