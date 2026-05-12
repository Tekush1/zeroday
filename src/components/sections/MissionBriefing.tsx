import React from 'react';
import { Shield, Server, Zap } from 'lucide-react';
import ComicPanel from '../ui/ComicPanel';

const MissionBriefing: React.FC = () => {
  const organisers = [
    { 
      id: "ORG_01", 
      logo: (
        <div className="relative group">
          <div className="w-24 h-24 bg-black text-comic-red flex items-center justify-center border-4 border-black rotate-6 group-hover:rotate-0 transition-transform shadow-[8px_8px_0_0_rgba(189,32,49,1)]">
            <span className="font-comic text-4xl font-black italic">CHX</span>
          </div>
          <div className="absolute -top-2 -right-2 bg-comic-yellow text-black text-[10px] font-black px-1 border-2 border-black rotate-12">SEC_OPS</div>
        </div>
      ),
      title: "CYBERHX", 
      desc: "CyberHX is a high-octane cybersecurity platform dedicated to elite training and vulnerability research.", 
      color: "bg-comic-blue/5" 
    },
    { 
      id: "ORG_02", 
      logo: (
        <div className="relative group">
          <div className="w-24 h-24 bg-comic-blue text-white flex items-center justify-center border-4 border-black -rotate-6 group-hover:rotate-0 transition-transform shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            <span className="font-comic text-4xl font-black italic">IXEGO</span>
          </div>
          <div className="absolute -bottom-2 -left-2 bg-white text-black text-[10px] font-black px-1 border-2 border-black -rotate-12">INFRA_V2</div>
        </div>
      ),
      title: "IXEGO", 
      desc: "Ixego provides the robust cyberinfrastructure that powers the grid, ensuring zero-latency operations.", 
      color: "bg-comic-red/5" 
    }
  ];

  return (
    <section id="organisers" className="space-y-12 py-16">
      <div className="flex items-center gap-4">
        <div className="h-4 bg-black flex-1" />
        <h2 className="font-comic text-5xl md:text-6xl uppercase px-8 py-2 whitespace-nowrap bg-black text-white -rotate-2 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
          Organiser Information
        </h2>
        <div className="h-4 bg-black flex-1" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto px-4">
        {organisers.map((org, idx) => (
          <ComicPanel key={idx} className={`hover:scale-[1.02] transition-all group ${org.color} border-[8px] border-black p-10 relative overflow-hidden`}>
            <div className="absolute inset-0 halftone-pattern opacity-5 pointer-events-none" />
            <div className="text-8xl font-comic opacity-5 absolute -top-4 -right-4 text-black rotate-12 select-none">{org.id}</div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="mb-10 scale-125">
                {org.logo}
              </div>
              
              <h3 className="font-comic text-6xl uppercase mb-6 text-black tracking-tighter italic drop-shadow-sm">
                {org.title}
              </h3>
              
              <div className="w-24 h-3 bg-black mb-8 -rotate-1" />
              
              <p className="font-comic text-2xl leading-tight text-black uppercase max-w-md">
                {org.desc}
              </p>
            </div>

            <div className="absolute bottom-6 right-6">
              <Zap size={32} className="text-comic-yellow animate-bounce" />
            </div>
          </ComicPanel>
        ))}
      </div>
    </section>
  );
};

export default MissionBriefing;
