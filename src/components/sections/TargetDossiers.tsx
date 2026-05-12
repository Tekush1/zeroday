import React from 'react';
import { Fingerprint, Cpu, Globe, Terminal, ArrowRight } from 'lucide-react';
import ComicPanel from '../ui/ComicPanel';

const TargetDossiers: React.FC = () => {
  const vaults = [
    { title: "THE MINT", status: "ENCRYPTED", icon: <Fingerprint />, diff: "S-CLASS", color: "hover:bg-comic-blue/20" },
    { title: "BANK OF ASH", status: "VULNERABLE", icon: <Cpu />, diff: "A-CLASS", color: "hover:bg-comic-red/20" },
    { title: "SIGMA CLOUD", status: "LOCKED", icon: <Globe />, diff: "B-CLASS", color: "hover:bg-comic-yellow/40" },
    { title: "KRNL ZERO", status: "ACTIVE", icon: <Terminal />, diff: "S-CLASS", color: "hover:bg-comic-red/20" }
  ];

  return (
    <section id="targets" className="bg-black p-12 comic-panel !shadow-none halftone-pattern border-x-0 border-y-[12px]">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center">
          <h2 className="font-comic text-7xl md:text-[10rem] text-white uppercase mb-4 leading-none glitch-comic">
            CLASSIFIED <span className="text-comic-red">VAULTS</span>
          </h2>
          <p className="text-comic-yellow font-comic text-2xl uppercase tracking-[0.2em]">
            Auth: Level OMEGA Clearance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {vaults.map((vault, i) => (
            <div key={i} className={`bg-white comic-panel p-8 flex items-center gap-8 group hover:-rotate-1 cursor-crosshair transition-all ${vault.color}`}>
              <div className="bg-black text-white p-6 shrink-0 group-hover:bg-comic-red transition-colors border-4 border-black">
                {vault.icon}
              </div>
              <div className="flex-1">
                <div className="font-comic text-xl text-comic-red uppercase mb-1">{vault.status}</div>
                <h4 className="font-comic text-5xl uppercase leading-none text-black">{vault.title}</h4>
                <div className="font-sans text-xs opacity-60 font-black mt-3 uppercase tracking-tighter">DIFFICULTY: {vault.diff}</div>
              </div>
              <ArrowRight className="text-black group-hover:translate-x-3 transition-transform" size={40} />
            </div>
          ))}
        </div>

        <div className="text-center pt-12">
          <a 
            href="https://ctf.cyberhx.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="comic-button !bg-comic-yellow !text-black hover:!bg-comic-red hover:!text-white !border-white !text-4xl px-16 py-8 inline-block"
          >
            ENTER THE UNDERGROUND
          </a>
        </div>
      </div>
    </section>
  );
};

export default TargetDossiers;
